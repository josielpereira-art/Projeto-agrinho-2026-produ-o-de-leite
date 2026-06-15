JavaScript


// Array contendo as perguntas, opções e a resposta correta
const quizData = [
    {
        question: "O leite sem lactose é produzido retirando-se a lactose do leite?",
        options: [
            "Sim, a lactose é filtrada e removida do produto.",
            "Não, é adicionada uma enzima chamada lactase que quebra a lactose.",
            "Não, o leite sem lactose é feito a partir de água e gordura vegetal."
        ],
        correct: 1 // Índice da resposta correta (B)
    },
    {
        question: "Qual destes nutrientes é o mais famoso por estar presente em grandes quantidades no leite?",
        options: [
            "Vitamina C",
            "Ferro",
            "Cálcio"
        ],
        correct: 2 // Índice da resposta correta (C)
    },
    {
        question: "O processo de 'pasteurização' do leite serve para:",
        options: [
            "Mudar a cor do leite para deixá-lo mais branco.",
            "Eliminar bactérias nocivas à saúde através do controle de temperatura.",
            "Adicionar conservantes químicos para o leite durar meses."
        ],
        correct: 1 // Índice da resposta correta (B)
    },
    {
        question: "O leite desnatado possui menos de qual componente em comparação ao leite integral?",
        options: [
            "Gordura",
            "Proteína",
            "Açúcar (Lactose)"
        ],
        correct: 0 // Índice da resposta correta (A)
    }
];

let currentQuestionIndex = 0;
let score = 0;

// Elementos do HTML
const questionElement = document.getElementById("question");
const optionsContainer = document.getElementById("options-container");
const nextButton = document.getElementById("next-btn");
const scoreContainer = document.getElementById("score-container");

// Função para iniciar o quiz
function startQuiz() {
    currentQuestionIndex = 0;
    score = 0;
    nextButton.innerHTML = "Próxima Pergunta";
    scoreContainer.innerHTML = "";
    showQuestion();
}

// Função para mostrar a pergunta atual
function showQuestion() {
    resetState();
    let currentQuestion = quizData[currentQuestionIndex];
    let questionNo = currentQuestionIndex + 1;
    questionElement.innerHTML = questionNo + ". " + currentQuestion.question;

    // Cria os botões para cada opção
    currentQuestion.options.forEach((option, index) => {
        const button = document.createElement("button");
        button.innerHTML = option;
        button.classList.add("btn");
        optionsContainer.appendChild(button);
        
        // Adiciona o evento de clique para checar a resposta
        button.addEventListener("click", () => selectOption(button, index));
    });
}

// Limpa os botões antigos
function resetState() {
    nextButton.style.display = "none";
    while (optionsContainer.firstChild) {
        optionsContainer.removeChild(optionsContainer.firstChild);
    }
}

// Função executada quando o usuário escolhe uma opção
function selectOption(selectedButton, index) {
    const currentQuestion = quizData[currentQuestionIndex];
    const isCorrect = index === currentQuestion.correct;

    if (isCorrect) {
        selectedButton.style.backgroundColor = "#2ecc71"; // Verde para correto
        score++;
    } else {
        selectedButton.style.backgroundColor = "#e74c3c"; // Vermelho para errado
    }

    // Desabilita todos os botões após a escolha para o usuário não clicar de novo
    Array.from(optionsContainer.children).forEach((button, btnIndex) => {
        if (btnIndex === currentQuestion.correct) {
            button.style.backgroundColor = "#2ecc71"; // Mostra a correta caso tenha errado
        }
        button.disabled = true;
    });

    nextButton.style.display = "block";
}

// Avança para a próxima pergunta ou mostra o resultado
nextButton.addEventListener("click", () => {
    currentQuestionIndex++;
    if (currentQuestionIndex < quizData.length) {
        showQuestion();
    } else {
        showScore();
    }
});

// Mostra o resultado final
function showScore() {
    resetState();
    questionElement.innerHTML = `Quiz finalizado!`;
    scoreContainer.innerHTML = `Você acertou ${score} de ${quizData.length} perguntas! 🥛`;
    nextButton.innerHTML = "Jogar Novamente";
    nextButton.style.display = "block";
    nextButton.onclick = () => startQuiz();
}

// Inicializa o script
startQuiz();