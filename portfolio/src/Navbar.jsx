import { useState, useEffect } from "react";

const NAV_ITEMS = [
  { id: "home",     label: "Home" },
  { id: "about",    label: "About" },
  { id: "skills",   label: "Tools", hasMega: true },
  { id: "featured", label: "Project" },
  { id: "resume",   label: "Resume" },
  { id: "contact",  label: "Contact" },
];

const TECH_STACK = ["HTML","CSS","JavaScript","PHP","Python","Laravel","Flutter","MySQL","Firebase","Google Cloud","Figma","OpenAI"];

export default function Navbar({ active }) {
  const [scrolled, setScrolled]   = useState(false);
  const [scrollPct, setScrollPct] = useState(0);
  const [open, setOpen]           = useState(false);
  const [megaOpen, setMegaOpen]   = useState(false);

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 30);
      const total = document.body.scrollHeight - window.innerHeight;
      setScrollPct(total > 0 ? (window.scrollY / total) * 100 : 0);
    };
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const scrollTo = (id) => {
    const el = document.getElementById(id);
    if (!el) return;
    const nav    = document.querySelector("nav");
    const offset = el.getBoundingClientRect().top + window.scrollY - (nav?.offsetHeight ?? 70);
    window.scrollTo({ top: offset, behavior: "smooth" });
    setOpen(false);
    setMegaOpen(false);
  };

  /* which section is "light" so we can invert logo text */
  const lightSections = ["about", "featured", "contact"];
  const isLight = lightSections.includes(active);

  return (
    <>
      <style>{`
        @keyframes navSlideDown {
          from { opacity:0; transform:translateY(-12px); }
          to   { opacity:1; transform:translateY(0); }
        }
        @keyframes megaIn {
          from { opacity:0; transform:translateX(-50%) translateY(-8px); }
          to   { opacity:1; transform:translateX(-50%) translateY(0); }
        }
        @keyframes drawerIn {
          from { transform:translateX(-100%); }
          to   { transform:translateX(0); }
        }
        .nav-link {
          position:relative; padding:8px 14px; border-radius:10px;
          font-size:15px; font-weight:500; border:none; background:transparent;
          cursor:none; transition:color 0.2s, background 0.2s;
          display:flex; align-items:center; gap:5px;
          font-family:'Ubuntu',sans-serif;
        }
        .nav-link::after {
          content:''; position:absolute; bottom:4px; left:14px; right:14px;
          height:2px; border-radius:1px; background:crimson;
          transform:scaleX(0); transition:transform 0.25s ease;
          transform-origin:center;
        }
        .nav-link.active::after,
        .nav-link:hover::after { transform:scaleX(1); }
        .tech-tag {
          background:rgba(255,255,255,0.06); border:1px solid rgba(255,255,255,0.1);
          border-radius:8px; padding:5px 11px; font-size:11px; font-weight:500;
          color:rgba(255,255,255,0.65); cursor:none;
          transition:background 0.2s, color 0.2s, border-color 0.2s;
        }
        .tech-tag:hover {
          background:rgba(220,20,60,0.12); border-color:rgba(220,20,60,0.35); color:white;
        }
        .mobile-link {
          width:100%; text-align:left; padding:13px 16px; border-radius:12px;
          font-size:15px; font-weight:500; border:none; background:transparent;
          color:rgba(255,255,255,0.8); cursor:none;
          transition:background 0.2s, color 0.2s; font-family:'Ubuntu',sans-serif;
          display:flex; align-items:center; justify-content:space-between;
        }
        .mobile-link:hover, .mobile-link.active {
          background:rgba(220,20,60,0.1); color:white;
        }
        .mobile-link.active { color:crimson; }
      `}</style>

      <nav style={{
        position:"fixed", top:0, left:0, width:"100%", zIndex:999,
        transition:"all 0.35s ease",
        padding: scrolled ? "10px 0" : "18px 0",
        background: scrolled
          ? "rgba(8,8,12,0.82)"
          : "transparent",
        backdropFilter: scrolled ? "blur(20px) saturate(180%)" : "none",
        WebkitBackdropFilter: scrolled ? "blur(20px) saturate(180%)" : "none",
        borderBottom: scrolled ? "1px solid rgba(255,255,255,0.06)" : "1px solid transparent",
        boxShadow: scrolled ? "0 4px 32px rgba(0,0,0,0.35)" : "none",
        animation: "navSlideDown 0.5s ease",
      }}>

        {/* Scroll progress line */}
        <div style={{
          position:"absolute", top:0, left:0, height:2,
          width:`${scrollPct}%`,
          background:"linear-gradient(to right, crimson, #ff6b6b)",
          boxShadow:"0 0 8px rgba(220,20,60,0.6)",
          transition:"width 0.1s linear",
          zIndex:1,
        }} />

        <div style={{ maxWidth:1300, margin:"0 auto", padding:"0 40px", display:"flex", alignItems:"center", justifyContent:"space-between" }} className="nav-inner">

          {/* Logo */}
          <button onClick={() => scrollTo("home")} style={{ background:"none", border:"none", cursor:"none", lineHeight:1 }}>
            <span style={{ fontSize:26, fontWeight:700, color:"white", fontFamily:"'Ubuntu',sans-serif" }}>
              Porto<span style={{ color:"crimson", fontSize:22 }}>folio</span>
            </span>
          </button>

          {/* Desktop links */}
          <ul style={{ display:"flex", alignItems:"center", gap:2, listStyle:"none", margin:0, padding:0 }} className="nav-desktop">
            {NAV_ITEMS.map((item) => (
              <li key={item.id} style={{ position:"relative" }}
                onMouseEnter={() => item.hasMega && setMegaOpen(true)}
                onMouseLeave={() => item.hasMega && setMegaOpen(false)}>
                <button
                  onClick={() => scrollTo(item.id)}
                  className={`nav-link ${active === item.id ? "active" : ""}`}
                  style={{ color: active === item.id ? "crimson" : "rgba(255,255,255,0.85)" }}
                >
                  {item.label}
                  {item.hasMega && (
                    <svg style={{ width:10, height:10, opacity:0.6, transition:"transform 0.25s", transform: megaOpen?"rotate(180deg)":"rotate(0deg)" }} viewBox="0 0 12 8" fill="none">
                      <path d="M1 1l5 5 5-5" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  )}
                </button>

                {/* Mega menu */}
                {item.hasMega && (
                  <div style={{
                    position:"absolute", top:"calc(100% + 14px)", left:"50%",
                    width:580,
                    background:"rgba(12,12,18,0.96)",
                    backdropFilter:"blur(24px)",
                    border:"1px solid rgba(255,255,255,0.08)",
                    borderRadius:20, padding:20,
                    boxShadow:"0 24px 60px rgba(0,0,0,0.7)",
                    opacity: megaOpen ? 1 : 0,
                    pointerEvents: megaOpen ? "auto" : "none",
                    animation: megaOpen ? "megaIn 0.25s ease forwards" : "none",
                    transform:"translateX(-50%)",
                  }}>
                    {/* Arrow tip */}
                    <div style={{ position:"absolute", top:-6, left:"50%", transform:"translateX(-50%) rotate(45deg)", width:12, height:12, background:"rgba(12,12,18,0.96)", borderLeft:"1px solid rgba(255,255,255,0.08)", borderTop:"1px solid rgba(255,255,255,0.08)" }} />

                    <div style={{ display:"flex", gap:0 }}>
                      {/* Col 1 */}
                      <div style={{ width:190, flexShrink:0, paddingRight:16 }}>
                        <p style={{ fontSize:10, fontWeight:700, letterSpacing:"0.15em", textTransform:"uppercase", color:"crimson", marginBottom:12 }}>My Skills</p>
                        {[
                          { icon:"👨‍💻", title:"Full Stack Dev", sub:"Lihat semua skill saya" },
                          { icon:"📊", title:"Tool Groups",   sub:"Language, DB, AI & Design" },
                        ].map(item => (
                          <button key={item.title} onClick={() => scrollTo("skills")}
                            style={{ display:"flex", alignItems:"center", gap:10, padding:"10px", borderRadius:12, background:"transparent", border:"none", cursor:"none", width:"100%", textAlign:"left", transition:"background 0.2s", marginBottom:4 }}
                            onMouseEnter={e => e.currentTarget.style.background="rgba(255,255,255,0.05)"}
                            onMouseLeave={e => e.currentTarget.style.background="transparent"}>
                            <div style={{ width:32, height:32, background:"rgba(255,255,255,0.06)", borderRadius:9, display:"flex", alignItems:"center", justifyContent:"center", fontSize:15, flexShrink:0 }}>{item.icon}</div>
                            <div>
                              <p style={{ fontSize:13, fontWeight:600, color:"rgba(255,255,255,0.9)", margin:0 }}>{item.title}</p>
                              <p style={{ fontSize:11, color:"rgba(255,255,255,0.35)", margin:"2px 0 0" }}>{item.sub}</p>
                            </div>
                          </button>
                        ))}
                        <a href="https://github.com/tonnyheru" target="_blank" rel="noopener noreferrer"
                          style={{ display:"flex", alignItems:"center", gap:10, padding:"10px", borderRadius:12, textDecoration:"none", transition:"background 0.2s" }}
                          onMouseEnter={e => e.currentTarget.style.background="rgba(255,255,255,0.05)"}
                          onMouseLeave={e => e.currentTarget.style.background="transparent"}>
                          <div style={{ width:32, height:32, background:"rgba(255,255,255,0.06)", borderRadius:9, display:"flex", alignItems:"center", justifyContent:"center", flexShrink:0 }}>
                            <img src="https://cdn.simpleicons.org/github/ffffff" alt="GitHub" style={{ width:16, height:16 }} />
                          </div>
                          <div>
                            <p style={{ fontSize:13, fontWeight:600, color:"rgba(255,255,255,0.9)", margin:0 }}>GitHub</p>
                            <p style={{ fontSize:11, color:"rgba(255,255,255,0.35)", margin:"2px 0 0" }}>tonnyheru · Lihat repositori →</p>
                          </div>
                        </a>
                      </div>

                      {/* Divider */}
                      <div style={{ width:1, background:"rgba(255,255,255,0.07)", margin:"0 16px" }} />

                      {/* Col 2 */}
                      <div style={{ flex:1 }}>
                        <p style={{ fontSize:10, fontWeight:700, letterSpacing:"0.15em", textTransform:"uppercase", color:"crimson", marginBottom:12 }}>Tech Stack</p>
                        <div style={{ display:"flex", flexWrap:"wrap", gap:6, marginBottom:12 }}>
                          {TECH_STACK.map(t => (
                            <button key={t} className="tech-tag" onClick={() => scrollTo("skills")}>{t}</button>
                          ))}
                        </div>
                        <button onClick={() => scrollTo("skills")} style={{ fontSize:11, fontWeight:700, color:"crimson", background:"none", border:"none", cursor:"none", padding:0, transition:"opacity 0.2s" }}
                          onMouseEnter={e=>e.currentTarget.style.opacity="0.7"}
                          onMouseLeave={e=>e.currentTarget.style.opacity="1"}>
                          Lihat semua teknologi →
                        </button>
                      </div>
                    </div>
                  </div>
                )}
              </li>
            ))}
          </ul>

          {/* Burger */}
          <button
            onClick={() => setOpen(!open)}
            style={{ display:"none", background:"none", border:"1px solid rgba(255,255,255,0.15)", borderRadius:10, width:40, height:40, alignItems:"center", justifyContent:"center", cursor:"none", color:"white", fontSize:18, transition:"border-color 0.2s" }}
            className="nav-burger"
            onMouseEnter={e=>e.currentTarget.style.borderColor="rgba(220,20,60,0.5)"}
            onMouseLeave={e=>e.currentTarget.style.borderColor="rgba(255,255,255,0.15)"}>
            {open ? "✕" : "☰"}
          </button>
        </div>
      </nav>

      {/* Mobile drawer */}
      {open && (
        <div style={{ position:"fixed", inset:0, zIndex:9998 }}>
          {/* Overlay */}
          <div onClick={() => setOpen(false)} style={{ position:"absolute", inset:0, background:"rgba(0,0,0,0.6)", backdropFilter:"blur(4px)" }} />

          {/* Drawer */}
          <div style={{
            position:"absolute", top:0, left:0, width:"72%", maxWidth:320, height:"100%",
            background:"rgba(10,10,16,0.98)", backdropFilter:"blur(24px)",
            borderRight:"1px solid rgba(255,255,255,0.07)",
            padding:"80px 20px 40px",
            display:"flex", flexDirection:"column", gap:4,
            animation:"drawerIn 0.28s ease forwards",
          }}>
            {/* Logo in drawer */}
            <p style={{ fontSize:22, fontWeight:700, color:"white", marginBottom:20, fontFamily:"'Ubuntu',sans-serif", paddingLeft:4 }}>
              Porto<span style={{ color:"crimson" }}>folio</span>
            </p>

            {NAV_ITEMS.map(item => (
              <button key={item.id} className={`mobile-link ${active===item.id?"active":""}`} onClick={() => scrollTo(item.id)}>
                {item.label}
                <svg width="14" height="14" viewBox="0 0 14 14" fill="none" style={{ opacity:0.3 }}>
                  <path d="M2 7h10M8 3l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </button>
            ))}

            <div style={{ marginTop:"auto", paddingTop:20, borderTop:"1px solid rgba(255,255,255,0.07)" }}>
              <a href="https://github.com/tonnyheru" target="_blank" rel="noopener noreferrer"
                style={{ display:"flex", alignItems:"center", gap:10, color:"rgba(255,255,255,0.5)", textDecoration:"none", fontSize:13, padding:"10px 16px", borderRadius:12, transition:"background 0.2s" }}
                onMouseEnter={e=>e.currentTarget.style.background="rgba(255,255,255,0.05)"}
                onMouseLeave={e=>e.currentTarget.style.background="transparent"}>
                <img src="https://cdn.simpleicons.org/github/ffffff" alt="GitHub" style={{ width:18, height:18, opacity:0.6 }} />
                github.com/tonnyheru
              </a>
            </div>
          </div>
        </div>
      )}

      <style>{`
        @media(max-width:768px){
          .nav-desktop { display:none !important; }
          .nav-burger  { display:flex !important; }
          .nav-inner   { padding:0 20px !important; }
        }
      `}</style>
    </>
  );
}