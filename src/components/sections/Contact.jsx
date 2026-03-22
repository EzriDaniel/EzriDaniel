import { motion } from 'framer-motion';
import { useState } from 'react';

function Contact() {
  const [formData, setFormData] = useState({ name: '', email: '', subject: '', message: '', _gotcha: '' });
  const [status, setStatus] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus('sending');
    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Submission failed');

      setStatus('success');
      // reset form
      setFormData({ name: '', email: '', subject: '', message: '' });
    } catch (err) {
      console.error(err);
      setStatus('error'); // you can show an error message if you wish
    } finally {
      setTimeout(() => setStatus(null), 3000);
    }
  };

  return (
    <motion.section
      id="contact"
      className="py-4"
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-80px' }}
      transition={{ duration: 0.5 }}
    >
      <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} className="text-center mb-10">
        <h2 className="text-3xl font-bold neon-text mb-3">Get In Touch</h2>
        <p className="text-b max-w-2xl mx-auto text-sm">
          Have a project idea or collaboration opportunity? Reach out!
        </p>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.15 }}
        className="glass-effect p-6 max-w-2xl mx-auto mb-8"
      >
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-b text-sm mb-1">Name</label>
              <input
                type="text"
                value={formData.name}
                onChange={e => setFormData({...formData, name: e.target.value})}
                className="input"
                placeholder="Your Name"
                required
              />
            </div>
            <div>
              <label className="block text-b text-sm mb-1">Email</label>
              <input
                type="email"
                value={formData.email}
                onChange={e => setFormData({...formData, email: e.target.value})}
                className="input"
                placeholder="your@email.com"
                required
              />
            </div>
          </div>
          <div>
            <label className="block text-b text-sm mb-1">Subject</label>
            <input
              type="text"
              value={formData.subject}
              onChange={e => setFormData({...formData, subject: e.target.value})}
              className="input"
              placeholder="Subject"
              required
            />
          </div>
          <div>
            <label className="block text-b text-sm mb-1">Message</label>
            <textarea
              value={formData.message}
              onChange={e => setFormData({...formData, message: e.target.value})}
              className="input"
              rows="4"
              placeholder="Your message..."
              required
            />
          </div>
          {/* Honeypot – invisible to users, but bots will fill it */}
          <input
          type="text"
          name="_gotcha"
          value={formData._gotcha}
          onChange={e => setFormData({ ...formData, _gotcha: e.target.value })}
          autoComplete="off"
          tabIndex={-1}
          style={{ position: 'absolute', left: '-9999px' }}
          aria-hidden="true"
          />
          <button type="submit" disabled={status === 'sending'} className="btn btn-filled w-full">
            {status === 'sending' ? 'Sending...' : 'Send Message'}
          </button>
        </form>
        {status === 'success' && (
          <p className="text-h text-sm mt-4 text-center">Message sent successfully!</p>
        )}
        {status === 'error' && (
          <p className="text-r text-sm mt-2">Sorry, something went wrong. Please try again later.</p>
  )}
      </motion.div>

      {/* Contact info cards */}
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="grid grid-cols-1 sm:grid-cols-3 gap-4 max-w-2xl mx-auto"
      >
        {[
          { title: 'Email', value: 'ezridgweth@gweenscraft.co.ke', href: 'mailto:ezridgweth@gweenscraft.co.ke' },
          { title: 'Phone', value: '+254 788 666 778', href: 'tel:+254788666778' },
          { title: 'LinkedIn', value: 'ezri-gweth', href: 'https://www.linkedin.com/in/ezri-gweth-770974207' },
        ].map(({ title, value, href }) => (
          <div key={title} className="glass-effect p-4 text-center">
            <h3 className="text-h font-semibold text-sm mb-1">{title}</h3>
            <a
              href={href}
              target="_blank"
              rel="noopener noreferrer"
              className="link text-b text-xs font-mono break-all"
            >
              {value}
            </a>
          </div>
        ))}
      </motion.div>
    </motion.section>
  );
}

export default Contact;
