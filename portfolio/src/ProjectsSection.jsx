import { useState, useEffect, useRef } from "react";

const PROJECTS = [
  {
    id: 1,
    title: "Layung Peradilan",
    subtitle: "Sistem Administrasi Peradilan",
    category: "Web App",
    featured: true,
    status: "production",
    statusLabel: "Live Production",
    org: "Pengadilan Negeri Bale Bandung",
    duration: "6 Bulan · Feb – Agt 2025",
    role: "Full Stack Developer",
    score: "Nilai 90/100",
    description: "Sistem administrasi peradilan terintegrasi. Terhubung dengan layanan Disdukcapil Cimahi, Kab. Bandung, dan Bandung Barat via RESTful API untuk verifikasi data warga secara otomatis.",
    highlights: ["Requirement gathering dengan pemangku kepentingan","Perancangan database & alur sistem end-to-end","Integrasi RESTful API Disdukcapil Cimahi","Deployment hingga aktif di production","Maintenance & bug fixing pasca deployment"],
    stack: ["PHP","Laravel","MySQL","RESTful API","JavaScript","HTML/CSS","Git"],
    images: [{ src:"./images/login.png",caption:"Halaman Login" },{ src:"./images/dashboard.png",caption:"Dashboard Utama" },{ src:"./images/modul.png",caption:"Halaman Modul" }],
    link: "https://layungperadilan.pn-balebandung.go.id/login",
    linkLabel: "Lihat Langsung",
    color: "#DC143C",
  },
  {
    id: 2,
    title: "Portofolio Website",
    subtitle: "Personal Portfolio & Showcase",
    category: "Frontend",
    featured: false,
    status: "live",
    statusLabel: "Live",
    org: "Personal Project",
    duration: "2026",
    role: "Frontend Developer",
    score: null,
    description: "Website portofolio personal dengan React + Vite + Tailwind CSS. Dilengkapi live chat room Firebase, particle canvas interaktif, custom cursor, dan animated counters.",
    highlights: ["Particle canvas interaktif dengan cursor tracking","Live chat room real-time via Firebase Firestore","Online presence counter dengan Firebase RTDB","Animated skill marquee & 3D tilt cards","EmailJS untuk form kontak langsung"],
    stack: ["React","Vite","Tailwind CSS","Firebase","EmailJS","JavaScript"],
    images: [],
    link: "https://tonnyheru.github.io",
    linkLabel: "Buka Website",
    color: "#4079ff",
  },
  {
    id: 3,
    title: "API Integration Module",
    subtitle: "Disdukcapil Data Verifier",
    category: "Backend",
    featured: false,
    status: "production",
    statusLabel: "Production",
    org: "Pengadilan Negeri Bale Bandung",
    duration: "2025",
    role: "Backend Developer",
    score: null,
    description: "Modul integrasi API yang menghubungkan sistem Layung Peradilan dengan tiga layanan Disdukcapil berbeda untuk verifikasi data kependudukan secara otomatis dan real-time.",
    highlights: ["Konsumsi endpoint API Disdukcapil Cimahi","Validasi NIK & data kependudukan otomatis","Error handling & fallback mechanism","Response caching untuk performa optimal","Logging & monitoring request/response"],
    stack: ["PHP","Laravel","RESTful API","JSON","MySQL","Postman"],
    images: [],
    link: null,
    linkLabel: null,
    color: "#059669",
  },
  {
    id: 4,
    title: "Database Architecture",
    subtitle: "Relational DB Design — Peradilan",
    category: "Backend",
    featured: false,
    status: "production",
    statusLabel: "Production",
    org: "Pengadilan Negeri Bale Bandung",
    duration: "2025",
    role: "Database Engineer",
    score: null,
    description: "Perancangan arsitektur database relasional untuk sistem administrasi peradilan. Mencakup manajemen pengguna, tracking status, laporan digital, dan audit trail.",
    highlights: ["Entity Relationship Diagram (ERD) lengkap","Normalisasi hingga 3NF","Indexing untuk query performance","Stored procedures & views","Audit trail & soft delete mechanism"],
    stack: ["MySQL","SQL","ERD","Laravel Eloquent","PHP"],
    images: [],
    link: null,
    linkLabel: null,
    color: "#7c3aed",
  },
];

