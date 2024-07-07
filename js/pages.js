
const paginations = document.querySelectorAll(".pagination")

const getPageIndex = (pagination) => {
    let splitId =  pagination.id.split("-")
    return parseInt(splitId[splitId.length - 1])
}

const isQuestionsOnPageIsValid = (currentPage) => {
    let questionsNames = [... currentPage.querySelectorAll(".question")].map(
        (item) => item.id
    )

    let notValidQuestions = []

    questionsNames.forEach(
        (questionName) => {
            let isValid = false
            let radiobuttons = document.querySelectorAll(`input[name=${questionName}]`)
            radiobuttons.forEach(radioButton => {
                if (radioButton.checked)
                    isValid = true
            })

            if(!isValid)
                notValidQuestions.push(questionName)
        }
    )
    if (notValidQuestions.length > 0)
    {
        setErrorValidation(notValidQuestions)
        return false
    }

    return true

}

paginations.forEach(
    (pagination) => {

        let current_page_index = getPageIndex(pagination)

        let nextButton = pagination.querySelector(".pagination__right > .pagination__button")
        let previousButton = pagination.querySelector(".pagination__left > .pagination__button")

        if (current_page_index !== 6)
            nextButton.addEventListener("click", () => {


                let current_page = document.querySelector(`#page-${current_page_index}`)

                if (!isQuestionsOnPageIsValid(current_page))
                    return

                let next_page = document.querySelector(`#page-${current_page_index + 1}`)
                window.scrollTo({top: 0});
                current_page.classList.remove("selected")
                next_page.classList.add("selected")

            })

        if (current_page_index !== 1)
            previousButton.addEventListener("click", () => {
                clearQuestions()
                window.scrollTo({top: 0});
                let current_page = document.querySelector(`#page-${current_page_index}`)
                let previous_page = document.querySelector(`#page-${current_page_index - 1}`)

                current_page.classList.remove("selected")
                previous_page.classList.add("selected")

            })

    }
)