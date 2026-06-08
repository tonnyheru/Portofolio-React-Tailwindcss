import { useState, useEffect, useRef } from "react";

function useTyped(strings, speed = 90, backSpeed = 60, backDelay = 2000) {
  const [display, setDisplay] = useState("");
  const [idx, setIdx] = useState(0);
  const [charIdx, setCharIdx] = useState(0);
  const [deleting, setDeleting] = useState(false);
  useEffect(() => {
    const current = strings[idx];
    let timeout;
    if (!deleting) {
      if (charIdx < current.length) timeout = setTimeout(() => setCharIdx(c => c + 1), speed);
      else timeout = setTimeout(() => setDeleting(true), backDelay);
    } else {
      if (charIdx > 0) timeout = setTimeout(() => setCharIdx(c => c - 1), backSpeed);
      else { setDeleting(false); setIdx(i => (i + 1) % strings.length); }
    }
    setDisplay(current.slice(0, charIdx));
    return () => clearTimeout(timeout);
  }, [charIdx, deleting, idx, strings, speed, backSpeed, backDelay]);
  return display;
}

function PhotoCard({ visible }) {
  const wrapRef = useRef(null);
  const handleMouseMove = (e) => {
    const rect = wrapRef.current?.getBoundingClientRect();
    if (!rect) return;
    const x = ((e.clientX - rect.left) / rect.width - 0.5) * 18;
    const y = ((e.clientY - rect.top) / rect.height - 0.5) * -18;
    wrapRef.current.style.transform = `perspective(900px) rotateX(${y}deg) rotateY(${x}deg)`;
  };
  const handleMouseLeave = () => {
    if (wrapRef.current) wrapRef.current.style.transform = "perspective(900px) rotateX(0deg) rotateY(0deg)";
  };
  return (
    <div style={{ flexShrink:0, opacity:visible?1:0, transform:visible?"translateX(0)":"translateX(-30px)", transition:"opacity 0.7s ease 0.1s, transform 0.7s ease 0.1s" }}>
      <div ref={wrapRef} onMouseMove={handleMouseMove} onMouseLeave={handleMouseLeave}
        style={{ transformStyle:"preserve-3d", transition:"transform 0.15s ease", cursor:"none", position:"relative", display:"inline-block" }}>
        <div style={{ position:"absolute", inset:-20, borderRadius:32, background:"radial-gradient(circle, rgba(220,20,60,0.18) 0%, transparent 65%)", pointerEvents:"none", zIndex:0, filter:"blur(18px)" }} />
        <div style={{ position:"relative", zIndex:1, border:"2px solid rgba(220,20,60,0.22)", borderRadius:24, padding:4, background:"rgba(220,20,60,0.03)", boxShadow:"0 20px 60px rgba(220,20,60,0.1), 0 4px 20px rgba(0,0,0,0.08)" }}>
          <img src="./images/profile-1.png" alt="M Tonny Heru Susanto S.Kom"
            style={{ width:300, height:340, objectFit:"cover", borderRadius:20, display:"block" }} />

        </div>

      </div>
    </div>
  );
}