const CATEGORIES = ["Semua","Web App","Frontend","Backend"];

function hexToRgb(hex) {
  return `${parseInt(hex.slice(1,3),16)},${parseInt(hex.slice(3,5),16)},${parseInt(hex.slice(5,7),16)}`;
}

function StatusBadge({ status, label }) {
  const colors = {
    production: { bg:"rgba(5,150,105,0.1)", border:"rgba(5,150,105,0.3)", text:"#059669", dot:"#22c55e" },
    live: { bg:"rgba(64,121,255,0.1)", border:"rgba(64,121,255,0.3)", text:"#4079ff", dot:"#3b82f6" },
    default: { bg:"rgba(0,0,0,0.05)", border:"rgba(0,0,0,0.1)", text:"#666", dot:"#aaa" },
  };
  const c = colors[status]||colors.default;
  return (
    <span style={{ display:"inline-flex",alignItems:"center",gap:6,background:c.bg,border:`1px solid ${c.border}`,borderRadius:999,padding:"4px 12px",fontSize:11,fontWeight:600,color:c.text }}>
      <span style={{ width:6,height:6,borderRadius:"50%",background:c.dot,boxShadow:`0 0 6px ${c.dot}` }} />
      {label}
    </span>
  );
}

function ProjectModal({ project, onClose }) {
  const [activeImg, setActiveImg] = useState(0);
  const overlayRef = useRef(null);
  useEffect(() => {
    document.body.style.overflow = "hidden";
    const onKey = (e) => { if (e.key==="Escape") onClose(); };
    window.addEventListener("keydown", onKey);
    return () => { document.body.style.overflow=""; window.removeEventListener("keydown",onKey); };
  }, [onClose]);

  return (
    <div ref={overlayRef} onClick={(e)=>{ if(e.target===overlayRef.current) onClose(); }}
      style={{ position:"fixed",inset:0,zIndex:99999,background:"rgba(0,0,0,0.5)",backdropFilter:"blur(6px)",display:"flex",alignItems:"center",justifyContent:"center",padding:20,animation:"modalFadeIn 0.25s ease forwards" }}>
      <style>{`
        @keyframes modalFadeIn { from{opacity:0} to{opacity:1} }
        @keyframes modalSlideUp { from{opacity:0;transform:translateY(24px) scale(0.97)} to{opacity:1;transform:translateY(0) scale(1)} }
        .modal-scroll::-webkit-scrollbar{width:4px} .modal-scroll::-webkit-scrollbar-thumb{background:#ddd;border-radius:4px}
      `}</style>
      <div style={{ width:"100%",maxWidth:760,maxHeight:"90vh",background:"white",border:"1px solid rgba(0,0,0,0.08)",borderRadius:20,overflow:"hidden",display:"flex",flexDirection:"column",animation:"modalSlideUp 0.3s ease forwards",boxShadow:"0 32px 80px rgba(0,0,0,0.2)" }}>
        {/* Header */}
        <div style={{ padding:"24px 28px 20px",borderBottom:"1px solid #f0f0f0",display:"flex",justifyContent:"space-between",alignItems:"flex-start",gap:16,flexShrink:0,background:`linear-gradient(135deg, rgba(${hexToRgb(project.color)},0.05) 0%, white 60%)` }}>
          <div>
            <div style={{ display:"flex",alignItems:"center",gap:10,marginBottom:8,flexWrap:"wrap" }}>
              <StatusBadge status={project.status} label={project.statusLabel} />
              <span style={{ fontSize:11,fontWeight:600,color:"#888",background:"#f5f5f5",border:"1px solid #eee",borderRadius:999,padding:"4px 12px" }}>{project.category}</span>
              {project.score && <span style={{ fontSize:11,fontWeight:600,background:"rgba(220,20,60,0.08)",border:"1px solid rgba(220,20,60,0.2)",color:"crimson",borderRadius:999,padding:"4px 12px" }}>{project.score}</span>}
            </div>
            <h2 style={{ fontSize:22,fontWeight:700,color:"#111",margin:0,lineHeight:1.2 }}>{project.title}</h2>
            <p style={{ fontSize:13,color:"#888",marginTop:4 }}>{project.subtitle}</p>
          </div>
          <button onClick={onClose} style={{ width:36,height:36,borderRadius:"50%",background:"#f5f5f5",border:"1px solid #eee",color:"#666",fontSize:18,cursor:"none",display:"flex",alignItems:"center",justifyContent:"center",flexShrink:0,transition:"all 0.2s" }}
            onMouseEnter={(e)=>{ e.currentTarget.style.background="rgba(220,20,60,0.1)"; e.currentTarget.style.color="crimson"; }}
            onMouseLeave={(e)=>{ e.currentTarget.style.background="#f5f5f5"; e.currentTarget.style.color="#666"; }}>✕</button>
        </div>
        {/* Body */}
        <div className="modal-scroll" style={{ overflowY:"auto",padding:"24px 28px",display:"flex",flexDirection:"column",gap:20 }}>
          <div style={{ display:"grid",gridTemplateColumns:"repeat(auto-fit,minmax(150px,1fr))",gap:10 }}>
            {[{icon:"🏛️",label:"Organisasi",val:project.org},{icon:"⏱️",label:"Durasi",val:project.duration},{icon:"👤",label:"Peran",val:project.role}].map((m)=>(
              <div key={m.label} style={{ background:"#fafafa",border:"1px solid #f0f0f0",borderRadius:12,padding:"12px 14px" }}>
                <p style={{ fontSize:11,color:"#aaa",marginBottom:4,textTransform:"uppercase",letterSpacing:"0.1em" }}>{m.icon} {m.label}</p>
                <p style={{ fontSize:13,color:"#333",fontWeight:500 }}>{m.val}</p>
              </div>
            ))}
          </div>
          <div>
            <p style={{ fontSize:11,fontWeight:700,color:"#bbb",textTransform:"uppercase",letterSpacing:"0.12em",marginBottom:8 }}>Deskripsi</p>
            <p style={{ fontSize:14,color:"#555",lineHeight:1.8 }}>{project.description}</p>
          </div>
          <div>
            <p style={{ fontSize:11,fontWeight:700,color:"#bbb",textTransform:"uppercase",letterSpacing:"0.12em",marginBottom:10 }}>Yang Dikerjakan</p>
            <div style={{ display:"flex",flexDirection:"column",gap:8 }}>
              {project.highlights.map((h,i)=>(
                <div key={i} style={{ display:"flex",alignItems:"flex-start",gap:10,background:"#fafafa",border:"1px solid #f0f0f0",borderRadius:10,padding:"10px 14px" }}>
                  <span style={{ color:project.color,fontSize:13,marginTop:1,flexShrink:0 }}>›</span>
                  <span style={{ fontSize:13,color:"#555",lineHeight:1.6 }}>{h}</span>
                </div>
              ))}
            </div>
          </div>
          <div>
            <p style={{ fontSize:11,fontWeight:700,color:"#bbb",textTransform:"uppercase",letterSpacing:"0.12em",marginBottom:10 }}>Tech Stack</p>
            <div style={{ display:"flex",flexWrap:"wrap",gap:8 }}>
              {project.stack.map((t)=>(
                <span key={t} style={{ fontSize:12,fontWeight:500,background:`rgba(${hexToRgb(project.color)},0.08)`,border:`1px solid rgba(${hexToRgb(project.color)},0.2)`,color:project.color,borderRadius:8,padding:"5px 12px" }}>{t}</span>
              ))}
            </div>
          </div>
          {project.images.length>0 && (
            <div>
              <p style={{ fontSize:11,fontWeight:700,color:"#bbb",textTransform:"uppercase",letterSpacing:"0.12em",marginBottom:10 }}>Screenshot</p>
              <div style={{ borderRadius:12,overflow:"hidden",background:"#f5f5f5",aspectRatio:"16/9",position:"relative",marginBottom:10 }}>
                <img src={project.images[activeImg].src} alt={project.images[activeImg].caption} style={{ width:"100%",height:"100%",objectFit:"cover" }} />
                <div style={{ position:"absolute",bottom:10,left:"50%",transform:"translateX(-50%)",background:"rgba(0,0,0,0.6)",color:"white",fontSize:11,padding:"4px 12px",borderRadius:999 }}>{project.images[activeImg].caption}</div>
              </div>
              <div style={{ display:"flex",gap:8 }}>
                {project.images.map((img,i)=>(
                  <button key={i} onClick={()=>setActiveImg(i)} style={{ flex:1,aspectRatio:"16/9",borderRadius:8,overflow:"hidden",border:`2px solid ${i===activeImg?project.color:"transparent"}`,transition:"border-color 0.2s",cursor:"none" }}>
                    <img src={img.src} alt={img.caption} style={{ width:"100%",height:"100%",objectFit:"cover" }} />
                  </button>
                ))}
              </div>
            </div>
          )}
          {project.link && (
            <a href={project.link} target="_blank" rel="noopener noreferrer"
              style={{ display:"inline-flex",alignItems:"center",justifyContent:"center",gap:8,padding:"13px 24px",borderRadius:12,background:`linear-gradient(135deg,${project.color},${project.color}cc)`,color:"white",fontWeight:600,fontSize:14,textDecoration:"none",transition:"transform 0.2s,box-shadow 0.2s" }}
              onMouseEnter={(e)=>{ e.currentTarget.style.transform="translateY(-2px)"; e.currentTarget.style.boxShadow=`0 8px 24px rgba(${hexToRgb(project.color)},0.35)`; }}
              onMouseLeave={(e)=>{ e.currentTarget.style.transform=""; e.currentTarget.style.boxShadow=""; }}>
              {project.linkLabel}
              <svg width="14" height="14" viewBox="0 0 14 14" fill="none"><path d="M2 7h10M8 3l4 4-4 4" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
            </a>
          )}
        </div>
      </div>
    </div>
  );
}

