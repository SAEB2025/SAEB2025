// Sistema de Patentes do Free Fire
const ranks = [
    { name: "Bronze I", icon: "🥉", minXP: 0 },
    { name: "Bronze II", icon: "🥉", minXP: 100 },
    { name: "Bronze III", icon: "🥉", minXP: 200 },
    { name: "Prata I", icon: "🥈", minXP: 300 },
    { name: "Prata II", icon: "🥈", minXP: 400 },
    { name: "Prata III", icon: "🥈", minXP: 500 },
    { name: "Ouro I", icon: "🥇", minXP: 600 },
    { name: "Ouro II", icon: "🥇", minXP: 700 },
    { name: "Ouro III", icon: "🥇", minXP: 800 },
    { name: "Ouro IV", icon: "🥇", minXP: 900 },
    { name: "Platina I", icon: "💎", minXP: 1000 },
    { name: "Platina II", icon: "💎", minXP: 1100 },
    { name: "Platina III", icon: "💎", minXP: 1200 },
    { name: "Platina IV", icon: "💎", minXP: 1300 },
    { name: "Diamante I", icon: "💠", minXP: 1400 },
    { name: "Diamante II", icon: "💠", minXP: 1500 },
    { name: "Diamante III", icon: "💠", minXP: 1600 },
    { name: "Diamante IV", icon: "💠", minXP: 1700 },
    { name: "Heroico", icon: "⭐", minXP: 1800 },
    { name: "Mestre", icon: "👑", minXP: 2000 },
    { name: "Desafiante", icon: "🔥", minXP: 2500 }
];

