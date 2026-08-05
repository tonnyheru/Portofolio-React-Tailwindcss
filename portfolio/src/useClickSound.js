import { useRef, useCallback, useEffect, useState } from "react";

/**
 * useClickSound
 * ─────────────────────────────────────────────
 * Menghasilkan suara "digital blip" pendek & halus menggunakan Web Audio API
 * (disintesis langsung di browser — tidak perlu file .mp3/.wav).
 *
 * - playClick(): panggil ini di onClick manapun untuk memicu suara
 * - muted / setMuted: state untuk toggle mute (tersimpan di localStorage)
 *
 * Suara dibuat dari square wave pendek (±40ms) dengan volume rendah,
 * mirip bunyi UI digital — bukan rekaman, jadi ringan & konsisten.
 */
export function useClickSound() {
  const ctxRef = useRef(null);

  const [muted, setMuted] = useState(() => {
    try {
      return localStorage.getItem("clickSoundMuted") === "true";
    } catch {
      return false;
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem("clickSoundMuted", muted ? "true" : "false");
    } catch {
      /* ignore storage errors (e.g. private browsing) */
    }
  }, [muted]);

  const getCtx = useCallback(() => {
    if (!ctxRef.current) {
      const AudioCtx = window.AudioContext || window.webkitAudioContext;
      if (!AudioCtx) return null;
      ctxRef.current = new AudioCtx();
    }
    // Browser mem-suspend AudioContext sampai ada interaksi user — resume di sini aman
    // karena playClick() sendiri selalu dipanggil dari dalam event klik user.
    if (ctxRef.current.state === "suspended") {
      ctxRef.current.resume();
    }
    return ctxRef.current;
  }, []);

  const playClick = useCallback(() => {
    if (muted) return;
    const ctx = getCtx();
    if (!ctx) return; // browser tidak support Web Audio API

    const now = ctx.currentTime;

    // "Digital blip" — nada square wave pendek & pelan, khas bunyi UI digital
    const osc = ctx.createOscillator();
    osc.type = "square";
    osc.frequency.setValueAtTime(1200, now);

    // Gain sangat rendah + fade cepat biar halus dan tidak mengganggu
    const gain = ctx.createGain();
    gain.gain.setValueAtTime(0.12, now);
    gain.gain.exponentialRampToValueAtTime(0.001, now + 0.035);

    osc.connect(gain);
    gain.connect(ctx.destination);

    osc.start(now);
    osc.stop(now + 0.04);
  }, [muted, getCtx]);

  return { playClick, muted, setMuted };
}