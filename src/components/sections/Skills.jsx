import { motion } from 'framer-motion';
import { technicalSkills, softSkills, skillCategories } from '../../data/skills.js';
import SkillCard from '../ui/SkillCard.jsx';

function Skills() {
  return (
    <motion.section
      id="skills"
      className="py-4"
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-80px' }}
      transition={{ duration: 0.5 }}
    >
      <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} className="text-center mb-10">
        <h2 className="text-3xl font-bold neon-text mb-3">My Skills</h2>
        <p className="text-b max-w-2xl mx-auto text-sm">
          A comprehensive breakdown of my technical and soft skills.
        </p>
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-5 mb-8">
        {/* Technical Skills */}
        <motion.div
          initial={{ opacity: 0, x: -16 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.15 }}
          className="glass-effect p-5"
        >
          <h3 className="text-lg font-bold text-h mb-4 flex items-center justify-between pb-2 border-b border-c">
            <span>&gt; Technical Skills</span>
            <span className="text-m text-xs font-mono">[{technicalSkills.length}]</span>
          </h3>
          <div className="space-y-4">
            {technicalSkills.map((skill, index) => (
              <SkillCard key={skill.name} skill={skill} index={index} />
            ))}
          </div>
        </motion.div>

        {/* Soft Skills */}
        <motion.div
          initial={{ opacity: 0, x: 16 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.2 }}
          className="glass-effect p-5"
        >
          <h3 className="text-lg font-bold text-h mb-4 flex items-center justify-between pb-2 border-b border-c">
            <span>&gt; Soft Skills</span>
            <span className="text-m text-xs font-mono">[{softSkills.length}]</span>
          </h3>
          <div className="space-y-4">
            {softSkills.map((skill, index) => (
              <SkillCard key={skill.name} skill={skill} index={index} />
            ))}
          </div>
        </motion.div>
      </div>

      {/* Additional Expertise */}
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.35 }}
        className="glass-effect p-5"
      >
        <h3 className="text-lg font-bold text-h mb-4 pb-2 border-b border-c">&gt; Additional Expertise</h3>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          {skillCategories.map((cat, i) => (
            <div key={i} className="bg-card p-4 rounded-lg border border-c">
              <div className="flex items-center gap-2 mb-2">
                <span className="text-lg">{cat.icon}</span>
                <h4 className="font-bold text-h text-sm">{cat.name}</h4>
              </div>
              <div className="flex flex-wrap gap-1.5">
                {cat.skills.map((s, j) => (
                  <span key={j} className="bg-input border border-c text-b text-xs px-2 py-0.5 rounded">
                    {s}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </motion.div>
    </motion.section>
  );
}

export default Skills;
