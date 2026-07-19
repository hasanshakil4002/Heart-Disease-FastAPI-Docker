from fastapi import FastAPI, Request
from fastapi.responses import HTMLResponse
from fastapi.staticfiles import StaticFiles
from fastapi.templating import Jinja2Templates

from app.schemas import HeartData
from app.predictor import predict_heart_disease, FEATURE_NAMES


# ==========================================================
# FastAPI Application
# ==========================================================

app = FastAPI(
    title="Heart Disease Prediction API",
    description="Machine Learning API for predicting Heart Disease using FastAPI and Scikit-learn.",
    version="1.0.0",
)


# ==========================================================
# Static Files & Templates
# ==========================================================

app.mount(
    "/static",
    StaticFiles(directory="app/static"),
    name="static",
)

templates = Jinja2Templates(directory="app/templates")


# ==========================================================
# Home Page
# ==========================================================

@app.get("/", response_class=HTMLResponse)
async def home(request: Request):

    return templates.TemplateResponse(
        request=request,
        name="index.html",
    )


# ==========================================================
# Health Check
# ==========================================================

@app.get("/health", tags=["Health"])
async def health():

    return {
        "status": "healthy",
        "message": "API is running successfully."
    }


# ==========================================================
# Model Information
# ==========================================================

@app.get("/info", tags=["Model"])
async def info():

    return {
        "model": "Random Forest",
        "total_features": len(FEATURE_NAMES),
        "features": FEATURE_NAMES,
    }


# ==========================================================
# Prediction Endpoint
# ==========================================================

@app.post("/predict", tags=["Prediction"])
async def predict(data: HeartData):

    result = predict_heart_disease(data.model_dump())

    return result