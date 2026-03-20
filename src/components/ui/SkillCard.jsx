import { useState } from 'react';
import { motion } from 'framer-motion';

function SkillCard({ skill, index }) {
  const [hovered, setHovered] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, x: -8 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay: 0.08 + index * 0.04, duration: 0.4 }}
      onHoverStart={() => setHovered(true)}
      onHoverEnd={() => setHovered(false)}
      className="cursor-default"
    >
      <div className="flex justify-between mb-1">
        <span className={`text-sm transition-colors ${hovered ? 'text-c' : 'text-b'}`}>
          {skill.icon && <span className="mr-1">{skill.icon}</span>}
          {skill.name}
        </span>
        <span className="text-sm font-bold" style={{ color: hovered ? 'var(--c-cyan)' : 'var(--c-heading)' }}>
          {skill.proficiency}%
        </span>
      </div>
      <div className="w-full h-1.5 bg-black/40 rounded-full overflow-hidden">
        <motion.div
          className="h-full rounded-full"
          initial={{ width: 0 }}
          animate={{
            width: `${skill.proficiency}%`,
            backgroundColor: hovered ? 'var(--c-cyan)' : 'var(--c-heading)',
          }}
          transition={{ duration: 0.6, delay: 0.15 + index * 0.04 }}
        />
      </div>
      {hovered && skill.description && (
        <motion.p
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: 'auto' }}
          className="text-d text-xs mt-1 leading-relaxed"
        >
          {skill.description}
        </motion.p>
      )}
    </motion.div>
  );
}

export default SkillCard;
