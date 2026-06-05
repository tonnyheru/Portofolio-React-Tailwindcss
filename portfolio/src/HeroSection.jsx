import { useEffect, useRef, useState, useCallback } from "react";

/* ─── CUSTOM CURSOR ─── */
function CustomCursor() {
  const dotRef = useRef(null);
  const ringRef = useRef(null);
  const pos = useRef({ x: 0, y: 0 });
  const ring = useRef({ x: 0, y: 0 });
  const raf = useRef(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const move = (e) => {
      pos.current = { x: e.clientX, y: e.clientY };
      if (!visible) setVisible(true);
    };
    window.addEventListener("mousemove", move);

    const animate = () => {
      ring.current.x += (pos.current.x - ring.current.x) * 0.12;
      ring.current.y += (pos.current.y - ring.current.y) * 0.12;
      if (dotRef.current) {
        dotRef.current.style.transform = `translate(${pos.current.x}px, ${pos.current.y}px)`;
      }
      if (ringRef.current) {
        ringRef.current.style.transform = `translate(${ring.current.x}px, ${ring.current.y}px)`;
      }
      raf.current = requestAnimationFrame(animate);
    };
    raf.current = requestAnimationFrame(animate);

    return () => {
      window.removeEventListener("mousemove", move);
      cancelAnimationFrame(raf.current);
    };
  }, []);

  if (!visible) return null;

  return (
    <>
      <style>{`
        body { cursor: none !important; }
        a, button { cursor: none !important; }
      `}</style>
      {/* dot */}
      <div
        ref={dotRef}
        style={{
          position: "fixed",
          top: 0, left: 0,
          width: 8, height: 8,
          background: "crimson",
          borderRadius: "50%",
          pointerEvents: "none",
          zIndex: 999999,
          transform: "translate(-50%,-50%)",
          marginLeft: -4, marginTop: -4,
          boxShadow: "0 0 10px rgba(220,20,60,0.8)",
          transition: "opacity 0.2s",
        }}
      />
      {/* ring */}
      <div
        ref={ringRef}
        style={{
          position: "fixed",
          top: 0, left: 0,
          width: 36, height: 36,
          border: "1.5px solid rgba(220,20,60,0.55)",
          borderRadius: "50%",
          pointerEvents: "none",
          zIndex: 999998,
          marginLeft: -18, marginTop: -18,
        }}
      />
    </>
  );
}

