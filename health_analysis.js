const addPatientButton = document.getElementById('addPatient');     //add patient data
const report = document.getElementById('report');        //see analysis report
const btnSearch = document.getElementById('btnSearch');  //search results
const patients = [];    //store patients data

function addPatient(){
    const name = document.getElementById('name').value;
    //takes the value in the checked radio buttons
    const gender = document.querySelector('input[name="gender"]:checked');  
    const age = document.getElementById('age').value;
    const condition = document.getElementById('condition').value;

    if (name && gender && age && condition){
        //stores the patient and its info
        patients.push({ name, gender: gender.value, age, condition});
        //reset the form fields
        resetForm();
        //update and display the analysis report based on the new patient data
        generateReport();
    }
}

function resetForm(){
    document.getElementById('name').value = '';
    document.querySelector('input[name=gender]:checked').checked = false;
    document.getElementById('age').value = '';
    document.getElementById('condition').value = '';
}

function generateReport(){
    const numPatients = patients.length;
    const conditionsCount = {
        Diabetes: 0,
        Thyroid: 0,
        "High Blood Pressure": 0,
    };
    const genderConditionsCount = {
        Male: {
            Diabetes: 0,
            Thyroid: 0,
            "High Blood Pressure": 0,
        },
        Female: {
            Diabetes: 0,
            Thyroid: 0,
            "High Blood Pressure": 0,
        },
    };

    //adds patients conditions to count general
    for( const patient of patients){
        conditionsCount[patient.condition]++;
        genderConditionsCount[patient.gender][patient.condition]++;
    }

    //add to report conditions count in general
    report.innerHTML = `Number of patients: ${numPatients}<br><br>`;
    report.innerHTML += `Conditions Breakdown: <br>`;
    for ( const condition in conditionsCount){
        report.innerHTML += `${condition}: ${conditionsCount[condition]}<br>`;
    }

    //add to report conditions count by gender
    report.innerHTML += `<br>Gender-Based Conditions: <br>`;
    for( const gender in genderConditionsCount){
        report.innerHTML += `${gender}: <br>`;
        for( const condition in genderConditionsCount[gender]){
            report.innerHTML += `&nbsp;&nbsp;${condition}: ${genderConditionsCount[gender][condition]}<br>`;
        }
    }
}

function searchCondition(){
    const input = document.getElementById('conditionInput').value.toLowerCase();
    const resultDiv = document.getElementById('result');
    resultDiv.innerHTML = '';

    fetch('health_analysis.json')
    .then(response => response.json)
    .then(data => {
        //search the condition entered in the data fetched
        const condition = data.conditions.find(item => item.name.toLowerCase() === input);

        //if exist condition data adds it to search result
        if (condition) {
            const symptoms = condition.symptoms.join(', ');
            const prevention = condition.prevention.join(', ');
            const treatment = condition.treatment;

            resultDiv.innerHTML += `<h2>${condition.name}</h2>`;
            resultDiv.innerHTML += `<img src='${condition.imagesrc}' alt='hjh'`;

            resultDiv.innerHTML += `<p><strong>Symptoms: </strong> ${symptoms}`;
            resultDiv.innerHTML += `<p><strong>Prevention: </strong> ${prevention}`;
            resultDiv.innerHTML += `<p><strong>Treatment: </strong> ${treatment}`;
        }else{
            resultDiv.innerHTML = 'Condition not found';
        }
    }).catch(error => {
        console.error('Error: ', error);
        resultDiv.innerHTML = 'An error occurred while fetching data.';
    })
}


btnSearch.addEventListener('click', searchCondition);
addPatientButton.addEventListener("click", addPatient);