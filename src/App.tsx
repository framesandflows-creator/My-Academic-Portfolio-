import { useEffect, useState, lazy, Suspense } from 'react';
import { motion, useScroll, useSpring } from 'framer-motion';
import { ArrowRight, Code, Terminal, Layout, Download, Mail, Cpu, Database, Cloud, PenTool, LayoutTemplate, Sparkles, MonitorSmartphone } from 'lucide-react';
import clsx from 'clsx';
import { twMerge } from 'tailwind-merge';
import Lenis from '@studio-freight/lenis';

const Aurora = lazy(() => import('./components/Aurora'));

function cn(...inputs: (string | undefined | null | false)[]) {
  return twMerge(clsx(inputs));
}

const navItems = [
  { name: 'About', href: '#about' },
  { name: 'Experience', href: '#experience' },
  { name: 'Skills', href: '#skills' },
  { name: 'Projects', href: '#projects' },
  { name: 'Leadership', href: '#leadership' },
  { name: 'Contact', href: '#contact' },
];

const roles = [
  "AI Engineer", "Full Stack Developer", "IBM Z Office Bearer", "UI/UX Designer", "Product Designer", 
  "Prompt Engineer", "Media Head", "Creative Director", "Community Leader"
];

const skills = [
  { category: 'Programming', items: ['Python', 'Java', 'C', 'JavaScript'], icon: Code },
  { category: 'Frontend', items: ['React', 'Next.js', 'Tailwind', 'HTML', 'CSS'], icon: Layout },
  { category: 'Backend', items: ['Node.js', 'Express', 'Firebase', 'Supabase'], icon: Database },
  { category: 'AI', items: ['Prompt Engineering', 'Machine Learning', 'Artificial Intelligence', 'Automation'], icon: Cpu },
  { category: 'Design', items: ['Figma', 'Canva', 'Adobe Suite', 'CapCut', 'Video Editing'], icon: PenTool },
  { category: 'Cloud', items: ['GitHub', 'Git', 'Vercel'], icon: Cloud },
  { category: 'Leadership', items: ['Communication', 'Problem Solving', 'Public Speaking', 'Team Management'], icon: Sparkles }
];

