// =========================================
// DOM ELEMENTS
// =========================================

const form = document.getElementById("predictionForm");

const resultBox = document.getElementById("resultBox");

// =========================================
// SHOW LOADING
// =========================================

function showLoading() {

    resultBox.innerHTML = `

        <div class="loading">

            <div class="spinner"></div>

            <h2>Predicting...</h2>

            <p>

                AI is analyzing the patient's information.

            </p>

        </div>

    `;

}

// =========================================
// SHOW ERROR
// =========================================

function showError(message) {

    resultBox.innerHTML = `

        <div class="alert alert-high fade">

            <i class="fa-solid fa-circle-exclamation"></i>

            <div>

                <strong>Prediction Failed</strong>

                <br><br>

                ${message}

            </div>

        </div>

    `;

}

// =========================================
// GET FORM DATA
// =========================================

function getFormData() {

    return {

        age: Number(document.getElementById("age").value),

        sex: Number(document.getElementById("sex").value),

        cp: Number(document.getElementById("cp").value),

        trestbps: Number(document.getElementById("trestbps").value),

        chol: Number(document.getElementById("chol").value),

        fbs: Number(document.getElementById("fbs").value),

        restecg: Number(document.getElementById("restecg").value),

        thalach: Number(document.getElementById("thalach").value),

        exang: Number(document.getElementById("exang").value),

        oldpeak: Number(document.getElementById("oldpeak").value),

        slope: Number(document.getElementById("slope").value),

        ca: Number(document.getElementById("ca").value),

        thal: Number(document.getElementById("thal").value)

    };

}

// =========================================
// VALIDATION
// =========================================

function validateData(data) {

    if (!data.age || data.age <= 0) {

        return "Please enter a valid age.";

    }

    if (data.trestbps <= 0) {

        return "Blood pressure must be greater than zero.";

    }

    if (data.chol <= 0) {

        return "Cholesterol must be greater than zero.";

    }

    if (data.thalach <= 0) {

        return "Maximum heart rate must be greater than zero.";

    }

    return null;

}

// =========================================
// FORM SUBMIT
// =========================================

form.addEventListener("submit", async function (event) {

    event.preventDefault();

    const patientData = getFormData();

    const validationError = validateData(patientData);

    if (validationError) {

        showError(validationError);

        return;

    }

    showLoading();

    try {

        const response = await fetch("/predict", {

            method: "POST",

            headers: {

                "Content-Type": "application/json"

            },

            body: JSON.stringify(patientData)

        });

        if (!response.ok) {

            throw new Error("Server returned an error.");

        }

        const result = await response.json();

        // We'll create this function in Part 7.3.2
        displayPrediction(result);

    }

    catch (error) {

        console.error(error);

        showError("Unable to connect to the prediction service.");

    }

});

// =========================================
// DISPLAY PREDICTION RESULT
// =========================================

function displayPrediction(result) {

    // API Response Example
    // {
    //     "heart_disease": true,
    //     "probability": 0.91
    // }

    const probability = Math.round((result.probability || 0) * 100);

    const isHighRisk = result.heart_disease;

    const riskClass = isHighRisk ? "high-risk" : "low-risk";

    const badgeClass = isHighRisk ? "status-high" : "status-low";

    const progressClass = isHighRisk ? "progress-high" : "progress-low";

    const icon = isHighRisk
        ? "fa-heart-crack"
        : "fa-heart-circle-check";

    const iconTitle = isHighRisk
        ? "High Risk"
        : "Low Risk";

    const recommendation = isHighRisk
        ? `
            The prediction indicates a higher risk of heart disease.
            Please consult a cardiologist for further medical evaluation.
            Maintain a healthy diet, exercise regularly, and follow
            your doctor's recommendations.
        `
        : `
            The prediction indicates a lower risk of heart disease.
            Continue maintaining a healthy lifestyle, balanced diet,
            regular exercise, and routine health checkups.
        `;

    resultBox.innerHTML = `

        <div class="result-card ${riskClass}">

            <div class="result-header">

                <div>

                    <h2 class="result-title">

                        ${iconTitle}

                    </h2>

                    <span class="status-badge ${badgeClass}">

                        ${isHighRisk ? "HIGH RISK" : "LOW RISK"}

                    </span>

                </div>

                <div class="result-icon heart-animation">

                    <i class="fa-solid ${icon}"></i>

                </div>

            </div>


            <div class="probability-card">

                <div class="probability-title">

                    <span>Prediction Confidence</span>

                    <span>${probability}%</span>

                </div>

                <div class="progress">

                    <div
                        id="progressBar"
                        class="progress-bar ${progressClass}"
                    ></div>

                </div>

                <div class="percentage">

                    ${probability}%

                </div>

            </div>


            <div class="info-grid">

                <div class="info-box">

                    <h4>Prediction</h4>

                    <p>

                        ${isHighRisk ? "Positive" : "Negative"}

                    </p>

                </div>

                <div class="info-box">

                    <h4>Confidence</h4>

                    <p>

                        ${probability}%

                    </p>

                </div>

            </div>


            <div class="recommendation">

                <h3>

                    <i class="fa-solid fa-user-doctor"></i>

                    Recommendation

                </h3>

                <p>

                    ${recommendation}

                </p>

            </div>


            <div class="alert ${isHighRisk ? "alert-high" : "alert-low"}">

                <i class="fa-solid ${isHighRisk
                    ? "fa-triangle-exclamation"
                    : "fa-circle-check"}"></i>

                <div>

                    ${isHighRisk
                        ? "Early medical consultation is strongly recommended."
                        : "Continue your healthy lifestyle and regular checkups."}

                </div>

            </div>

        </div>

    `;

    // Animate Progress Bar

    setTimeout(() => {

        document.getElementById("progressBar").style.width = probability + "%";

    }, 200);

}

// =====================================
// TOAST
// =====================================

function showToast(message){

    const toast = document.getElementById("toast");

    toast.innerHTML = message;

    toast.classList.add("show");

    setTimeout(()=>{

        toast.classList.remove("show");

    },3000);

}

// =====================================
// SAMPLE DATA
// =====================================

document.getElementById("sampleBtn").addEventListener("click",()=>{

    document.getElementById("age").value=63;

    document.getElementById("sex").value=1;

    document.getElementById("cp").value=3;

    document.getElementById("trestbps").value=145;

    document.getElementById("chol").value=233;

    document.getElementById("fbs").value=1;

    document.getElementById("restecg").value=0;

    document.getElementById("thalach").value=150;

    document.getElementById("exang").value=0;

    document.getElementById("oldpeak").value=2.3;

    document.getElementById("slope").value=0;

    document.getElementById("ca").value=0;

    document.getElementById("thal").value=1;

    showToast("Sample patient data loaded.");

});

// =====================================
// RESET
// =====================================

document.getElementById("resetBtn").addEventListener("click",()=>{

    form.reset();

    resultBox.innerHTML=`

        <div class="waiting">

            <i class="fa-solid fa-heart-circle-plus waiting-icon"></i>

            <h2>Waiting for Prediction</h2>

            <p>

                Fill in the patient information and click
                <strong>Predict Heart Disease</strong>.

            </p>

        </div>

    `;

    showToast("Form reset successfully.");

});