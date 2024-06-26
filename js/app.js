

let tg = window.Telegram.WebApp;
tg.expand();

tg.MainButton.setText("Закончить");
tg.MainButton.show();

const allRadioButtons = [...document.querySelectorAll("input")];
allRadioButtons.forEach((item) => {
    item.checked = false;
});


const answers = allRadioButtons.map(x => x.name)
    .filter((value, index, array) => array.indexOf(value) === index);

const getCheckedRadioButtonsByName = (name) => {
    let checkedRadioButton = allRadioButtons.filter(x => x.name === name && x.checked);
    if (checkedRadioButton.length === 0){
        return null;
    }
    return  checkedRadioButton[0];
}


const GetAnswerIndex = (radioId) => {
    let radioIdSplit = radioId.split("_");
    return radioIdSplit[radioIdSplit.length - 1];
}

const sendQuestions = () => {

    let questions = {}

    for(let i = 0; i < answers.length; i++){
        const answer = answers[i];
        const checkedRadioButton = getCheckedRadioButtonsByName(answer);
        if (checkedRadioButton === null){
            alert("Пожалуйста, ответьте на все вопросы !!!");
            return;
        }
        questions[answer] = GetAnswerIndex(checkedRadioButton.id);
    }

    tg.sendData(JSON.stringify(questions));
    tg.close();
}

tg.onEvent("mainButtonClicked", sendQuestions);
