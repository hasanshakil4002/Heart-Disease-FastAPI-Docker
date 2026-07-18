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

    df = pd.DataFrame([data], columns=FEATURE_NAMES)

    prediction = model.predict(df)[0]

    probability = None

    if hasattr(model, "predict_proba"):
        probability = float(model.predict_proba(df)[0][1])

    return {
        "heart_disease": bool(prediction),
        "probability": probability,
    }