function ProjectCard({ project, onClick, delay }) {
  const cardRef = useRef(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const obs = new IntersectionObserver(([e])=>{ if(e.isIntersecting) setVisible(true); },{ threshold:0.1 });
    if(cardRef.current) obs.observe(cardRef.current);
    return () => obs.disconnect();
  }, []);

  const handleMouseMove = (e) => {
    const rect = cardRef.current?.getBoundingClientRect();
    if (!rect) return;
    const x = ((e.clientX-rect.left)/rect.width-0.5)*10;
    const y = ((e.clientY-rect.top)/rect.height-0.5)*-10;
    cardRef.current.style.transform = `perspective(800px) rotateX(${y}deg) rotateY(${x}deg) translateY(-4px)`;
  };

  return (
    <div ref={cardRef} onClick={onClick} onMouseMove={handleMouseMove} onMouseLeave={()=>{ if(cardRef.current) cardRef.current.style.transform=""; }}
      style={{ background:"white", border:`1px solid rgba(0,0,0,0.07)`, borderTop:`3px solid ${project.color}`, borderRadius:18, padding:"22px 24px", cursor:"none", transition:"transform 0.15s ease, box-shadow 0.3s ease, opacity 0.5s ease", transformStyle:"preserve-3d", opacity:visible?1:0, transitionDelay:`${delay}ms`, position:"relative", overflow:"hidden", boxShadow:"0 2px 16px rgba(0,0,0,0.06)" }}
      onMouseEnter={(e)=>{ e.currentTarget.style.boxShadow=`0 20px 48px rgba(${hexToRgb(project.color)},0.15)`; }}
      onMouseLeave={(e)=>{ e.currentTarget.style.boxShadow="0 2px 16px rgba(0,0,0,0.06)"; }}>

      <div style={{ position:"absolute",top:-40,right:-40,width:140,height:140,borderRadius:"50%",background:`radial-gradient(circle, rgba(${hexToRgb(project.color)},0.06) 0%, transparent 70%)`,pointerEvents:"none" }} />

      {project.featured && (
        <div style={{ position:"absolute",top:16,right:16,background:"rgba(220,20,60,0.08)",border:"1px solid rgba(220,20,60,0.2)",color:"crimson",fontSize:10,fontWeight:700,padding:"3px 10px",borderRadius:999,textTransform:"uppercase",letterSpacing:"0.1em" }}>★ Featured</div>
      )}

      <div style={{ marginBottom:14 }}>
        <div style={{ display:"flex",alignItems:"center",gap:8,marginBottom:10,flexWrap:"wrap" }}>
          <StatusBadge status={project.status} label={project.statusLabel} />
          <span style={{ fontSize:10,fontWeight:600,color:"#999",background:"#f5f5f5",border:"1px solid #eee",borderRadius:999,padding:"3px 10px" }}>{project.category}</span>
        </div>
        <h3 style={{ fontSize:17,fontWeight:700,color:"#111",margin:0,lineHeight:1.3 }}>{project.title}</h3>
        <p style={{ fontSize:12,color:"#aaa",marginTop:3 }}>{project.subtitle}</p>
      </div>

      <p style={{ fontSize:13,color:"#666",lineHeight:1.7,marginBottom:16,display:"-webkit-box",WebkitLineClamp:3,WebkitBoxOrient:"vertical",overflow:"hidden" }}>{project.description}</p>

      <div style={{ display:"flex",flexWrap:"wrap",gap:6,marginBottom:18 }}>
        {project.stack.slice(0,4).map((t)=>(
          <span key={t} style={{ fontSize:11,color:"#666",background:"#f5f5f5",border:"1px solid #eee",borderRadius:6,padding:"3px 9px",fontWeight:500 }}>{t}</span>
        ))}
        {project.stack.length>4 && <span style={{ fontSize:11,color:"#aaa",background:"#fafafa",border:"1px solid #eee",borderRadius:6,padding:"3px 9px" }}>+{project.stack.length-4}</span>}
      </div>

      <div style={{ display:"flex",alignItems:"center",justifyContent:"space-between",paddingTop:14,borderTop:"1px solid #f0f0f0" }}>
        <span style={{ fontSize:12,color:"#bbb" }}>{project.org}</span>
        <span style={{ fontSize:12,fontWeight:600,color:project.color,display:"flex",alignItems:"center",gap:5 }}>
          Detail
          <svg width="12" height="12" viewBox="0 0 12 12" fill="none"><path d="M2 6h8M6 2l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
        </span>
      </div>
    </div>
  );
}

