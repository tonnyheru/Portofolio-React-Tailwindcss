import { useState, useEffect, useRef } from "react";

/* ─── TIMELINE DATA ─── */
const TIMELINE = [
  {
    id: 1,
    year: "2015",
    type: "education",
    icon: "🏫",
    title: "SMK Medikacom Bandung",
    subtitle: "Jurusan Otomotif",
    period: "2015 – 2018",
    color: "#6366f1",
    description: "Menyelesaikan pendidikan menengah kejuruan di bidang otomotif. Mengembangkan disiplin teknis dan kemampuan analisis masalah.",
    tags: ["Pendidikan", "SMK"],
    highlight: null,
  },
  {
    id: 2,
    year: "2022",
    type: "education",
    icon: "🎓",
    title: "UNIBI Bandung",
    subtitle: "S1 Teknik Informatika",
    period: "2022 – 2026",
    color: "#0ea5e9",
    description: "Menempuh pendidikan S1 Teknik Informatika dengan fokus pada pengembangan perangkat lunak, basis data, dan sistem informasi.",
    tags: ["Pendidikan", "S1", "Teknik Informatika"],
    highlight: "IPK 3.65",
  },
  {
    id: 3,
    year: "Feb 2025",
    type: "work",
    icon: "💼",
    title: "Magang — Full Stack Developer",
    subtitle: "Pengadilan Negeri Bale Bandung",
    period: "Feb 2025 – Agt 2025",
    color: "#DC143C",
    description: "Magang sebagai Full Stack Developer selama 6 bulan. Membangun sistem administrasi peradilan Layung Peradilan dari requirement gathering hingga deployment production.",
    tags: ["Magang", "Full Stack", "Laravel", "PHP", "MySQL", "RESTful API"],
    highlight: "Nilai 90/100",
  },
  {
    id: 4,
    year: "Agt 2025",
    type: "achievement",
    icon: "🚀",
    title: "Layung Peradilan — Go Live",
    subtitle: "Production Deployment",
    period: "Agt 2025",
    color: "#059669",
    description: "Sistem Layung Peradilan berhasil di-deploy ke production dan aktif digunakan oleh Pengadilan Negeri Bale Bandung. Terintegrasi dengan API untuk Disdukcapil Cimahi.",
    tags: ["Production", "Deployment", "Achievement"],
    highlight: "Live hingga sekarang",
  },
  {
    id: 5,
    year: "2026",
    type: "education",
    icon: "🏆",
    title: "Lulus S1 Teknik Informatika",
    subtitle: "UNIBI Bandung",
    period: "2026",
    color: "#f59e0b",
    description: "Menyelesaikan studi S1 Teknik Informatika di UNIBI Bandung dengan IPK 3.65. Siap terjun ke dunia profesional sebagai Full Stack Developer.",
    tags: ["Lulus", "S.Kom", "Fresh Graduate"],
    highlight: "IPK 3.65",
  },
  {
    id: 6,
    year: "Sekarang",
    type: "current",
    icon: "🎯",
    title: "Open to Work",
    subtitle: "Bandung",
    period: "2026",
    color: "#22c55e",
    description: "Aktif mencari peluang kerja sebagai Full Stack Developer atau Web Developer. Siap berkontribusi dan terus belajar teknologi baru.",
    tags: ["Available", "Full Stack", "Remote Friendly"],
    highlight: "Tersedia sekarang",
  },
];

const TYPE_COLORS = {
  education: "#0ea5e9",
  work: "#DC143C",
  achievement: "#059669",
  current: "#22c55e",
};

const TYPE_LABELS = {
  education: "Pendidikan",
  work: "Pengalaman",
  achievement: "Pencapaian",
  current: "Status",
};

/* ─── USEOBSERVER ─── */
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

/* ─── SKILL TAG ─── */
function SkillTag({ label, color, icon }) {
  return (
    <div style={{
      display: "inline-flex", alignItems: "center", gap: 8,
      border: `1.5px solid ${color}`,
      borderRadius: 999, padding: "6px 14px",
      background: `${color}12`,
      transition: "transform 0.2s, box-shadow 0.2s",
      cursor: "none",
    }}
    onMouseEnter={e => { e.currentTarget.style.transform = "translateY(-2px)"; e.currentTarget.style.boxShadow = `0 4px 14px ${color}40`; }}
    onMouseLeave={e => { e.currentTarget.style.transform = ""; e.currentTarget.style.boxShadow = ""; }}>
      <img src={`https://cdn.simpleicons.org/${icon}/${color.replace("#","")}`} alt={label}
        style={{ width: 14, height: 14, objectFit: "contain", flexShrink: 0 }} />
      <span style={{ fontSize: 12, fontWeight: 600, color, whiteSpace: "nowrap" }}>{label}</span>
    </div>
  );
}

