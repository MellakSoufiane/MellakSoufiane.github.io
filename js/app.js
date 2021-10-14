

const questionNumber = document.querySelector(".question-number");
const questionText = document.querySelector(".question-text");
const optionContainer= document.querySelector(".option-container");
const homeBox = document.querySelector(".home-box");
const quizBox = document.querySelector(".quiz-box");
const resultBox = document.querySelector(".result-box");




let questionCounter = 0;
let currentQuestion;
let availableQuestions = [];
let availableOptions = [];
let correctAnswers = 0;

// Mettre les questions dans une listes
function setAvailableQuestions(){
    const totalQuestion = quiz.length;
    for(let i=0; i<totalQuestion; i++){
        availableQuestions.push(quiz[i])
    }
}

function getNewQuestion(){
    
    //numero de la question
    questionNumber.innerHTML = "Question " + (questionCounter + 1) + " sur " + quiz.length;
    // prendre une question de la liste
    const questionIndex = availableQuestions[Math.floor(Math.random()* availableQuestions.length)]
    currentQuestion = questionIndex;
    questionText.innerHTML = currentQuestion.q;
    //position de la 'questionIndex' dans la liste
    const index1 = availableQuestions.indexOf(questionIndex);
    //supprimer la question pour ne pas avoir de redondance
    availableQuestions.splice(index1,1);
     // les options
    const optionLen = currentQuestion.options.length
     //liste des options
    for(let i=0;i<optionLen;i++){
        availableOptions.push(i)
        
    }
    optionContainer.innerHTML='';
    //create options en HTML
    for (let i=0;i<optionLen;i++){
        //random option
        const optionIndex = availableOptions[Math.floor(Math.random()* availableOptions.length)];
        const index2 = availableOptions.indexOf(optionIndex);
        //supprimer 'optionIndex' de la liste
        availableOptions.splice(index2,1);
        const option = document.createElement("div");
        option.innerHTML = currentQuestion.options[i];
        //pour trouver la bonne réponse
        option.id = i;
        option.className = "option";
        optionContainer.appendChild(option);
        option.setAttribute("onclick","getResult(this)");
        
        
       
    }
    
    questionCounter++ 
}
function quizResult(){
    
    resultBox.querySelector(".total-question").innerHTML = quiz.length;
    resultBox.querySelector(".total-correct").innerHTML = correctAnswers;
    resultBox.querySelector(".total-wrong").innerHTML = quiz.length - correctAnswers;
    resultBox.querySelector(".total-score").innerHTML = correctAnswers + " / "+ quiz.length;
}
function getResult(element){
    const id = parseInt(element.id);
    if(id === currentQuestion.answer){
        // couleur verte pour une bonne réponse
        element.classList.add("correct");
        correctAnswers++;
        console.log("correct:"+correctAnswers)
    }
    else{element.classList.add("wrong");}
    unclickableOptions();
}
//restriction pour l'utilisateur
function unclickableOptions(){
    const optionLen = optionContainer.children.length;
    for(let i =0; i<optionLen;i++){
        optionContainer.children[i].classList.add("already-answered");
    }
}


function quizOver(){
    // cacher quiBox
    quizBox.classList.add("hide");
    //afficher result box
    resultBox.classList.remove("hide");
    quizResult();
}
function next(){
    if(questionCounter === quiz.length){
        console.log("fin du quiz");
        quizOver();
    }
    else{getNewQuestion();}
}
function goToHome(){
    resultBox.classList.add("hide");
    homeBox.classList.remove("hide");
    resetQuiz();
}
function tryAgainQuiz(){
    resultBox.classList.add("hide");
    quizBox.classList.remove("hide");
    resetQuiz();
    startQuiz();
}
function resetQuiz(){
    questionCounter = 0;
    correctAnswers = 0;
}

function startQuiz(){
    homeBox.classList.add("hide");
    quizBox.classList.remove("hide")

    setAvailableQuestions();
    getNewQuestion();
}

window.onload = function(){
    homeBox.querySelector(".total-question").innerHTML = quiz.length;
}