/* ─── PARTICLE CANVAS ─── */
function ParticleCanvas() {
  const canvasRef = useRef(null);
  const mouse = useRef({ x: -9999, y: -9999 });
  const particles = useRef([]);
  const raf = useRef(null);

  const resize = useCallback(() => {
    const c = canvasRef.current;
    if (!c) return;
    c.width = c.offsetWidth;
    c.height = c.offsetHeight;
  }, []);

  useEffect(() => {
    const c = canvasRef.current;
    if (!c) return;
    const ctx = c.getContext("2d");

    resize();
    window.addEventListener("resize", resize);

    const onMouseMove = (e) => {
      const rect = c.getBoundingClientRect();
      mouse.current = { x: e.clientX - rect.left, y: e.clientY - rect.top };
    };
    window.addEventListener("mousemove", onMouseMove);

    // init particles
    const COUNT = Math.floor((c.width * c.height) / 8000);
    particles.current = Array.from({ length: COUNT }, () => ({
      x: Math.random() * c.width,
      y: Math.random() * c.height,
      vx: (Math.random() - 0.5) * 0.4,
      vy: (Math.random() - 0.5) * 0.4,
      r: Math.random() * 1.5 + 0.5,
      alpha: Math.random() * 0.5 + 0.1,
    }));

    const draw = () => {
      ctx.clearRect(0, 0, c.width, c.height);

      const ps = particles.current;
      const mx = mouse.current.x;
      const my = mouse.current.y;
      const REPEL = 120;
      const CONNECT = 130;

      // update + draw dots
      for (const p of ps) {
        const dx = p.x - mx;
        const dy = p.y - my;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < REPEL) {
          const force = (REPEL - dist) / REPEL;
          p.vx += (dx / dist) * force * 0.3;
          p.vy += (dy / dist) * force * 0.3;
        }
        p.vx *= 0.98;
        p.vy *= 0.98;
        p.x += p.vx;
        p.y += p.vy;
        if (p.x < 0) p.x = c.width;
        if (p.x > c.width) p.x = 0;
        if (p.y < 0) p.y = c.height;
        if (p.y > c.height) p.y = 0;

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(255,255,255,${p.alpha})`;
        ctx.fill();
      }

      // connect lines
      for (let i = 0; i < ps.length; i++) {
        for (let j = i + 1; j < ps.length; j++) {
          const dx = ps[i].x - ps[j].x;
          const dy = ps[i].y - ps[j].y;
          const d = Math.sqrt(dx * dx + dy * dy);
          if (d < CONNECT) {
            const opacity = (1 - d / CONNECT) * 0.18;
            ctx.beginPath();
            ctx.moveTo(ps[i].x, ps[i].y);
            ctx.lineTo(ps[j].x, ps[j].y);
            ctx.strokeStyle = `rgba(220,20,60,${opacity})`;
            ctx.lineWidth = 0.6;
            ctx.stroke();
          }
        }
      }

      // cursor glow connections
      for (const p of ps) {
        const dx = p.x - mx;
        const dy = p.y - my;
        const d = Math.sqrt(dx * dx + dy * dy);
        if (d < 180) {
          const opacity = (1 - d / 180) * 0.45;
          ctx.beginPath();
          ctx.moveTo(p.x, p.y);
          ctx.lineTo(mx, my);
          ctx.strokeStyle = `rgba(220,20,60,${opacity})`;
          ctx.lineWidth = 0.8;
          ctx.stroke();
        }
      }

      raf.current = requestAnimationFrame(draw);
    };

    raf.current = requestAnimationFrame(draw);

    return () => {
      cancelAnimationFrame(raf.current);
      window.removeEventListener("resize", resize);
      window.removeEventListener("mousemove", onMouseMove);
    };
  }, [resize]);

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: "absolute",
        inset: 0,
        width: "100%",
        height: "100%",
        zIndex: 1,
        pointerEvents: "none",
      }}
    />
  );
}

/* ─── ANIMATED COUNTER ─── */
/* ─── TYPED TEXT HOOK ─── */
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

/* ─── SCROLL PROGRESS BAR ─── */
function ScrollProgressBar() {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const update = () => {
      const scrolled = window.scrollY;
      const total = document.body.scrollHeight - window.innerHeight;
      setProgress(total > 0 ? (scrolled / total) * 100 : 0);
    };
    window.addEventListener("scroll", update);
    return () => window.removeEventListener("scroll", update);
  }, []);

  return (
    <div
      style={{
        position: "fixed",
        top: 0, left: 0,
        height: 3,
        width: `${progress}%`,
        background: "linear-gradient(to right, crimson, #ff6b6b)",
        zIndex: 99999,
        transition: "width 0.1s linear",
        boxShadow: "0 0 10px rgba(220,20,60,0.6)",
        pointerEvents: "none",
      }}
    />
  );
}

/* ─── MAIN HERO SECTION ─── */
export default function HeroSection() {
  const typed = useTyped(
    ["Full Stack Developer", "Web Developer", "Application Developer"],
    100, 70, 1800
  );
  const [inView, setInView] = useState(false);
  const sectionRef = useRef(null);

  useEffect(() => {
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) setInView(true); },
      { threshold: 0.1 }
    );
    if (sectionRef.current) obs.observe(sectionRef.current);
    return () => obs.disconnect();
  }, []);

  const scrollTo = (id) => {
    const el = document.getElementById(id);
    if (!el) return;
    const nav = document.querySelector("nav");
    const offset = el.getBoundingClientRect().top + window.scrollY - (nav?.offsetHeight ?? 70);
    window.scrollTo({ top: offset, behavior: "smooth" });
  };

  return (
    <>
      <CustomCursor />
      <ScrollProgressBar />

      <style>{`
        @keyframes heroFadeUp {
          from { opacity: 0; transform: translateY(28px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        @keyframes nameShine {
          0%   { background-position: 0% center; }
          100% { background-position: 300% center; }
        }
        @keyframes gradientText {
          0%   { background-position: 0% 50%; }
          100% { background-position: 200% 50%; }
        }
        @keyframes pulseGlow {
          0%, 100% { box-shadow: 0 0 0 0 rgba(220,20,60,0.4); }
          50%       { box-shadow: 0 0 0 12px rgba(220,20,60,0); }
        }
        @keyframes floatBadge {
          0%, 100% { transform: translateY(0px); }
          50%       { transform: translateY(-6px); }
        }
        .hero-fade-1 { animation: heroFadeUp 0.7s ease forwards; animation-delay: 0.2s; opacity: 0; }
        .hero-fade-2 { animation: heroFadeUp 0.7s ease forwards; animation-delay: 0.4s; opacity: 0; }
        .hero-fade-3 { animation: heroFadeUp 0.7s ease forwards; animation-delay: 0.6s; opacity: 0; }
        .hero-fade-4 { animation: heroFadeUp 0.7s ease forwards; animation-delay: 0.8s; opacity: 0; }
        .hero-fade-5 { animation: heroFadeUp 0.7s ease forwards; animation-delay: 1.0s; opacity: 0; }
        .hero-btn-primary {
          padding: 14px 32px;
          border-radius: 14px;
          font-weight: 600;
          font-size: 15px;
          color: white;
          background: linear-gradient(135deg, crimson, #ff4d6d);
          border: none;
          transition: transform 0.25s, box-shadow 0.25s;
          animation: pulseGlow 2.5s ease infinite;
        }
        .hero-btn-primary:hover {
          transform: translateY(-3px) scale(1.04);
          box-shadow: 0 12px 36px rgba(220,20,60,0.45);
          animation: none;
        }
        .hero-btn-secondary {
          padding: 14px 32px;
          border-radius: 14px;
          font-weight: 600;
          font-size: 15px;
          color: white;
          background: transparent;
          border: 1.5px solid rgba(255,255,255,0.28);
          transition: transform 0.25s, background 0.25s, border-color 0.25s;
        }
        .hero-btn-secondary:hover {
          transform: translateY(-3px) scale(1.04);
          background: rgba(255,255,255,0.08);
          border-color: rgba(255,255,255,0.6);
        }
        .stat-card {
          background: rgba(255,255,255,0.04);
          border: 1px solid rgba(255,255,255,0.09);
          border-radius: 16px;
          padding: 18px 22px;
          border-left: 3px solid crimson;
          transition: transform 0.25s, border-color 0.25s, background 0.25s;
        }
        .stat-card:hover {
          transform: translateX(5px);
          background: rgba(220,20,60,0.07);
          border-color: rgba(220,20,60,0.35);
        }
        .badge-available {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          background: rgba(220,20,60,0.12);
          border: 1px solid rgba(220,20,60,0.35);
          border-radius: 999px;
          padding: 7px 18px;
          font-size: 13px;
          font-weight: 600;
          color: rgba(255,255,255,0.9);
          animation: floatBadge 3s ease-in-out infinite;
        }
        .grid-overlay {
          position: absolute;
          inset: 0;
          background-image:
            linear-gradient(rgba(255,255,255,0.025) 1px, transparent 1px),
            linear-gradient(90deg, rgba(255,255,255,0.025) 1px, transparent 1px);
          background-size: 64px 64px;
          pointer-events: none;
          z-index: 0;
        }
        .vignette {
          position: absolute;
          inset: 0;
          background: radial-gradient(ellipse at center, transparent 40%, rgba(0,0,0,0.55) 100%);
          pointer-events: none;
          z-index: 2;
        }
        .corner-glow-tl {
          position: absolute;
          top: -120px; left: -120px;
          width: 500px; height: 500px;
          border-radius: 50%;
          background: radial-gradient(circle, rgba(220,20,60,0.18) 0%, transparent 65%);
          pointer-events: none;
          z-index: 0;
          animation: blobMove1 8s ease-in-out infinite alternate;
        }
        .corner-glow-br {
          position: absolute;
          bottom: -100px; right: -100px;
          width: 450px; height: 450px;
          border-radius: 50%;
          background: radial-gradient(circle, rgba(64,121,255,0.14) 0%, transparent 65%);
          pointer-events: none;
          z-index: 0;
          animation: blobMove2 9s ease-in-out infinite alternate;
        }
        @keyframes blobMove1 {
          from { transform: translate(0,0) scale(1); }
          to   { transform: translate(60px,40px) scale(1.15); }
        }
        @keyframes blobMove2 {
          from { transform: translate(0,0) scale(1); }
          to   { transform: translate(-50px,-40px) scale(1.12); }
        }
        .scroll-hint {
          position: absolute;
          bottom: 32px;
          left: 50%;
          transform: translateX(-50%);
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 6px;
          z-index: 10;
          animation: heroFadeUp 0.7s ease forwards;
          animation-delay: 1.4s;
          opacity: 0;
        }
        @keyframes scrollBounce {
          0%, 100% { transform: translateY(0); opacity: 0.5; }
          50%       { transform: translateY(6px); opacity: 1; }
        }
        .scroll-hint-arrow {
          animation: scrollBounce 1.6s ease-in-out infinite;
        }
      `}</style>

      <section
        id="home"
        ref={sectionRef}
        style={{
          position: "relative",
          minHeight: "100vh",
          display: "flex",
          alignItems: "center",
          overflow: "hidden",
          background: "#060608",
          fontFamily: "'Ubuntu', sans-serif",
        }}
      >
        {/* Banner image layer */}
        <div style={{
          position: "absolute",
          inset: 0,
          backgroundImage: "url(./images/banner.jpg)",
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
          zIndex: 0,
          opacity: 0.85,
        }} />

        {/* Dark overlay supaya teks tetap terbaca */}
        <div style={{
          position: "absolute",
          inset: 0,
          background: "linear-gradient(135deg, rgba(6,6,8,0.45) 0%, rgba(13,13,20,0.35) 50%, rgba(10,6,8,0.45) 100%)",
          zIndex: 0,
        }} />

        {/* Background layers */}
        <div className="corner-glow-tl" />
        <div className="corner-glow-br" />
        <ParticleCanvas />
        <div className="vignette" />

        {/* Content */}
        <div
          style={{
            position: "relative",
            zIndex: 10,
            maxWidth: 1300,
            margin: "0 auto",
            padding: "100px 80px 80px",
            width: "100%",
            display: "flex",
            gap: 60,
            alignItems: "center",
          }}
          className="hero-content-wrap"
        >
          {/* Left: main text */}
          <div style={{ flex: "1 1 0", minWidth: 0 }}>
            {/* Badge */}
            <div className="hero-fade-1" style={{ marginBottom: 28 }}>
              <span className="badge-available">
                <span style={{
                  width: 8, height: 8, borderRadius: "50%",
                  background: "#22c55e",
                  boxShadow: "0 0 8px #22c55e",
                  animation: "pulseGlow 2s ease infinite",
                  display: "inline-block",
                }} />
                Open to Work — Bandung & Remote
              </span>
            </div>

            {/* Greeting */}
            <p
              className="hero-fade-2"
              style={{ color: "rgba(255,255,255,0.6)", fontSize: "clamp(16px,2vw,22px)", marginBottom: 10 }}
            >
              Halo, Saya
            </p>

            {/* Name */}
            <div className="hero-fade-3">
              <h1
                style={{
                  fontSize: "clamp(32px,5vw,68px)",
                  fontWeight: 700,
                  lineHeight: 1.1,
                  marginBottom: 18,
                  background: "linear-gradient(to right, #ffffff, #f4d0d7, #cebbbb, #f4d0d7, #ffffff)",
                  backgroundSize: "300% auto",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  backgroundClip: "text",
                  animation: "nameShine 5s linear infinite",
                }}
              >
                M Tonny Heru Susanto
                <span style={{
                  display: "block",
                  fontSize: "clamp(14px,1.5vw,22px)",
                  fontWeight: 500,
                  background: "none",
                  WebkitTextFillColor: "rgba(255,255,255,0.4)",
                  marginTop: 6,
                  letterSpacing: "0.15em",
                  animation: "none",
                }}>
                  S.Kom
                </span>
              </h1>
            </div>

            {/* Typed */}
            <p
              className="hero-fade-4"
              style={{ fontSize: "clamp(18px,2.5vw,34px)", color: "white", marginBottom: 40 }}
            >
              Seorang{" "}
              <span style={{
                background: "linear-gradient(to right, rgb(64,255,170), rgb(64,121,255), rgb(64,255,170), rgb(64,121,255))",
                backgroundSize: "300% 100%",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
                animation: "gradientText 3s linear infinite",
              }}>
                {typed}
              </span>
              <span style={{ color: "rgba(255,255,255,0.5)", animation: "pulseGlow 1s step-end infinite" }}>_</span>
            </p>

            {/* CTAs */}
            <div className="hero-fade-5" style={{ display: "flex", flexWrap: "wrap", gap: 14 }}>
              <button
                className="hero-btn-primary"
                onClick={() => scrollTo("contact")}
              >
                Hubungi Saya
              </button>
              <button
                className="hero-btn-secondary"
                onClick={() => scrollTo("featured")}
              >
                Lihat Project
              </button>
            </div>
          </div>

          {/* Right side intentionally empty */}
          <div />
        </div>

        {/* Responsive styles */}
        <style>{`
          @media (max-width: 768px) {
            .hero-content-wrap {
              flex-direction: column !important;
              padding: 100px 24px 60px !important;
              gap: 32px !important;
            }
            .hero-stats {
              flex-direction: row !important;
              width: 100% !important;
              min-width: 0 !important;
            }
            .stat-card {
              flex: 1;
              padding: 14px 16px !important;
              border-left-width: 2px !important;
            }
          }
        `}</style>
      </section>
    </>
  );
}

/* ─── GLOBAL MOBILE FIX ─── */
// Sudah ada di dalam komponen via <style> tag