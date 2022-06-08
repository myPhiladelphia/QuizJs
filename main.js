//All answer options
const option1 = document.querySelector('.option1'),
      option2 = document.querySelector('.option2'),
      option3 = document.querySelector('.option3'),
      option4 = document.querySelector('.option4');

//All our options

const optionElements = document.querySelectorAll('.option');
const question = document.getElementById('question'); //сам вопрос
const numberOfQuestion = document.getElementById('number-of-question');  //номер вопроса
const numberOfAllQuestions = document.getElementById('number-of-all-questions'); //количество всех вопросов

let indexOfQuestion = 0; //индекс текущего вопроса
let indexOfPage = 0; //индекс страницы

const answersTracker = document.getElementById('answers-tracker'); //обертка для трекера
const ntbNext = document.getElementById('btn-next'); //кнопка далее

let score = 0; //итоговый результат викторины
const quizOverModal = document.querySelector('.quiz-over-modal');

const correctAnswer = document.getElementById('correct-answer'), //Количество правильных ответов
      numberOfAllQuestions2 = document.getElementById('number-of-all-questions-2'), //количество всех вопросов(в модальном окне)
      btnTryAgain = document.getElementById('btn-try-again'); //Кнопка начать викторину заново

const questions = [
    {
        question: 'Самая длинная река?',
        options: [
            'Амазонка',
            'Янцзы',
            'Нил',
            'Конго',
        ],
        rightAnswer: 0
    },

    {
        question: 'Что отсчитывается от нулевого меридиана?',
        options: [
            'Длина',
            'Ширина',
            'Долгота',
            'Широта',
        ],
        rightAnswer: 2
    },

    {
        question: 'Количество мировых океанов',
        options: [
            '6',
            '5',
            '4',
            '3',
        ],
        rightAnswer: 1
    },

    {
        question: 'Когда Полине можно будет подстричь волосы?',
        options: [
            'Никогда',
            'Да хоть сегодня',
            'Когда вырастешь',
            'Когда докажут, что связи с космосом нет',
        ],
        rightAnswer: 0
    },

    {
        question: 'Что кричит волк в конце советского мультфильма?',
        options: [
            'Ну, постой!',
            'Эй, погоди!',
            'Ну, погоди!',
            'Извольте подождать меня, милейший.',
        ],
        rightAnswer: 2
    },

    {
        question: 'Какой порядковый номер у Марса, если считать планеты от Солнца?',
        options: [
            '2',
            '3',
            '4',
            '5',
        ],
        rightAnswer: 2
    },

    {
        question: 'Где хоббит Фродо хранил кольцо Всевластья во время своего путешествия?',
        options: [
            'В кармане',
            'В ботинке',
            'В мешке',
            'На шее',
        ],
        rightAnswer: 3
    },

    {
        question: 'Каким был самый разгромный счет в истории футбольных матчей?',
        options: [
            '23:4',
            '46:2',
            '100:1',
            '149:0',
        ],
        rightAnswer: 3
    },

    {
        question: 'В качестве чего известен хлорид натрия в быту? ',
        options: [
            'Отбеливатель',
            'Сахар',
            'Хлор',
            'Соль',
        ],
        rightAnswer: 3
    },

    {
        question: 'Сколько дней в феврале в високосный год?',
        options: [
            '28',
            '29',
            '30',
            '31',
        ],
        rightAnswer: 1
    },

    {
        question: 'Сколько элементов в таблице Менделеева?',
        options: [
            '112',
            '118',
            '120',
            '143',
        ],
        rightAnswer: 1
    },
]

numberOfAllQuestions.innerHTML = questions.length; //выводим количество вопросов

const load = () =>{
    question.innerHTML = questions[indexOfQuestion].question; //сам вопрос

    //мапим ответы

    option1.innerHTML = questions[indexOfQuestion].options[0];
    option2.innerHTML = questions[indexOfQuestion].options[1];
    option3.innerHTML = questions[indexOfQuestion].options[2];
    option4.innerHTML = questions[indexOfQuestion].options[3];

    numberOfQuestion.innerHTML = indexOfPage + 1; // установка номера тукущей страницы
    indexOfPage++; //увеличение индекса страницы
};

let completedAnswers = []; //массив для уже заданных вопросов

const randomQuestion = () =>{
    let randomNumber = Math.floor(Math.random() * questions.length);
    let hitDuplicate = false; //якорь для проверки одинаковых вопросов

    if(indexOfPage == questions.length){
        quizOver();
    } else{
        if(completedAnswers.length > 0){
            completedAnswers.forEach(item=>{
                if(item == randomNumber){
                    hitDuplicate = true;
                }
            });
            if(hitDuplicate){
                randomQuestion();
            }
            else{
                indexOfQuestion = randomNumber;
                load();
            }
        }
        if(completedAnswers.length == 0){
            indexOfQuestion = randomNumber;
            load();
        }
    }
    completedAnswers.push(indexOfQuestion);

};

const checkAnswer = el =>{
    if(el.target.dataset.id == questions[indexOfQuestion].rightAnswer){
        el.target.classList.add('correct');
        updateAnswerTracker('correct');
        score++;
    } else {
        el.target.classList.add('wrong');
        updateAnswerTracker('wrong');
    }
    disabledOptions();
}

for(option of optionElements){
    option.addEventListener('click', e => checkAnswer(e));
}

const disabledOptions = () =>{
    optionElements.forEach(item => {
        item.classList.add('disabled');
        if(item.dataset.id == questions[indexOfQuestion].rightAnswer){
            item.classList.add('correct');
        }
    })
}

const answerTracker = () => {
    questions.forEach(()=>{
        const div = document.createElement('div');
        answersTracker.appendChild(div);  //appendChild - метод, который позваляет добавлять элемент, который создали выше
    })
}

const  updateAnswerTracker = status => {  //функция добавления классов на каждую точку в трекере
    answersTracker.children[indexOfPage - 1].classList.add(`${status}`); //добавляем тот же класс, который приходит сверху
}

const validate = ()=>{
    if(!optionElements[0].classList.contains('disabled')){
        alert('Вам нужно выбрать один из варинатов ответа')
    } else{
        randomQuestion();
        enableOptions();
    }
}


const quizOver = ()=>{
    quizOverModal.classList.add('active');
    correctAnswer.innerHTML = score;
    numberOfAllQuestions2.innerHTML = questions.length;
}

const tryAgain = () =>{
    window.location.reload();
}

btnTryAgain.addEventListener('click', tryAgain);

//удаление всех классов с ответов

const enableOptions = () => {
    optionElements.forEach(item => {
        item.classList.remove('disabled', 'correct', 'wrong');
    })
}

ntbNext.addEventListener('click', ()=>{
    validate();
})

window.addEventListener('load', ()=>{
    randomQuestion();
    answerTracker();
})
