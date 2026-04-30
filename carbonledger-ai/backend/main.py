from fastapi import FastAPI, UploadFile, File, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
import json
import openai
import os
from typing import List, Dict
import csv
import io

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_methods=["*"],
    allow_headers=["*"],
)

# Load emission factors
with open("../data/emission_factors.json", "r") as f:
    EMISSION_FACTORS = json.load(f)

# Models
class EmissionRequest(BaseModel):
    category: str
    amount: float
    unit: str

class EmissionResponse(BaseModel):
    category: str
    amount: float
    unit: str
    co2_kg: float

class ReportResponse(BaseModel):
    total_co2_kg: float
    breakdown: List[EmissionResponse]
    recommendations: List[str]

# Helper function
def calculate_emission(category: str, amount: float) -> float:
    if category not in EMISSION_FACTORS:
        return 0
    factor = EMISSION_FACTORS[category]["co2_per_unit"]
    return amount * factor

# API Endpoints
@app.get("/")
def root():
    return {"message": "CarbonLedger AI API - Nexforge 2026"}

@app.post("/calculate")
def calculate(requests: List[EmissionRequest]) -> ReportResponse:
    total = 0
    breakdown = []
    
    for req in requests:
        co2 = calculate_emission(req.category, req.amount)
        total += co2
        breakdown.append(EmissionResponse(
            category=req.category,
            amount=req.amount,
            unit=req.unit,
            co2_kg=round(co2, 2)
        ))
    
    # Generate recommendations
    recommendations = []
    if total > 1000:
        recommendations.append("Your carbon footprint is high. Consider switching to renewable energy.")
    if any(b.category == "air_travel_long" for b in breakdown):
        recommendations.append("Reduce air travel or purchase carbon offsets.")
    recommendations.append("Schedule a free consultation with our sustainability experts.")
    
    return ReportResponse(
        total_co2_kg=round(total, 2),
        breakdown=breakdown,
        recommendations=recommendations
    )

@app.post("/upload-invoice")
async def upload_invoice(file: UploadFile = File(...)):
    # For hackathon MVP - mock parsing
    # In production, use OpenAI to parse invoice text
    content = await file.read()
    
    # Mock response - in real hackathon, extract from file
    sample_emissions = [
        {"category": "electricity", "amount": 5000, "unit": "kWh"},
        {"category": "gasoline", "amount": 200, "unit": "gallon"}
    ]
    
    return {"message": "Invoice processed", "extracted_items": sample_emissions}
