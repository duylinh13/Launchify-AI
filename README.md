<div align="center">
  <h1>✨ Launchify AI</h1>
  <p><strong>The Next-Generation AI Landing Page Builder</strong></p>
  
  <p>
    <img src="https://img.shields.io/badge/Next.js-14-black?style=for-the-badge&logo=next.js" alt="Next.js" />
    <img src="https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white" alt="TypeScript" />
    <img src="https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white" alt="Tailwind CSS" />
    <img src="https://img.shields.io/badge/Supabase-3ECF8E?style=for-the-badge&logo=supabase&logoColor=white" alt="Supabase" />
    <img src="https://img.shields.io/badge/Vercel_AI_SDK-000000?style=for-the-badge&logo=vercel&logoColor=white" alt="Vercel AI SDK" />
  </p>
</div>

---

## 🚀 Overview

**Launchify AI** is an advanced, production-ready SaaS application that allows users to instantly generate high-converting, fully responsive landing pages using generative AI. 

Built as a showcase of modern Frontend Architecture and Fullstack capabilities, this project heavily utilizes **React Server Components (RSC)**, **Real-time AI Streaming**, and **Complex State Management**.

## ✨ Core Features

- **🧠 Real-time AI Generation:** Uses the Vercel AI SDK and Google's Gemini models to stream complex UI structures in real-time.
- **🎨 Glassmorphism Design System:** Implements a strict, premium UI/UX standard inspired by Apple HIG, featuring liquid mesh gradients, subtle backdrop blurs, and pixel-perfect padding.
- **🔒 Secure Authentication:** Passwordless Magic Link authentication powered by Supabase Auth.
- **💾 Global State & Persistence:** Utilizes Zustand for lightweight global state management and Supabase PostgreSQL for saving generated websites.
- **📱 100% Responsive Grid:** A fluid layout architecture that seamlessly transitions from desktop Split-Views to mobile stacked layouts without breaking the UI.

## 🛠️ Tech Stack

### Frontend
- **Framework:** Next.js 14 (App Router)
- **Language:** TypeScript
- **Styling:** Tailwind CSS + shadcn/ui
- **State Management:** Zustand
- **Icons:** Lucide React

### AI & Backend
- **AI Integration:** Vercel AI SDK (streamObject)
- **LLM:** Google Gemini Flash (gemini-flash-latest)
- **Database:** Supabase (PostgreSQL)
- **Authentication:** Supabase Auth (Magic Links)
- **Data Validation:** Zod (Strict schema enforcement for AI outputs)

## 💻 Getting Started

### Prerequisites
- Node.js 18+
- A Supabase Project
- A Google Gemini API Key

### Installation

1. **Clone the repository**
   \\\ash
   git clone https://github.com/yourusername/launchify-ai.git
   cd launchify-ai
   \\\

2. **Install dependencies**
   \\\ash
   npm install
   \\\

3. **Set up environment variables**
   Create a \.env.local\ file in the root directory:
   \\\env
   NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
   NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
   GEMINI_API_KEY=your_gemini_api_key
   \\\

4. **Run the development server**
   \\\ash
   npm run dev
   \\\
   Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

## 🧠 Technical Highlights (For Interviews)

This project was built to demonstrate proficiency in solving complex UI and architectural challenges:

1. **Streaming JSON parsing:** Handling partial JSON chunks from the AI and rendering React components progressively before the stream finishes.
2. **Double Scrollbar Prevention:** Using precise \calc()\ viewport heights and flex-shrink properties to ensure a native-app-like experience.
3. **Graceful Error Handling:** Catching AI rate-limit (\429\) and quota (\403\) errors gracefully on the server and reflecting them in the UI without crashing the client.

---
<div align="center">
  <p>Built with ❤️ by a Senior Frontend Developer.</p>
</div>
