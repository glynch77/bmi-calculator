let isMetric = true;

const metricBtn = document.getElementById('metricBtn');
const imperialBtn = document.getElementById('imperialBtn');
const heightUnit = document.getElementById('heightUnit');
const weightUnit = document.getElementById('weightUnit');
const heightInput = document.getElementById('height');
const weightInput = document.getElementById('weight');

// Toggle between metric and imperial
metricBtn.addEventListener('click', function() {
    if (!isMetric) {
        isMetric = true;
        metricBtn.classList.add('active');
        imperialBtn.classList.remove('active');
        heightUnit.textContent = '(cm)';
        weightUnit.textContent = '(kg)';
        heightInput.placeholder = 'Enter your height';
        weightInput.placeholder = 'Enter your weight';
        
        // Clear inputs when switching
        heightInput.value = '';
        weightInput.value = '';
    }
});

imperialBtn.addEventListener('click', function() {
    if (isMetric) {
        isMetric = false;
        imperialBtn.classList.add('active');
        metricBtn.classList.remove('active');
        heightUnit.textContent = '(inches)';
        weightUnit.textContent = '(lbs)';
        heightInput.placeholder = 'Enter your height';
        weightInput.placeholder = 'Enter your weight';
        
        // Clear inputs when switching
        heightInput.value = '';
        weightInput.value = '';
    }
});

// Calculate BMI
document.getElementById('bmiForm').addEventListener('submit', function(e) {
    e.preventDefault();
    
    const age = parseFloat(document.getElementById('age').value);
    let height = parseFloat(document.getElementById('height').value);
    let weight = parseFloat(document.getElementById('weight').value);
    
    let bmi;
    
    if (isMetric) {
        // Metric calculation: BMI = weight(kg) / height(m)²
        const heightInMeters = height / 100;
        bmi = (weight / (heightInMeters * heightInMeters)).toFixed(1);
    } else {
        // Imperial calculation: BMI = (weight(lbs) / height(inches)²) × 703
        bmi = ((weight / (height * height)) * 703).toFixed(1);
    }
    
    // Determine category
    let category = '';
    let description = '';
    let colorClass = '';
    
    if (bmi < 18.5) {
        category = 'Underweight';
        description = 'You may need to gain weight. Consult a healthcare provider.';
        colorClass = 'underweight';
    } else if (bmi >= 18.5 && bmi < 25) {
        category = 'Normal Weight';
        description = 'You have a healthy weight. Keep it up!';
        colorClass = 'normal';
    } else if (bmi >= 25 && bmi < 30) {
        category = 'Overweight';
        description = 'You may need to lose some weight. Consider a healthier lifestyle.';
        colorClass = 'overweight';
    } else {
        category = 'Obese';
        description = 'You should consult a healthcare provider for guidance.';
        colorClass = 'obese';
    }
    
    // Display results
    document.getElementById('bmiValue').textContent = bmi;
    document.getElementById('bmiValue').className = 'bmi-value ' + colorClass;
    document.getElementById('bmiCategory').textContent = category;
    document.getElementById('bmiCategory').className = 'bmi-category ' + colorClass;
    document.getElementById('bmiDescription').textContent = description;
    
    const resultBox = document.getElementById('result');
    resultBox.classList.add('show');
});