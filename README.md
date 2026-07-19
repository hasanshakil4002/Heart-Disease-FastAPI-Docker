# ❤️ Heart Disease Prediction API

A Machine Learning-powered **Heart Disease Prediction** web application built with **FastAPI**, **Scikit-learn**, **Docker**, and deployed on **Render**.

This project predicts whether a patient is at risk of heart disease based on medical attributes using a trained machine learning model. It also includes a modern, responsive web interface and a RESTful API with interactive Swagger documentation.

---

## 🚀 Features

* 🫀 Heart Disease Prediction using Machine Learning
* ⚡ FastAPI REST API
* 🎨 Modern & Responsive Web Dashboard
* 📊 Prediction Probability
* 📈 Interactive Result Dashboard
* 📄 Swagger API Documentation
* 🐳 Docker Support
* ☁️ Render Deployment Ready
* 📦 Docker Compose Support
* 📝 Input Validation using Pydantic

---

## 🛠️ Technology Stack

### Backend

* FastAPI
* Uvicorn
* Python 3.11+
* Pydantic

### Machine Learning

* Scikit-learn
* Pandas
* NumPy
* Joblib

### Frontend

* HTML5
* CSS3
* JavaScript (Vanilla)
* Font Awesome
* Google Fonts (Poppins)

### DevOps

* Docker
* Docker Compose
* Git
* GitHub
* Render

---

## 📁 Project Structure

```text
Heart-Disease-FastAPI-Docker/
│
├── app/
│   ├── static/
│   │   ├── css/
│   │   │   └── style.css
│   │   ├── js/
│   │   │   └── app.js
│   │   └── images/
│   │
│   ├── templates/
│   │   └── index.html
│   │
│   ├── main.py
│   ├── predictor.py
│   └── schemas.py
│
├── model/
│   └── heart_model.joblib
│
├── train_model.py
├── requirements.txt
├── Dockerfile
├── docker-compose.yml
├── .gitignore
└── README.md
```

---

## 📊 Dataset

**Dataset:** Heart Disease Dataset

```bash
Dataset link
https://www.kaggle.com/datasets/johnsmith88/heart-disease-dataset
```

Features used:

* Age
* Sex
* Chest Pain Type (cp)
* Resting Blood Pressure (trestbps)
* Cholesterol (chol)
* Fasting Blood Sugar (fbs)
* Resting ECG (restecg)
* Maximum Heart Rate (thalach)
* Exercise-Induced Angina (exang)
* Old Peak
* Slope
* Number of Major Vessels (ca)
* Thalassemia (thal)

Target:

* Heart Disease

  * `0` = No
  * `1` = Yes

---

## ⚙️ Installation

### Clone the Repository

```bash
git clone https://github.com/hasanshakil4002/Heart-Disease-FastAPI-Docker.git

cd Heart-Disease-FastAPI-Docker
```

---

### Create Virtual Environment

Windows

```bash
python -m venv venv
```

Activate

```bash
venv\Scripts\activate
```

---

### Install Dependencies

```bash
pip install -r requirements.txt
```

---

## ▶️ Run Locally

```bash
uvicorn app.main:app --reload
```

Open:

```
http://localhost:8000
```

Swagger:

```
http://localhost:8000/docs
```

---

## 🐳 Run with Docker

Build

```bash
docker compose build
```

Run

```bash
docker compose up
```

Stop

```bash
docker compose down
```

Application:

```
http://localhost:8000
```

Swagger:

```
http://localhost:8000/docs
```

---

## 🌐 API Endpoints

### Home

```http
GET /
```

Returns the web dashboard.

---

### Health Check

```http
GET /health
```

Example Response

```json
{
  "status": "healthy"
}
```

---

### Model Information

```http
GET /info
```

Example Response

```json
{
  "model": "Random Forest",
  "features": [
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
    "thal"
  ]
}
```

---

### Prediction

```http
POST /predict
```

Example Request

```json
{
  "age": 63,
  "sex": 1,
  "cp": 3,
  "trestbps": 145,
  "chol": 233,
  "fbs": 1,
  "restecg": 0,
  "thalach": 150,
  "exang": 0,
  "oldpeak": 2.3,
  "slope": 0,
  "ca": 0,
  "thal": 1
}
```

Example Response

```json
{
  "heart_disease": true,
  "probability": 0.9134
}
```

---

## 📷 Application Features

* Responsive Dashboard
* Professional Medical UI
* Prediction Probability
* Animated Progress Bar
* Loading Animation
* High Risk / Low Risk Cards
* Sample Data Button
* Reset Form
* API Integration
* Error Handling

---

## ☁️ Deployment

This project is ready to deploy on platforms that support Docker.

Deployment steps:

1. Push the project to GitHub.
2. Create a new Docker Web Service on Render.
3. Connect the GitHub repository.
4. Deploy the application.
5. Test the live API and web interface.

---

## 📌 Future Improvements

* User Authentication
* Prediction History
* Database Integration
* PDF Report Generation
* Dark Mode
* Admin Dashboard
* Model Retraining Pipeline
* CI/CD Automation

---

## 👨‍💻 Author

**MD. SHAKIL HASAN**

* GitHub: https://github.com/hasanshakil4002

* GitHub Repo link : https://github.com/hasanshakil4002/Heart-Disease-FastAPI-Docker.git

* LinkedIn: https://www.linkedin.com/in/md-shakil-hasan-2505b340b/

---

## 📄 License

This project is provided for educational and learning purposes.

Feel free to modify, improve, and use it in your own portfolio while following the dataset's license terms.

---

## ⭐ Support

If you found this project helpful:

* ⭐ Star the repository
* 🍴 Fork the project
* 💡 Suggest improvements
* 🐛 Report issues

Thank you for visiting this project! 
