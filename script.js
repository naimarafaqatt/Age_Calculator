function calculateAge() {
    const dateOfBirthInput = document.getElementById("dateOfBirth");
    const dateOfBirth = dateOfBirthInput.value;
    const resultDiv = document.getElementById("result");

    resultDiv.innerHTML = "";
    clearErrorMessages();

    if (!dateOfBirth) {
        showError("Please select your date of birth.", dateOfBirthInput);
        return;
    }

    const birthDate = new Date(dateOfBirth);
    const today = new Date();

    if (isNaN(birthDate.getTime())) {
        showError("Invalid date format. Please use MM-DD-YYYY.", dateOfBirthInput);
        return;
    }

    if (birthDate >= today) {
        showError("Date of birth cannot be in the future.", dateOfBirthInput);
        return;
    }

    const ageData = calculateDetailedAge(birthDate, today);

    resultDiv.innerText = `Your age is ${ageData.years} years, ${ageData.months} months, and ${ageData.days} days.`;
}

function calculateDetailedAge(birthDate, today) {
    let years = today.getFullYear() - birthDate.getFullYear();
    let months = today.getMonth() - birthDate.getMonth();
    let days = today.getDate() - birthDate.getDate();

    if (days < 0) {
        months--;
        days += new Date(today.getFullYear(), today.getMonth(), 0).getDate();
    }

    if (months < 0) {
        years--;
        months += 12;
    }

    return { years, months, days };
}

function resetForm() {
    const confirmation = confirm("Are you sure you want to clear the form?");
    if (confirmation) {
        const dateOfBirthInput = document.getElementById("dateOfBirth");
        dateOfBirthInput.value = "";
        dateOfBirthInput.classList.remove("error");

        document.getElementById("ageForm").reset();
        document.getElementById("result").innerHTML = "";
        clearErrorMessages();
    }
}

function showError(message, inputElement) {
    const errorDiv = document.createElement("div");
    errorDiv.classList.add("error-message");
    errorDiv.textContent = message;

    inputElement.classList.add("error");
    inputElement.parentNode.appendChild(errorDiv);
}

function clearErrorMessages() {
    const errorMessages = document.querySelectorAll(".error-message");
    errorMessages.forEach(msg => msg.remove());

    const errorInputs = document.querySelectorAll(".error");
    errorInputs.forEach(input => input.classList.remove("error"));
}
