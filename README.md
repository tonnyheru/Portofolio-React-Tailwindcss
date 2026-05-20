# Portfolio — M Tonny Heru Susanto S.Kom
> React + Tailwind CSS v3 · Fully Responsive

## Setup

### 1. Buat project Vite + React
```bash
npm create vite@latest portfolio -- --template react
cd portfolio
npm install
```

### 2. Install Tailwind CSS
```bash
npm install -D tailwindcss postcss autoprefixer
npx tailwindcss init -p
```

### 3. Konfigurasi `tailwind.config.js`
```js
/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        crimson: "#DC143C",
      },
    },
  },
  plugins: [],
}
```

### 4. Tambahkan Tailwind ke `src/index.css`
```css
@tailwind base;
@tailwind components;
@tailwind utilities;
```

### 5. Salin file
Salin `Portfolio.jsx` ke `src/App.jsx` (ganti isinya).

### 6. Jalankan
```bash
npm run dev
```

---

## Fitur yang diimplementasikan
- ✅ Loading Screen animasi (counter 0–100, progress bar, blob glow)
- ✅ Navbar sticky + mega dropdown Tools (hover) + mobile menu
- ✅ Home section dengan parallax banner, typed text, CTA buttons
- ✅ About section dengan 3D tilt foto, typed text, download CV & Sertifikat
- ✅ Skills & Tools: intro stats, 7 grup tool, marquee icon strip
- ✅ Featured Project: Layung Peradilan — card lengkap dengan stats, tech stack, link live
- ✅ Resume: 2-kolom (profil, kontak, tech stack, soft skills, pendidikan | pengalaman, proyek)
- ✅ Contact & Chat: Live Chat Room (Firebase-ready) + Form kirim pesan (EmailJS-ready)
- ✅ Footer
- ✅ Scroll-up button
- ✅ Active nav link highlight
- ✅ Smooth scroll ke section
- ✅ Fully responsive (mobile, tablet, desktop)
- ✅ CSS keyframe animations (shimmer, gradient, blob, marquee, fadeUp)

## Catatan
- Foto profil: ganti URL `https://placehold.co/300x300/...` dengan path gambar asli `./images/profile-1.png`
- Firebase real-time chat: tambahkan konfigurasi Firebase SDK di dalam komponen ContactSection
- EmailJS: tambahkan `emailjs.send(...)` di fungsi `sendMail`
- Download CV & Sertifikat: pastikan file ada di folder `public/CV/`
