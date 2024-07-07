const allRadioButtons = [... document.querySelectorAll(".answer__radio")]

const tg = window.Telegram.WebApp;
tg.expand();

const validationError = document.querySelector(".validation-error")
const validationCloseButton = document.querySelector(".validation-error__close-button")


allRadioButtons.forEach(radioButton => {
    // radioButton.checked = false
    radioButton.addEventListener("click", () => {
        let questionHeading = document.querySelector(`#${radioButton.name} > .question__heading`)
        questionHeading.classList.remove("_validation-error")
    })
})


const endButton = document.querySelector(".end-button")


const names = allRadioButtons.map(radioButton => radioButton.name)
    .filter((value, index, array) => array.indexOf(value) === index);

const getRadioButtonValue = (radioButton) => {
    return parseInt(radioButton.value)
}


const setPage = (nextPage) => {
    let currentPage = document.querySelector(".page.selected")

    currentPage.classList.remove("selected")
    nextPage.classList.add("selected")
}

const clearQuestions = () => {
    let questions = document.querySelectorAll(".question__heading")
    questions.forEach(question => question.classList.remove("_validation-error"))
}


const setErrorValidation = (questionsNames) => {

    clearQuestions()

    validationError.classList.add("_block")
    validationCloseButton.onclick = null;
    validationCloseButton.addEventListener("click", () => {

        questionsNames.forEach(questionName => {
            let question = document.querySelector(`#${questionName} > .question__heading`)
            question.classList.add("_validation-error")
        })

        let firstQuestion = document.querySelector(`#${questionsNames[0]}`)

        let page = firstQuestion.closest(".page")

        setPage(page)
        window.scrollTo({top: firstQuestion.offsetTop})
        validationError.classList.remove("_block")
    })

}

const getTestSummery = () => {
    let testSummery = {}

    let notValidQuestions = []

    for(let i = 0; i < names.length; i++){

        const name = names[i];

        let items = document.querySelectorAll(`input[name=${name}]`)

        let isValid = false;

        items.forEach(radioButton => {
            if (radioButton.checked){
                testSummery[name] = getRadioButtonValue(radioButton)
                isValid = true;
            }
        })

        if (!isValid) {
            notValidQuestions.push(name)
        }
    }
    console.log(notValidQuestions)
    if(notValidQuestions.length > 0){
        setErrorValidation(notValidQuestions)
        return null
    }

    // tg.sendData(JSON.stringify(testSummery));
    // tg.close();
    return testSummery
}

endButton.addEventListener("click", () => {
    getTestSummery()
    let lastPage = document.querySelector("#page-7")
    let currentPage = document.querySelector(".page.selected")
    currentPage.classList.remove("selected")
    lastPage.classList.add("selected")
})

