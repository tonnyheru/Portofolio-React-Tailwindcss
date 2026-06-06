import { useState, useEffect, useRef } from "react";
import emailjs from "@emailjs/browser";
import { db, rtdb } from "./firebase";
import { ref, onValue, onDisconnect, set, serverTimestamp as rtServerTimestamp } from "firebase/database";
import { collection, addDoc, onSnapshot, orderBy, query, serverTimestamp } from "firebase/firestore";

/* ─── ONLINE COUNT ─── */
function useOnlineCount() {
  const [count, setCount] = useState(1);
  useEffect(() => {
    const uid = Math.random().toString(36).slice(2);
    const userRef = ref(rtdb, `presence/${uid}`);
    const countRef = ref(rtdb, "presence");
    set(userRef, { online: true, t: rtServerTimestamp() });
    onDisconnect(userRef).remove();
    const unsub = onValue(countRef, (snap) => setCount(snap.size || 1));
    return () => { unsub(); };
  }, []);
  return count;
}

/* ─── CONTACT INFO ─── */
const CONTACTS = [
  { icon: "🐙", label: "GitHub",    text: "github.com/tonnyheru",      href: "https://github.com/tonnyheru" },
  { icon: "📸", label: "Instagram", text: "instagram.com/tonnyheru",   href: "https://instagram.com/tonnyheru" },
  { icon: "💼", label: "LinkedIn",  text: "linkedin.com/in/tonnyheru", href: "https://linkedin.com/in/tonnyheru" },
  { icon: "✉️", label: "Email",     text: "tonnyheru29@gmail.com",     href: "mailto:tonnyheru29@gmail.com" },
  { icon: "📱", label: "Phone",     text: "08562122827",               href: "https://wa.me/628562122827"},
  { icon: "📍", label: "Lokasi",    text: "Bandung",          href: null },
];