export default function ProjectsSection() {
  const [activeFilter, setActiveFilter] = useState("Semua");
  const [selectedProject, setSelectedProject] = useState(null);
  const [titleVisible, setTitleVisible] = useState(false);
  const titleRef = useRef(null);

  useEffect(() => {
    const obs = new IntersectionObserver(([e])=>{ if(e.isIntersecting) setTitleVisible(true); },{ threshold:0.1 });
    if(titleRef.current) obs.observe(titleRef.current);
    return () => obs.disconnect();
  }, []);

  const filtered = activeFilter==="Semua" ? PROJECTS : PROJECTS.filter(p=>p.category===activeFilter);

  return (
    <>
      <style>{`
        .filter-tab{padding:8px 20px;border-radius:999px;font-size:13px;font-weight:600;border:1px solid #e0e0e0;background:white;color:#888;cursor:none;transition:all 0.2s;box-shadow:0 1px 4px rgba(0,0,0,0.05);}
        .filter-tab:hover{color:#333;border-color:#ccc;background:#fafafa;}
        .filter-tab.active{background:crimson;border-color:crimson;color:white;box-shadow:0 4px 16px rgba(220,20,60,0.3);}
      `}</style>
      <section id="featured" style={{ padding:"96px 0", background:"linear-gradient(135deg, #fff5f5 0%, #ffffff 35%, #f0f4ff 65%, #fff0f3 100%)", fontFamily:"'Poppins', sans-serif", position:"relative", overflow:"hidden" }}>
        {/* bg dots */}
        <div style={{ position:"absolute",inset:0,backgroundImage:"radial-gradient(rgba(220,20,60,0.06) 1px, transparent 1px)",backgroundSize:"32px 32px",pointerEvents:"none",opacity:0.7 }} />
        {/* blobs */}
        <div style={{ position:"absolute",top:-100,right:-100,width:500,height:500,borderRadius:"50%",background:"radial-gradient(circle, rgba(220,20,60,0.05) 0%, transparent 65%)",pointerEvents:"none" }} />
        <div style={{ position:"absolute",bottom:-80,left:-80,width:400,height:400,borderRadius:"50%",background:"radial-gradient(circle, rgba(64,121,255,0.04) 0%, transparent 65%)",pointerEvents:"none" }} />

        <div ref={titleRef} style={{ maxWidth:1300,margin:"0 auto",padding:"0 80px",position:"relative" }} className="projects-container">
          {/* Title */}
          <div style={{ textAlign:"center",marginBottom:56,opacity:titleVisible?1:0,transform:titleVisible?"translateY(0)":"translateY(20px)",transition:"opacity 0.6s ease, transform 0.6s ease" }}>
            <h2 style={{ fontSize:"clamp(32px,4vw,48px)",fontWeight:600,color:"crimson",marginBottom:8,fontFamily:"'Ubuntu', sans-serif" }}>Projects</h2>
            <div style={{ width:48,height:2,background:"crimson",margin:"0 auto 12px",borderRadius:2 }} />
            <p style={{ fontSize:13,color:"#aaa",letterSpacing:"0.15em",textTransform:"uppercase" }}>Karya & pengalaman saya</p>
          </div>

          {/* Filter */}
          <div style={{ display:"flex",justifyContent:"center",gap:10,marginBottom:48,flexWrap:"wrap",opacity:titleVisible?1:0,transition:"opacity 0.6s ease 0.2s" }}>
            {CATEGORIES.map((cat)=>(
              <button key={cat} className={`filter-tab ${activeFilter===cat?"active":""}`} onClick={()=>setActiveFilter(cat)}>
                {cat}{cat==="Semua"?` (${PROJECTS.length})`:`  (${PROJECTS.filter(p=>p.category===cat).length})`}
              </button>
            ))}
          </div>

          {/* Grid */}
          <div style={{ display:"grid",gridTemplateColumns:"repeat(auto-fill,minmax(300px,1fr))",gap:20 }}>
            {filtered.map((project,i)=>(
              <ProjectCard key={project.id} project={project} onClick={()=>setSelectedProject(project)} delay={i*80} />
            ))}
          </div>
        </div>

        {selectedProject && <ProjectModal project={selectedProject} onClose={()=>setSelectedProject(null)} />}
        <style>{`@media(max-width:768px){.projects-container{padding:0 20px !important;}}`}</style>
      </section>
    </>
  );
}