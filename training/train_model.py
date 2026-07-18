import joblib
import pandas as pd

from pathlib import Path

from sklearn.model_selection import train_test_split
from sklearn.pipeline import Pipeline
from sklearn.impute import SimpleImputer
from sklearn.preprocessing import StandardScaler
from sklearn.linear_model import LogisticRegression
from sklearn.ensemble import RandomForestClassifier
from sklearn.metrics import accuracy_score

CURRENT_DIR = Path(__file__).resolve().parent

DATA_PATH = CURRENT_DIR / "C:\\Users\\DMC\\Downloads\\archive (2)\\heart.csv"

df = pd.read_csv(DATA_PATH)

print("Dataset Loaded Successfully!\n")

print(df.head())

print("=" * 60)
print("Dataset Shape")
print(df.shape)

print("=" * 60)
print(df.columns)

TARGET = "target"

X = df.drop(columns=[TARGET])

y = df[TARGET]

X_train, X_test, y_train, y_test = train_test_split(
    X,
    y,
    test_size=0.20,
    random_state=42,
    stratify=y
)

logistic_pipeline = Pipeline([
    ("imputer", SimpleImputer(strategy="median")),
    ("scaler", StandardScaler()),
    ("model", LogisticRegression(max_iter=1000))
])

logistic_pipeline.fit(X_train, y_train)

logistic_accuracy = accuracy_score(
    y_test,
    logistic_pipeline.predict(X_test)
)

rf_pipeline = Pipeline([
    ("imputer", SimpleImputer(strategy="median")),
    ("model", RandomForestClassifier(
        n_estimators=200,
        random_state=42
    ))
])

rf_pipeline.fit(X_train, y_train)

rf_accuracy = accuracy_score(
    y_test,
    rf_pipeline.predict(X_test)
)

print("=" * 60)
print(f"Logistic Accuracy : {logistic_accuracy:.4f}")
print(f"Random Forest     : {rf_accuracy:.4f}")

MODEL_DIR = CURRENT_DIR.parent / "model"

MODEL_DIR.mkdir(exist_ok=True)

MODEL_PATH = MODEL_DIR / "heart_model.joblib"

if rf_accuracy >= logistic_accuracy:
    best_model = rf_pipeline
    best_name = "Random Forest"
else:
    best_model = logistic_pipeline
    best_name = "Logistic Regression"

joblib.dump(best_model, MODEL_PATH)

print("=" * 60)
print("Best Model :", best_name)
print("Model Saved Successfully!")
print("Location :", MODEL_PATH)