export default function ContactSection({ onMessagesChange }) {
  const onlineCount = useOnlineCount();
  const [messages, setMessages]   = useState([]);
  const [chatInput, setChatInput] = useState("");
  const [chatName, setChatName]   = useState("");
  const [name, setName]           = useState("");
  const [email, setEmail]         = useState("");
  const [number, setNumber]       = useState("");
  const [message, setMessage]     = useState("");
  const [sending, setSending]     = useState(false);
  const [sent, setSent]           = useState(false);
  const chatEndRef = useRef(null);
  const sectionRef = useRef(null);
  const [visible, setVisible]     = useState(false);

  /* intersection */
  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) { setVisible(true); obs.disconnect(); } }, { threshold: 0.1 });
    if (sectionRef.current) obs.observe(sectionRef.current);
    return () => obs.disconnect();
  }, []);

  /* firestore chat */
  useEffect(() => {
    const q = query(collection(db, "chatMessages"), orderBy("createdAt", "asc"));
    const unsub = onSnapshot(q, (snap) => {
      const msgs = snap.docs.map(d => ({ id: d.id, ...d.data() }));
      setMessages(msgs);
      onMessagesChange(msgs);
      setTimeout(() => chatEndRef.current?.scrollIntoView({ behavior: "smooth" }), 50);
    });
    return () => unsub();
  }, []);

  const sendChat = async () => {
    const text   = chatInput.trim();
    const sender = chatName.trim() || "Anonim";
    if (!text) return;
    const colors = ["#dc2626","#2563eb","#7c3aed","#059669","#d97706"];
    const color  = colors[Math.floor(Math.random() * colors.length)];
    await addDoc(collection(db, "chatMessages"), { sender, initial: sender[0].toUpperCase(), color, text, createdAt: serverTimestamp() });
    setChatInput("");
  };

  const sendMail = (e) => {
    e.preventDefault();
    setSending(true);
    emailjs.send("service_b7jg21v", "template_4zmqsbi", { name, email, number, message }, "0jzhUedWp_q8iu5tM")
      .then(() => { setSent(true); setName(""); setEmail(""); setNumber(""); setMessage(""); setTimeout(() => setSent(false), 4000); })
      .catch(() => alert("Gagal mengirim. Coba lagi."))
      .finally(() => setSending(false));
  };

  return (
    <section id="contact" ref={sectionRef}
      style={{ padding:"96px 0", fontFamily:"'Poppins', sans-serif", position:"relative", overflow:"hidden",
        background:"linear-gradient(135deg, #fff5f5 0%, #ffffff 40%, #f0f4ff 70%, #fff0f3 100%)" }}>

      <style>{`
        @keyframes floatOrb1c { 0%,100%{transform:translate(0,0)} 50%{transform:translate(-30px,20px)} }
        @keyframes floatOrb2c { 0%,100%{transform:translate(0,0)} 50%{transform:translate(25px,-18px)} }
        @keyframes rotateSlow { from{transform:rotate(0deg)} to{transform:rotate(360deg)} }
        @keyframes msgIn { from{opacity:0;transform:translateY(8px)} to{opacity:1;transform:translateY(0)} }
        .c-input {
          width:100%; border:1.5px solid #eee; border-radius:10px;
          padding:10px 14px; font-size:13px; color:#333; background:white;
          outline:none; transition:border-color 0.2s, box-shadow 0.2s;
          font-family:'Poppins',sans-serif; box-sizing:border-box;
        }
        .c-input:focus { border-color:crimson; box-shadow:0 0 0 3px rgba(220,20,60,0.08); }
        .c-input::placeholder { color:#bbb; }
        .contact-card {
          background:rgba(255,255,255,0.85); border:1px solid rgba(220,20,60,0.1);
          border-radius:20px; overflow:hidden;
          backdrop-filter:blur(12px);
          box-shadow:0 4px 24px rgba(0,0,0,0.06);
          transition: box-shadow 0.3s;
        }
        .contact-card:hover { box-shadow:0 12px 40px rgba(220,20,60,0.1); }
        .card-header {
          padding:16px 20px; display:flex; align-items:center; gap:10px;
          border-bottom:1px solid rgba(220,20,60,0.08);
          background:linear-gradient(135deg, rgba(220,20,60,0.04) 0%, white 100%);
        }
        .chat-bubble-other {
          background:white; border:1px solid #eee; border-radius:12px 12px 12px 2px;
          box-shadow:0 1px 4px rgba(0,0,0,0.05);
        }
        .chat-bubble-self {
          background:linear-gradient(135deg, crimson, #ff4d6d);
          border-radius:12px 12px 2px 12px;
        }
        .chat-scroll::-webkit-scrollbar { width:4px; }
        .chat-scroll::-webkit-scrollbar-thumb { background:#f0d0d5; border-radius:4px; }
        .contact-link { color:#888; text-decoration:none; font-size:13px; transition:color 0.2s; }
        .contact-link:hover { color:crimson; }
        .send-btn {
          width:100%; padding:13px; border-radius:12px; border:none;
          background:linear-gradient(135deg, crimson, #ff4d6d);
          color:white; font-weight:600; font-size:14px; cursor:none;
          transition:transform 0.2s, box-shadow 0.2s;
          display:flex; align-items:center; justify-content:center; gap:8px;
          font-family:'Poppins',sans-serif;
        }
        .send-btn:hover { transform:translateY(-2px); box-shadow:0 8px 24px rgba(220,20,60,0.35); }
        .send-btn:disabled { opacity:0.7; transform:none; }
      `}</style>

      {/* Decorative bg */}
      <div style={{ position:"absolute", top:-80, left:-80, width:400, height:400, borderRadius:"50%", background:"radial-gradient(circle, rgba(220,20,60,0.08) 0%, transparent 65%)", animation:"floatOrb1c 9s ease-in-out infinite", pointerEvents:"none" }} />
      <div style={{ position:"absolute", bottom:-60, right:-60, width:350, height:350, borderRadius:"50%", background:"radial-gradient(circle, rgba(100,120,255,0.07) 0%, transparent 65%)", animation:"floatOrb2c 11s ease-in-out infinite", pointerEvents:"none" }} />
      <div style={{ position:"absolute", inset:0, backgroundImage:"radial-gradient(rgba(220,20,60,0.07) 1.5px, transparent 1.5px)", backgroundSize:"28px 28px", pointerEvents:"none", opacity:0.5 }} />
      <div style={{ position:"absolute", top:40, right:100, width:100, height:100, border:"1px dashed rgba(220,20,60,0.12)", borderRadius:"50%", animation:"rotateSlow 18s linear infinite", pointerEvents:"none" }} />
      <div style={{ position:"absolute", bottom:60, left:60, width:70, height:70, border:"1px dashed rgba(100,120,255,0.12)", borderRadius:"50%", animation:"rotateSlow 14s linear infinite reverse", pointerEvents:"none" }} />

      <div style={{ maxWidth:1300, margin:"0 auto", padding:"0 80px", position:"relative", zIndex:2 }} className="contact-container">

        {/* Title */}
        <div style={{ textAlign:"center", marginBottom:56, opacity:visible?1:0, transform:visible?"translateY(0)":"translateY(20px)", transition:"opacity 0.6s ease, transform 0.6s ease" }}>
          <h2 style={{ fontSize:"clamp(32px,4vw,48px)", fontWeight:600, color:"crimson", marginBottom:8, fontFamily:"'Ubuntu',sans-serif" }}>Contact &amp; Chat</h2>
          <div style={{ width:48, height:2, background:"linear-gradient(to right,crimson,#ff6b6b)", margin:"0 auto 12px", borderRadius:2 }} />
          <p style={{ fontSize:13, color:"#aaa", letterSpacing:"0.12em", textTransform:"uppercase" }}>Hubungi saya atau tinggalkan pesan</p>
        </div>

        {/* Grid */}
        <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:20,
          opacity:visible?1:0, transform:visible?"translateY(0)":"translateY(24px)",
          transition:"opacity 0.7s ease 0.2s, transform 0.7s ease 0.2s" }}
          className="contact-grid">

          {/* ── CHAT ROOM ── */}
          <div className="contact-card" style={{ display:"flex", flexDirection:"column" }}>
            <div className="card-header">
              <span style={{ width:9, height:9, borderRadius:"50%", background:"#22c55e", boxShadow:"0 0 8px #22c55e", animation:"pulseG 2s ease infinite", flexShrink:0 }} />
              <span style={{ fontWeight:600, fontSize:15, color:"#111" }}>Live Chat Room</span>
              <span style={{ marginLeft:"auto", background:"crimson", color:"white", fontSize:11, fontWeight:700, padding:"3px 12px", borderRadius:999 }}>{onlineCount} online</span>
            </div>

            {/* Messages */}
            <div className="chat-scroll" style={{ flex:1, padding:16, height:280, overflowY:"auto", display:"flex", flexDirection:"column", gap:10, background:"rgba(255,250,250,0.6)" }}>
              {messages.length === 0 && (
                <div style={{ margin:"auto", textAlign:"center", color:"#ccc", fontSize:13 }}>
                  <div style={{ fontSize:32, marginBottom:8 }}>💬</div>
                  Belum ada pesan. Jadilah yang pertama!
                </div>
              )}
              {messages.map((m) => (
                <div key={m.id} style={{ display:"flex", alignItems:"flex-start", gap:8, animation:"msgIn 0.3s ease forwards" }}>
                  <div style={{ width:32, height:32, borderRadius:"50%", flexShrink:0, display:"flex", alignItems:"center", justifyContent:"center", fontSize:13, fontWeight:700, color:"white", background:m.color, boxShadow:`0 2px 8px ${m.color}55` }}>{m.initial}</div>
                  <div className="chat-bubble-other" style={{ padding:"8px 12px", maxWidth:"80%" }}>
                    <p style={{ fontSize:11, color:"#aaa", marginBottom:3, fontWeight:600 }}>{m.sender}</p>
                    <p style={{ fontSize:13, color:"#333", lineHeight:1.5 }}>{m.text}</p>
                    <p style={{ fontSize:10, color:"#ccc", marginTop:3 }}>
                      {m.createdAt?.toDate ? `${String(m.createdAt.toDate().getHours()).padStart(2,"0")}:${String(m.createdAt.toDate().getMinutes()).padStart(2,"0")}` : "..."}
                    </p>
                  </div>
                </div>
              ))}
              <div ref={chatEndRef} />
            </div>

            {/* Name input */}
            <div style={{ padding:"10px 14px 0", borderTop:"1px solid rgba(220,20,60,0.07)", background:"white" }}>
              <input className="c-input" value={chatName} onChange={e=>setChatName(e.target.value)} placeholder="Nama kamu..." style={{ fontSize:12, padding:"8px 12px" }} />
            </div>

            {/* Chat input */}
            <div style={{ padding:"8px 14px 14px", background:"white", display:"flex", gap:8 }}>
              <input className="c-input" value={chatInput} onChange={e=>setChatInput(e.target.value)}
                onKeyDown={e=>e.key==="Enter"&&sendChat()} placeholder="Tulis pesan... (Enter untuk kirim)" style={{ flex:1 }} />
              <button onClick={sendChat} style={{ width:40, height:40, borderRadius:10, background:"crimson", border:"none", color:"white", cursor:"none", display:"flex", alignItems:"center", justifyContent:"center", flexShrink:0, transition:"transform 0.2s, box-shadow 0.2s" }}
                onMouseEnter={e=>{ e.currentTarget.style.transform="scale(1.08)"; e.currentTarget.style.boxShadow="0 4px 12px rgba(220,20,60,0.4)"; }}
                onMouseLeave={e=>{ e.currentTarget.style.transform=""; e.currentTarget.style.boxShadow=""; }}>
                <svg width="16" height="16" viewBox="0 0 20 20" fill="white"><path d="M10.894 2.553a1 1 0 00-1.788 0l-7 14a1 1 0 001.169 1.409l5-1.429A1 1 0 009 15.571V11a1 1 0 112 0v4.571a1 1 0 00.725.962l5 1.428a1 1 0 001.17-1.408l-7-14z"/></svg>
              </button>
            </div>
          </div>

          {/* ── FORM + CONTACT INFO ── */}
          <div className="contact-card" style={{ display:"flex", flexDirection:"column" }}>
            <div className="card-header">
              <span style={{ fontSize:16 }}>✉️</span>
              <span style={{ fontWeight:600, fontSize:15, color:"#111" }}>Kirim Pesan</span>
            </div>

            <div style={{ flex:1, overflowY:"auto", padding:"20px 20px 0" }}>
              {/* Contact links */}
              <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:8, marginBottom:20, paddingBottom:20, borderBottom:"1px solid rgba(220,20,60,0.08)" }} className="contact-info-grid">
                {CONTACTS.map((c) => (
                  <div key={c.text} style={{ display:"flex", alignItems:"center", gap:8, padding:"8px 12px", background:"rgba(255,255,255,0.8)", border:"1px solid rgba(220,20,60,0.08)", borderRadius:10, transition:"all 0.2s" }}
                    onMouseEnter={e=>{ e.currentTarget.style.borderColor="rgba(220,20,60,0.25)"; e.currentTarget.style.background="white"; }}
                    onMouseLeave={e=>{ e.currentTarget.style.borderColor="rgba(220,20,60,0.08)"; e.currentTarget.style.background="rgba(255,255,255,0.8)"; }}>
                    <span style={{ fontSize:15, flexShrink:0 }}>{c.icon}</span>
                    {c.href
                      ? <a href={c.href} target="_blank" rel="noopener noreferrer" className="contact-link" style={{ fontSize:12 }}>{c.text}</a>
                      : <span style={{ fontSize:12, color:"#888" }}>{c.text}</span>}
                  </div>
                ))}
              </div>

              {/* Form */}
              <form onSubmit={sendMail} style={{ display:"flex", flexDirection:"column", gap:12 }}>
                {[
                  { label:"Nama",   val:name,    set:setName,    type:"text",  ph:"Nama lengkap",    req:true },
                  { label:"Email",  val:email,   set:setEmail,   type:"email", ph:"email@domain.com",req:true },
                  { label:"No. HP", val:number,  set:setNumber,  type:"text",  ph:"08xx-xxxx-xxxx",  req:false },
                ].map(f=>(
                  <div key={f.label}>
                    <label style={{ display:"block", fontSize:11, fontWeight:700, color:"#aaa", textTransform:"uppercase", letterSpacing:"0.12em", marginBottom:6 }}>{f.label}</label>
                    <input className="c-input" type={f.type} value={f.val} onChange={e=>f.set(e.target.value)} required={f.req} placeholder={f.ph} />
                  </div>
                ))}
                <div>
                  <label style={{ display:"block", fontSize:11, fontWeight:700, color:"#aaa", textTransform:"uppercase", letterSpacing:"0.12em", marginBottom:6 }}>Pesan</label>
                  <textarea className="c-input" value={message} onChange={e=>setMessage(e.target.value)} required placeholder="Tulis pesan..." style={{ resize:"none", height:96 }} />
                </div>

                <button type="submit" className="send-btn" disabled={sending}>
                  {sent ? (
                    <><span>✅</span> Terkirim!</>
                  ) : sending ? (
                    <><span style={{ animation:"rotateSlow 1s linear infinite", display:"inline-block" }}>⏳</span> Mengirim...</>
                  ) : (
                    <><svg width="16" height="16" viewBox="0 0 20 20" fill="white"><path d="M10.894 2.553a1 1 0 00-1.788 0l-7 14a1 1 0 001.169 1.409l5-1.429A1 1 0 009 15.571V11a1 1 0 112 0v4.571a1 1 0 00.725.962l5 1.428a1 1 0 001.17-1.408l-7-14z"/></svg> Kirim Pesan</>
                  )}
                </button>
                <div style={{ height:20 }} />
              </form>
            </div>
          </div>
        </div>
      </div>

      <style>{`
        @keyframes pulseG { 0%,100%{box-shadow:0 0 0 0 rgba(34,197,94,0.5)} 50%{box-shadow:0 0 0 6px rgba(34,197,94,0)} }
        @media(max-width:768px){
          .contact-container{padding:0 20px !important;}
          .contact-grid{grid-template-columns:1fr !important;}
        }
      `}</style>
    </section>
  );
}