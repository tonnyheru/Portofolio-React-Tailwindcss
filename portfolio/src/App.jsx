import { useState, useEffect, useRef, useCallback } from "react";
import emailjs from "@emailjs/browser";

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
   LOADER
───────────────────────────────────────────── */
function Loader({ onDone }) {
  const [count, setCount] = useState(0);
  const [hiding, setHiding] = useState(false);

  useEffect(() => {
    const timer = setInterval(() => {
      setCount((c) => {
        if (c >= 100) {
          clearInterval(timer);
          setTimeout(() => setHiding(true), 400);
          setTimeout(() => onDone(), 1200);
          return 100;
        }
        return c + 1;
      });
    }, 18);
    return () => clearInterval(timer);
  }, [onDone]);

  return (
    <div
      className="fixed inset-0 z-[99999] flex flex-col items-center justify-center gap-8 bg-[#0a0a0a] transition-all duration-[800ms]"
      style={{ opacity: hiding ? 0 : 1, pointerEvents: hiding ? "none" : "all" }}
    >
      {/* bg blobs */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute w-[600px] h-[600px] -top-24 -left-24 rounded-full animate-blob1"
          style={{ background: "radial-gradient(circle, rgba(220,20,60,0.28) 0%, transparent 70%)" }} />
        <div className="absolute w-[500px] h-[500px] -bottom-24 -right-24 rounded-full animate-blob2"
          style={{ background: "radial-gradient(circle, rgba(64,121,255,0.22) 0%, transparent 70%)" }} />
      </div>
      <p className="relative z-10 font-mono text-sm tracking-[0.35em] uppercase text-white/40 animate-fadeUp">
        M Tonny Heru Susanto S.Kom
      </p>
      <div
        className="relative z-10 text-[6rem] sm:text-[8rem] font-bold leading-none font-mono"
        style={{
          background: "linear-gradient(135deg, #fff 0%, crimson 50%, #fff 100%)",
          backgroundSize: "200% auto",
          WebkitBackgroundClip: "text",
          WebkitTextFillColor: "transparent",
          backgroundClip: "text",
          animation: "shimmer 2s linear infinite",
        }}
      >
        {String(count).padStart(2, "0")}
      </div>
      <div className="relative z-10 w-48 h-[2px] bg-white/10 rounded-full overflow-hidden">
        <div
          className="h-full rounded-full transition-all duration-[18ms] linear"
          style={{ width: `${count}%`, background: "linear-gradient(to right, crimson, #ff6b6b)", boxShadow: "0 0 10px crimson" }}
        />
      </div>
      <p className="relative z-10 text-[0.65rem] tracking-[0.2em] uppercase text-white/20">Full Stack Developer</p>
    </div>
  );
}

/* ─────────────────────────────────────────────
   NAVBAR
───────────────────────────────────────────── */
function Navbar({ active }) {
  const [sticky, setSticky] = useState(false);
  const [open, setOpen] = useState(false);
  const [megaOpen, setMegaOpen] = useState(false);

  useEffect(() => {
    const handler = () => setSticky(window.scrollY > 20);
    window.addEventListener("scroll", handler);
    return () => window.removeEventListener("scroll", handler);
  }, []);

  const scrollTo = (id) => {
    const el = document.getElementById(id);
    if (el) {
      const navbar = document.querySelector("nav");
      const offset = el.getBoundingClientRect().top + window.scrollY - (navbar?.offsetHeight ?? 70);
      window.scrollTo({ top: offset, behavior: "smooth" });
    }
    setOpen(false);
  };

  return (
    <nav
      className={`fixed top-0 left-0 w-full z-[999] font-['Ubuntu',sans-serif] transition-all duration-300
        ${sticky ? "py-3 bg-[rgba(10,10,10,0.92)] backdrop-blur-xl border-b border-white/[0.06] shadow-[0_4px_30px_rgba(0,0,0,0.4)]" : "py-5"}`}
    >
      <div className="max-w-[1300px] mx-auto px-5 sm:px-10 flex items-center justify-between">
        {/* Logo */}
        <button onClick={() => scrollTo("home")} className="text-white text-3xl font-semibold">
          Porto<span className="text-crimson text-2xl">folio</span>
        </button>

        {/* Desktop menu */}
        <ul className="hidden md:flex items-center gap-1">
          {["home", "about"].map((id) => (
            <li key={id}>
              <button
                onClick={() => scrollTo(id)}
                className={`capitalize px-3 py-2 rounded-lg text-[15px] font-medium transition-all duration-200
                  ${active === id ? "text-crimson" : "text-white/85 hover:text-white hover:bg-white/7"}`}
              >
                {id}
              </button>
            </li>
          ))}

          {/* Tools mega */}
          <li className="relative" onMouseEnter={() => setMegaOpen(true)} onMouseLeave={() => setMegaOpen(false)}>
            <button
              onClick={() => scrollTo("skills")}
              className="flex items-center gap-1 px-3 py-2 rounded-lg text-[15px] font-medium text-white/85 hover:text-white hover:bg-white/7 transition-all duration-200"
            >
              Tools
              <svg className={`w-2.5 h-2.5 opacity-70 transition-transform duration-300 ${megaOpen ? "rotate-180" : ""}`} viewBox="0 0 12 8" fill="none">
                <path d="M1 1l5 5 5-5" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </button>

            {/* Mega panel */}
            <div
              className="absolute top-[calc(100%+14px)] left-1/2 -translate-x-1/2 w-[600px] bg-[#111] border border-white/[0.09] rounded-[18px] shadow-[0_24px_60px_rgba(0,0,0,0.6)] p-5 transition-all duration-250"
              style={{ opacity: megaOpen ? 1 : 0, pointerEvents: megaOpen ? "auto" : "none", transform: `translateX(-50%) translateY(${megaOpen ? 0 : "-8px"})` }}
            >
              {/* arrow tip */}
              <div className="absolute -top-[6px] left-1/2 -translate-x-1/2 w-3 h-3 bg-[#111] rotate-45 border-l border-t border-white/[0.09]" />
              <div className="flex gap-0">
                {/* col 1 */}
                <div className="flex-none w-[200px] pr-4">
                  <p className="flex items-center gap-1.5 text-[0.65rem] font-bold tracking-[0.15em] uppercase text-crimson mb-3">
                    <svg className="w-3.5 h-3.5" viewBox="0 0 20 20" fill="none"><path d="M10 2L12.4 7.5H18L13.3 11.1L15.1 17L10 13.4L4.9 17L6.7 11.1L2 7.5H7.6L10 2Z" stroke="crimson" strokeWidth="1.5" strokeLinejoin="round" /></svg>
                    My Skills
                  </p>
                  {[
                    { icon: "👨‍💻", title: "Full Stack Dev", sub: "Lihat semua skill saya", href: "skills" },
                    { icon: "📊", title: "Tool Groups", sub: "Language, DB, AI & Design", href: "skills" },
                  ].map((item) => (
                    <button key={item.title} onClick={() => scrollTo(item.href)}
                      className="flex items-center gap-3 p-2.5 rounded-xl hover:bg-white/[0.05] transition-colors duration-200 w-full mb-1 text-left">
                      <div className="w-8 h-8 bg-white/[0.05] rounded-lg flex items-center justify-center text-base flex-shrink-0">{item.icon}</div>
                      <div>
                        <strong className="block text-[0.82rem] font-semibold text-white/90">{item.title}</strong>
                        <span className="block text-[0.72rem] text-white/40 mt-0.5">{item.sub}</span>
                      </div>
                    </button>
                  ))}
                  <a href="https://github.com/tonnyheru" target="_blank" rel="noopener noreferrer"
                    className="flex items-center gap-3 p-2.5 rounded-xl hover:bg-white/[0.07] transition-colors duration-200">
                    <div className="w-8 h-8 bg-white/[0.05] rounded-lg flex items-center justify-center flex-shrink-0">
                      <img src="https://cdn.simpleicons.org/github/ffffff" alt="GitHub" className="w-4 h-4" />
                    </div>
                    <div>
                      <strong className="block text-[0.82rem] font-semibold text-white/90">GitHub</strong>
                      <span className="block text-[0.72rem] text-white/40 mt-0.5">tonnyheru · Lihat repositori →</span>
                    </div>
                  </a>
                </div>
                {/* divider */}
                <div className="w-px bg-white/[0.07] mx-4" />
                {/* col 2 */}
                <div className="flex-1 pl-0">
                  <p className="text-[0.65rem] font-bold tracking-[0.15em] uppercase text-crimson mb-3">Tech Stack</p>
                  <div className="flex flex-wrap gap-1.5 mb-3">
                    {["HTML","CSS","JavaScript","PHP","Python","Laravel","Flutter","MySQL","Firebase","Google Cloud","Figma","OpenAI"].map((t) => (
                      <button key={t} onClick={() => scrollTo("skills")}
                        className="flex items-center gap-1.5 bg-white/[0.05] border border-white/[0.08] rounded-lg px-2.5 py-1.5 text-[0.72rem] font-medium text-white/70 hover:bg-[rgba(220,20,60,0.1)] hover:border-[rgba(220,20,60,0.3)] hover:text-white transition-all duration-200">
                        {t}
                      </button>
                    ))}
                  </div>
                  <button onClick={() => scrollTo("skills")} className="text-[0.72rem] font-semibold text-crimson hover:opacity-75 transition-opacity">
                    Lihat semua teknologi →
                  </button>
                </div>
              </div>
            </div>
          </li>

          {[["featured", "Project"], ["resume", "Resume"], ["contact", "Contact"]].map(([id, label]) => (
          <li key={id}>
            <button
              onClick={() => scrollTo(id)}
              className={`px-3 py-2 rounded-lg text-[15px] font-medium transition-all duration-200
                ${active === id ? "text-crimson" : "text-white/85 hover:text-white hover:bg-white/7"}`}
            >
              {label}
            </button>
          </li>
        ))}
        </ul>

        {/* Mobile burger */}
        <button className="md:hidden text-white text-2xl" onClick={() => setOpen(!open)}>
          {open ? "✕" : "☰"}
        </button>
      </div>

      {/* Mobile menu */}
      <div className={`md:hidden fixed top-0 left-0 w-3/4 h-full bg-[#0a0a0a] border-r border-white/[0.08] z-[998] flex flex-col pt-20 px-6 gap-1 transition-all duration-300 ${open ? "translate-x-0" : "-translate-x-full"}`}>
        {[["home","Home"],["about","About"],["skills","Tools"],["featured","Project"],["resume","Resume"],["contact","Contact"]].map(([id,label]) => (
          <button key={id} onClick={() => scrollTo(id)}
            className="text-left text-white/85 hover:text-white hover:bg-white/[0.07] px-4 py-3 rounded-xl text-[15px] font-medium transition-all duration-200">
            {label}
          </button>
        ))}
      </div>
      {open && <div className="fixed inset-0 z-[997] bg-black/50 md:hidden" onClick={() => setOpen(false)} />}
    </nav>
  );
}

/* ─────────────────────────────────────────────
   HOME SECTION
───────────────────────────────────────────── */
function HomeSection() {
  const typed1 = useTyped(["Full Stack Developer", "Web Developer", "Application Developer"], 100, 70, 1500);

  return (
    <section
      id="home"
      className="relative flex items-center min-h-screen font-['Ubuntu',sans-serif] overflow-hidden"
      style={{
        background: "url(./images/banner.jpg) center/cover no-repeat",
      }}
    >
      {/* Overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-black/80 via-black/60 to-[rgba(220,20,60,0.15)]" />
      {/* Animated grid */}
      <div className="absolute inset-0 opacity-[0.04]"
        style={{ backgroundImage: "linear-gradient(rgba(255,255,255,0.3) 1px,transparent 1px),linear-gradient(90deg,rgba(255,255,255,0.3) 1px,transparent 1px)", backgroundSize: "60px 60px" }} />

      <div className="relative z-10 max-w-[1300px] mx-auto px-5 sm:px-20 pt-20">
        <p className="text-white/70 text-lg sm:text-2xl mb-2 animate-fadeUp" style={{ animationDelay: "0.2s" }}>
          Halo, Saya
        </p>
        <h1
          className="text-4xl sm:text-6xl lg:text-7xl font-bold mb-4 animate-fadeUp"
          style={{
            animationDelay: "0.4s",
            background: "linear-gradient(to right, #ffffff, rgb(210,203,204), #cebbbb, rgb(244,208,215), #ffffff)",
            backgroundSize: "300% auto",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            backgroundClip: "text",
            animation: "nameShine 4s linear infinite",
          }}
        >
          M Tonny Heru Susanto S.Kom
        </h1>
        <p className="text-white text-2xl sm:text-4xl animate-fadeUp" style={{ animationDelay: "0.6s" }}>
          Seorang{" "}
          <span
            style={{
              background: "linear-gradient(to right, rgb(64,255,170), rgb(64,121,255), rgb(64,255,170), rgb(64,121,255), rgb(64,255,170))",
              backgroundSize: "300% 100%",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text",
              animation: "gradientText 3s linear infinite",
            }}
          >
            {typed1}
          </span>
          <span className="text-white/60 animate-pulse">_</span>
        </p>

        {/* CTA Buttons */}
        <div className="flex flex-wrap gap-4 mt-10 animate-fadeUp" style={{ animationDelay: "0.8s" }}>
          <button
            onClick={() => document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" })}
            className="px-7 py-3.5 rounded-xl font-semibold text-white transition-all duration-300 hover:scale-105 hover:shadow-[0_8px_30px_rgba(220,20,60,0.4)]"
            style={{ background: "linear-gradient(135deg, crimson, #ff4d6d)" }}
          >
            Hubungi Saya
          </button>
          <button
            onClick={() => document.getElementById("featured")?.scrollIntoView({ behavior: "smooth" })}
            className="px-7 py-3.5 rounded-xl font-semibold text-white border border-white/30 hover:bg-white/10 hover:border-white/60 transition-all duration-300 hover:scale-105"
          >
            Lihat Project
          </button>
        </div>
      </div>
    </section>
  );
}

/* ─────────────────────────────────────────────
   ABOUT SECTION
───────────────────────────────────────────── */
function AboutSection() {
  const typed2 = useTyped(
    ["Saya, M Tonny Heru Susanto S.Kom"],
    90, 60, 2000
  );
  const [ref, inView] = useInView();
  const imgRef = useRef(null);

  const handleMouseMove = (e) => {
    const rect = imgRef.current?.getBoundingClientRect();
    if (!rect) return;
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const rotateY = ((x - rect.width / 2) / (rect.width / 2)) * 12;
    const rotateX = ((rect.height / 2 - y) / (rect.height / 2)) * 12;
    imgRef.current.style.transform = `rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale(1.05)`;
  };

  return (
    <section id="about" className="min-h-screen flex flex-col justify-center py-20 bg-white font-['Poppins',sans-serif]">
      <div ref={ref} className="max-w-[1300px] mx-auto px-5 sm:px-20">
        <SectionTitle light title="About me" sub=""/>

        <div className={`flex flex-col md:flex-row items-center gap-12 transition-all duration-700 ${inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}`}>
          {/* Left: image */}
          <div className="flex-shrink-0 flex justify-center" style={{ perspective: "1000px" }}>
            <img
              ref={imgRef}
              src="./images/profile-1.png"
              alt="M Tonny Heru Susanto S.Kom"
              className="w-[280px] h-[280px] sm:w-[320px] sm:h-[320px] object-cover rounded-[20px] cursor-pointer transition-shadow duration-300"
              style={{
                transformStyle: "preserve-3d",
                transition: "transform 0.15s ease, box-shadow 0.3s ease",
                boxShadow: "0 10px 30px rgba(0,0,0,0.3), 0 0 20px rgba(64,121,255,0.2)",
              }}
              onMouseMove={handleMouseMove}
              onMouseLeave={() => { if (imgRef.current) imgRef.current.style.transform = "rotateX(0deg) rotateY(0deg) scale(1)"; }}
            />
          </div>

          {/* Right: content */}
          <div className="flex-1">
            <div
              className="text-2xl font-bold mb-4 text-center"
              style={{
                background: "linear-gradient(to right,rgb(64,255,170),rgb(64,121,255),rgb(64,255,170),rgb(64,121,255),rgb(64,255,170))",
                backgroundSize: "300% auto",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
                animation: "gradientMove 3s linear infinite",
              }}
            >
              {typed2}<span className="text-gray-400">|</span>
            </div>
            <p className="text-gray-600 text-justify leading-relaxed mb-4">
              Saya lulusan S1 Teknik Informatika dari Universitas Informatika dan Bisnis Indonesia (UNIBI)
              dengan IPK 3.65 dan minat kuat di Software Engineering, khususnya Web Development.
              Saya memiliki pengalaman membangun aplikasi web full stack menggunakan PHP, Laravel,
              JavaScript, HTML, CSS, MySQL, dan RESTful API.
            </p>
            <p className="text-gray-600 text-justify leading-relaxed mb-6">
              Selama magang sebagai Web Programmer di Pengadilan Negeri Bale Bandung, saya
              mengembangkan <strong className="text-gray-800">Layung Peradilan</strong> — sistem administrasi peradilan terintegrasi
              dengan layanan <strong className="text-gray-800">Disdukcapil</strong> (Cimahi, Kabupaten Bandung, dan Bandung Barat)
              untuk verifikasi data warga secara otomatis. Pengembangan mencakup requirement gathering,
              perancangan database &amp; alur sistem, pengembangan front-end/back-end, integrasi API,
              deployment, hingga maintenance.
            </p>
            <div className="flex flex-wrap gap-3">
              <a
                href="./CV/CV__M.TonnyHeruSusanto.pdf"
                download
                className="inline-flex items-center gap-2 px-6 py-3 rounded-xl font-semibold text-white transition-all duration-300 hover:scale-105 hover:shadow-lg"
                style={{ background: "linear-gradient(135deg, crimson, #ff4d6d)" }}
              >
                Download CV <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20"><path d="M3 17a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm3.293-7.707a1 1 0 011.414 0L9 10.586V3a1 1 0 112 0v7.586l1.293-1.293a1 1 0 111.414 1.414l-3 3a1 1 0 01-1.414 0l-3-3a1 1 0 010-1.414z" /></svg>
              </a>
              <a
                href="./CV/sertifikat.pdf"
                download
                className="inline-flex items-center gap-2 px-6 py-3 rounded-xl font-semibold text-gray-700 border-2 border-gray-300 hover:border-gray-500 transition-all duration-300 hover:scale-105"
              >
                Download Sertifikat <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20"><path d="M3 17a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm3.293-7.707a1 1 0 011.414 0L9 10.586V3a1 1 0 112 0v7.586l1.293-1.293a1 1 0 111.414 1.414l-3 3a1 1 0 01-1.414 0l-3-3a1 1 0 010-1.414z" /></svg>
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

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
          <div className="flex-1 min-w-[260px]">
            <div className="inline-flex items-center gap-2.5 bg-[rgba(220,20,60,0.1)] border border-[rgba(220,20,60,0.3)] text-white/90 text-sm font-semibold px-4 py-1.5 rounded-full mb-4">
              <span className="w-2 h-2 rounded-full bg-crimson shadow-[0_0_8px_crimson] animate-pulse" />
              Full Stack Developer
            </div>
            <p className="text-white/55 leading-7 mb-7 max-w-[480px] text-justify">
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

          <div className="flex flex-row lg:flex-col gap-3.5 min-w-[160px]">
            {[["30+", "Technologies"], ["8+", "Languages"], ["1+", "Years Coding"]].map(([num, label]) => (
              <div key={label}
                className="bg-[#0d0d0d] border border-white/[0.07] rounded-2xl px-6 py-4 flex flex-col gap-1 relative overflow-hidden transition-all duration-250 hover:border-[rgba(220,20,60,0.35)] hover:translate-x-1"
                style={{ borderLeft: "3px solid crimson", borderRadius: "14px" }}>
                <span className="text-3xl font-bold text-white leading-none">
                  {num.replace("+", "")}<span className="text-xl text-crimson">+</span>
                </span>
                <span className="text-[0.72rem] text-white/40 uppercase tracking-widest font-medium">{label}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Divider */}
        <div className="flex items-center gap-4 mb-9">
          <div className="flex-1 h-px" style={{ background: "linear-gradient(to right, transparent, rgba(255,255,255,0.08), transparent)" }} />
          <span className="text-[0.7rem] font-bold tracking-[0.14em] uppercase text-white/30 whitespace-nowrap">
            Bahasa pemrograman dan teknologi yang saya gunakan
          </span>
          <div className="flex-1 h-px" style={{ background: "linear-gradient(to right, transparent, rgba(255,255,255,0.08), transparent)" }} />
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
   FEATURED PROJECT
───────────────────────────────────────────── */
function FeaturedSection() {
  const [ref, inView] = useInView();
  const [activeImg, setActiveImg] = useState(0);

  const galleryImages = [
    { src: "./images/login.png", caption: "Halaman Login" },
    { src: "./images/dashboard.png", caption: "Dashboard Utama" },
    { src: "./images/modul.png", caption: "Halaman Modul" },
  ];

  return (
    <section id="featured" className="py-20 bg-white font-['Poppins',sans-serif]">
      <div ref={ref} className="max-w-[1300px] mx-auto px-5 sm:px-20">
        <SectionTitle light title="Featured Project" sub="" />

        <div className={`border-[1.5px] border-gray-200 rounded-2xl overflow-hidden bg-white shadow-xl transition-all duration-700 ${inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}`}>
          {/* Header */}
          <div className="bg-[#1a1a2e] px-6 sm:px-9 py-7 flex flex-wrap items-start justify-between gap-4">
            <div>
              <h3 className="text-2xl font-semibold text-white mb-1.5">Layung Peradilan</h3>
              <p className="text-white/55 text-sm flex items-center gap-2">
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20"><path d="M10.394 2.08a1 1 0 00-.788 0l-7 3a1 1 0 000 1.84L5.25 8.051a.999.999 0 01.356-.257l4-1.714a1 1 0 11.788 1.838L7.667 9.088l1.94.831a1 1 0 00.787 0l7-3a1 1 0 000-1.838l-7-3zM3.31 9.397L5 10.12v4.102a8.969 8.969 0 00-1.05-.174 1 1 0 01-.89-.89 11.115 11.115 0 01.25-3.762zM9.3 16.573A9.026 9.026 0 007 14.935v-3.957l1.818.78a3 3 0 002.364 0l5.508-2.361a11.026 11.026 0 01.25 3.762 1 1 0 01-.89.89 8.968 8.968 0 00-5.35 2.524 1 1 0 01-1.4 0zM6 18a1 1 0 001-1v-2.065a8.935 8.935 0 00-2-.712V17a1 1 0 001 1z" /></svg>
                Pengadilan Negeri Bale Bandung
              </p>
            </div>
            <span className="bg-crimson text-white text-[0.78rem] font-semibold px-4 py-1.5 rounded-full whitespace-nowrap">Nilai Kompetensi 90/100</span>
          </div>

          {/* Body */}
          <div className="px-6 sm:px-9 py-7">
            {/* Stats */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-6">
              {[
                { val: "6 bln", label: "Durasi", sub: "Feb – Agt 2025" },
                { val: "3", label: "Integrasi API", sub: "Disdukcapil wilayah" },
                { val: "Full Stack", label: "Peran", sub: "Web developer" },
                { val: "Aktif", label: "Status", sub: "Di-deploy production", green: true },
              ].map((s) => (
                <div key={s.label} className="bg-gray-50 border border-gray-100 rounded-xl p-3.5 flex flex-col">
                  <span className={`text-xl font-bold leading-tight ${s.green ? "text-green-600" : "text-gray-900"}`}>{s.val}</span>
                  <span className="text-[0.72rem] text-gray-400 uppercase tracking-wide mt-1">{s.label}</span>
                  <span className="text-[0.75rem] text-gray-300 mt-0.5">{s.sub}</span>
                </div>
              ))}
            </div>

            <p className="text-gray-500 text-sm leading-7 text-justify mb-6">
              Sistem administrasi peradilan yang dibangun secara mandiri untuk Pengadilan Negeri Bale Bandung.
              Terintegrasi dengan layanan Disdukcapil Cimahi, Kabupaten Bandung, dan Bandung Barat via{" "}
              <strong className="text-gray-700">RESTful API</strong> untuk verifikasi data warga secara otomatis.
            </p>

            <div className="border-t border-gray-100 my-5" />
            <p className="text-[0.72rem] font-semibold text-gray-400 uppercase tracking-wider mb-3">Yang Dikerjakan</p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 mb-6">
              {WORK_ITEMS.map((w) => (
                <div key={w.label} className="flex items-center gap-2.5 bg-gray-50 border border-gray-100 rounded-lg px-4 py-2.5 text-sm text-gray-600">
                  <span>{w.icon}</span>
                  {w.label}
                </div>
              ))}
            </div>

            <div className="border-t border-gray-100 my-5" />
            <p className="text-[0.72rem] font-semibold text-gray-400 uppercase tracking-wider mb-3">Tech Stack</p>
            <div className="flex flex-wrap gap-2">
              {TECH_TAGS.map((t) => (
                <span key={t} className="text-[0.78rem] px-3.5 py-1.5 rounded-full bg-gray-100 border border-gray-200 text-gray-500 font-medium">{t}</span>
              ))}
            </div>
          </div>

              {/* Gallery */}
            <div className="px-6 sm:px-9 pb-7">
              <p className="text-[0.72rem] font-semibold text-gray-400 uppercase tracking-wider mb-3">Hasil</p>
              <div className="relative rounded-xl overflow-hidden mb-3 bg-gray-100 aspect-video">
                <img
                  src={galleryImages[activeImg].src}
                  alt={galleryImages[activeImg].caption}
                  className="w-full h-full object-cover transition-all duration-500"
                />
                <div className="absolute bottom-2 left-1/2 -translate-x-1/2 bg-black/50 text-white text-xs px-3 py-1 rounded-full">
                  {galleryImages[activeImg].caption}
                </div>
              </div>
              <div className="flex gap-2">
                {galleryImages.map((img, i) => (
                  <button
                    key={i}
                    onClick={() => setActiveImg(i)}
                    className={`flex-1 aspect-video rounded-lg overflow-hidden border-2 transition-all duration-200 ${activeImg === i ? "border-crimson" : "border-transparent"}`}
                  >
                    <img src={img.src} alt={img.caption} className="w-full h-full object-cover" />
                  </button>
                ))}
              </div>
            </div>

            {/* Footer */}
            <div className="flex flex-wrap items-center justify-between gap-3 px-6 sm:px-9 py-4 border-t border-gray-100 bg-gray-50">
              <span className="flex items-center gap-2 text-sm text-gray-500">
                <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
                Digunakan aktif oleh Pengadilan Negeri Bale Bandung
              </span>
                <a href="https://layungperadilan.pn-balebandung.go.id/login" target="_blank" rel="noopener noreferrer"
                className="flex items-center gap-2 text-crimson font-semibold text-sm hover:gap-3 transition-all duration-200">
                Lihat Langsung
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" /></svg>
              </a>
            </div>
        </div>
      </div>
    </section>
  );
}

/* ─────────────────────────────────────────────
   RESUME SECTION
───────────────────────────────────────────── */
function ResumeSection() {
  const [ref, inView] = useInView();

  return (
    <section id="resume" className="py-20 bg-[#111] text-white font-['Poppins',sans-serif]">
      <div ref={ref} className="max-w-[1300px] mx-auto px-5 sm:px-20">
        <SectionTitle title="Resume" sub="Latar belakang & pengalaman saya" dark />

        <div className={`grid grid-cols-1 lg:grid-cols-[1fr_1.6fr] gap-6 transition-all duration-700 ${inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}`}>
          {/* Left col */}
          <div className="flex flex-col gap-5">
            <ResumeBlock title="Profil" icon="👤">
              <p className="text-white/70 text-sm leading-7 text-justify">
                Fresh graduate S1 Teknik Informatika dengan minat di bidang pengembangan aplikasi web.
                Memahami alur pengembangan sistem, integrasi API, dan pengelolaan database MySQL.
                Senang belajar hal baru dan siap berkontribusi sesuai kebutuhan perusahaan.
              </p>
            </ResumeBlock>

            <ResumeBlock title="Kontak" icon="📞">
              {[
                { icon: "📱", text: "08562122827" },
                { icon: "✉️", text: "tonnyheru29@gmail.com" },
                { icon: "📍", text: "Sekeloa, Coblong, Bandung" },
              ].map((c) => (
                <p key={c.text} className="flex items-center gap-2 text-sm text-white/70 py-1">{c.icon} {c.text}</p>
              ))}
            </ResumeBlock>

            <ResumeBlock title="Tech Stack" icon="💻">
              {["PHP & Laravel", "JavaScript", "HTML & CSS", "MySQL & SQL", "RESTful API", "Git & Version Control", "Adobe Photoshop", "Canva"].map((t) => (
                <p key={t} className="flex items-center gap-2 text-sm text-white/70 py-1">
                  <span className="text-crimson text-xs">›</span>{t}
                </p>
              ))}
            </ResumeBlock>

            <ResumeBlock title="Soft Skills" icon="🧠">
              {["Analisis Kebutuhan Sistem", "Problem Solving", "Komunikasi Teknis", "Manajemen Proyek Mandiri", "Adaptabilitas"].map((s) => (
                <p key={s} className="flex items-center gap-2 text-sm text-white/70 py-1">
                  <span className="text-crimson text-xs">›</span>{s}
                </p>
              ))}
            </ResumeBlock>

            <ResumeBlock title="Pendidikan" icon="🎓">
              {[
                { school: "UNIBI Bandung", detail: "S1 Teknik Informatika", year: "IPK 3.65 | 2022 – 2026" },
                { school: "SMK Medikacom Bandung", detail: "Otomotif", year: "2015 – 2018" },
              ].map((e) => (
                <div key={e.school} className="mb-4 pb-4 border-b border-white/10 last:mb-0 last:pb-0 last:border-0">
                  <p className="font-semibold text-white text-sm">{e.school}</p>
                  <p className="text-white/60 text-xs mt-0.5">{e.detail}</p>
                  <p className="text-crimson text-xs mt-0.5">{e.year}</p>
                </div>
              ))}
            </ResumeBlock>
          </div>

          {/* Right col */}
          <div className="flex flex-col gap-5">
            <ResumeBlock title="Pengalaman Magang" icon="💼">
              <div className="relative pl-5 border-l-2 border-crimson">
                <div className="absolute -left-[5px] top-1 w-2.5 h-2.5 rounded-full bg-crimson" />
                <div className="flex flex-wrap justify-between items-start gap-2 mb-3">
                  <div>
                    <p className="font-semibold text-white text-sm">Magang — Full Stack Developer</p>
                    <p className="text-crimson text-xs mt-0.5">Pengadilan Negeri Bale Bandung</p>
                  </div>
                  <span className="text-[0.78rem] text-white/50 bg-[#222] border border-[#333] px-3 py-1 rounded-full">Feb 2025 – Agt 2025</span>
                </div>
                <ul className="flex flex-col gap-2">
                  {[
                    "Requirement gathering kepada pemangku kepentingan Pengadilan dan Disdukcapil.",
                    "Merancang alur sistem dan struktur database.",
                    "Membangun aplikasi web Layung Peradilan secara mandiri (PHP & Laravel).",
                    "Integrasi RESTful API dengan Disdukcapil Cimahi, Kab. Bandung, dan Bandung Barat.",
                    "Deployment hingga aktif digunakan oleh instansi terkait.",
                    "Maintenance & perbaikan bug berdasarkan masukan pengguna.",
                  ].map((item) => (
                    <li key={item} className="text-xs text-white/60 bg-[#222] border border-[#2a2a2a] rounded-lg px-4 py-2.5 leading-relaxed">{item}</li>
                  ))}
                </ul>
              </div>
            </ResumeBlock>

            <ResumeBlock title="Proyek" icon="📁">
              <p className="font-semibold text-white text-sm mb-1">Layung Peradilan — Aplikasi Web Administrasi Peradilan</p>
              <p className="text-crimson text-xs mb-3">PHP · Laravel · MySQL · RESTful API · JavaScript · HTML/CSS · Git</p>
              <ul className="flex flex-col gap-2">
                {[
                  "Aplikasi web administrasi untuk Pengadilan Negeri Bale Bandung.",
                  "Terintegrasi dengan sistem Disdukcapil di 3 wilayah untuk verifikasi data warga otomatis.",
                  "Mencakup manajemen pengguna, tracking status pengajuan, dan laporan digital.",
                ].map((item) => (
                  <li key={item} className="text-xs text-white/60 bg-[#222] border border-[#2a2a2a] rounded-lg px-4 py-2.5 leading-relaxed">{item}</li>
                ))}
              </ul>
            </ResumeBlock>
          </div>
        </div>
      </div>
    </section>
  );
}

function ResumeBlock({ title, icon, children }) {
  return (
    <div className="bg-[#1a1a1a] border border-[#2a2a2a] rounded-xl p-5">
      <h3 className="flex items-center gap-2 text-[0.85rem] font-bold uppercase tracking-widest text-crimson mb-4">
        <span>{icon}</span>{title}
      </h3>
      {children}
    </div>
  );
}

/* ─────────────────────────────────────────────
                CONTACT SECTION
   ───────────────────────────────────────────── */
  import { db, rtdb } from "./firebase";
  import { ref, onValue, onDisconnect, set, serverTimestamp as rtServerTimestamp } from "firebase/database";
  import {
    collection,
    addDoc,
    onSnapshot,
    orderBy,
    query,
    serverTimestamp,
  } from "firebase/firestore";

function ContactSection({ onMessagesChange }) {
  const onlineCount = useOnlineCount(); 
  const [messages, setMessages] = useState([]);
  const [chatInput, setChatInput] = useState("");
  const [chatName, setChatName] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [number, setNumber] = useState("");
  const [message, setMessage] = useState("");
  const chatEndRef = useRef(null);

  //  TAMBAHKAN useEffect ini
  useEffect(() => {
  const q = query(collection(db, "chatMessages"), orderBy("createdAt", "asc"));
  const unsubscribe = onSnapshot(q, (snapshot) => {
    const msgs = snapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));
    setMessages(msgs);
    onMessagesChange(msgs); 
    setTimeout(() => chatEndRef.current?.scrollIntoView({ behavior: "smooth" }), 50);
  });
  return () => unsubscribe();
}, []);

  // GANTI sendChat lama dengan ini
  const sendChat = async () => {
    const text = chatInput.trim();
    const sender = chatName.trim() || "Anonim";
    if (!text) return;

    const colors = ["#dc2626", "#2563eb", "#7c3aed", "#059669", "#d97706"];
    const color = colors[Math.floor(Math.random() * colors.length)];

    await addDoc(collection(db, "chatMessages"), {
      sender,
      initial: sender[0].toUpperCase(),
      color,
      text,
      createdAt: serverTimestamp(),
    });

    setChatInput("");
  };

  // sendMail tetap sama, tidak perlu diubah
  const sendMail = (e) => {
    e.preventDefault();
    const serviceID = "service_b7jg21v";
    const templateID = "template_4zmqsbi";
    const publicKey = "0jzhUedWp_q8iu5tM";

    emailjs.send(serviceID, templateID, { name, email, number, message }, publicKey)
      .then(() => {
        alert(`Terima kasih ${name}! Pesan berhasil terkirim.`);
        setName(""); setEmail(""); setNumber(""); setMessage("");
      })
      .catch((err) => {
        alert("Gagal mengirim pesan. Coba lagi nanti.");
        console.error(err);
      });
  };

  const [ref, inView] = useInView();

  return (
    <section id="contact" className="py-20 bg-[#0f1117] font-['Poppins',sans-serif]">
      <div ref={ref} className="max-w-[1300px] mx-auto px-5 sm:px-20">
        <h2 className="text-center text-crimson text-4xl sm:text-5xl font-semibold mb-2 font-['Ubuntu',sans-serif]">Contact &amp; Chat</h2>
        <div className="w-12 h-0.5 bg-crimson mx-auto mb-2 rounded" />
        <p className="text-center text-white/40 text-sm mb-12">Hubungi saya langsung atau tinggalkan pesan</p>

        <div className={`grid grid-cols-1 lg:grid-cols-2 gap-5 transition-all duration-700 ${inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}`}>
          {/* Chat Room */}
          <div className="bg-[#1a1d27] border border-[#2a2d3a] rounded-2xl overflow-hidden flex flex-col">
            <div className="bg-[#1f2235] px-5 py-3.5 flex items-center gap-2.5 border-b border-[#2a2d3a]">
              <span className="w-2.5 h-2.5 rounded-full bg-green-500 animate-pulse" />
              <span className="text-white font-semibold text-[15px]">Live Chat Room</span>
              <span className="ml-auto bg-crimson text-white text-[11px] font-semibold px-3 py-1 rounded-full">{onlineCount} online</span>
            </div>
            <div className="flex-1 p-4 h-[280px] overflow-y-auto flex flex-col gap-3 scrollbar-thin scrollbar-color-[#2a2d3a]">
              {messages.map((m) => (
                <div key={m.id} className={`flex items-start gap-2.5 message-in ${m.self ? "flex-row-reverse" : ""}`}>
                  <div className="w-8 h-8 rounded-full flex-shrink-0 flex items-center justify-center text-sm font-semibold text-white"
                    style={{ background: m.color }}>{m.initial}</div>
                  <div className={`px-3 py-2.5 max-w-[85%] rounded-[10px] ${m.self ? "bg-crimson rounded-tr-none" : "bg-[#252836] rounded-tl-none"}`}>
                    <p className={`text-[11px] mb-1 ${m.self ? "text-right text-white/60" : "text-[#6b7280]"}`}>{m.sender}</p>
                    <p className="text-[13.5px] leading-snug text-[#e5e7eb]">{m.text}</p>
                    <p className={`text-[10px] mt-1 ${m.self ? "text-right text-white/60" : "text-[#4b5563]"}`}>
                      {m.createdAt?.toDate
                        ? `${String(m.createdAt.toDate().getHours()).padStart(2, "0")}:${String(
                            m.createdAt.toDate().getMinutes()
                          ).padStart(2, "0")}`
                        : "..."}
                    </p>
                  </div>
                </div>
              ))}
              <div ref={chatEndRef} />
            </div>
            <div className="px-3.5 py-2.5 border-t border-[#2a2d3a] flex gap-2">
              <input value={chatInput} onChange={(e) => setChatInput(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && sendChat()}
                placeholder="Tulis pesan... (Enter untuk kirim)"
                className="flex-1 bg-[#252836] border border-[#2a2d3a] rounded-lg px-3 py-2 text-white text-sm outline-none focus:border-crimson transition-colors placeholder-[#4b5563]" />
              <button onClick={sendChat} className="bg-crimson hover:bg-[#b91c1c] transition-colors w-10 h-10 rounded-lg text-white flex items-center justify-center flex-shrink-0">
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20"><path d="M10.894 2.553a1 1 0 00-1.788 0l-7 14a1 1 0 001.169 1.409l5-1.429A1 1 0 009 15.571V11a1 1 0 112 0v4.571a1 1 0 00.725.962l5 1.428a1 1 0 001.17-1.408l-7-14z" /></svg>
              </button>
            </div>
            <p className="text-[11px] text-[#4b5563] px-3.5 pb-2 flex items-center gap-1">
              <span className="text-crimson">ℹ</span> Masukkan nama sebelum mengirim pesan
            </p>
            <div className="px-3.5 pb-3">
              <input value={chatName} onChange={(e) => setChatName(e.target.value)}
                placeholder="Nama kamu..."
                className="w-full bg-[#1f2235] border border-[#2a2d3a] rounded-lg px-3 py-2 text-[#9ca3af] text-xs outline-none focus:border-crimson transition-colors placeholder-[#4b5563]" />
            </div>
          </div>

          {/* Form */}
          <div className="bg-[#1a1d27] border border-[#2a2d3a] rounded-2xl overflow-hidden flex flex-col">
            <div className="bg-[#1f2235] px-5 py-3.5 flex items-center gap-2.5 border-b border-[#2a2d3a]">
              <span className="text-crimson text-[15px]">✉</span>
              <span className="text-white font-semibold text-[15px]">Kirim Pesan</span>
            </div>
            <div className="flex-1 p-5 overflow-y-auto">
              {/* Contact info */}
              <div className="flex flex-col gap-2 mb-5 pb-5 border-b border-[#2a2d3a]">
                {[
                  { icon: "🐙", text: "github.com/tonnyheru", href: "https://github.com/tonnyheru" },
                  { icon: "📸", text: "instagram.com/tonnyheru", href: "https://instagram.com/tonnyheru" },
                  { icon: "💼", text: "linkedin.com/in/tonnyheru", href: "https://linkedin.com/in/tonnyheru" },
                  { icon: "✉️", text: "tonnyheru29@gmail.com", href: "mailto:tonnyheru29@gmail.com" },
                  { icon: "📱", text: "08562122827" },
                  { icon: "📍", text: "Coblong, Bandung" },
                ].map((c) => (
                  <div key={c.text} className="flex items-center gap-2.5 text-[13px] text-[#9ca3af]">
                    <span className="w-4 text-center">{c.icon}</span>
                    {c.href ? (
                      <a href={c.href} target="_blank" rel="noopener noreferrer" className="hover:text-crimson transition-colors">{c.text}</a>
                    ) : <span>{c.text}</span>}
                  </div>
                ))}
              </div>

              <form onSubmit={sendMail} className="flex flex-col gap-3">
                {[
                  { label: "Nama", value: name, set: setName, type: "text", ph: "Nama lengkap", required: true },
                  { label: "Email", value: email, set: setEmail, type: "email", ph: "email@domain.com", required: true },
                  { label: "No. HP", value: number, set: setNumber, type: "text", ph: "08xx-xxxx-xxxx" },
                ].map((f) => (
                  <div key={f.label}>
                    <label className="block text-[11px] font-semibold text-[#9ca3af] uppercase tracking-wider mb-1.5">{f.label}</label>
                    <input type={f.type} value={f.value} onChange={(e) => f.set(e.target.value)} required={f.required} placeholder={f.ph}
                      className="w-full bg-[#252836] border border-[#2a2d3a] rounded-lg px-3 py-2.5 text-white text-sm outline-none focus:border-crimson transition-colors placeholder-[#4b5563]" />
                  </div>
                ))}
                <div>
                  <label className="block text-[11px] font-semibold text-[#9ca3af] uppercase tracking-wider mb-1.5">Pesan</label>
                  <textarea value={message} onChange={(e) => setMessage(e.target.value)} required placeholder="Tulis pesan..."
                    className="w-full bg-[#252836] border border-[#2a2d3a] rounded-lg px-3 py-2.5 text-white text-sm outline-none focus:border-crimson transition-colors placeholder-[#4b5563] resize-none h-24" />
                </div>
                <button type="submit"
                  className="w-full bg-crimson hover:bg-[#b91c1c] text-white font-semibold text-sm py-3 rounded-lg flex items-center justify-center gap-2 transition-colors duration-200">
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20"><path d="M10.894 2.553a1 1 0 00-1.788 0l-7 14a1 1 0 001.169 1.409l5-1.429A1 1 0 009 15.571V11a1 1 0 112 0v4.571a1 1 0 00.725.962l5 1.428a1 1 0 001.17-1.408l-7-14z" /></svg>
                  Kirim Pesan
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ─────────────────────────────────────────────
   FOOTER
───────────────────────────────────────────── */
function Footer() {
  return (
    <footer className="bg-[#0a0a0a] border-t border-white/[0.06] py-5">
      <p className="text-center text-[0.85rem] text-white/30 font-['Poppins',sans-serif]">
        Copyright © 2026, M Tonny Heru Susanto. All rights reserved.
      </p>
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
      { href: "https://github.com/tonnyheru", img: "https://cdn.simpleicons.org/github/ffffff", label: "GitHub" },
      { href: "https://instagram.com/tonnyheru", img: "https://cdn.simpleicons.org/instagram/ffffff", label: "Instagram" },
      { href: "https://linkedin.com/in/tonnyheru", img: "https://cdn.jsdelivr.net/npm/simple-icons@v11/icons/linkedin.svg", label: "LinkedIn" },
      { href: "https://mail.google.com/mail/?view=cm&to=tonnyheru29@gmail.com", img: "https://cdn.simpleicons.org/gmail/ffffff", label: "Email" },
    ];

  return (
    <div
      className="fixed left-5 bottom-7 z-[9999] flex flex-col gap-2.5 transition-all duration-500"
      style={{ opacity: show ? 1 : 0, transform: show ? "translateY(0)" : "translateY(20px)", pointerEvents: show ? "auto" : "none" }}
    >
      {socials.map((s) => (
        <a key={s.label} href={s.href} target="_blank" rel="noopener noreferrer" title={s.label}
          className="w-10 h-10 rounded-xl bg-[#1a1a1a] border border-white/10 flex items-center justify-center transition-all duration-300 hover:border-crimson hover:bg-crimson hover:-translate-y-1">
          <img src={s.img} alt={s.label} className="w-5 h-5 object-contain"
          style={{ filter: s.label === "LinkedIn" ? "brightness(0) invert(1)" : "none" }} />
        </a>
      ))}
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
  const handleDone = useCallback(() => setLoaded(true), []);

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
      <div style={{ opacity: loaded ? 1 : 0, transition: "opacity 0.5s ease" }}>
        <Navbar active={active} />
        <HomeSection />
        <AboutSection />
        <SkillsSection />
        <FeaturedSection />
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
