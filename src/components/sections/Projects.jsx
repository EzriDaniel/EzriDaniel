import { motion } from 'framer-motion';
import { projects } from '../../data/projects.js';

function Projects() {
  return (
    <motion.section
      id="projects"
      className="py-4"
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-80px' }}
      transition={{ duration: 0.5 }}
    >
      <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} className="text-center mb-10">
        <h2 className="text-3xl font-bold neon-text mb-3">My Projects</h2>
        <p className="text-b max-w-2xl mx-auto text-sm">
          A showcase of my technical and social impact projects.
        </p>
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {projects.map((project, index) => (
          <motion.div
            key={project.id}
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.08 + index * 0.07 }}
            className="glass-effect p-5 flex flex-col hover:border-c-h transition-colors duration-300"
          >
            <div className="flex items-start justify-between gap-2 mb-2">
              <h3 className="text-base font-bold text-h">{project.title}</h3>
              <span className="text-p text-[10px] px-2 py-0.5 rounded bg-[var(--c-primary-bg)] border border-c whitespace-nowrap">
                {project.category}
              </span>
            </div>
            <p className="text-b text-sm mb-4 leading-relaxed flex-1">{project.description}</p>
            <div className="mb-4 flex flex-wrap gap-1">
              {project.technologies.map((tech, i) => (
                <span key={i} className="bg-card text-m text-[11px] px-2 py-0.5 rounded border border-c">
                  {tech}
                </span>
              ))}
            </div>
            <div className="flex flex-wrap gap-2">
              {project.links.map((link, i) => (
                <a
                  key={i}
                  href={link.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-3 py-1 bg-input text-b text-xs rounded border border-c hover:bg-hover hover:text-h hover:border-c-h transition-all"
                >
                  {link.label}
                </a>
              ))}
            </div>
          </motion.div>
        ))}
      </div>
    </motion.section>
  );
}

export default Projects;
