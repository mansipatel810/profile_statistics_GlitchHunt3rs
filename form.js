// DOM selectors
const form = document.getElementById("profileForm");
const experience = document.getElementById("experience");
const websites = document.getElementById("websites");
const apps = document.getElementById("apps");

//Experience mapping

const expMap ={
    "1":"1 Year",
    "2":"2 Years",
    "3":"3 Years",
    "4":"4 Years",
    "5":"5+ Years"
};

//validation functions

function validateExperience(){
    const value=experience.value;
    if(!value || value===""){
        return {valid:false, message:" Please select years of experience"};
    }
    return {valid:true,message:""};
}

function validateWebsites(){
    const value = websites.value.trim();
    if(value===""){
        return {valid:false, message: "Please enter number of Websites"};
    }
    const num = parseInt(value);
    if(isNaN(num)){
        return {valid:false, message: "Please enter a valid number"};
    }
    if(num<0){
        return {valid:false, message: "Entered number cannot be negative"};
    }
    if(num>999){
        return {valid:false, message: "Maximum value is 999"};

    }
    return {valid:true,message:""};
}

function validateApps(){
    const value = apps.value.trim();
    if(value===""){
        return {valid:false, message: "Please enter number of Apps"};
    }
    const num = parseInt(value);
    if(isNaN(num)){
        return {valid:false, message: "Please enter a valid number"};
    }
    if(num<0){
        return {valid:false, message: "Entered number cannot be negative"};
    }
    if(num>999){
        return {valid:false, message: "Maximum value is 999"};

    }
    return {valid:true,message:""};
}

//error display

function showError(input,message){
    input.classList.add('input-error');

    let errorDiv = input.parentElement.querySelector(".error-message");

    if(!errorDiv){
        errorDiv = document.createElement('span');
        errorDiv.className = 'error-message';
        input.parentElement.appendChild(errorDiv);
    }

    errorDiv.textContent = message;
}

function clearErrors(){
    const inputs = [experience,websites,apps];
    inputs.forEach(
        input=>{input.classList.remove("input-error");
    });

    const errorMessages =  document.querySelectorAll(".error-message");
    errorMessages.forEach(msg=>{msg.remove()});

}


//main validation

function validateForm(){
    let isValid = true;

    const expValidation=validateExperience();
    const webValidation = validateWebsites();
    const appValidation = validateApps();

    if(!expValidation.valid){
        showError(experience,expValidation.message);
        isValid=false;
    }
    if(!webValidation.valid){
        showError(websites,webValidation.message);
        isValid=false;
    }
    if(!appValidation.valid){
        showError(apps,appValidation.message);
        isValid=false;
    }

    return isValid;
}



function measureProfile(){
    clearErrors();

    if(!validateForm()){
        return;
    }

    const expValue = experience.value;
    const expText= expMap[expValue];
    const websitesValue= websites.value;
    const appsValue = apps.value;

    //need to send data to result page....
    const url = `results.html?exp=${encodeURIComponent(expText)}&web=${websitesValue}&apps=${appsValue}`;
    window.location.href = url;
}

// Responsive adjustments for form elements
const adjustFormElements = () => {
    const formSection = document.querySelector('.form-section');
    if (window.innerWidth < 768) {
        formSection.style.flexDirection = 'column';
    } else {
        formSection.style.flexDirection = 'row';
    }
};

window.addEventListener('resize', adjustFormElements);
adjustFormElements();

