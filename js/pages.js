
const paginations = document.querySelectorAll(".pagination")

const getPageIndex = (pagination) => {
    let splitId =  pagination.id.split("-")
    return parseInt(splitId[splitId.length - 1])
}

paginations.forEach(
    (pagination) => {

        let current_page_index = getPageIndex(pagination)

        let nextButton = pagination.querySelector(".pagination__right > .pagination__button")
        let previousButton = pagination.querySelector(".pagination__left > .pagination__button")

        if (current_page_index !== 6)
            nextButton.addEventListener("click", () => {
                window.scrollTo({top: 0});
                let current_page = document.querySelector(`#page-${current_page_index}`)
                let next_page = document.querySelector(`#page-${current_page_index + 1}`)

                current_page.classList.remove("selected")
                next_page.classList.add("selected")

            })

        if (current_page_index !== 1)
            previousButton.addEventListener("click", () => {
                window.scrollTo({top: 0});
                let current_page = document.querySelector(`#page-${current_page_index}`)
                let previous_page = document.querySelector(`#page-${current_page_index - 1}`)

                current_page.classList.remove("selected")
                previous_page.classList.add("selected")

            })

    }
)