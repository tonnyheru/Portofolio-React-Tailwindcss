import { useState, useEffect, useRef, useCallback } from "react";
import emailjs from "@emailjs/browser";
import HeroSection from "./HeroSection";
import ProjectsSection from "./ProjectsSection";
import ResumeSection from "./ResumeSection";
import AboutSection from "./AboutSection";
import ContactSection from "./ContactSection";
import Navbar from "./Navbar";

/* ─────────────────────────────────────────────
   DATA
───────────────────────────────────────────── */
const SKILLS_GROUPS = [
  {
    label: "Languages",
    icon: "M10 2L12.4 7.5H18L13.3 11.1L15.1 17L10 13.4L4.9 17L6.7 11.1L2 7.5H7.6L10 2Z",
    tools: [
      { name: "HTML", img: "https://cdn.simpleicons.org/html5/E34F26" },
      { name: "CSS", img: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/css3/css3-original.svg" },
      { name: "JavaScript", img: "https://cdn.simpleicons.org/javascript/F7DF1E" },
      { name: "PHP", img: "https://cdn.simpleicons.org/php/777BB4" },
      { name: "Python", img: "https://cdn.simpleicons.org/python/3776AB" },
      { name: "Java", img: "https://cdn.simpleicons.org/openjdk/ED8B00" },
      { name: "C++", img: "https://cdn.simpleicons.org/cplusplus/00599C" },
      { name: "Kotlin", img: "https://cdn.simpleicons.org/kotlin/7F52FF" },
    ],
  },
  {
    label: "Frontend & Mobile",
    tools: [
      { name: "Bootstrap", img: "https://cdn.simpleicons.org/bootstrap/7952B3" },
      { name: "Laravel", img: "https://cdn.simpleicons.org/laravel/FF2D20" },
      { name: "Flutter", img: "https://cdn.simpleicons.org/flutter/02569B" },
    ],
  },
  {
    label: "Database",
    tools: [
      { name: "MySQL", img: "https://cdn.simpleicons.org/mysql/4479A1" },
      { name: "PostgreSQL", img: "https://cdn.simpleicons.org/postgresql/4169E1" },
      { name: "MariaDB", img: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mariadb/mariadb-original.svg" },
      { name: "MongoDB", img: "https://cdn.simpleicons.org/mongodb/47A248" },
      { name: "Firebase", img: "https://cdn.simpleicons.org/firebase/DD2C00" },
    ],
  },
  {
    label: "Cloud & DevOps",
    tools: [
      { name: "Google Cloud", img: "https://cdn.simpleicons.org/googlecloud/4285F4" },
      { name: "Azure", img: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/azure/azure-original.svg" },
      { name: "Git", img: "https://cdn.simpleicons.org/git/F05032" },
      { name: "GitHub", img: "https://cdn.simpleicons.org/github/EEEEEE" },
    ],
  },
  {
    label: "API & Testing",
    tools: [
      { name: "Postman", img: "https://cdn.simpleicons.org/postman/FF6C37" },
      { name: "Insomnia", img: "https://cdn.simpleicons.org/insomnia/4000BF" },
    ],
  },
  {
    label: "AI & Data",
    tools: [
      { name: "Pandas", img: "https://cdn.simpleicons.org/pandas/E70488" },
      { name: "NumPy", img: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/numpy/numpy-original.svg" },
      { name: "OpenAI", img: "https://upload.wikimedia.org/wikipedia/commons/0/04/ChatGPT_logo.svg" },
      { name: "Gemini", img: "https://cdn.simpleicons.org/googlegemini/8E75B2" },
      { name: "Claude", img: "https://cdn.simpleicons.org/anthropic/D4A27F" },
    ],
  },
  {
    label: "Design",
    tools: [
      { name: "Figma", img: "https://cdn.simpleicons.org/figma/F24E1E" },
      { name: "Canva", img: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/canva/canva-original.svg" },
    ],
  },
];

const ALL_MARQUEE_TOOLS = [
  { name: "HTML", img: "https://cdn.simpleicons.org/html5/E34F26" },
  { name: "CSS", img: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/css3/css3-original.svg" },
  { name: "JavaScript", img: "https://cdn.simpleicons.org/javascript/F7DF1E" },
  { name: "PHP", img: "https://cdn.simpleicons.org/php/777BB4" },
  { name: "Python", img: "https://cdn.simpleicons.org/python/3776AB" },
  { name: "Java", img: "https://cdn.simpleicons.org/openjdk/ED8B00" },
  { name: "C++", img: "https://cdn.simpleicons.org/cplusplus/00599C" },
  { name: "Kotlin", img: "https://cdn.simpleicons.org/kotlin/7F52FF" },
  { name: "Bootstrap", img: "https://cdn.simpleicons.org/bootstrap/7952B3" },
  { name: "Laravel", img: "https://cdn.simpleicons.org/laravel/FF2D20" },
  { name: "Flutter", img: "https://cdn.simpleicons.org/flutter/02569B" },
  { name: "MySQL", img: "https://cdn.simpleicons.org/mysql/4479A1" },
  { name: "PostgreSQL", img: "https://cdn.simpleicons.org/postgresql/4169E1" },
  { name: "MongoDB", img: "https://cdn.simpleicons.org/mongodb/47A248" },
  { name: "Firebase", img: "https://cdn.simpleicons.org/firebase/DD2C00" },
  { name: "Google Cloud", img: "https://cdn.simpleicons.org/googlecloud/4285F4" },
  { name: "Git", img: "https://cdn.simpleicons.org/git/F05032" },
  { name: "Postman", img: "https://cdn.simpleicons.org/postman/FF6C37" },
  { name: "Figma", img: "https://cdn.simpleicons.org/figma/F24E1E" },
  { name: "OpenAI", img: "https://upload.wikimedia.org/wikipedia/commons/0/04/ChatGPT_logo.svg" },
  { name: "Gemini", img: "https://cdn.simpleicons.org/googlegemini/8E75B2" },
  { name: "Claude", img: "https://cdn.simpleicons.org/anthropic/D4A27F" },
];

const WORK_ITEMS = [
  { icon: "📋", label: "Requirement gathering" },
  { icon: "🗄️", label: "Database & arsitektur sistem" },
  { icon: "💻", label: "Pengembangan FE/BE" },
  { icon: "🔌", label: "Integrasi RESTful API" },
  { icon: "🚀", label: "Deployment ke production" },
  { icon: "🐛", label: "Maintenance & bug fixing" },
];

const TECH_TAGS = ["PHP", "Laravel", "MySQL", "RESTful API", "JavaScript", "HTML/CSS", "Git"];

const INITIAL_MESSAGES = [
  { id: 1, sender: "Seli Fitri", initial: "S", color: "#7c3aed", text: "Halo, portofolionya keren banget!", time: "09:41" },
  { id: 2, sender: "Wahyu Candra", initial: "W", color: "#0891b2", text: "Layung Peradilan-nya mantap euy", time: "09:43" },
  { id: 3, sender: "Ekatama Ilham", initial: "E", color: "#059669", text: "Sukses terus Tonny!", time: "09:45" },
];

const NAV_LINKS = ["home", "about", "skills", "featured", "resume", "contact"];

/* ─────────────────────────────────────────────
   TYPED TEXT HOOK
───────────────────────────────────────────── */
function useTyped(strings, speed = 90, backSpeed = 60, backDelay = 2000) {
  const [display, setDisplay] = useState("");
  const [idx, setIdx] = useState(0);
  const [charIdx, setCharIdx] = useState(0);
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    const current = strings[idx];
    let timeout;
    if (!deleting) {
      if (charIdx < current.length) {
        timeout = setTimeout(() => setCharIdx((c) => c + 1), speed);
      } else {
        timeout = setTimeout(() => setDeleting(true), backDelay);
      }
    } else {
      if (charIdx > 0) {
        timeout = setTimeout(() => setCharIdx((c) => c - 1), backSpeed);
      } else {
        setDeleting(false);
        setIdx((i) => (i + 1) % strings.length);
      }
    }
    setDisplay(current.slice(0, charIdx));
    return () => clearTimeout(timeout);
  }, [charIdx, deleting, idx, strings, speed, backSpeed, backDelay]);

  return display;
}

/* ─────────────────────────────────────────────
   INTERSECTION HOOK
───────────────────────────────────────────── */
function useInView(threshold = 0.15) {
  const ref = useRef(null);
  const [inView, setInView] = useState(false);
  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) setInView(true); }, { threshold });
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, [threshold]);
  return [ref, inView];
}

