# 🌱 CarbonLedger AI

> **Turn your business spending into climate action.**

<div align="center">
  <img src="frontend/public/CarbonLedger%20AI%20Logo.png" alt="CarbonLedger AI Logo" width="200" />
</div>

**Built for the Nexforge Hackathon 2026**
*Themes: Sustainability + AI/ML + FinTech*

---

## 🌍 The Problem
Small to Medium Enterprises (SMEs) struggle to track their carbon footprint because carbon accounting is traditionally expensive, manual, and disconnected from day-to-day operations.

## ✨ Our Solution
**CarbonLedger AI** bridges the gap between financial operations and environmental responsibility. We automatically track, analyze, and reduce your carbon footprint by parsing your existing financial data (invoices, utility bills, expense reports) using AI. 

No extra data entry required—just upload your bills, and we'll calculate the rest.

## 🚀 Features
- **AI-Powered Data Extraction**: Upload PDF or CSV invoices and let our AI automatically extract line items, usage metrics, and categories.
- **Instant Footprint Calculation**: Automatically calculates the CO₂e (Carbon Dioxide Equivalent) for each expense based on global emission factors.
- **Actionable AI Recommendations**: Get personalized, actionable steps to reduce your carbon footprint and transition to sustainable practices.
- **Beautiful Dashboard**: A modern, glassmorphism UI to easily visualize your emission breakdown by category.

## 🛠️ Tech Stack
- **Frontend**: Next.js 15, React, Tailwind CSS, Lucide Icons
- **Backend**: FastAPI (Python), Uvicorn
- **AI/ML**: OpenAI API for intelligent document parsing
- **Database**: Supabase (PostgreSQL) 
- **Deployment**: Vercel (Frontend) + Render (Backend)

## 💻 Getting Started

### Prerequisites
- Node.js (v18+)
- Python 3.10+
- OpenAI API Key

### Backend Setup
1. Navigate to the backend directory:
   ```bash
   cd backend
   ```
2. Create and activate a virtual environment:
   ```bash
   python -m venv venv
   source venv/bin/activate  # On Windows: venv\Scripts\activate
   ```
3. Install dependencies:
   ```bash
   pip install -r requirements.txt
   ```
4. Create a `.env` file and add your keys:
   ```env
   OPENAI_API_KEY=your_api_key_here
   ```
5. Run the server:
   ```bash
   uvicorn main:app --reload --port 8000
   ```

### Frontend Setup
1. Navigate to the frontend directory:
   ```bash
   cd frontend
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Run the development server:
   ```bash
   npm run dev
   ```
4. Open [http://localhost:3000](http://localhost:3000) in your browser.

## 🎥 Demo
[Insert Link to Demo Video / Loom Here]

## 🤝 Team
- [Your Name] - [Role]
- [Teammate Name] - [Role]

---
*Made with 💚 for the planet.*
