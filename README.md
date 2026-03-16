# RAOWA Mobile UI

![React](https://img.shields.io/badge/React-18-blue)
![Vite](https://img.shields.io/badge/Vite-5-purple)
![TypeScript](https://img.shields.io/badge/TypeScript-5-blue)
![TailwindCSS](https://img.shields.io/badge/TailwindCSS-3-38bdf8)
![License](https://img.shields.io/badge/License-MIT-green)

A modern **mobile-first web interface** for the RAOWA community platform
built with **React, Vite, TypeScript, TailwindCSS, and shadcn/ui**.

This project provides a clean and responsive UI for community features
such as members, campaigns, jobs, messaging, and donations.

------------------------------------------------------------------------

# 🌐 Live Demo

**Production URL:**\
https://raowa-mobile-ui.vercel.app/

------------------------------------------------------------------------

# 🖼 UI Screenshots

Add screenshots of the application here.

Example:

    docs/
     ├─ home.png
     ├─ members.png
     ├─ campaigns.png
     ├─ jobs.png

Then reference them like:

``` md
![Home Screen](docs/home.png)
![Members](docs/members.png)
![Campaigns](docs/campaigns.png)
![Jobs](docs/jobs.png)
```

------------------------------------------------------------------------

# ✨ Features

-   Mobile-first UI
-   Member directory
-   Community notices and news
-   Events and obituaries
-   Campaign and donation flows
-   Messaging inbox and chat UI
-   Job listings and applications
-   Smooth UI animations
-   Modern component-based architecture

------------------------------------------------------------------------

# 🧱 Architecture

    Frontend Architecture
    │
    ├── React (UI Framework)
    │
    ├── Vite (Build Tool)
    │
    ├── TailwindCSS (Styling)
    │
    ├── shadcn/ui + Radix UI (Components)
    │
    ├── React Router (Routing)
    │
    ├── React Query (Server State)
    │
    └── Framer Motion (Animations)

Application structure:

    src/
    │
    ├── components/
    │   ├── ui/
    │   └── shared/
    │
    ├── pages/
    │   ├── HomePage
    │   ├── MembersPage
    │   ├── CommunityPage
    │   ├── CampaignsPage
    │   ├── JobsPage
    │   └── InboxPage
    │
    ├── hooks/
    ├── lib/
    ├── assets/
    │
    └── App.tsx

------------------------------------------------------------------------

# 🛠 Development Guide

### 1️⃣ Clone the project

``` bash
git clone https://github.com/dev-kaamrul/raowa-mobile-ui.git
```

### 2️⃣ Install dependencies

``` bash
npm install
```

### 3️⃣ Start development server

``` bash
npm run dev
```

Open:

    http://localhost:8080

------------------------------------------------------------------------

# 🏗 Build for Production

``` bash
npm run build
```

Output directory:

    dist/

Preview build:

``` bash
npm run preview
```

------------------------------------------------------------------------

# 🚀 Deployment

Recommended platforms:

-   Vercel
-   Netlify
-   Cloudflare Pages

### Vercel Configuration

Framework preset:

    Vite

Build command:

    npm run build

Output directory:

    dist

------------------------------------------------------------------------

# 📦 Environment Variables

Currently this project does not require environment variables.\
If backend integration is added, environment variables can be stored in:

    .env

Example:

    VITE_API_BASE_URL=https://api.example.com

------------------------------------------------------------------------

# 🧪 Testing

Run tests:

``` bash
npm run test
```

Watch mode:

``` bash
npm run test:watch
```

------------------------------------------------------------------------

# 👨‍💻 Author

**Kamrul Hasan**\
Portfolio: https://kaamrul.vercel.app
Linkedin: linkedin.com/in/kaamrul
GitHub: https://github.com/kaamrul

------------------------------------------------------------------------

# 📄 License

MIT License