/* ─────────────────────────────────────────────
   LOADER — Cinematic Intro
───────────────────────────────────────────── */
function Loader({ onDone }) {
  const [count, setCount]   = useState(0);
  const [phase, setPhase]   = useState(0); // 0=counting, 1=reveal, 2=exit
  const canvasRef           = useRef(null);

  /* particle canvas */
  useEffect(() => {
    const c = canvasRef.current;
    if (!c) return;
    const ctx = c.getContext("2d");
    c.width  = window.innerWidth;
    c.height = window.innerHeight;

    const pts = Array.from({ length: 60 }, () => ({
      x: Math.random() * c.width,
      y: Math.random() * c.height,
      r: Math.random() * 1.5 + 0.3,
      vx: (Math.random() - 0.5) * 0.4,
      vy: (Math.random() - 0.5) * 0.4,
      a: Math.random() * 0.4 + 0.1,
    }));

    let raf;
    const draw = () => {
      ctx.clearRect(0, 0, c.width, c.height);
      for (const p of pts) {
        p.x += p.vx; p.y += p.vy;
        if (p.x < 0) p.x = c.width;
        if (p.x > c.width) p.x = 0;
        if (p.y < 0) p.y = c.height;
        if (p.y > c.height) p.y = 0;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(220,20,60,${p.a})`;
        ctx.fill();
      }
      raf = requestAnimationFrame(draw);
    };
    draw();
    return () => cancelAnimationFrame(raf);
  }, []);

  /* counter */
  useEffect(() => {
    const t = setInterval(() => {
      setCount(c => {
        if (c >= 100) {
          clearInterval(t);
          setTimeout(() => setPhase(1), 300);
          setTimeout(() => setPhase(2), 1100);
          setTimeout(() => onDone(), 1800);
          return 100;
        }
        return c + 1;
      });
    }, 16);
    return () => clearInterval(t);
  }, [onDone]);

  return (
    <div style={{
      position: "fixed", inset: 0, zIndex: 99999,
      background: "#04040a",
      display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center",
      overflow: "hidden",
      opacity: phase === 2 ? 0 : 1,
      transform: phase === 2 ? "scale(1.04)" : "scale(1)",
      transition: phase === 2 ? "opacity 0.7s ease, transform 0.7s ease" : "none",
    }}>
      <style>{`
        @keyframes loaderFadeUp { from{opacity:0;transform:translateY(16px)} to{opacity:1;transform:translateY(0)} }
        @keyframes loaderShimmer { 0%{background-position:0% 50%} 100%{background-position:300% 50%} }
        @keyframes scanLine { 0%{transform:translateY(-100%)} 100%{transform:translateY(100vh)} }
        @keyframes pulse { 0%,100%{opacity:0.4} 50%{opacity:1} }
        @keyframes revealScale { from{opacity:0;transform:scale(0.92)} to{opacity:1;transform:scale(1)} }
        .loader-name { animation: loaderFadeUp 0.6s ease 0.2s both; }
        .loader-counter { animation: loaderFadeUp 0.6s ease 0.4s both; }
        .loader-bar { animation: loaderFadeUp 0.6s ease 0.6s both; }
        .loader-sub { animation: loaderFadeUp 0.6s ease 0.8s both; }
        .loader-reveal { animation: revealScale 0.5s ease both; }
      `}</style>

      {/* Particle canvas */}
      <canvas ref={canvasRef} style={{ position:"absolute", inset:0, width:"100%", height:"100%", pointerEvents:"none" }} />

      {/* Scan line effect */}
      <div style={{
        position: "absolute", left: 0, right: 0, height: 2,
        background: "linear-gradient(to right, transparent, rgba(220,20,60,0.4), transparent)",
        animation: "scanLine 3s linear infinite",
        pointerEvents: "none",
      }} />

      {/* Grid overlay */}
      <div style={{
        position: "absolute", inset: 0,
        backgroundImage: "linear-gradient(rgba(220,20,60,0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(220,20,60,0.03) 1px, transparent 1px)",
        backgroundSize: "60px 60px",
        pointerEvents: "none",
      }} />

      {/* Corner accents */}
      {[
        { top:24, left:24, borderTop:"1.5px solid rgba(220,20,60,0.5)", borderLeft:"1.5px solid rgba(220,20,60,0.5)" },
        { top:24, right:24, borderTop:"1.5px solid rgba(220,20,60,0.5)", borderRight:"1.5px solid rgba(220,20,60,0.5)" },
        { bottom:24, left:24, borderBottom:"1.5px solid rgba(220,20,60,0.5)", borderLeft:"1.5px solid rgba(220,20,60,0.5)" },
        { bottom:24, right:24, borderBottom:"1.5px solid rgba(220,20,60,0.5)", borderRight:"1.5px solid rgba(220,20,60,0.5)" },
      ].map((s, i) => (
        <div key={i} style={{ position:"absolute", width:28, height:28, ...s, animation:`loaderFadeUp 0.5s ease ${i*0.08}s both` }} />
      ))}

      {/* Main content */}
      <div style={{ position:"relative", zIndex:2, display:"flex", flexDirection:"column", alignItems:"center", gap:20 }}>

        {/* Logo / nama */}
        <div className="loader-name" style={{ textAlign:"center" }}>
          <p style={{ fontSize:11, letterSpacing:"0.35em", textTransform:"uppercase", color:"rgba(220,20,60,0.7)", marginBottom:10, fontFamily:"'Poppins',sans-serif" }}>
            Welcome to
          </p>
          <h1 style={{
            fontSize:"clamp(28px,5vw,52px)", fontWeight:700, lineHeight:1.1,
            fontFamily:"'Ubuntu',sans-serif",
            background:"linear-gradient(to right, #ffffff, #f4d0d7, #ffffff, #f4d0d7, #ffffff)",
            backgroundSize:"300% auto", WebkitBackgroundClip:"text", WebkitTextFillColor:"transparent",
            backgroundClip:"text", animation:"loaderShimmer 3s linear infinite",
          }}>
            Porto<span style={{ WebkitTextFillColor:"crimson" }}>folio</span>
          </h1>
        </div>

        {/* Divider */}
        <div style={{ width:1, height:40, background:"linear-gradient(to bottom, transparent, rgba(220,20,60,0.5), transparent)", animation:"pulse 2s ease infinite" }} />

        {/* Counter */}
        <div className="loader-counter" style={{ position:"relative" }}>
          <div style={{
            fontSize:"clamp(64px,12vw,100px)", fontWeight:700, lineHeight:1,
            fontFamily:"'Ubuntu',sans-serif",
            background:"linear-gradient(135deg, white 0%, crimson 60%, white 100%)",
            backgroundSize:"200% auto", WebkitBackgroundClip:"text", WebkitTextFillColor:"transparent",
            backgroundClip:"text", animation:"loaderShimmer 1.5s linear infinite",
          }}>
            {String(count).padStart(2,"0")}
            <span style={{ fontSize:"30%", WebkitTextFillColor:"rgba(220,20,60,0.6)", fontWeight:400 }}>%</span>
          </div>
          {/* Glow behind number */}
          <div style={{
            position:"absolute", inset:-20, borderRadius:"50%",
            background:"radial-gradient(circle, rgba(220,20,60,0.15) 0%, transparent 65%)",
            filter:"blur(20px)", pointerEvents:"none",
          }} />
        </div>

        {/* Progress bar */}
        <div className="loader-bar" style={{ width:"min(280px,70vw)" }}>
          <div style={{ height:2, background:"rgba(255,255,255,0.08)", borderRadius:99, overflow:"hidden", marginBottom:8 }}>
            <div style={{
              height:"100%", borderRadius:99,
              width:`${count}%`,
              background:"linear-gradient(to right, #8b0000, crimson, #ff6b6b)",
              boxShadow:"0 0 12px rgba(220,20,60,0.8)",
              transition:"width 16ms linear",
            }} />
          </div>
          <div style={{ display:"flex", justifyContent:"space-between" }}>
            <span style={{ fontSize:9, letterSpacing:"0.2em", color:"rgba(255,255,255,0.2)", textTransform:"uppercase" }}>Loading</span>
            <span style={{ fontSize:9, letterSpacing:"0.2em", color:"rgba(220,20,60,0.5)", textTransform:"uppercase" }}>
              {count < 30 ? "Initializing..." : count < 60 ? "Loading assets..." : count < 90 ? "Almost there..." : "Ready!"}
            </span>
          </div>
        </div>

        {/* Sub text */}
        <p className="loader-sub" style={{ fontSize:10, letterSpacing:"0.25em", color:"rgba(255,255,255,0.18)", textTransform:"uppercase", fontFamily:"'Poppins',sans-serif" }}>
          Full Stack Developer
        </p>
      </div>

      {/* Reveal overlay — white flash on exit */}
      {phase >= 1 && (
        <div className="loader-reveal" style={{
          position:"absolute", inset:0,
          background:"linear-gradient(135deg, rgba(220,20,60,0.15), rgba(0,0,0,0.95))",
          zIndex:3,
        }} />
      )}
    </div>
  );
}

/* ─────────────────────────────────────────────
   NAVBAR → diganti dengan Navbar.jsx
───────────────────────────────────────────── */

/* ─────────────────────────────────────────────
   HOME SECTION → diganti dengan HeroSection
   (import di atas: import HeroSection from "./HeroSection")
───────────────────────────────────────────── */

/* ─────────────────────────────────────────────
   ABOUT SECTION → diganti dengan AboutSection.jsx
───────────────────────────────────────────── */

/* ─────────────────────────────────────────────
   SKILLS SECTION
───────────────────────────────────────────── */
function SkillsSection() {
  const [ref, inView] = useInView();

  return (
    <section id="skills" className="py-24 bg-[#111] text-white font-['Poppins',sans-serif] relative overflow-hidden">
      {/* bg glows */}
      <div className="absolute -top-48 -right-48 w-[600px] h-[600px] rounded-full pointer-events-none"
        style={{ background: "radial-gradient(circle, rgba(220,20,60,0.07) 0%, transparent 65%)" }} />
      <div className="absolute -bottom-36 -left-36 w-[500px] h-[500px] rounded-full pointer-events-none"
        style={{ background: "radial-gradient(circle, rgba(220,20,60,0.05) 0%, transparent 65%)" }} />

      <div ref={ref} className="relative z-10 max-w-[1300px] mx-auto px-5 sm:px-20">
        <h2 className="text-center text-crimson text-4xl sm:text-5xl font-semibold mb-2 font-['Ubuntu',sans-serif]">Skills &amp; Tools</h2>
        <p className="text-center text-white/30 text-sm mb-12 tracking-widest uppercase">Teknologi yang saya gunakan</p>

        {/* Intro bar */}
        <div className={`flex flex-col lg:flex-row items-start justify-between gap-10 mb-16 transition-all duration-700 ${inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}`}>
          <div className="flex-1 min-w-0">
            <div className="inline-flex items-center gap-2.5 bg-[rgba(220,20,60,0.1)] border border-[rgba(220,20,60,0.3)] text-white/90 text-sm font-semibold px-4 py-1.5 rounded-full mb-4">
              <span className="w-2 h-2 rounded-full bg-crimson shadow-[0_0_8px_crimson] animate-pulse" />
              Full Stack Developer
            </div>
            <p className="text-white/55 leading-7 mb-7 text-justify text-sm">
              Fokus saya adalah membangun aplikasi web yang scalable dan mudah dipelihara.
              Saya dapat mengerjakan end-to-end development: requirement gathering, desain database,
              pengembangan front-end/back-end, integrasi RESTful API, deployment, serta maintenance.
            </p>
            <a href="https://github.com/tonnyheru" target="_blank" rel="noopener noreferrer"
              className="inline-flex items-center gap-2.5 bg-[#0a0a0a] border border-white/15 text-white px-6 py-3 rounded-full text-sm font-medium transition-all duration-300 hover:border-crimson hover:-translate-y-0.5 hover:shadow-[0_8px_24px_rgba(220,20,60,0.25)] relative overflow-hidden group">
              <img src="https://cdn.simpleicons.org/github/ffffff" alt="GitHub" className="w-5 h-5 relative z-10" />
              <span className="relative z-10">Lihat GitHub Saya</span>
              <svg className="w-4 h-4 relative z-10 transition-transform duration-300 group-hover:translate-x-1" viewBox="0 0 16 16" fill="none">
                <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </a>
          </div>

          <div className="flex flex-row flex-wrap lg:flex-col gap-3 w-full lg:w-auto lg:min-w-[160px]">
            {[["30+", "Technologies"], ["8+", "Languages"], ["1+", "Years Coding"]].map(([num, label]) => (
              <div key={label}
                className="bg-[#0d0d0d] border border-white/[0.07] rounded-2xl px-5 py-4 flex flex-col gap-1 relative overflow-hidden transition-all duration-250 hover:border-[rgba(220,20,60,0.35)] hover:translate-x-1 flex-1 lg:flex-none"
                style={{ borderLeft: "3px solid crimson", borderRadius: "14px", minWidth: 0 }}>
                <span className="text-3xl font-bold text-white leading-none">
                  {num.replace("+", "")}<span className="text-xl text-crimson">+</span>
                </span>
                <span className="text-[0.68rem] text-white/40 uppercase tracking-widest font-medium">{label}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Divider */}
        <div className="flex flex-wrap items-center gap-2 mb-9 px-2">
          <div className="flex-1 h-px" style={{ background: "linear-gradient(to right, transparent, rgba(255,255,255,0.08), transparent)", minWidth: 40 }} />
          <span className="text-[0.7rem] font-bold tracking-[0.14em] uppercase text-white/30 text-center px-2">
            Bahasa pemrograman dan teknologi yang saya gunakan
          </span>
          <div className="flex-1 h-px" style={{ background: "linear-gradient(to right, transparent, rgba(255,255,255,0.08), transparent)", minWidth: 40 }} />
        </div>

        {/* Tool groups grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-14">
          {SKILLS_GROUPS.map((group) => (
            <div key={group.label}
              className="bg-[#0d0d0d] border border-white/[0.07] rounded-[18px] p-6 transition-all duration-300 hover:border-[rgba(220,20,60,0.28)] hover:-translate-y-1 hover:shadow-[0_16px_48px_rgba(220,20,60,0.07)] group">
              <div className="flex items-center gap-2.5 mb-4 pb-3.5 border-b border-white/[0.05]">
                <svg className="w-4 h-4 flex-shrink-0" viewBox="0 0 18 18" fill="none">
                  <polyline points="5,3 1,9 5,15" stroke="crimson" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
                  <polyline points="13,3 17,9 13,15" stroke="crimson" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
                <h3 className="text-[0.75rem] font-bold tracking-[0.14em] uppercase text-crimson">{group.label}</h3>
              </div>
              <div className="flex flex-wrap gap-2">
                {group.tools.map((tool) => (
                  <div key={tool.name}
                    className="flex items-center gap-2 bg-[#141414] border border-white/[0.07] rounded-xl px-3 py-1.5 transition-all duration-200 hover:border-[rgba(220,20,60,0.4)] hover:bg-[#1a1a1a] hover:-translate-y-0.5 hover:shadow-[0_4px_14px_rgba(220,20,60,0.1)] cursor-default group/tool">
                    <img src={tool.img} alt={tool.name} className="w-5 h-5 object-contain flex-shrink-0 transition-transform duration-200 group-hover/tool:scale-110 group-hover/tool:-rotate-3" />
                    <span className="text-[0.78rem] font-medium text-white/65 whitespace-nowrap transition-colors duration-200 group-hover/tool:text-white">{tool.name}</span>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Marquee */}
        <p className="text-center text-[0.68rem] font-bold tracking-[0.18em] uppercase text-white/20 mb-5">Semua teknologi yang saya gunakan</p>
        <div className="overflow-hidden" style={{ maskImage: "linear-gradient(to right, transparent, black 6%, black 94%, transparent)" }}>
          <div className="flex w-max gap-5 items-center py-2" style={{ animation: "marquee 40s linear infinite" }}>
            {[...ALL_MARQUEE_TOOLS, ...ALL_MARQUEE_TOOLS].map((t, i) => (
              <img key={i} src={t.img} title={t.name} alt={t.name}
                className="w-8 h-8 object-contain opacity-55 hover:opacity-100 hover:scale-125 transition-all duration-200 flex-shrink-0" />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

/* ─────────────────────────────────────────────
   FEATURED PROJECT → diganti dengan ProjectsSection.jsx
───────────────────────────────────────────── */



/* ─────────────────────────────────────────────
   FEATURED PROJECT → diganti dengan ProjectsSection.jsx
───────────────────────────────────────────── */

/* ─────────────────────────────────────────────
   CONTACT SECTION → diganti dengan ContactSection.jsx
   ───────────────────────────────────────────── */
/* firebase & emailjs dipindah ke ContactSection.jsx */

/* ─────────────────────────────────────────────
   CONTACT SECTION → diganti dengan ContactSection.jsx
───────────────────────────────────────────── */

/* ─────────────────────────────────────────────
   FOOTER
───────────────────────────────────────────── */
function Footer() {
  return (
    <footer style={{ background:"#060608", borderTop:"1px solid rgba(255,255,255,0.06)", padding:"20px 40px", fontFamily:"'Poppins',sans-serif" }}>
      <style>{`
        .footer-wrap { display:grid; grid-template-columns:1fr auto 1fr; align-items:center; gap:12px; }
        @media(max-width:600px){
          .footer-wrap { grid-template-columns:1fr !important; text-align:center; gap:8px; }
          .footer-logo { text-align:center; }
          .footer-copy { text-align:center; }
        }
      `}</style>
      <div className="footer-wrap">
        <span className="footer-logo" style={{ fontSize:20, fontWeight:700, color:"white", fontFamily:"'Ubuntu',sans-serif" }}>
          Porto<span style={{ color:"crimson" }}>folio</span>
        </span>
        <p className="footer-copy" style={{ fontSize:13, color:"rgba(255,255,255,0.25)", margin:0, textAlign:"center", whiteSpace:"nowrap" }}>
          © 2026 <span style={{ color:"rgba(255,255,255,0.4)", fontWeight:600 }}>M Tonny Heru Susanto</span>. All rights reserved.
        </p>
        <span />
      </div>
    </footer>
  );
}

/* ─────────────────────────────────────────────
   SECTION TITLE
───────────────────────────────────────────── */
function SectionTitle({ title, sub, light, dark }) {
  return (
    <div className="text-center mb-14 relative">
      <h2 className={`text-4xl sm:text-5xl font-semibold font-['Ubuntu',sans-serif] pb-5 ${dark ? "text-crimson" : "text-gray-900"}`}>
        {title}
      </h2>
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-44 h-0.5 bg-black" />
      {sub && (
        <p className="mt-3 text-sm text-white/30 tracking-widest uppercase font-['Poppins',sans-serif]">
          {sub}
        </p>
      )}
    </div>
  );
}

/* ─────────────────────────────────────────────
   CHAT NOTIFICATION
───────────────────────────────────────────── */
function ChatNotification({ messages }) {
  const [notif, setNotif] = useState(null);
  const prevCountRef = useRef(0);

  useEffect(() => {
    if (messages.length > prevCountRef.current && prevCountRef.current !== 0) {
      const latest = messages[messages.length - 1];
      setNotif(latest);
      const timer = setTimeout(() => setNotif(null), 4000);
      return () => clearTimeout(timer);
    }
    prevCountRef.current = messages.length;
  }, [messages]);

  if (!notif) return null;

  return (
    <div
      className="fixed top-20 right-5 z-[99999] bg-[#1a1d27] border border-[#2a2d3a] rounded-xl px-4 py-3 flex items-center gap-3 shadow-xl transition-all duration-300"
      style={{ animation: "fadeUp 0.3s ease forwards" }}
    >
      <div className="w-8 h-8 rounded-full flex-shrink-0 flex items-center justify-center text-sm font-semibold text-white"
        style={{ background: notif.color }}>
        {notif.initial}
      </div>
      <div>
        <p className="text-[11px] text-white/50 mb-0.5">{notif.sender} mengirim pesan</p>
        <p className="text-[13px] text-white font-medium">{notif.text}</p>
      </div>
      <span className="text-crimson text-lg">💬</span>
    </div>
  );
}

/* ─────────────────────────────────────────────
   FLOATING SOCIAL
───────────────────────────────────────────── */
function FloatingSocial() {
  const [show, setShow] = useState(false);

  useEffect(() => {
    const h = () => setShow(window.scrollY > 300);
    window.addEventListener("scroll", h);
    return () => window.removeEventListener("scroll", h);
  }, []);

  const socials = [
    { href: "https://github.com/tonnyheru", img: "https://cdn.simpleicons.org/github/ffffff", label: "GitHub", external: true },
    { href: "https://instagram.com/tonnyheru", img: "https://cdn.simpleicons.org/instagram/ffffff", label: "Instagram", external: true },
    { href: "https://linkedin.com/in/tonnyheru", img: "https://cdn.jsdelivr.net/npm/simple-icons@v11/icons/linkedin.svg", label: "LinkedIn", external: true },
    { href: "contact", img: "https://cdn.simpleicons.org/gmail/ffffff", label: "Email", external: false },
  ];

  const handleClick = (s) => {
    if (!s.external) {
      const el = document.getElementById(s.href);
      if (el) {
        const nav = document.querySelector("nav");
        const offset = el.getBoundingClientRect().top + window.scrollY - (nav?.offsetHeight ?? 70);
        window.scrollTo({ top: offset, behavior: "smooth" });
      }
    }
  };

  return (
    <div
      className="fixed left-5 bottom-7 z-[9999] flex flex-col gap-2.5 transition-all duration-500"
      style={{ opacity: show ? 1 : 0, transform: show ? "translateY(0)" : "translateY(20px)", pointerEvents: show ? "auto" : "none" }}
    >
      {socials.map((s) =>
        s.external ? (
          <a key={s.label} href={s.href} target="_blank" rel="noopener noreferrer" title={s.label}
            className="w-10 h-10 rounded-xl bg-[#1a1a1a] border border-white/10 flex items-center justify-center transition-all duration-300 hover:border-crimson hover:bg-crimson hover:-translate-y-1">
            <img src={s.img} alt={s.label} className="w-5 h-5 object-contain"
              style={{ filter: s.label === "LinkedIn" ? "brightness(0) invert(1)" : "none" }} />
          </a>
        ) : (
          <button key={s.label} onClick={() => handleClick(s)} title={s.label}
            className="w-10 h-10 rounded-xl bg-[#1a1a1a] border border-white/10 flex items-center justify-center transition-all duration-300 hover:border-crimson hover:bg-crimson hover:-translate-y-1 cursor-none">
            <img src={s.img} alt={s.label} className="w-5 h-5 object-contain" />
          </button>
        )
      )}
      <div className="w-px h-12 bg-white/20 mx-auto" />
    </div>
  );
}

/* ─────────────────────────────────────────────
   SCROLL UP BUTTON
───────────────────────────────────────────── */
function ScrollUp() {
  const [show, setShow] = useState(false);
  useEffect(() => {
    const h = () => setShow(window.scrollY > 500);
    window.addEventListener("scroll", h);
    return () => window.removeEventListener("scroll", h);
  }, []);

  return (
    <button
      onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
      className={`fixed right-7 bottom-7 z-[9999] w-11 h-11 bg-crimson text-white rounded-xl flex items-center justify-center text-xl transition-all duration-300 hover:brightness-90 ${show ? "opacity-100 pointer-events-auto translate-y-0" : "opacity-0 pointer-events-none translate-y-3"}`}
    >
      ↑
    </button>
  );
}

/* ─────────────────────────────────────────────
   ACTIVE SECTION HOOK
───────────────────────────────────────────── */
function useActiveSection() {
  const [active, setActive] = useState("home");
  useEffect(() => {
    const handler = () => {
      const sections = NAV_LINKS;
      for (const id of [...sections].reverse()) {
        const el = document.getElementById(id);
        if (el && window.scrollY >= el.offsetTop - 120) {
          setActive(id);
          break;
        }
      }
    };
    window.addEventListener("scroll", handler);
    return () => window.removeEventListener("scroll", handler);
  }, []);
  return active;
}

/* ─────────────────────────────────────────────
   ONLINE COUNT HOOK
───────────────────────────────────────────── */
function useOnlineCount() {
  const [count, setCount] = useState(1);

  useEffect(() => {
    const userRef = ref(rtdb, `online/${Date.now()}`);
    set(userRef, { joinedAt: rtServerTimestamp() }); // ✅ di sini
    onDisconnect(userRef).remove();

    const onlineRef = ref(rtdb, "online");
    const unsub = onValue(onlineRef, (snapshot) => {
      setCount(snapshot.size || 1);
    });

    return () => {
      unsub();
      set(userRef, null);
    };
  }, []);

  return count;
}
/* ─────────────────────────────────────────────
   ROOT APP
───────────────────────────────────────────── */
export default function App() {
  const [loaded, setLoaded] = useState(false);
  const [globalMessages, setGlobalMessages] = useState([]); 
  const active = useActiveSection();
  const handleDone = useCallback(() => {
    window.scrollTo({ top: 0, left: 0, behavior: "instant" });
    document.documentElement.scrollTop = 0;
    document.body.scrollTop = 0;
    setLoaded(true);
  }, []);

  return (
    <>
      {/* Global keyframe styles */}
    <style>{`
  @import url('https://fonts.googleapis.com/css2?family=Ubuntu:wght@400;500;700&family=Poppins:wght@400;500;600;700&display=swap');
  :root { --crimson: #DC143C; }
  .text-crimson { color: crimson; }
  .bg-crimson { background: crimson; }
  .border-crimson { border-color: crimson; }
  @keyframes shimmer { 0% { background-position: 0% center; } 100% { background-position: 200% center; } }
  @keyframes nameShine { 0% { background-position: 0% center; } 100% { background-position: 300% center; } }
  @keyframes gradientText { 0% { background-position: 0% 50%; } 100% { background-position: 100% 50%; } }
  @keyframes gradientMove { 0% { background-position: 0% center; } 100% { background-position: 300% center; } }
  @keyframes fadeUp { from { opacity: 0; transform: translateY(20px); } to { opacity: 1; transform: translateY(0); } }
  .animate-fadeUp { animation: fadeUp 0.8s ease forwards; }
  @keyframes blobMove1 { 0% { transform: translate(0,0) scale(1); } 100% { transform: translate(100px,80px) scale(1.2); } }
  @keyframes blobMove2 { 0% { transform: translate(0,0) scale(1); } 100% { transform: translate(-80px,-60px) scale(1.15); } }
  .animate-blob1 { animation: blobMove1 6s ease-in-out infinite alternate; }
  .animate-blob2 { animation: blobMove2 6s ease-in-out infinite alternate; }
  @keyframes marquee { from { transform: translateX(0); } to { transform: translateX(-50%); } }
  html { scroll-behavior: smooth; }
  ::-webkit-scrollbar { width: 8px; }
  ::-webkit-scrollbar-track { background: #111; }
  ::-webkit-scrollbar-thumb { background: #333; border-radius: 4px; }
  ::-webkit-scrollbar-thumb:hover { background: #555; }
  @keyframes messageIn {
    from { opacity: 0; transform: translateY(12px); }
    to { opacity: 1; transform: translateY(0); }
  }
  .message-in { animation: messageIn 0.35s ease forwards; }
`}</style>

      {!loaded && <Loader onDone={handleDone} />}
      <div style={{ 
          opacity: loaded ? 1 : 0, 
          transition: "opacity 0.5s ease",
          background: "#04040a",
          minHeight: "100vh"
        }}>
        <Navbar active={active} />
        <HeroSection />
        <AboutSection />
        <SkillsSection />
        <ProjectsSection />
        <ResumeSection />
        <ContactSection onMessagesChange={setGlobalMessages} />
        <ChatNotification messages={globalMessages} />
        <Footer />
        <ScrollUp />
        <FloatingSocial />
      </div>
    </>
  );
}