import Hero from './Hero';
import About from './About';
import Projects from './Projects';
import Skills from './Skills';
import Contact from './Contact';

function Home() {
  return (
    <>
      <Hero />
      <div className="h-16" />
      <About />
      <div className="h-16" />
      <Projects />
      <div className="h-16" />
      <Skills />
      <div className="h-16" />
      <Contact />
    </>
  );
}

export default Home;
