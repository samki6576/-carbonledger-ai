# CarbonLedger AI

> **Turn your business spending into climate action.**  
> Built for the Nexforge Hackathon 2026 — *Sustainability + AI/ML + FinTech*

## 🌍 The Problem

Small to Medium Enterprises (SMEs) struggle to track their carbon footprint because carbon accounting is traditionally expensive, manual, and disconnected from day-to-day operations. Existing carbon tools cost $10,000+/year—a price tag that locks out 30+ million SMEs worldwide.

## ✨ The Solution

**CarbonLedger AI** bridges the gap between financial operations and environmental responsibility. We automatically track, analyze, and reduce your carbon footprint by parsing your existing financial data (invoices, utility bills, expense reports) using AI. No extra data entry required—just upload your bills, and we'll calculate the rest.

Think of it as **TurboTax for carbon accounting.**

## 🚀 Features

- **AI-Powered Data Extraction** — Upload PDF or CSV invoices and let our AI automatically extract line items, usage metrics, and categories.
- **Instant Footprint Calculation** — Automatically calculates the CO₂e (Carbon Dioxide Equivalent) for each expense based on EPA 2024 emission factors.
- **Actionable AI Recommendations** — Get personalized, actionable steps to reduce your carbon footprint and transition to sustainable practices.
- **Beautiful Dashboard** — A modern, glassmorphism UI to easily visualize your emission breakdown by category.
- **Contextual Comparisons** — See what your footprint means in real-world terms (e.g., "equal to driving 3,100 miles" or "homes powered").

## 🛠️ Tech Stack

| Layer | Technology |
|-------|------------|
| **Frontend** | Next.js 15, React, Tailwind CSS, Lucide Icons  |
| **Backend** | FastAPI (Python), Uvicorn  |
| **AI/ML** | OpenAI API for intelligent document parsing  |
| **Database** | Supabase (PostgreSQL)  |
| **Deployment** | Netlify (Frontend) + Render (Backend)  |

## 📦 Getting Started

### Prerequisites

- Node.js (v18+)
- Python 3.10+
- OpenAI API Key

### Backend Setup

1. Navigate to the backend directory:
   ```bash
   cd carbonledger-ai/backend
   ```

2. Create and activate a virtual environment:
   ```bash
   python -m venv venv
   source venv/bin/activate   # On Windows: venv\Scripts\activate
   ```

3. Install dependencies:
   ```bash
   pip install -r requirements.txt
   ```

4. Create a `.env` file and add your API keys:
   ```env
   OPENAI_API_KEY=your_api_key_here
   DATABASE_URL=your_supabase_url_here
   ```

5. Run the server:
   ```bash
   uvicorn main:app --reload --port 8000
   ```

### Frontend Setup

1. Navigate to the frontend directory:
   ```bash
   cd carbonledger-ai/frontend
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Create a `.env.local` file:
   ```env
   NEXT_PUBLIC_API_URL=http://localhost:8000
   ```

4. Run the development server:
   ```bash
   npm run dev
   ```

5. Open [http://localhost:3000](http://localhost:3000) in your browser.

## 🔧 Core Logic

The carbon calculation is powered by a simple but extensible formula:

```python
def calculate_carbon(category: str, amount: float) -> float:
    factors = {
        "electricity": 0.233,   # kg CO₂ per kWh
        "gasoline": 8.89,       # kg CO₂ per gallon
        "air_travel": 0.22,     # kg CO₂ per passenger-mile
    }
    return amount * factors.get(category, 0)
```

Emission factors are standardized on **EPA 2024** data and are fully configurable.

## ⚠️ Key Challenges & Solutions

| Challenge | Solution |
|-----------|----------|
| **CORS errors** between Netlify frontend and Render backend | Fixed with `CORSMiddleware` in FastAPI  |
| **OpenAI rate limits** | Added `@lru_cache` + fallback regex parser + mock mode for demo  |
| **Inconsistent emission factors** | Standardized on EPA 2024, made factors configurable, documented source  |
| **Deployment broke 2 hours before deadline** | Missing `NEXT_PUBLIC_API_URL` env var — Netlify CLI fixed in 5 minutes  |
| **"1,245 kg CO₂" means nothing to business owners** | Added contextual comparisons (miles driven, homes powered)  |

## 🧪 Demo

[Insert Link to Demo Video / Loom Here]

Live demo: [https://carbonledger-ai.netlify.app](https://carbonledger-ai.netlify.app)

## 📈 What's Next

- **QuickBooks/Xero integration** (2 weeks) 
- **Real-time supply chain tracking** (1 month) 
- **Pilot with 10 local SMEs** (3 months) 
- **Launch on QuickBooks App Store** (6 months) 

## 🙏 Acknowledgements

- **Nexforge** — for rewarding strategic innovation 
- **My parents** — for showing me the real problem 
- **The judges** — for considering climate action built from business spending 


> *"I want to help the planet, but I run a business, not a climate lab."* 

**CarbonLedger AI: Turn spending into climate action.** 

---

*Made with ❤️ for the planet.* 
