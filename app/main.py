from fastapi import FastAPI

from app.schemas import HeartData
from app.predictor import predict_heart_disease, FEATURE_NAMES

app = FastAPI(
    title="Heart Disease Prediction API",
    description="Predict Heart Disease using Machine Learning",
    version="1.0.0",
)


@app.get("/")
def home():
    return {
        "message": "Welcome to Heart Disease Prediction API"
    }


@app.get("/health")
def health():

    return {
        "status": "healthy"
    }


@app.get("/info")
def info():

    return {
        "model": "Random Forest / Logistic Regression",
        "features": FEATURE_NAMES,
        "total_features": len(FEATURE_NAMES),
    }


@app.post("/predict")
def predict(data: HeartData):

    result = predict_heart_disease(data.model_dump())

    return result