/* ─── TIMELINE NODE ─── */
function TimelineNode({ item, index, isActive, onClick }) {
  const nodeRef = useRef(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) setVisible(true); },
      { threshold: 0.2 }
    );
    if (nodeRef.current) obs.observe(nodeRef.current);
    return () => obs.disconnect();
  }, []);

  return (
    <>
      <style>{`
        @media (max-width: 600px) {
          .timeline-node { flex-direction: row !important; }
          .timeline-card-wrap { padding: 0 0 0 16px !important; justify-content: flex-start !important; }
          .timeline-empty { display: none !important; }
        }
      `}</style>
      <div
        ref={nodeRef}
        onClick={onClick}
        className="timeline-node"
        style={{
          display: "flex",
          flexDirection: index % 2 === 0 ? "row" : "row-reverse",
          alignItems: "flex-start",
          gap: 0,
          opacity: visible ? 1 : 0,
          transform: visible ? "translateY(0)" : "translateY(24px)",
          transition: `opacity 0.5s ease ${index * 0.1}s, transform 0.5s ease ${index * 0.1}s`,
          cursor: "none",
          marginBottom: 8,
        }}
      >
        {/* Card side */}
        <div className="timeline-card-wrap" style={{
          flex: 1,
          padding: index % 2 === 0 ? "0 28px 0 0" : "0 0 0 28px",
          display: "flex",
          justifyContent: index % 2 === 0 ? "flex-end" : "flex-start",
        }}>
        <div
          style={{
            maxWidth: 320,
            background: isActive ? `rgba(${hexToRgb(item.color)},0.1)` : "rgba(255,255,255,0.03)",
            border: `1px solid ${isActive ? `rgba(${hexToRgb(item.color)},0.4)` : "rgba(255,255,255,0.08)"}`,
            borderRadius: 14,
            padding: "16px 18px",
            transition: "all 0.3s ease",
            boxShadow: isActive ? `0 8px 32px rgba(${hexToRgb(item.color)},0.15)` : "none",
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 8, flexWrap: "wrap" }}>
            <span style={{
              fontSize: 10, fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.1em",
              color: item.color, background: `rgba(${hexToRgb(item.color)},0.1)`,
              border: `1px solid rgba(${hexToRgb(item.color)},0.25)`,
              borderRadius: 999, padding: "2px 10px", filter: "brightness(1.3)",
            }}>{TYPE_LABELS[item.type]}</span>
            {item.highlight && (
              <span style={{
                fontSize: 10, fontWeight: 700,
                color: "rgba(255,255,255,0.7)",
                background: "rgba(255,255,255,0.06)",
                borderRadius: 999, padding: "2px 10px",
              }}>✦ {item.highlight}</span>
            )}
          </div>

          <h4 style={{ fontSize: 14, fontWeight: 700, color: "white", margin: "0 0 3px", lineHeight: 1.3 }}>{item.title}</h4>
          <p style={{ fontSize: 12, color: item.color, marginBottom: 6, fontWeight: 500, filter: "brightness(1.3)" }}>{item.subtitle}</p>
          <p style={{ fontSize: 11, color: "rgba(255,255,255,0.35)", marginBottom: isActive ? 10 : 0 }}>{item.period}</p>

          {isActive && (
            <div style={{ borderTop: "1px solid rgba(255,255,255,0.07)", paddingTop: 10, marginTop: 4 }}>
              <p style={{ fontSize: 12, color: "rgba(255,255,255,0.6)", lineHeight: 1.7, marginBottom: 10, textAlign: "justify" }}>{item.description}</p>
              <div style={{ display: "flex", flexWrap: "wrap", gap: 6 }}>
                {item.tags.map((t) => (
                  <span key={t} style={{
                    fontSize: 10, color: "rgba(255,255,255,0.4)",
                    background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.08)",
                    borderRadius: 6, padding: "2px 8px",
                  }}>{t}</span>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Center dot */}
      <div style={{
        width: 44, flexShrink: 0,
        display: "flex", flexDirection: "column", alignItems: "center",
        paddingTop: 14,
      }}>
        <div style={{
          width: isActive ? 40 : 32,
          height: isActive ? 40 : 32,
          borderRadius: "50%",
          background: isActive ? item.color : `rgba(${hexToRgb(item.color)},0.15)`,
          border: `2px solid ${isActive ? item.color : `rgba(${hexToRgb(item.color)},0.4)`}`,
          display: "flex", alignItems: "center", justifyContent: "center",
          fontSize: isActive ? 16 : 13,
          transition: "all 0.3s ease",
          boxShadow: isActive ? `0 0 20px rgba(${hexToRgb(item.color)},0.5)` : "none",
          zIndex: 2, position: "relative",
        }}>
          {item.icon}
        </div>
      </div>

      {/* Empty opposite side */}
      <div className="timeline-empty" style={{ flex: 1 }} />
    </div>
    </>
  );
}

function hexToRgb(hex) {
  const r = parseInt(hex.slice(1, 3), 16);
  const g = parseInt(hex.slice(3, 5), 16);
  const b = parseInt(hex.slice(5, 7), 16);
  return `${r},${g},${b}`;
}

/* ─── MAIN SECTION ─── */
export default function ResumeSection() {
  const [activeId, setActiveId] = useState(3);
  const [titleRef, titleInView] = useInView(0.1);

  const SKILLS = [
    { label: "PHP",              color: "#8892bf", icon: "php" },
    { label: "Laravel",          color: "#FF2D20", icon: "laravel" },
    { label: "MySQL",            color: "#4479A1", icon: "mysql" },
    { label: "HTML5",            color: "#E34F26", icon: "html5" },
    { label: "CSS3",             color: "#1572B6", icon: "css" },
    { label: "JavaScript",       color: "#F7DF1E", icon: "javascript" },
    { label: "RESTful API",      color: "#FF6C37", icon: "postman" },
    { label: "Git",              color: "#F05032", icon: "git" },
    { label: "React",            color: "#61DAFB", icon: "react" },
    { label: "Vite",             color: "#646CFF", icon: "vite" },
    { label: "Firebase",         color: "#FFCA28", icon: "firebase" },
    { label: "Photoshop",        color: "#31A8FF", icon: "adobephotoshop" },
  ];

  return (
    <section
      id="resume"
      style={{
        padding: "96px 0",
        background: "#0d0d12",
        fontFamily: "'Poppins', sans-serif",
        position: "relative",
        overflow: "hidden",
      }}
    >
      {/* bg glows */}
      <div style={{
        position: "absolute", top: "20%", left: "50%", transform: "translateX(-50%)",
        width: 600, height: 600, borderRadius: "50%", pointerEvents: "none",
        background: "radial-gradient(circle, rgba(220,20,60,0.04) 0%, transparent 60%)",
      }} />

      <div style={{ maxWidth: 1300, margin: "0 auto", padding: "0 80px" }} className="resume-container">

        {/* Title */}
        <div
          ref={titleRef}
          style={{
            textAlign: "center", marginBottom: 64,
            opacity: titleInView ? 1 : 0,
            transform: titleInView ? "translateY(0)" : "translateY(20px)",
            transition: "opacity 0.6s ease, transform 0.6s ease",
          }}
        >
          <h2 style={{
            fontSize: "clamp(32px,4vw,48px)", fontWeight: 600,
            color: "crimson", marginBottom: 8,
            fontFamily: "'Ubuntu', sans-serif",
          }}>Resume</h2>
          <div style={{ width: 48, height: 2, background: "crimson", margin: "0 auto 12px", borderRadius: 2 }} />
          <p style={{ fontSize: 13, color: "rgba(255,255,255,0.3)", letterSpacing: "0.15em", textTransform: "uppercase" }}>
            Latar belakang & pengalaman saya
          </p>
        </div>

        {/* Main grid */}
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 48, alignItems: "start" }} className="resume-grid">

          {/* LEFT — Timeline */}
          <div>
            <p style={{
              fontSize: 11, fontWeight: 700, color: "rgba(255,255,255,0.25)",
              textTransform: "uppercase", letterSpacing: "0.18em", marginBottom: 32,
              display: "flex", alignItems: "center", gap: 10,
            }}>
              <span style={{ flex: 1, height: 1, background: "rgba(255,255,255,0.06)" }} />
              Perjalanan Karir
              <span style={{ flex: 1, height: 1, background: "rgba(255,255,255,0.06)" }} />
            </p>

            {/* Timeline */}
            <div style={{ position: "relative" }}>
              {/* Vertical line */}
              <div style={{
                position: "absolute",
                left: "50%", top: 20, bottom: 20,
                width: 2,
                background: "linear-gradient(to bottom, transparent, rgba(220,20,60,0.3) 15%, rgba(220,20,60,0.3) 85%, transparent)",
                transform: "translateX(-50%)",
                zIndex: 1,
              }} />

              {TIMELINE.map((item, i) => (
                <TimelineNode
                  key={item.id}
                  item={item}
                  index={i}
                  isActive={activeId === item.id}
                  onClick={() => setActiveId(activeId === item.id ? null : item.id)}
                />
              ))}
            </div>
          </div>

          {/* RIGHT — Profile + Skills + Contact */}
          <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>

            {/* Profile */}
            <div style={{
              background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.08)",
              borderRadius: 18, padding: "24px 24px",
              opacity: titleInView ? 1 : 0,
              transform: titleInView ? "translateY(0)" : "translateY(20px)",
              transition: "opacity 0.6s ease 0.2s, transform 0.6s ease 0.2s",
            }}>
              <h3 style={{
                fontSize: 11, fontWeight: 700, color: "crimson",
                textTransform: "uppercase", letterSpacing: "0.14em", marginBottom: 14,
                display: "flex", alignItems: "center", gap: 8,
              }}>
                <span>👤</span> Profil
              </h3>
              <p style={{ fontSize: 13, color: "rgba(255,255,255,0.6)", lineHeight: 1.85, textAlign: "justify" }}>
                Fresh graduate S1 Teknik Informatika dengan pengalaman nyata membangun sistem yang aktif di
                production. Memahami alur pengembangan end-to-end, integrasi API, dan pengelolaan database MySQL.
                Senang belajar hal baru dan siap berkontribusi sesuai kebutuhan perusahaan.
              </p>
            </div>

            {/* Skills */}
            <div
              style={{
                background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.08)",
                borderRadius: 18, padding: "24px 24px",
                opacity: titleInView ? 1 : 0,
                transform: titleInView ? "translateY(0)" : "translateY(20px)",
                transition: "opacity 0.6s ease 0.35s, transform 0.6s ease 0.35s",
              }}
            >
              <h3 style={{
                fontSize: 11, fontWeight: 700, color: "crimson",
                textTransform: "uppercase", letterSpacing: "0.14em", marginBottom: 18,
                display: "flex", alignItems: "center", gap: 8,
              }}>
                <span>💻</span> Tech Skills
              </h3>
              <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
                {SKILLS.map((s) => (
                  <SkillTag key={s.label} {...s} />
                ))}
              </div>
            </div>

            {/* Soft skills */}
            <div style={{
              background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.08)",
              borderRadius: 18, padding: "24px 24px",
              opacity: titleInView ? 1 : 0,
              transform: titleInView ? "translateY(0)" : "translateY(20px)",
              transition: "opacity 0.6s ease 0.5s, transform 0.6s ease 0.5s",
            }}>
              <h3 style={{
                fontSize: 11, fontWeight: 700, color: "crimson",
                textTransform: "uppercase", letterSpacing: "0.14em", marginBottom: 14,
                display: "flex", alignItems: "center", gap: 8,
              }}>
                <span>🧠</span> Soft Skills
              </h3>
              <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
                {["Analisis Kebutuhan Sistem", "Problem Solving", "Komunikasi Teknis", "Manajemen Proyek Mandiri", "Adaptabilitas", "Fast Learner"].map((s) => (
                  <span key={s} style={{
                    fontSize: 12, color: "rgba(255,255,255,0.6)",
                    background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.09)",
                    borderRadius: 8, padding: "6px 12px", fontWeight: 500,
                  }}>{s}</span>
                ))}
              </div>
            </div>

            {/* Contact */}
            <div style={{
              background: "rgba(220,20,60,0.05)", border: "1px solid rgba(220,20,60,0.15)",
              borderRadius: 18, padding: "20px 24px",
              opacity: titleInView ? 1 : 0,
              transform: titleInView ? "translateY(0)" : "translateY(20px)",
              transition: "opacity 0.6s ease 0.6s, transform 0.6s ease 0.6s",
            }}>
              <h3 style={{
                fontSize: 11, fontWeight: 700, color: "crimson",
                textTransform: "uppercase", letterSpacing: "0.14em", marginBottom: 14,
                display: "flex", alignItems: "center", gap: 8,
              }}>
                <span>📞</span> Kontak
              </h3>
              <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
                {[
                  { icon: "📱", label: "08562122827" },
                  { icon: "✉️", label: "tonnyheru29@gmail.com" },
                  { icon: "📍", label: "Sekeloa, Coblong, Bandung" },
                ].map((c) => (
                  <div key={c.label} style={{ display: "flex", alignItems: "center", gap: 10 }}>
                    <span style={{ fontSize: 14 }}>{c.icon}</span>
                    <span style={{ fontSize: 13, color: "rgba(255,255,255,0.6)" }}>{c.label}</span>
                  </div>
                ))}
              </div>
            </div>

          </div>
        </div>
      </div>

      <style>{`
        @media (max-width: 900px) {
          .resume-container { padding: 0 20px !important; }
          .resume-grid { grid-template-columns: 1fr !important; gap: 32px !important; }
        }
      `}</style>
    </section>
  );
}