export default function App() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isHovering, setIsHovering] = useState(false);
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: 'vertical',
      gestureOrientation: 'vertical',
      smoothWheel: true,
      touchMultiplier: 2,
    });

    function raf(time: number) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }

    requestAnimationFrame(raf);

    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };
    
    // Add hover listeners to clickable elements
    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (target.tagName.toLowerCase() === 'a' || target.tagName.toLowerCase() === 'button' || target.closest('a') || target.closest('button')) {
        setIsHovering(true);
      } else {
        setIsHovering(false);
      }
    };

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mouseover', handleMouseOver);
    
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseover', handleMouseOver);
      lenis.destroy();
    };
  }, []);

  return (
    <div className="relative min-h-screen font-sans selection:bg-cyan selection:text-black">
      {/* Custom Cursor */}
      <motion.div 
        className={cn("custom-cursor hidden md:block", isHovering && "hover")}
        animate={{ x: mousePosition.x, y: mousePosition.y }}
        transition={{ type: "spring", stiffness: 500, damping: 28, mass: 0.5 }}
      />

      {/* Progress Bar */}
      <motion.div
        className="fixed top-0 left-0 right-0 h-1 bg-cyan origin-left z-50 shadow-[0_0_10px_rgba(0,240,255,0.5)]"
        style={{ scaleX }}
      />

      {/* Ambient Background */}
      <Suspense fallback={null}>
        <Aurora />
      </Suspense>
      <div className="fixed inset-0 z-[-1] pointer-events-none">
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] rounded-full bg-cyan/10 blur-[120px]" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] rounded-full bg-purple/10 blur-[120px]" />
      </div>

      {/* Navigation */}
      <header className="fixed top-0 left-0 right-0 z-40 px-6 py-4">
        <nav className="max-w-7xl mx-auto flex items-center justify-between">
          <motion.div 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="text-xl font-display font-bold tracking-tighter mix-blend-difference"
          >
            LIJO PAUL
          </motion.div>
          <motion.div 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
            className="hidden md:flex items-center gap-8 glass-panel px-6 py-3 rounded-full"
          >
            {navItems.map((item) => (
              <a 
                key={item.name} 
                href={item.href}
                className="text-sm font-medium text-white/60 hover:text-white transition-colors"
              >
                {item.name}
              </a>
            ))}
          </motion.div>
          <motion.button
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
            className="md:hidden text-white"
          >
            Menu
          </motion.button>
        </nav>
      </header>

      <main>
        {/* Hero Section */}
        <section className="relative min-h-screen flex items-center justify-center px-6 pt-20">
          <div className="max-w-5xl mx-auto w-full text-center space-y-8">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
              className="inline-flex items-center gap-2 glass-panel px-4 py-2 rounded-full text-sm font-medium text-cyan mb-8"
            >
              <Sparkles className="w-4 h-4" />
              <span>Creative Technologist & Builder</span>
            </motion.div>
            
            <h1 className="text-5xl md:text-8xl font-display font-bold tracking-tighter leading-tight">
              <motion.span 
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
                className="block text-white/50"
              >
                Hello. I'm
              </motion.span>
              <motion.span 
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
                className="block text-transparent bg-clip-text bg-gradient-to-r from-white via-white to-white/50 pb-2"
              >
                LIJO PAUL M E
              </motion.span>
            </h1>

            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
              className="text-xl md:text-2xl text-white/60 max-w-2xl mx-auto font-light leading-relaxed"
            >
              I build intelligent digital experiences where <span className="text-white">design</span>, <span className="text-white">engineering</span> and <span className="text-cyan">AI</span> work together.
            </motion.p>

            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 0.6, ease: [0.16, 1, 0.3, 1] }}
              className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-8"
            >
              <a href="#projects" className="w-full sm:w-auto px-8 py-4 rounded-full bg-white text-black font-semibold hover:scale-105 transition-transform flex items-center justify-center gap-2">
                View Projects <ArrowRight className="w-4 h-4" />
              </a>
              <a href="/assets/lijo-paul-resume.pdf" download className="w-full sm:w-auto px-8 py-4 rounded-full glass-panel hover:bg-white/10 transition-colors flex items-center justify-center gap-2">
                <Download className="w-4 h-4" /> Download Resume
              </a>
            </motion.div>
          </div>
          
          <motion.div 
             initial={{ opacity: 0 }}
             animate={{ opacity: 1 }}
             transition={{ duration: 1, delay: 1 }}
             className="absolute bottom-10 left-1/2 -translate-x-1/2 text-white/30 text-sm flex flex-col items-center gap-2"
          >
             <span>Scroll to explore</span>
             <motion.div 
               animate={{ y: [0, 8, 0] }} 
               transition={{ repeat: Infinity, duration: 2 }}
               className="w-[1px] h-12 bg-gradient-to-b from-white/30 to-transparent"
             />
          </motion.div>
        </section>

        {/* Roles Carousel */}
        <section className="py-24 overflow-hidden border-y border-white/5 bg-white/[0.02]">
          <div className="flex gap-8 whitespace-nowrap px-6">
            <motion.div
              animate={{ x: ["0%", "-50%"] }}
              transition={{ repeat: Infinity, ease: "linear", duration: 20 }}
              className="flex gap-8"
            >
              {[...roles, ...roles].map((role, i) => (
                <div key={i} className="text-4xl md:text-6xl font-display font-bold text-transparent bg-clip-text bg-gradient-to-b from-white/20 to-transparent italic">
                  {role}
                </div>
              ))}
            </motion.div>
          </div>
        </section>

        {/* About / Philosophy */}
        <section id="about" className="py-32 px-6">
          <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-16">
            <div>
              <h2 className="text-4xl md:text-5xl font-display font-bold mb-8">Not simply a developer.<br/><span className="text-white/40">I design complete ecosystems.</span></h2>
              <div className="space-y-6 text-lg text-white/60 font-light">
                <p>
                  My foundation is in programming, problem-solving, and machine learning concepts. At the same time, I've grown through environments that required communication, planning, and consistency, not just code.
                </p>
                <p>
                  I want to build systems that are practical, secure, and thoughtfully delivered, whether that means solving technical tasks, supporting a team, or growing into larger responsibilities.
                </p>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="glass-panel p-6 rounded-3xl aspect-square flex flex-col justify-end group hover:border-cyan/50 transition-colors">
                <Terminal className="w-8 h-8 mb-4 text-cyan" />
                <h3 className="text-xl font-bold mb-2 group-hover:text-cyan transition-colors">Engineering</h3>
                <p className="text-sm text-white/50">Building robust, scalable architectures.</p>
              </div>
              <div className="glass-panel p-6 rounded-3xl aspect-square flex flex-col justify-end group hover:border-purple/50 transition-colors translate-y-8">
                <LayoutTemplate className="w-8 h-8 mb-4 text-purple" />
                <h3 className="text-xl font-bold mb-2 group-hover:text-purple transition-colors">Design</h3>
                <p className="text-sm text-white/50">Crafting intuitive, human-centered interfaces.</p>
              </div>
              <div className="glass-panel p-6 rounded-3xl aspect-square flex flex-col justify-end group hover:border-blue-400/50 transition-colors">
                <Cpu className="w-8 h-8 mb-4 text-blue-400" />
                <h3 className="text-xl font-bold mb-2 group-hover:text-blue-400 transition-colors">AI & ML</h3>
                <p className="text-sm text-white/50">Integrating intelligent capabilities into products.</p>
              </div>
              <div className="glass-panel p-6 rounded-3xl aspect-square flex flex-col justify-end group hover:border-pink-400/50 transition-colors translate-y-8">
                <Sparkles className="w-8 h-8 mb-4 text-pink-400" />
                <h3 className="text-xl font-bold mb-2 group-hover:text-pink-400 transition-colors">Leadership</h3>
                <p className="text-sm text-white/50">Guiding teams to build with purpose.</p>
              </div>
            </div>
          </div>
        </section>

        {/* Skills Ecosystem */}
        <section id="skills" className="py-32 px-6 bg-gradient-to-b from-transparent to-white/[0.02]">
          <div className="max-w-7xl mx-auto">
            <div className="mb-16">
              <h2 className="text-4xl md:text-5xl font-display font-bold">Capabilities</h2>
              <p className="text-white/50 mt-4 text-lg">A focused mix of technical foundations, practical exposure, and growth.</p>
            </div>
            
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {skills.map((skillGroup, i) => (
                <motion.div 
                  key={skillGroup.category}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1, duration: 0.6 }}
                  className="glass-panel p-8 rounded-3xl group hover:bg-white/[0.05] transition-colors"
                >
                  <div className="flex items-center gap-4 mb-6">
                    <div className="p-3 bg-white/5 rounded-2xl group-hover:bg-cyan/10 group-hover:text-cyan transition-colors">
                      <skillGroup.icon className="w-6 h-6" />
                    </div>
                    <h3 className="text-xl font-bold">{skillGroup.category}</h3>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {skillGroup.items.map(item => (
                      <span key={item} className="px-3 py-1 bg-white/5 rounded-full text-sm text-white/70 hover:bg-white/10 transition-colors">
                        {item}
                      </span>
                    ))}
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Projects / Experience */}
        <section id="projects" className="py-32 px-6">
          <div className="max-w-7xl mx-auto">
            <div className="mb-16">
              <h2 className="text-4xl md:text-5xl font-display font-bold">Selected Work</h2>
              <p className="text-white/50 mt-4 text-lg">Every project should communicate craftsmanship.</p>
            </div>
            
            <div className="space-y-32">
              {[
                { name: "Charity Management System", desc: "A robust platform for managing charity operations, donations, and volunteer allocation. Built with modern web technologies.", tags: ["React", "Node.js", "MongoDB", "UI/UX"] },
                { name: "E-Book Reader Interface", desc: "An immersive, distraction-free reading experience designed for focus and typography excellence.", tags: ["Frontend", "Design", "Typography"] },
                { name: "Hackathon AI Agent Platform", desc: "A platform utilizing large language models to automate and assist in hackathon management and team coordination.", tags: ["AI", "Prompt Engineering", "Python"] }
              ].map((project, i) => (
                <motion.div 
                  key={project.name}
                  initial={{ opacity: 0, y: 40 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.8 }}
                  className="group relative"
                >
                  <div className="grid md:grid-cols-12 gap-8 items-center">
                    <div className={cn("md:col-span-5 space-y-6", i % 2 !== 0 && "md:order-2")}>
                      <div className="text-cyan font-mono text-sm tracking-widest uppercase">0{i+1} / Featured Project</div>
                      <h3 className="text-3xl md:text-4xl font-display font-bold group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-white group-hover:to-white/50 transition-all">{project.name}</h3>
                      <p className="text-white/60 text-lg leading-relaxed">{project.desc}</p>
                      <div className="flex flex-wrap gap-2">
                        {project.tags.map(tag => (
                          <span key={tag} className="text-sm font-medium text-white/40">{tag}</span>
                        ))}
                      </div>
                      <a href="#" className="inline-flex items-center gap-2 text-white hover:text-cyan transition-colors pt-4 font-medium">
                        View Case Study <ArrowRight className="w-4 h-4" />
                      </a>
                    </div>
                    <div className={cn("md:col-span-7", i % 2 !== 0 && "md:order-1")}>
                      <div className="aspect-[4/3] rounded-3xl glass-panel-heavy overflow-hidden relative group-hover:border-white/20 transition-colors">
                        <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                        {/* Placeholder for project image */}
                        <div className="w-full h-full bg-[#0a0a0a] flex items-center justify-center relative">
                            <MonitorSmartphone className="w-24 h-24 text-white/10" />
                            <div className="absolute bottom-0 w-full h-1/2 bg-gradient-to-t from-black/50 to-transparent" />
                        </div>
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Timeline */}
        <section className="py-32 px-6">
          <div className="max-w-3xl mx-auto">
            <div className="mb-16 text-center">
              <h2 className="text-4xl md:text-5xl font-display font-bold">Journey</h2>
              <p className="text-white/50 mt-4 text-lg">Milestones and growth.</p>
            </div>
            
            <div className="space-y-12 relative before:absolute before:inset-0 before:ml-5 before:-translate-x-px md:before:mx-auto md:before:translate-x-0 before:h-full before:w-0.5 before:bg-gradient-to-b before:from-transparent before:via-white/20 before:to-transparent">
              {[
                { year: "2024", title: "B.Tech CSE - AI & ML", location: "CHRIST University", desc: "Started journey in Artificial Intelligence and Machine Learning, focusing on foundational programming and problem-solving." },
                { year: "2024", title: "Media Head", location: "Association of Christian Christites", desc: "Led creative direction and media planning for large-scale university organizations." },
                { year: "2025", title: "Campus Mantri", location: "GeeksforGeeks", desc: "Fostered a community of developers, organizing technical events and peer education." },
                { year: "Present", title: "IBM Z Student Community", location: "Office Bearer", desc: "Building an active technical community by supporting events, encouraging student participation, and promoting enterprise computing.", highlight: true },
                { year: "Present", title: "Full Stack Momentum", location: "Continuous Learning", desc: "Expanding capabilities in React, Node.js, Next.js and AI Automation Workflows." }
              ].map((item, i) => (
                <motion.div 
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-100px" }}
                  transition={{ duration: 0.6 }}
                  className="relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group is-active"
                >
                  <div className={cn("flex items-center justify-center w-10 h-10 rounded-full border bg-[#050505] transition-colors shadow-[0_0_0_4px_#050505] shrink-0 md:order-1 md:group-odd:-translate-x-1/2 md:group-even:translate-x-1/2 z-10", item.highlight ? "border-blue-500 text-blue-500" : "border-white/20 group-hover:border-cyan group-hover:text-cyan")}>
                    <Sparkles className="w-4 h-4" />
                  </div>
                  <div className={cn("w-[calc(100%-4rem)] md:w-[calc(50%-2.5rem)] glass-panel p-6 rounded-2xl transition-colors", item.highlight ? "hover:bg-blue-500/5 hover:border-blue-500/30" : "group-hover:bg-white/[0.04]")}>
                    <div className={cn("font-mono text-sm mb-2", item.highlight ? "text-blue-400" : "text-cyan")}>{item.year}</div>
                    <h3 className="text-xl font-bold mb-1">{item.title}</h3>
                    <div className="text-white/40 text-sm mb-4">{item.location}</div>
                    <p className="text-white/60">{item.desc}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Leadership */}
        <section id="leadership" className="py-32 px-6 bg-white/[0.02] border-t border-white/5">
          <div className="max-w-7xl mx-auto">
            <div className="mb-16 text-center">
              <h2 className="text-4xl md:text-5xl font-display font-bold">Leadership Impact</h2>
              <p className="text-white/50 mt-4 text-lg max-w-2xl mx-auto">Building communities, advocating for technology, and leading with follow-through across multiple organizations.</p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {/* IBM Z Card */}
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="group relative lg:col-span-2 glass-panel p-8 md:p-10 rounded-[32px] overflow-hidden hover:border-blue-500/30 transition-all duration-500"
              >
                <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                <div className="absolute top-0 right-0 -mt-16 -mr-16 w-64 h-64 bg-blue-500/20 blur-[100px] rounded-full pointer-events-none group-hover:bg-blue-500/30 transition-colors duration-500" />
                
                <div className="relative z-10 flex flex-col h-full">
                  <div className="flex items-center gap-4 mb-6">
                    <div className="w-12 h-12 rounded-full border border-blue-500/20 bg-blue-500/10 flex items-center justify-center text-blue-400">
                      <Cloud className="w-6 h-6" />
                    </div>
                    <div>
                      <h3 className="text-2xl font-bold">IBM Z Student Community</h3>
                      <p className="text-blue-400 font-medium">Office Bearer</p>
                    </div>
                  </div>
                  
                  <p className="text-white/70 text-lg leading-relaxed mb-8">
                    Contributing to an active technical community by supporting events, encouraging student participation, promoting enterprise computing technologies, and fostering collaboration between students, industry, and academia.
                  </p>

                  <div className="flex flex-wrap gap-3 mt-auto">
                    {["Community Building", "Technical Events", "Student Engagement", "Technology Advocacy", "Event Coordination"].map(badge => (
                      <span key={badge} className="px-4 py-2 rounded-full border border-white/10 bg-white/5 text-sm font-medium text-white/80 group-hover:border-blue-500/20 group-hover:bg-blue-500/10 transition-colors">
                        {badge}
                      </span>
                    ))}
                  </div>
                </div>
              </motion.div>

              {/* GeeksforGeeks Card */}
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.1 }}
                className="group relative glass-panel p-8 rounded-[32px] overflow-hidden hover:border-green-500/30 transition-all duration-500 flex flex-col justify-between"
              >
                <div className="absolute top-0 right-0 -mt-8 -mr-8 w-40 h-40 bg-green-500/10 blur-[60px] rounded-full pointer-events-none group-hover:bg-green-500/20 transition-colors duration-500" />
                <div className="relative z-10">
                  <div className="w-10 h-10 rounded-full border border-green-500/20 bg-green-500/10 flex items-center justify-center text-green-400 mb-6">
                    <Code className="w-5 h-5" />
                  </div>
                  <h3 className="text-xl font-bold mb-1">GeeksforGeeks</h3>
                  <p className="text-green-400 font-medium text-sm mb-4">Campus Mantri</p>
                  <p className="text-white/60 text-sm leading-relaxed mb-6">
                    Building communities and organizing technical events to foster a culture of learning and innovation.
                  </p>
                </div>
                <div className="flex flex-wrap gap-2 relative z-10">
                  {["Peer Education", "Leadership"].map(badge => (
                    <span key={badge} className="px-3 py-1.5 rounded-full border border-white/10 bg-white/5 text-xs font-medium text-white/70">
                      {badge}
                    </span>
                  ))}
                </div>
              </motion.div>

              {/* Media Head Card */}
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.2 }}
                className="group relative lg:col-span-3 glass-panel p-8 md:p-10 rounded-[32px] overflow-hidden hover:border-purple-500/30 transition-all duration-500"
              >
                <div className="absolute bottom-0 left-1/4 w-[50%] h-32 bg-purple-500/10 blur-[80px] rounded-full pointer-events-none group-hover:bg-purple-500/20 transition-colors duration-500" />
                <div className="relative z-10 grid md:grid-cols-2 gap-8 items-center">
                  <div>
                    <div className="flex items-center gap-4 mb-6">
                      <div className="w-12 h-12 rounded-full border border-purple-500/20 bg-purple-500/10 flex items-center justify-center text-purple-400">
                        <PenTool className="w-6 h-6" />
                      </div>
                      <div>
                        <h3 className="text-2xl font-bold">University Media Head</h3>
                        <p className="text-purple-400 font-medium">ACC & CSA</p>
                      </div>
                    </div>
                    <p className="text-white/70 text-lg leading-relaxed mb-6">
                      Directing creative media, video editing, and digital presence for large scale university organizations. Mentoring teams and ensuring high-quality event coverage and advocacy content.
                    </p>
                  </div>
                  <div className="flex flex-wrap justify-start md:justify-end gap-3">
                    {["Creative Direction", "Video Editing", "Content Strategy", "Team Management", "Event Coverage"].map(badge => (
                      <span key={badge} className="px-4 py-2 rounded-full border border-white/10 bg-white/5 text-sm font-medium text-white/80 group-hover:border-purple-500/20 group-hover:bg-purple-500/10 transition-colors">
                        {badge}
                      </span>
                    ))}
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Contact */}
        <section id="contact" className="py-32 px-6">
          <div className="max-w-4xl mx-auto">
            <div className="glass-panel-heavy p-10 md:p-16 rounded-[40px] text-center">
              <h2 className="text-4xl md:text-5xl font-display font-bold mb-4">Let's build together.</h2>
              <p className="text-white/50 mb-12 text-lg max-w-xl mx-auto">Open for roles in software engineering, AI, and product design. Let's discuss how we can create impactful digital ecosystems.</p>
              
              <div className="grid sm:grid-cols-3 gap-4 max-w-3xl mx-auto">
                <a href="mailto:m.e.lijopaul@gmail.com" className="flex flex-col items-center gap-4 p-6 rounded-3xl bg-white/5 hover:bg-white/10 hover:-translate-y-1 transition-all">
                  <div className="w-14 h-14 rounded-full bg-white/10 flex items-center justify-center group-hover:scale-110 transition-transform">
                    <Mail className="w-6 h-6" />
                  </div>
                  <div>
                    <div className="font-medium">Email</div>
                    <div className="text-xs text-white/50 mt-1">m.e.lijopaul@gmail.com</div>
                  </div>
                </a>
                <a href="https://www.linkedin.com/in/lijo-paul-a82a79315/" target="_blank" rel="noreferrer" className="flex flex-col items-center gap-4 p-6 rounded-3xl bg-white/5 hover:bg-white/10 hover:-translate-y-1 transition-all">
                  <div className="w-14 h-14 rounded-full bg-white/10 flex items-center justify-center group-hover:scale-110 transition-transform">
                    <Code className="w-6 h-6" />
                  </div>
                  <div>
                    <div className="font-medium">LinkedIn</div>
                    <div className="text-xs text-white/50 mt-1">Connect with me</div>
                  </div>
                </a>
                <a href="#" className="flex flex-col items-center gap-4 p-6 rounded-3xl bg-white/5 hover:bg-white/10 hover:-translate-y-1 transition-all">
                  <div className="w-14 h-14 rounded-full bg-white/10 flex items-center justify-center group-hover:scale-110 transition-transform">
                    <Terminal className="w-6 h-6" />
                  </div>
                  <div>
                    <div className="font-medium">GitHub</div>
                    <div className="text-xs text-white/50 mt-1">View repositories</div>
                  </div>
                </a>
              </div>
            </div>
          </div>
        </section>
      </main>

      <footer className="py-8 px-6 border-t border-white/5 text-center text-white/30 text-sm">
        <p>© {new Date().getFullYear()} Lijo Paul M E. Crafted with intention.</p>
      </footer>
    </div>
  );
}
