// Grab elements
const standardBtn = document.getElementById("standardBtn");
const metricBtn = document.getElementById("metricBtn");
const weightInput = document.getElementById("weightInput");
const heightContainer = document.getElementById("heightContainer");
const calculateBtn = document.getElementById("calculateBtn");
const resultDiv = document.getElementById("result");

// Track current unit system
let currentUnit = "metric";

// Functions to create height inputs dynamically
function createMetricHeight() {
  heightContainer.innerHTML = `
    <label class="form-label">Height</label>
    <input type="number" class="form-control" id="heightInput" placeholder="cm" min="0" step="0.1">
  `;
}

function createStandardHeight() {
  heightContainer.innerHTML = `
    <label class="form-label">Height</label>
    <div class="row g-2">
      <div class="col">
        <input type="number" class="form-control" id="heightFeet" placeholder="ft" min="0">
      </div>
      <div class="col">
        <input type="number" class="form-control" id="heightInches" placeholder="in" min="0" max="11">
      </div>
    </div>
  `;
}

// Initialize Metric inputs at page load
createMetricHeight();

// Event listeners for unit buttons
standardBtn.addEventListener("click", () => {
  currentUnit = "standard";
  weightInput.placeholder = "lbs";
  createStandardHeight();
});

metricBtn.addEventListener("click", () => {
  currentUnit = "metric";
  weightInput.placeholder = "kg";
  createMetricHeight();
});

// Calculate BMI
calculateBtn.addEventListener("click", () => {
  let weight = parseFloat(weightInput.value);
  if (!weight || weight <= 0) {
    resultDiv.textContent = "Please enter a valid weight.";
    return;
  }

  let heightMeters;

  if (currentUnit === "metric") {
    const heightEl = document.getElementById("heightInput");
    if (!heightEl) return; // safeguard
    const heightCm = parseFloat(heightEl.value);
    if (!heightCm || heightCm <= 0) {
      resultDiv.textContent = "Please enter a valid height.";
      return;
    }
    heightMeters = heightCm / 100;
  } else {
    const feetEl = document.getElementById("heightFeet");
    const inchesEl = document.getElementById("heightInches");
    if (!feetEl || !inchesEl) return; // safeguard
    const feet = parseInt(feetEl.value) || 0;
    const inches = parseInt(inchesEl.value) || 0;
    if (feet === 0 && inches === 0) {
      resultDiv.textContent = "Please enter a valid height.";
      return;
    }
    const totalInches = (feet * 12) + inches;
    heightMeters = totalInches * 0.0254;
    weight = weight * 0.453592; // lbs -> kg
  }

  const bmi = weight / (heightMeters * heightMeters);
  resultDiv.textContent = `Your BMI is ${bmi.toFixed(2)}`;
});