// Banco de questões de português com textos
const questions = [
    {
        text: `"O vento sussurrava segredos antigos entre as folhas das árvores centenárias. 
        No jardim abandonado, as flores silvestres cresciam livres, pintando a paisagem 
        com cores vibrantes. Era um lugar onde o tempo parecia ter parado, preservando 
        memórias de dias mais felizes."`,
        question: "Qual figura de linguagem está presente na expressão 'O vento sussurrava segredos'?",
        options: [
            "Metáfora",
            "Personificação",
            "Hipérbole",
            "Antítese"
        ],
        correct: 1,
        explanation: "A personificação atribui características humanas (sussurrar segredos) ao vento, que é um elemento da natureza."
    },
    {
        text: `"A educação é a arma mais poderosa que você pode usar para mudar o mundo. 
        Ela abre portas, derruba barreiras e constrói pontes entre culturas diferentes. 
        Investir em conhecimento é investir no futuro da humanidade."`,
        question: "Qual é a ideia central do texto?",
        options: [
            "A educação é cara e inacessível",
            "A educação é transformadora e essencial",
            "A educação é apenas para poucos",
            "A educação é desnecessária"
        ],
        correct: 1,
        explanation: "O texto enfatiza o poder transformador da educação e sua importância para o desenvolvimento humano e social."
    },
    {
        text: `"Machado de Assis nasceu no Rio de Janeiro em 1839. Considerado um dos maiores 
        escritores brasileiros, ele fundou a Academia Brasileira de Letras em 1897. 
        Suas obras, como 'Dom Casmurro' e 'Memórias Póstumas de Brás Cubas', são 
        estudadas até hoje nas escolas."`,
        question: "Segundo o texto, qual foi uma das realizações de Machado de Assis?",
        options: [
            "Escrever apenas romances românticos",
            "Fundar a Academia Brasileira de Letras",
            "Nascer em São Paulo",
            "Viver no século XX"
        ],
        correct: 1,
        explanation: "O texto menciona claramente que Machado de Assis fundou a Academia Brasileira de Letras em 1897."
    },
    {
        text: `"Os oceanos cobrem aproximadamente 71% da superfície terrestre e contêm 97% 
        de toda a água do planeta. Eles regulam o clima, produzem oxigênio e são fonte 
        de alimento para bilhões de pessoas. Proteger os oceanos é proteger a vida na Terra."`,
        question: "De acordo com o texto, qual porcentagem da água do planeta está nos oceanos?",
        options: [
            "71%",
            "100%",
            "97%",
            "50%"
        ],
        correct: 2,
        explanation: "O texto afirma que os oceanos contêm 97% de toda a água do planeta."
    },
    {
        text: `"Ele era tão alto que precisava se curvar para passar pelas portas. 
        Seus amigos brincavam dizendo que ele poderia tocar as nuvens se quisesse. 
        Apesar de sua altura impressionante, era gentil como um cordeiro."`,
        question: "Qual figura de linguagem aparece em 'poderia tocar as nuvens'?",
        options: [
            "Comparação",
            "Hipérbole",
            "Metonímia",
            "Paradoxo"
        ],
        correct: 1,
        explanation: "A hipérbole é um exagero intencional usado para enfatizar a altura extraordinária da pessoa."
    },
    {
        text: `"A Amazônia é conhecida como o 'pulmão do mundo' devido à sua capacidade de 
        produzir oxigênio e absorver dióxido de carbono. Com uma área de aproximadamente 
        5,5 milhões de km², ela abriga a maior biodiversidade do planeta, com milhões 
        de espécies ainda não catalogadas."`,
        question: "Por que a Amazônia é chamada de 'pulmão do mundo'?",
        options: [
            "Por causa de sua grande extensão territorial",
            "Por produzir oxigênio e absorver CO2",
            "Por ter muitas espécies de animais",
            "Por estar localizada no Brasil"
        ],
        correct: 1,
        explanation: "O texto explica que a Amazônia é chamada de 'pulmão do mundo' devido à sua capacidade de produzir oxigênio e absorver dióxido de carbono."
    },
    {
        text: `"No silêncio da biblioteca, apenas o sussurro das páginas sendo viradas 
        quebrava a quietude. Estudantes concentrados mergulhavam em mundos de conhecimento, 
        cada um em sua própria jornada de descoberta. Ali, o tempo parecia ter outro ritmo."`,
        question: "Qual é o ambiente descrito no texto?",
        options: [
            "Uma sala de aula barulhenta",
            "Uma biblioteca silenciosa",
            "Um parque movimentado",
            "Uma cafeteria agitada"
        ],
        correct: 1,
        explanation: "O texto descreve claramente uma biblioteca silenciosa onde estudantes estão concentrados em seus estudos."
    },
    {
        text: `"A pontuação é fundamental para a clareza do texto. Uma vírgula mal colocada 
        pode mudar completamente o sentido de uma frase. Por exemplo: 'Vamos comer, crianças!' 
        é muito diferente de 'Vamos comer crianças!'. A primeira é um convite; a segunda, 
        uma ameaça terrível."`,
        question: "Segundo o texto, o que pode acontecer com uma vírgula mal colocada?",
        options: [
            "Nada de importante",
            "Melhorar o texto",
            "Mudar completamente o sentido da frase",
            "Tornar o texto mais formal"
        ],
        correct: 2,
        explanation: "O texto demonstra com um exemplo claro como uma vírgula mal colocada pode mudar completamente o sentido de uma frase."
    },
    {
        text: `"O sol nascia lentamente no horizonte, pintando o céu com tons de laranja e rosa. 
        Os pássaros começavam sua sinfonia matinal, anunciando o início de um novo dia. 
        Era um espetáculo que se repetia há milhões de anos, mas nunca perdia sua magia."`,
        question: "Que momento do dia está sendo descrito?",
        options: [
            "Meio-dia",
            "Amanhecer",
            "Entardecer",
            "Meia-noite"
        ],
        correct: 1,
        explanation: "O texto descreve o amanhecer, mencionando o sol nascendo no horizonte e os pássaros cantando pela manhã."
    },
    {
        text: `"A reciclagem é uma das formas mais eficazes de reduzir o impacto ambiental. 
        Ao reciclar papel, por exemplo, salvamos árvores e economizamos água e energia. 
        Cada tonelada de papel reciclado pode salvar aproximadamente 17 árvores adultas."`,
        question: "Quantas árvores podem ser salvas com uma tonelada de papel reciclado?",
        options: [
            "10 árvores",
            "17 árvores",
            "25 árvores",
            "5 árvores"
        ],
        correct: 1,
        explanation: "O texto informa que cada tonelada de papel reciclado pode salvar aproximadamente 17 árvores adultas."
    },
    {
        text: `"O português é a língua oficial de nove países, sendo falado por mais de 
        260 milhões de pessoas ao redor do mundo. É a quinta língua mais falada do planeta 
        e a mais falada do hemisfério sul. Sua riqueza e diversidade refletem a história 
        e cultura dos povos lusófonos."`,
        question: "Quantos países têm o português como língua oficial?",
        options: [
            "Cinco países",
            "Sete países",
            "Nove países",
            "Doze países"
        ],
        correct: 2,
        explanation: "Segundo o texto, o português é a língua oficial de nove países."
    },
    {
        text: `"A internet revolucionou a forma como nos comunicamos e acessamos informação. 
        Em questão de segundos, podemos nos conectar com pessoas do outro lado do mundo 
        ou acessar bibliotecas inteiras de conhecimento. Porém, é importante usar essa 
        ferramenta com responsabilidade e senso crítico."`,
        question: "Qual é a mensagem principal sobre o uso da internet?",
        options: [
            "Deve ser evitada sempre",
            "É apenas para entretenimento",
            "Deve ser usada com responsabilidade e senso crítico",
            "Não tem importância na vida moderna"
        ],
        correct: 2,
        explanation: "O texto destaca a importância de usar a internet com responsabilidade e senso crítico, apesar de seus benefícios."
    },
    {
        text: `"As abelhas são insetos fundamentais para o equilíbrio ecológico. 
        Elas são responsáveis pela polinização de cerca de 80% das plantas com flores, 
        incluindo muitas frutas e vegetais que consumimos. Sem as abelhas, nossa 
        alimentação seria drasticamente afetada."`,
        question: "Por que as abelhas são importantes para nossa alimentação?",
        options: [
            "Produzem mel apenas",
            "Polinizam plantas que produzem nossos alimentos",
            "São bonitas de observar",
            "Fazem ninhos em árvores"
        ],
        correct: 1,
        explanation: "O texto explica que as abelhas polinizam cerca de 80% das plantas com flores, incluindo frutas e vegetais que consumimos."
    },
    {
        text: `"Fernando Pessoa foi um dos maiores poetas da língua portuguesa. 
        Nascido em Lisboa em 1888, criou diversos heterônimos - personalidades literárias 
        com estilos próprios. Alberto Caeiro, Ricardo Reis e Álvaro de Campos são seus 
        heterônimos mais conhecidos."`,
        question: "O que são os heterônimos de Fernando Pessoa?",
        options: [
            "Seus amigos poetas",
            "Personalidades literárias com estilos próprios",
            "Livros que ele escreveu",
            "Cidades onde morou"
        ],
        correct: 1,
        explanation: "O texto define heterônimos como personalidades literárias com estilos próprios criadas por Fernando Pessoa."
    },
    {
        text: `"A água é essencial para a vida. O corpo humano é composto por cerca de 60% 
        de água, e podemos sobreviver apenas alguns dias sem ela. É importante beber 
        pelo menos 2 litros de água por dia para manter o corpo hidratado e saudável."`,
        question: "Qual porcentagem do corpo humano é composta por água?",
        options: [
            "40%",
            "50%",
            "60%",
            "70%"
        ],
        correct: 2,
        explanation: "Segundo o texto, o corpo humano é composto por cerca de 60% de água."
    }
];

