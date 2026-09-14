# 🎂 Cosmic Virgo Birthday Experience (Sept 18 @ 8:10 PM)

An interactive, multi-chapter birthday web gift built for GitHub Pages, inspired by viral Instagram/TikTok birthday web trends. Designed for an engaging ~3-minute journey.

---

## ✨ Features

- 💌 **Chapter 0: Cosmic Unboxing & Ambient Music**
  - Wax seal tap-to-open interaction.
  - Floating vinyl record audio controller with built-in soothing birthday lo-fi synthesizer (works with zero external audio files so it never breaks).
- 🪐 **Chapter 1: The Virgo Cosmic Dossier**
  - Custom astrological breakdown for **September 18th born at 8:10 PM**.
  - Live ticking cosmic counter: Days alive, Hours of radiance, Total heartbeats (~billions), and Distance traveled through the cosmos (~million km).
  - Virgo Superpower meter, Blue Sapphire birth gem, and Aster birth flower.
- 📸 **Chapter 2: Aesthetic Bestie Polaroid Wall**
  - Draggable & tilting Polaroid memory cards with handwritten captions and washi tape.
  - Click to view full-screen in a zoom modal.
  - Instant in-browser photo swapper via the "Customize" button.
- 🎂 **Chapter 3: Interactive Birthday Cake & Candle Blow**
  - 3-tier pastel cake with animated flame candles.
  - Tap or click the flame to blow it out!
  - Realistic rising smoke particles, celebratory chime, and multi-color confetti cannon burst!
- 🪄 **Chapter 4: Bestie Mystery Scratch Cards**
  - 4 interactive scratch-off lottery-style cards with metallic rose-gold foil.
  - Scratch with mouse or finger to uncover secret inside jokes and heartfelt memories.
  - "Reveal All" quick button.
- 🎟️ **Chapter 5: Redeemable VIP Bestie Coupons**
  - Collectible vouchers ("Free Boba/Coffee Date", "Midnight Venting Session", "Emergency Escape Pass", "Pamper & Movie Night").
  - Click to claim with animated rubber stamp and sound effect.
- 🏮 **Chapter 6: Heartfelt Letter & Sky Lantern Wishing Well**
  - Wax-sealed letter sheet from her best friend.
  - Wishing Well: Type a birthday wish or manifestation and release glowing lanterns that float up into the galaxy.

---

## 🚀 How to Test on Your System (Local Verification)

You can view and test the website immediately using either of these two methods:

### Method 1: Double Click (Simplest)
Just double click `index.html` in your file explorer, or right-click `index.html` -> **Open with Google Chrome / Edge / Firefox**.

### Method 2: Local HTTP Server (Recommended)
Open your terminal in this folder and run:
```bash
npx serve .
# or
python -m http.server 8000
```
Then open `http://localhost:8000` or `http://localhost:3000` in your browser.

---

## 🌐 How to Host on GitHub Pages (Free in 2 Minutes)

GitHub Pages only supports static sites (HTML, CSS, JavaScript) — which is **exactly what we used**!

1. Create a new repository on [GitHub](https://github.com/new) (e.g., `birthday-wish`).
2. In this folder, initialize git and push:
   ```bash
   git init
   git add .
   git commit -m "Happy Birthday website"
   git branch -M main
   git remote add origin https://github.com/<YOUR-USERNAME>/<YOUR-REPO-NAME>.git
   git push -u origin main
   ```
3. Go to your GitHub repository in your browser:
   - Click **Settings** (top tab).
   - In the left sidebar, click **Pages**.
   - Under **Build and deployment** > **Source**, choose **Deploy from a branch**.
   - Under **Branch**, select `main` and folder `/(root)`, then click **Save**.
4. In about 60 seconds, GitHub will give you your live URL:
   `https://<YOUR-USERNAME>.github.io/<YOUR-REPO-NAME>/`
5. Share this link on Instagram, WhatsApp, or send it to her at 8:10 PM on September 18th!

---

## 🎨 How to Add Your Own Photos & Customize

### Option A: Directly inside the browser
Click the **"Customize"** button in the top-right corner of the website. You can type her real nickname, adjust birth year, and swap any polaroid picture with photos from your computer.

### Option B: In `config.js`
Open `config.js` in VS Code to change:
- `nickname`: Her name or nickname.
- `birthYear`: Her exact birth year (e.g. `2004`, `2002`, `2000`) for the live cosmic age counter.
- `polaroids`: Change image paths to `assets/images/photo1.jpg`, etc.
- `scratchCards`: Add your own inside jokes or secret memories.
- `letter`: Personalize the heartfelt letter text and signature.
