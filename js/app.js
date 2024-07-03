const allRadioButtons = [... document.querySelectorAll(".answer__radio")]


const validationError = document.querySelector(".validation-error")
const validationCloseButton = document.querySelector(".validation-error__close-button")


allRadioButtons.forEach(radioButton => radioButton.checked = false)


const endButton = document.querySelector(".end-button")


const names = allRadioButtons.map(radioButton => radioButton.name)
    .filter((value, index, array) => array.indexOf(value) === index);

const getRadioButtonId = (radioButton) => {
    let splitId = radioButton.id.split("-")
    return parseInt(splitId[splitId.length - 1])
}


const setPage = (nextPage) => {
    let currentPage = document.querySelector(".page.selected")

    currentPage.classList.remove("selected")
    nextPage.classList.add("selected")
}


const setErrorValidation = (questionsNames) => {
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


endButton.addEventListener("click", () => {
    let testSummery = {}

    let notValidQuestions = []

    for(let i = 0; i < names.length; i++){

        const name = names[i];

        let items = document.querySelectorAll(`input[name=${name}]`)

        let isValid = false;

        items.forEach(radioButton => {
            if (radioButton.checked){
                testSummery[name] = getRadioButtonId(radioButton)
                isValid = true;
            }
        })

        if (!isValid) {
            notValidQuestions.push(name)
        }
    }

    if(notValidQuestions.length > 0){
        setErrorValidation(notValidQuestions)
        return null
    }

    console.log(testSummery)

})