export default function AboutSection() {
  const typed = useTyped(["M Tonny Heru Susanto S.Kom"], 80, 50, 3000);
  const sectionRef = useRef(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) { setVisible(true); obs.disconnect(); }
      },
      { threshold: 0.1 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  const FUN_FACTS = [
    { icon: "🎓", text: "IPK 3.65 · S1 Teknik Informatika UNIBI" },
    { icon: "🏛️", text: "Proyek aktif di Pengadilan Negeri Bale Bandung" },
    { icon: "🔗", text: "Integrasi API Disdukcapil Cimahi" },
    { icon: "📍", text: "Bandung" },
  ];

  return (
    <section id="about" ref={sectionRef}
      style={{ padding:"96px 0", fontFamily:"'Poppins', sans-serif", position:"relative", overflow:"hidden",
        background:"linear-gradient(135deg, #fff5f5 0%, #ffffff 40%, #f0f4ff 70%, #fff0f3 100%)" }}>

      <style>{`
        @keyframes gradientMove { 0%{background-position:0% 50%} 100%{background-position:300% 50%} }
        @keyframes pulseGreen { 0%,100%{box-shadow:0 0 0 0 rgba(34,197,94,0.5)} 50%{box-shadow:0 0 0 6px rgba(34,197,94,0)} }
        @keyframes floatOrb1 { 0%,100%{transform:translate(0,0) scale(1)} 50%{transform:translate(30px,-20px) scale(1.08)} }
        @keyframes floatOrb2 { 0%,100%{transform:translate(0,0) scale(1)} 50%{transform:translate(-25px,15px) scale(1.05)} }
        @keyframes floatOrb3 { 0%,100%{transform:translate(0,0)} 33%{transform:translate(15px,-30px)} 66%{transform:translate(-20px,10px)} }
        @keyframes shimmerLine { 0%{transform:translateX(-100%)} 100%{transform:translateX(400%)} }
        @keyframes rotateSlow { from{transform:rotate(0deg)} to{transform:rotate(360deg)} }
        .about-dl-btn { display:inline-flex;align-items:center;gap:8px;padding:12px 24px;border-radius:12px;font-weight:600;font-size:14px;transition:transform 0.25s,box-shadow 0.25s;text-decoration:none;cursor:none; }
        .about-dl-btn:hover { transform:translateY(-3px); }
        .fact-item { display:flex;align-items:center;gap:12px;background:rgba(255,255,255,0.75);border:1px solid rgba(220,20,60,0.1);border-radius:12px;padding:12px 16px;transition:all 0.25s;backdrop-filter:blur(8px); }
        .fact-item:hover { border-color:rgba(220,20,60,0.35);background:white;box-shadow:0 4px 16px rgba(220,20,60,0.08);transform:translateY(-2px); }
      `}</style>

      {/* ── Dekoratif background ── */}
      {/* Orbs melayang */}
      <div style={{ position:"absolute", top:-60, right:-60, width:400, height:400, borderRadius:"50%",
        background:"radial-gradient(circle, rgba(220,20,60,0.12) 0%, transparent 60%)",
        animation:"floatOrb1 8s ease-in-out infinite", pointerEvents:"none" }} />
      <div style={{ position:"absolute", bottom:-80, left:-80, width:450, height:450, borderRadius:"50%",
        background:"radial-gradient(circle, rgba(100,120,255,0.1) 0%, transparent 60%)",
        animation:"floatOrb2 10s ease-in-out infinite", pointerEvents:"none" }} />
      <div style={{ position:"absolute", top:"40%", left:"30%", width:300, height:300, borderRadius:"50%",
        background:"radial-gradient(circle, rgba(255,180,200,0.1) 0%, transparent 65%)",
        animation:"floatOrb3 12s ease-in-out infinite", pointerEvents:"none" }} />

      {/* Dot grid pattern */}
      <div style={{ position:"absolute", inset:0,
        backgroundImage:"radial-gradient(rgba(220,20,60,0.1) 1.5px, transparent 1.5px)",
        backgroundSize:"28px 28px", pointerEvents:"none", opacity:0.5 }} />

      {/* Rotating ring deco */}
      <div style={{ position:"absolute", top:60, right:120, width:120, height:120,
        border:"1px dashed rgba(220,20,60,0.15)", borderRadius:"50%",
        animation:"rotateSlow 20s linear infinite", pointerEvents:"none" }} />
      <div style={{ position:"absolute", bottom:80, left:80, width:80, height:80,
        border:"1px dashed rgba(100,120,255,0.15)", borderRadius:"50%",
        animation:"rotateSlow 15s linear infinite reverse", pointerEvents:"none" }} />

      {/* Diagonal stripe accent */}
      <div style={{ position:"absolute", top:0, right:0, width:200, height:200, pointerEvents:"none", overflow:"hidden" }}>
        <div style={{ position:"absolute", top:-50, right:-50, width:200, height:200,
          background:"linear-gradient(135deg, transparent 40%, rgba(220,20,60,0.04) 40%, rgba(220,20,60,0.04) 50%, transparent 50%)",
          backgroundSize:"20px 20px" }} />
      </div>

      {/* ── Content ── */}
      <div style={{ maxWidth:1300, margin:"0 auto", padding:"0 80px", position:"relative", zIndex:2 }} className="about-container">

        {/* Title */}
        <div style={{ textAlign:"center", marginBottom:64, opacity:visible?1:0, transform:visible?"translateY(0)":"translateY(20px)", transition:"opacity 0.6s ease, transform 0.6s ease" }}>
          <h2 style={{ fontSize:"clamp(32px,4vw,48px)", fontWeight:600, color:"crimson", marginBottom:8, fontFamily:"'Ubuntu', sans-serif" }}>About Me</h2>
          <div style={{ width:48, height:2, background:"linear-gradient(to right, crimson, #ff6b6b)", margin:"0 auto 12px", borderRadius:2 }} />
        </div>

        {/* Main flex */}
        <div style={{ display:"flex", gap:60, alignItems:"flex-start", flexWrap:"wrap" }}>
          <PhotoCard visible={visible} />

          {/* Right */}
          <div style={{ flex:"1 1 320px", minWidth:0, opacity:visible?1:0, transform:visible?"translateX(0)":"translateX(30px)", transition:"opacity 0.7s ease 0.2s, transform 0.7s ease 0.2s" }}>

            <div style={{ fontSize:"clamp(16px,2vw,22px)", fontWeight:700, marginBottom:20, textAlign:"center",
              background:"linear-gradient(to right, #c00020, crimson, #ff4d6d, crimson, #c00020)",
              backgroundSize:"300% auto", WebkitBackgroundClip:"text", WebkitTextFillColor:"transparent",
              backgroundClip:"text", animation:"gradientMove 3s linear infinite" }}>
              Saya, {typed}<span style={{ WebkitTextFillColor:"rgba(0,0,0,0.2)" }}>|</span>
            </div>

            <p style={{ fontSize:14, color:"#555", lineHeight:1.9, marginBottom:14, textAlign:"justify" }}>
              Lulusan S1 Teknik Informatika dari <strong style={{ color:"#111" }}>UNIBI Bandung</strong> dengan IPK{" "}
              <strong style={{ color:"crimson" }}>3.65</strong> dan pengalaman membangun sistem yang aktif berjalan di production.
            </p>
            <p style={{ fontSize:14, color:"#555", lineHeight:1.9, marginBottom:24, textAlign:"justify" }}>
              Selama magang di <strong style={{ color:"#111" }}>Pengadilan Negeri Bale Bandung</strong>, saya membangun{" "}
              <strong style={{ color:"crimson" }}>Aplikasi Layung Peradilan</strong> — mulai dari requirement gathering,
              desain database, development full stack, integrasi Disdukcapil, hingga deployment & maintenance.
            </p>

            {/* Fun facts */}
            <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:8, marginBottom:24 }}>
              {FUN_FACTS.map((f) => (
                <div key={f.text} className="fact-item">
                  <span style={{ fontSize:18, flexShrink:0 }}>{f.icon}</span>
                  <span style={{ fontSize:12, color:"#444", lineHeight:1.5 }}>{f.text}</span>
                </div>
              ))}
            </div>

            {/* Buttons */}
            <div style={{ display:"flex", flexWrap:"wrap", gap:12 }}>
              <a href="./CV/CV__M.TonnyHeruSusanto.pdf" download className="about-dl-btn"
                style={{ background:"linear-gradient(135deg, crimson, #ff4d6d)", color:"white", boxShadow:"0 4px 20px rgba(220,20,60,0.3)" }}
                onMouseEnter={(e) => e.currentTarget.style.boxShadow="0 12px 32px rgba(220,20,60,0.45)"}
                onMouseLeave={(e) => e.currentTarget.style.boxShadow="0 4px 20px rgba(220,20,60,0.3)"}>
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none"><path d="M8 2v9M4 8l4 4 4-4M2 14h12" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
                Download CV
              </a>
              <a href="./CV/sertifikat.pdf" download className="about-dl-btn"
                style={{ background:"white", color:"#444", border:"1.5px solid #e0e0e0", boxShadow:"0 2px 8px rgba(0,0,0,0.06)" }}
                onMouseEnter={(e) => { e.currentTarget.style.borderColor="crimson"; e.currentTarget.style.color="crimson"; e.currentTarget.style.boxShadow="0 4px 16px rgba(220,20,60,0.15)"; }}
                onMouseLeave={(e) => { e.currentTarget.style.borderColor="#e0e0e0"; e.currentTarget.style.color="#444"; e.currentTarget.style.boxShadow="0 2px 8px rgba(0,0,0,0.06)"; }}>
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none"><path d="M8 2v9M4 8l4 4 4-4M2 14h12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
                Download Sertifikat
              </a>
            </div>
          </div>
        </div>
      </div>
      <style>{`@media(max-width:768px){.about-container{padding:0 20px !important;}}`}</style>
    </section>
  );
}