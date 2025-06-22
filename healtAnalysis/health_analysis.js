const addPatientButton = document.get('addPatient');     //add patient data
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