// Estado do jogo
let gameState = {
    currentQuestion: 0,
    totalXP: 0,
    correctAnswers: 0,
    currentRank: 0,
    answeredQuestions: [],
    availableQuestions: [...questions]
};

// Função para embaralhar array
function shuffleArray(array) {
    const newArray = [...array];
    for (let i = newArray.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [newArray[i], newArray[j]] = [newArray[j], newArray[i]];
    }
    return newArray;
}

// Função para iniciar o quiz
function startQuiz() {
    document.getElementById('startScreen').classList.add('hidden');
    document.getElementById('questionArea').classList.remove('hidden');
    gameState.availableQuestions = shuffleArray([...questions]);
    loadQuestion();
}

// Função para carregar uma questão
function loadQuestion() {
    if (gameState.availableQuestions.length === 0) {
        // Reiniciar questões se todas foram respondidas
        gameState.availableQuestions = shuffleArray([...questions]);
    }
    
    const question = gameState.availableQuestions[gameState.currentQuestion % gameState.availableQuestions.length];
    
    // Atualizar texto
    document.getElementById('textContent').innerHTML = question.text;
    document.getElementById('questionText').innerHTML = question.question;
    
    // Criar opções
    const optionsContainer = document.getElementById('optionsContainer');
    optionsContainer.innerHTML = '';
    
    question.options.forEach((option, index) => {
        const optionDiv = document.createElement('div');
        optionDiv.className = 'option';
        optionDiv.innerHTML = `${String.fromCharCode(65 + index)}) ${option}`;
        optionDiv.onclick = () => selectOption(index);
        optionsContainer.appendChild(optionDiv);
    });
    
    // Limpar feedback
    document.getElementById('feedback').classList.add('hidden');
    document.getElementById('btnNext').classList.add('hidden');
}

// Função para selecionar uma opção
function selectOption(index) {
    const question = gameState.availableQuestions[gameState.currentQuestion % gameState.availableQuestions.length];
    const options = document.querySelectorAll('.option');
    
    // Desabilitar todas as opções
    options.forEach(option => option.classList.add('disabled'));
    
    // Marcar opção selecionada
    options[index].classList.add('selected');
    
    // Verificar resposta
    const isCorrect = index === question.correct;
    const feedbackDiv = document.getElementById('feedback');
    
    if (isCorrect) {
        options[index].classList.add('correct');
        feedbackDiv.className = 'feedback correct';
        feedbackDiv.innerHTML = `
            <strong>✅ Correto!</strong><br>
            ${question.explanation}<br>
            <strong>+50 XP</strong>
        `;
        
        // Adicionar XP
        addXP(50);
        gameState.correctAnswers++;
        document.getElementById('correctAnswers').textContent = gameState.correctAnswers;
        
        // Som de acerto (simulado com emoji)
        celebrateCorrect();
    } else {
        options[index].classList.add('incorrect');
        options[question.correct].classList.add('correct');
        feedbackDiv.className = 'feedback incorrect';
        feedbackDiv.innerHTML = `
            <strong>❌ Incorreto!</strong><br>
            ${question.explanation}
        `;
    }
    
    feedbackDiv.classList.remove('hidden');
    document.getElementById('btnNext').classList.remove('hidden');
}

