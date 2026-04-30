# CarbonLedger AI

**Tagline:** Turn business spending into climate action.

**For Nexforge Hackathon 2026**  
Themes: Sustainability + AI/ML + FinTech

## What It Does
CarbonLedger AI helps SMEs automatically track, analyze, and reduce their carbon footprint using existing financial data (invoices, utility bills, expense reports).

## Tech Stack
- **Frontend:** Next.js + Tailwind CSS
- **Backend:** FastAPI (Python)
- **Database:** Supabase (PostgreSQL)
- **AI:** OpenAI API (invoice parsing)
- **Deployment:** Vercel + Render

## Setup Instructions

### Backend
```bash
cd backend
python -m venv venv
source venv/bin/activate  # Windows: venv\Scripts\activate
pip install -r requirements.txt
uvicorn main:app --reload
```

### Frontend
```bash
cd frontend
npm install
npm run dev
```

## Environment Variables
Create `.env` files with:
- `OPENAI_API_KEY`
- `SUPABASE_URL`
- `SUPABASE_ANON_KEY`

## Demo Video
[Link to your YouTube/Loom video]

## Team
[Your names here]
