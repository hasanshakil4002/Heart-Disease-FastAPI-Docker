import joblib
import pandas as pd
from pathlib import Path

BASE_DIR = Path(__file__).resolve().parent.parent

MODEL_PATH = BASE_DIR / "model" / "heart_model.joblib"

model = joblib.load(MODEL_PATH)

FEATURE_NAMES = [
    "age",
    "sex",
    "cp",
    "trestbps",
    "chol",
    "fbs",
    "restecg",
    "thalach",
    "exang",
    "oldpeak",
    "slope",
    "ca",
    "thal",
]


def predict_heart_disease(data: dict):

    # Convert input dictionary to DataFrame
    df = pd.DataFrame([data], columns=FEATURE_NAMES)

    # Make prediction
    prediction = int(model.predict(df)[0])

    # Get prediction probability (if supported)
    if hasattr(model, "predict_proba"):
        probability = float(model.predict_proba(df)[0][1])
    else:
        # Fallback for models without predict_proba
        probability = 1.0 if prediction == 1 else 0.0

    # Return API response
    return {
        "heart_disease": bool(prediction),
        "probability": round(probability, 4)
    }