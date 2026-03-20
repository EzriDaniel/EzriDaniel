import { motion } from 'framer-motion';
import { personalInfo } from '../../data/personalInfo.js';

function About() {
  const cards = [
    {
      title: 'Profile',
      items: [
        ['Name:', personalInfo.name],
        ['Nationality:', personalInfo.nationality],
        ['Location:', personalInfo.location],
        ['Phone:', personalInfo.phone],
        ['Email:', personalInfo.email],
      ],
    },
    {
      title: 'Education',
      content: personalInfo.education.map((edu, i) => (
        <div key={i} className="mb-3 last:mb-0">
          <h4 className="text-h font-semibold">{edu.institution}</h4>
          <p className="text-b text-sm">{edu.period}</p>
          <p className="text-m text-sm italic">{edu.degree}</p>
        </div>
      )),
    },
    { title: 'Languages', items: personalInfo.languages.map(l => `${l.name} (${l.proficiency})`) },
    { title: 'Qualities', items: personalInfo.qualities },
    { title: 'Interests', items: personalInfo.interests },
    {
      title: 'Social Impact',
      items: ['Tembo na Binadamu: Human-Elephant Coexistence', 'GreenClubs Conservation Platform'],
    },
  ];

  return (
    <motion.section
      id="about"
      className="py-4"
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-80px' }}
      transition={{ duration: 0.5 }}
    >
      <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} className="text-center mb-10">
        <h2 className="text-3xl font-bold neon-text mb-3">About Me</h2>
        <p className="text-b max-w-2xl mx-auto text-sm leading-relaxed">{personalInfo.summary}</p>
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {cards.map((card, index) => (
          <motion.div
            key={card.title}
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.08 + index * 0.07 }}
            className="glass-effect p-5"
          >
            <h3 className="text-lg font-bold text-h mb-3 pb-2 border-b border-c">{card.title}</h3>
            {card.items ? (
              <div className="space-y-1.5 text-b text-sm">
                {card.items.map((item, i) => (
                  <div key={i}>
                    {Array.isArray(item) ? (
                      <><span className="text-h">{item[0]}</span> {item[1]}</>
                    ) : (
                      <span className="text-b">&bull; {item}</span>
                    )}
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-b text-sm">{card.content}</div>
            )}
          </motion.div>
        ))}
      </div>
    </motion.section>
  );
}

export default About;
