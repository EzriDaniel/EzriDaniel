// api/contact.js 
import nodemailer from 'nodemailer';

const rateLimit = (() => {
  const store = new Map();
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

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const ip =
    req.headers['x-forwarded-for'] ||
    req.socket?.remoteAddress ||
    'unknown';

  const max = Number(process.env.RATE_LIMIT_MAX) || 5;
  const windowSec = Number(process.env.RATE_LIMIT_WINDOW) || 60;

  if (!rateLimit(ip, max, windowSec)) {
    return res.status(429).json({ error: 'Too many requests – please try again later.' });
  }

  const { name, email, subject, message, _gotcha } = req.body;

  if (!name || !email || !subject || !message) {
    return res.status(400).json({ error: 'All fields are required' });
  }

  if (_gotcha && _gotcha.trim() !== '') {
    return res.status(200).json({ success: true });
  }

  const transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: Number(process.env.SMTP_PORT),
    secure: process.env.SMTP_SECURE === 'true',
    auth: { user: process.env.SMTP_USER, pass: process.env.SMTP_PASS },
  });

  try {
    await transporter.sendMail({
      from: `"${process.env.SMTP_FROM_NAME}" <${process.env.SMTP_FROM_EMAIL}>`,
      to: process.env.CONTACT_RECIPIENT,
      subject: `Portfolio contact: ${subject}`,
      text: `Name: ${name}\nEmail: ${email}\nSubject: ${subject}\n\nMessage:\n${message}`,
    });
    return res.status(200).json({ success: true });
  } catch (err) {
    console.error('Contact form error:', err);
    return res.status(500).json({ error: 'Failed to send message – please try again later.' });
  }
}