// Função para adicionar XP
function addXP(amount) {
    const oldRank = gameState.currentRank;
    gameState.totalXP += amount;
    
    // Atualizar XP total
    document.getElementById('totalXP').textContent = gameState.totalXP;
    
    // Verificar nova patente
    let newRank = 0;
    for (let i = ranks.length - 1; i >= 0; i--) {
        if (gameState.totalXP >= ranks[i].minXP) {
            newRank = i;
            break;
        }
    }
    
    // Atualizar barra de XP
    const nextRank = newRank < ranks.length - 1 ? ranks[newRank + 1] : ranks[newRank];
    const currentRankXP = ranks[newRank].minXP;
    const nextRankXP = nextRank.minXP;
    const progress = ((gameState.totalXP - currentRankXP) / (nextRankXP - currentRankXP)) * 100;
    
    document.getElementById('xpBar').style.width = `${Math.min(progress, 100)}%`;
    document.getElementById('xpText').textContent = `${gameState.totalXP - currentRankXP}/${nextRankXP - currentRankXP} XP`;
    
    // Se subiu de patente
    if (newRank > oldRank) {
        gameState.currentRank = newRank;
        updateRank();
        showLevelUp(ranks[oldRank], ranks[newRank]);
    }
}

// Função para atualizar patente
function updateRank() {
    const rank = ranks[gameState.currentRank];
    document.getElementById('rankIcon').textContent = rank.icon;
    document.getElementById('rankName').textContent = rank.name;
}

// Função para mostrar tela de level up
function showLevelUp(oldRank, newRank) {
    const levelUpScreen = document.getElementById('levelUpScreen');
    const progression = document.getElementById('rankProgression');
    
    progression.innerHTML = `
        <span style="font-size: 48px;">${oldRank.icon}</span>
        <span>${oldRank.name}</span>
        <span style="font-size: 32px;">➜</span>
        <span>${newRank.name}</span>
        <span style="font-size: 48px;">${newRank.icon}</span>
    `;
    
    levelUpScreen.classList.remove('hidden');
    
    // Criar partículas de celebração
    createParticles();
}

// Função para fechar tela de level up
function closeLevelUp() {
    document.getElementById('levelUpScreen').classList.add('hidden');
}

// Função para próxima questão
function nextQuestion() {
    gameState.currentQuestion++;
    loadQuestion();
}

// Função para criar efeito de celebração
function celebrateCorrect() {
    const container = document.querySelector('.quiz-container');
    const celebration = document.createElement('div');
    celebration.style.cssText = `
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        font-size: 60px;
        animation: celebrate 1s ease-out forwards;
        pointer-events: none;
        z-index: 100;
    `;
    celebration.textContent = '🎉';
    container.appendChild(celebration);
    
    setTimeout(() => celebration.remove(), 1000);
}

// Função para criar partículas
function createParticles() {
    const colors = ['#667eea', '#764ba2', '#f093fb', '#f5576c', '#4facfe'];
    const container = document.body;
    
    for (let i = 0; i < 50; i++) {
        const particle = document.createElement('div');
        particle.style.cssText = `
            position: fixed;
            width: 10px;
            height: 10px;
            background: ${colors[Math.floor(Math.random() * colors.length)]};
            border-radius: 50%;
            top: 50%;
            left: 50%;
            pointer-events: none;
            animation: particle ${1 + Math.random() * 2}s ease-out forwards;
            z-index: 10000;
        `;
        container.appendChild(particle);
        
        setTimeout(() => particle.remove(), 3000);
    }
}

// Adicionar animações CSS dinamicamente
const style = document.createElement('style');
style.textContent = `
    @keyframes celebrate {
        0% {
            transform: translate(-50%, -50%) scale(0) rotate(0deg);
            opacity: 1;
        }
        50% {
            transform: translate(-50%, -50%) scale(1.5) rotate(180deg);
        }
        100% {
            transform: translate(-50%, -50%) scale(0) rotate(360deg);
            opacity: 0;
        }
    }
    
    @keyframes particle {
        0% {
            transform: translate(0, 0) scale(1);
            opacity: 1;
        }
        100% {
            transform: translate(${Math.random() * 200 - 100}px, ${Math.random() * 200 - 100}px) scale(0);
            opacity: 0;
        }
    }
`;
document.head.appendChild(style);

// Inicializar o jogo
document.addEventListener('DOMContentLoaded', () => {
    updateRank();
});