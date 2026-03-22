// vite.config.js
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';
import { config } from 'dotenv';
import nodemailer from 'nodemailer';

config(); // Load .env locally; Vercel/Netlify inject vars in production

// Simple in-memory rate limiter
const rateLimit = (() => {
  const store = new Map(); // ip => [timestamps]
  return (ip, max, windowSec) => {
    const now = Date.now();
    const windowMs = windowSec * 1000;
    let timestamps = store.get(ip) || [];
    timestamps = timestamps.filter(t => now - t < windowMs);
    if (timestamps.length >= max) return false;
    timestamps.push(now);
    store.set(ip, timestamps);
    return true;
  };
})();

export default defineConfig({
  plugins: [
    tailwindcss(),
    react(),
    // Correct way to add middleware in Vite — via a plugin
    {
      name: 'contact-api',
      configureServer(server) {
        server.middlewares.use('/api/contact', async (req, res, next) => {
          if (req.method !== 'POST') {
            res.statusCode = 405;
            res.setHeader('Content-Type', 'application/json');
            return res.end(JSON.stringify({ error: 'Method not allowed' }));
          }

          // Extract client IP
          const ip =
            req.headers['x-forwarded-for'] ||
            req.socket?.remoteAddress ||
            req.headers['x-real-ip'] ||
            'unknown';

          const max = Number(process.env.RATE_LIMIT_MAX) || 5;
          const windowSec = Number(process.env.RATE_LIMIT_WINDOW) || 60;

          if (!rateLimit(ip, max, windowSec)) {
            res.statusCode = 429;
            res.setHeader('Content-Type', 'application/json');
            return res.end(
              JSON.stringify({ error: 'Too many requests – please try again later.' })
            );
          }

          // Parse JSON body manually (Vite middleware has no body parser)
          let rawBody = '';
          req.on('data', chunk => (rawBody += chunk));
          req.on('end', async () => {
            let data;
            try {
              data = JSON.parse(rawBody);
            } catch {
              res.statusCode = 400;
              res.setHeader('Content-Type', 'application/json');
              return res.end(JSON.stringify({ error: 'Invalid JSON' }));
            }

            const { name, email, subject, message, _gotcha } = data;

            // Basic validation
            if (!name || !email || !subject || !message) {
              res.statusCode = 400;
              res.setHeader('Content-Type', 'application/json');
              return res.end(JSON.stringify({ error: 'All fields are required' }));
            }

            // Honeypot check
            if (_gotcha && _gotcha.trim() !== '') {
              res.statusCode = 200; // Return 200 to bots so they think it worked
              res.setHeader('Content-Type', 'application/json');
              return res.end(JSON.stringify({ success: true }));
            }

            // Configure SMTP transporter
            const transporter = nodemailer.createTransport({
              host: process.env.SMTP_HOST,
              port: Number(process.env.SMTP_PORT),
              secure: process.env.SMTP_SECURE === 'true',
              auth: {
                user: process.env.SMTP_USER,
                pass: process.env.SMTP_PASS,
              },
            });

            const mailOptions = {
              from: `"${process.env.SMTP_FROM_NAME}" <${process.env.SMTP_FROM_EMAIL}>`,
              to: process.env.CONTACT_RECIPIENT,
              subject: `Portfolio contact: ${subject}`,
              text: `Name: ${name}\nEmail: ${email}\nSubject: ${subject}\n\nMessage:\n${message}`,
            };

            try {
              await transporter.sendMail(mailOptions);
              res.statusCode = 200;
              res.setHeader('Content-Type', 'application/json');
              return res.end(JSON.stringify({ success: true }));
            } catch (err) {
              console.error('Contact form error:', err);
              res.statusCode = 500;
              res.setHeader('Content-Type', 'application/json');
              return res.end(
                JSON.stringify({ error: 'Failed to send message – please try again later.' })
              );
            }
          });
        });
      },
    },
  ],
});