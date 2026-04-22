# 🚀 Tanmoy Barua — Portfolio

A modern, responsive, accessible personal portfolio built with pure HTML, CSS, and
vanilla JavaScript. No framework dependencies — just open `index.html` in a browser.

---

## 📁 Folder Structure

```
portfolio/
├── index.html          ← Main page (semantic HTML5, ARIA labels)
├── css/
│   └── style.css       ← All styles: dark/light theme, animations, responsive
├── js/
│   ├── data.js         ← ✏️  YOUR CONTENT (edit this to update everything)
│   └── main.js         ← All interactivity (scroll, forms, typing, etc.)
├── assets/             ← Drop your images and resume PDF here
│   ├── profile.jpg     ← Your profile photo
│   ├── resume.pdf      ← Your resume
│   ├── project1.png    ← Project screenshots (optional)
│   └── project2.png
└── README.md           ← This file
```

---

## ✏️  How to Edit Your Content

**You only need to edit one file: `js/data.js`**

Open it and update:

| Section | What to change |
|---------|---------------|
| `personal` | Name, bio, email, location |
| `personal.roles` | The words that type in the hero |
| `social` | GitHub, LinkedIn, Twitter URLs |
| `stats` | Your numbers (projects, years, etc.) |
| `skills` | Tech stack with emoji icons |
| `projects` | Project title, description, tags, links |
| `experience` | Work history entries |
| `education` | Education entries |

### Adding a new project

```js
{
  id: 5,                              // unique number
  title: "My New App",
  description: "What it does.",
  image: "./assets/my-app.png",       // or null for emoji placeholder
  emoji: "🎯",                        // shown when no image
  tags: ["fullstack"],                // "frontend" | "backend" | "fullstack"
  technologies: ["React", "Node.js"],
  liveUrl:   "https://myapp.com",
  githubUrl: "https://github.com/you/myapp",
},
```

---

## ⚡ Features

- ✅ Dark / Light mode (persisted in localStorage)
- ✅ Smooth scroll navigation with active-link highlighting
- ✅ Typing animation cycling through your roles
- ✅ Project filter (All / Frontend / Backend / Full Stack)
- ✅ Scroll-reveal animations (IntersectionObserver — no library needed)
- ✅ Contact form with client-side validation
- ✅ Resume download button
- ✅ Scroll progress bar
- ✅ Back-to-top button
- ✅ Fully responsive: mobile → tablet → desktop
- ✅ Accessible (ARIA labels, keyboard navigable, focus-visible styles)
- ✅ SEO meta tags + Open Graph + Twitter Card
- ✅ Zero runtime dependencies

---

## 📧 Setting Up the Contact Form

The form is wired up in `js/main.js` inside the `sendEmail()` function.
By default it just logs data and simulates a delay. Pick one of these options:

### Option A — Formspree (easiest, free, no backend)

1. Go to <https://formspree.io> and create a free account.
2. Create a form and copy your form ID (looks like `xabc1234`).
3. In `main.js`, replace the `sendEmail()` body:

```js
async function sendEmail(data) {
  const res = await fetch('https://formspree.io/f/YOUR_FORM_ID', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' },
    body: JSON.stringify(data),
  });
  if (!res.ok) throw new Error('Formspree error');
}
```

### Option B — EmailJS (client-side email, no backend)

1. Sign up at <https://emailjs.com>.
2. Add a service, create a template, copy your IDs.
3. Add their SDK in `index.html` before your scripts:
   ```html
   <script src="https://cdn.jsdelivr.net/npm/@emailjs/browser@4/dist/email.min.js"></script>
   <script>emailjs.init("YOUR_PUBLIC_KEY");</script>
   ```
4. In `main.js`, replace `sendEmail()`:
   ```js
   async function sendEmail(data) {
     return emailjs.send('SERVICE_ID', 'TEMPLATE_ID', data);
   }
   ```

### Option C — Your own Node.js / Express backend

See the `backend-example/` section below for a minimal Express server
with Nodemailer.

---

## 🖥️  Running Locally

Just open `index.html` in a browser — no build step needed.

For a slightly better experience (avoids CORS issues with local files):

```bash
# Python 3
python -m http.server 3000

# Node.js (npx)
npx serve .

# VS Code: install "Live Server" extension → right-click index.html → Open with Live Server
```

---

## 🚀 Deployment

### Netlify (recommended — free)

1. Drag the entire `portfolio/` folder to <https://app.netlify.com/drop>.  
   Done — you get a live URL instantly.

2. For a custom domain or CI/CD:
   - Push the folder to a GitHub repository.
   - Connect the repo in Netlify → auto-deploy on every push.

### Vercel

```bash
npm i -g vercel
cd portfolio
vercel        # follow prompts
```

### GitHub Pages

1. Push to a repo named `yourusername.github.io`.
2. Go to Settings → Pages → Source: `main` branch, `/ (root)`.
3. Your site is live at `https://yourusername.github.io`.

---

## 🎨 Customising the Design

All colours and spacing are CSS custom properties in `css/style.css` under `:root`
and `[data-theme="light"]`. Key tokens:

| Variable | Purpose |
|---|---|
| `--accent` | Primary violet accent |
| `--accent-2` | Cyan secondary accent |
| `--bg` | Page background |
| `--text` | Main text colour |
| `--card-bg` | Card / surface colour |

To change the accent colour from violet to, say, emerald green:

```css
:root {
  --accent:       #059669;
  --accent-light: #10b981;
}
```

To change fonts, update the Google Fonts `<link>` in `index.html` and the
`font-family` declarations in the CSS.

---

## 🗺️  Major Changes from Original Code

| Original | New |
|---|---|
| Bootstrap 5 grid + utility classes | Custom CSS Grid / Flexbox (no external framework) |
| Inline `style=""` attributes | All styles in `css/style.css` via CSS variables |
| Hardcoded text in HTML | All content in `js/data.js` — edit one file |
| No dark mode | Full dark/light toggle with localStorage persistence |
| No animations | IntersectionObserver scroll reveals + CSS keyframes |
| Broken / missing nav links (`href="#"`) | Smooth-scroll to real sections |
| No contact form logic | Full validation + pluggable email backend |
| No SEO | Title, description, Open Graph, Twitter Card meta tags |
| Mixed `<dev>` tags (typos) | Semantic `<section>`, `<header>`, `<nav>`, `<main>`, `<footer>` |
| Bootstrap JS bundle (42 KB) | Zero runtime JS dependencies |

---

## 📋 Backend Example (Node.js + Express + Nodemailer)

Create a separate `server/` folder if you want a real backend:

```js
// server/index.js
const express  = require('express');
const nodemailer = require('nodemailer');
const cors     = require('cors');
const app      = express();

app.use(express.json());
app.use(cors({ origin: 'https://yourdomain.com' }));

const transport = nodemailer.createTransport({
  service: 'gmail',
  auth: { user: process.env.EMAIL_USER, pass: process.env.EMAIL_PASS },
});

app.post('/api/contact', async (req, res) => {
  const { name, email, subject, message } = req.body;
  try {
    await transport.sendMail({
      from: `"${name}" <${email}>`,
      to:   process.env.EMAIL_USER,
      subject,
      text: message,
    });
    res.json({ ok: true });
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
});

app.listen(3001, () => console.log('API running on :3001'));
```

```bash
npm install express nodemailer cors dotenv
EMAIL_USER=you@gmail.com EMAIL_PASS=your-app-password node server/index.js
```

Then in `main.js` update `sendEmail()` to call `/api/contact`.

---

*Built with ❤️ — no frameworks, no bloat, just clean code.*
