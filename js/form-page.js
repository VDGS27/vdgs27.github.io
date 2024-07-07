const firstNameElement = document.querySelector("#first_name")
const lastNameElement = document.querySelector("#last_name")
const emailElement = document.querySelector("#email")
const phoneElement = document.querySelector("#phone")
const isAgreeElement = document.querySelector("#isAgree")
const sendButton = document.querySelector(".send-button")
const namePattern = new RegExp("^[A-Za-zа-яА-ЯёЁ\s-]+$")
const emailPattern = new RegExp("[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?")
const phoneValidation = new RegExp(/^[\d\+][\d\(\)\ -]{4,14}\d$/)

let validFields = 0
const inputs = [
    firstNameElement, lastNameElement
]

let inputElements = [firstNameElement, lastNameElement, emailElement, phoneElement]

inputElements.forEach(element => element.value = "")
isAgreeElement.checked = false
sendButton.disabled = true

const allItemsIsValid = () => {
    sendButton.disabled = validFields < 4;
}

const addValidField = () => {
    if (validFields < 5)
        validFields++
    allItemsIsValid()
}

const removeValidField = () => {
    if (validFields > 0)
        validFields--
    allItemsIsValid()
}


const IsNameValid = (element) => {
   return () => {
        let value = element.value
        if (value == null || value === "")
            return false
        return namePattern.test(value)
   }
}


const isEmailValid = (element) => {
    return () => {
            let value = element.value
            if (value == null || value === "")
                return false
            return emailPattern.test(value)
       }
}

const isPhoneValid = (element) => {
    return () => {
        let value = element.value
        if (value == null || value === "")
            return false
        return phoneValidation.test(value)
    }
}

const inputValidation = (element, isValidFunction) => {
    let isValid = isValidFunction()
    if (!isValid) {
        element.classList.add("invalid")
    }
    return isValid
}

const isAreeValidation = () => {
    let checked = isAgreeElement.checked
    if (!checked){
        isAgreeElement.closest(".form-checkbox").classList.add("invalid")
    }else{
        isAgreeElement.closest(".form-checkbox").classList.remove("invalid")
    }
    return checked
}




inputs.forEach(element => {
    element.addEventListener("change", () => {
        if (IsNameValid(element)()){
            element.classList.remove("invalid")
            addValidField()
        }else{
            element.classList.add("invalid")
            removeValidField()
        }
    })
})

isAgreeElement.addEventListener("change", () => {
    if(isAreeValidation()){
        addValidField()
    }else{
        removeValidField()
    }
})

emailElement.addEventListener("change", () => {
        if (isEmailValid(emailElement)()){
            emailElement.classList.remove("invalid")
            addValidField()
        }else{
            emailElement.classList.add("invalid")
            removeValidField()
        }
})

phoneElement.addEventListener("change", () => {
    if (isPhoneValid(phoneElement)()){
        phoneElement.classList.remove("invalid")
        addValidField()
    }else{
        phoneElement.classList.add("invalid")
        removeValidField()
    }
})



sendButton.addEventListener("click", () => {
    let isValid = 0
    isValid += inputValidation(firstNameElement, IsNameValid(firstNameElement)) ? 1 : 0
    isValid += inputValidation(lastNameElement, IsNameValid(lastNameElement)) ? 1 : 0
    isValid += inputValidation(emailElement, isEmailValid(emailElement)) ? 1 : 0
    isValid += inputValidation(phoneElement, isPhoneValid(phoneElement)) ? 1 : 0
    isValid += isAreeValidation() ? 1 : 0

    if (isValid < 5)
        return false

    let testSummery = getTestSummery()

    console.log(testSummery)

    let data = {
        user_data: {
            first_Name: firstNameElement.value,
            last_name: lastNameElement.value,
            email: emailElement.value,
            phone_number: phoneElement.value
        },
        test_data: testSummery
    }

    tg.sendData(data)
    tg.close()

})

