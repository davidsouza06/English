const exercises = [
    { phrase: "He couldn’t seem to _____ the new system; it was too complicated.", options: ["full circle", "bear with me", "get to grips with"], answer: "get to grips with", selectedOption: null, isCorrect: null },
    { phrase: "We’ll have to start this project _____. There’s no existing data to work from.", options: ["on the spot", "stepping stone", "from scratch"], answer: "from scratch", selectedOption: null, isCorrect: null },
    { phrase: "The company’s new headquarters is completely _____. Everything is equipped with the latest technology.", options: ["state of the art", "bridge the gap", "go through the roof"], answer: "state of the art", selectedOption: null, isCorrect: null },
    { phrase: "When I visited my childhood home after all these years, I felt like I had come _____.", options: ["to grips with", "in the early days", "full circle"], answer: "full circle", selectedOption: null, isCorrect: null },
    { phrase: "This course will be a _____ for you to get into a more advanced program next year.", options: ["ring a bell", "stepping stone", "stepping stone"], answer: "ring a bell", selectedOption: null, isCorrect: null },
    { phrase: "Please _____ while I find the information you need.", options: ["get to grips with", "bear with me", "bridge the gap"], answer: "bear with me", selectedOption: null, isCorrect: null },
    { phrase: "These two departments need to _____ if we want to achieve success.", options: ["ring a bell", "get one's head round", "go hand in hand"], answer: "go hand in hand", selectedOption: null, isCorrect: null },
    { phrase: "I can’t remember exactly where I heard that name, but it definitely _____.", options: ["goes through the roof", "cast one's mind back", "rings a bell"], answer: "rings a bell", selectedOption: null, isCorrect: null },
    { phrase: "In the meeting, he asked a very difficult question and I had to answer _____.", options: ["on the spot", "state of the art", "stepping stone"], answer: "on the spot", selectedOption: null, isCorrect: null },
    { phrase: "This event reminds me of _____ of the company when we were just getting started.", options: ["the big picture", "the early days", "from scratch"], answer: "the early days", selectedOption: null, isCorrect: null },
    { phrase: "_____! Let me check if we have enough resources for this project before we continue.", options: ["Go through the roof", "Bear with me", "Hang on a minute"], answer: "Hang on a minute", selectedOption: null, isCorrect: null },
    { phrase: "The cost of housing in this area has _____ over the last few years.", options: ["gotten to grips with", "cast one's mind back", "gone through the roof"], answer: "dgone through the roof", selectedOption: null, isCorrect: null },
    { phrase: "His performance in the test exceeded expectations; the scores really _____.", options: ["rang a bell", "went through the roof", "hung on a minute"], answer: "went through the roof", selectedOption: null, isCorrect: null },
    { phrase: "We need to look at _____ if we’re going to solve this problem, not just focus on the small details.", options: ["state of the art", "the big picture", "the early days"], answer: "the big picture", selectedOption: null, isCorrect: null },
    { phrase: "I’ll _____ to the time we all worked together. It was a great team effort.", options: ["cast my mind back", "get my head round", "bridge the gap"], answer: "cast my mind back", selectedOption: null, isCorrect: null },
    { phrase: "If all else fails, we’ll use this strategy as a _____.", options: ["state of the art", "stepping stone", "last resort"], answer: "last resort", selectedOption: null, isCorrect: null },
    { phrase: "The name of that company doesn’t _____. I don’t think I’ve heard of them before.", options: ["go hand in hand", "ring a bell", "cast my mind back"], answer: "ring a bell", selectedOption: null, isCorrect: null },
    { phrase: "_____ did you manage to finish the project so quickly?", options: ["How on earth", "That's another story", "Bear with me"], answer: "Bear with me", selectedOption: null, isCorrect: null },
    { phrase: "I find it hard to _____ the logic behind this new policy; it just doesn’t make sense to me.", options: ["get my head round", "bear with me", "get to grips with"], answer: "get my head round", selectedOption: null, isCorrect: null },
    { phrase: "He promised to explain more details later, saying “_____, we’ll discuss it tomorrow.”", options: ["On the spot", "Hang on a minute", "That's another story"], answer: "That's another story", selectedOption: null, isCorrect: null }
];

let currentExerciseIndex = 0;

function renderExercise() {
    const exercise = exercises[currentExerciseIndex];
    const phraseContainer = document.getElementById('exercise-phrase');
    const optionsContainer = document.getElementById('exercise-options');
    const dotsContainer = document.getElementById('dots-container');

    // Atualizar frase
    phraseContainer.textContent = exercise.phrase;

    // Atualizar opções
    optionsContainer.innerHTML = '';
    exercise.options.forEach(option => {
        const optionElement = document.createElement('label');
        optionElement.classList.add('option');
        optionElement.innerHTML = `
            <input type="radio" name="answer" value="${option}">
            ${option}
        `;

        // Marcar a opção salva como selecionada
        const input = optionElement.querySelector('input');
        if (exercise.selectedOption === option) {
            input.checked = true;
            if (exercise.isCorrect !== null) {
                optionElement.classList.add(exercise.isCorrect ? 'correct' : 'incorrect');
            }
        }

        // Evento de clique para marcar a opção
        optionElement.addEventListener('click', () => {
            // Salvar a resposta selecionada
            exercise.selectedOption = option;

            // Remover a classe 'selected' de todas as opções
            document.querySelectorAll('.option').forEach(opt => opt.classList.remove('selected'));
            // Adicionar a classe 'selected' à opção clicada
            optionElement.classList.add('selected');
        });

        optionsContainer.appendChild(optionElement);
    });

    // Atualizar bolinhas
    dotsContainer.innerHTML = '';
    exercises.forEach((_, index) => {
        const dot = document.createElement('div');
        dot.classList.add('dot');
        if (index === currentExerciseIndex) dot.classList.add('active');
        dot.addEventListener('click', () => navigateToExercise(index));
        dotsContainer.appendChild(dot);
    });

    // Mostrar botões padrão
    document.getElementById('check-answer').style.display = 'block';
    document.getElementById('show-solution').style.display = 'none';
    document.getElementById('try-again').style.display = 'none';
}

function navigateToExercise(index) {
    currentExerciseIndex = index;
    renderExercise();
}

// Evento do botão check-answer
document.getElementById('check-answer').addEventListener('click', () => {
    const selectedOption = document.querySelector('input[name="answer"]:checked');
    if (!selectedOption) {
        alert('Please select an answer!');
        return;
    }

    const exercise = exercises[currentExerciseIndex];
    const isCorrect = selectedOption.value === exercise.answer;
    const optionElement = selectedOption.parentElement;

    // Salvar estado de correção
    exercise.selectedOption = selectedOption.value;
    exercise.isCorrect = isCorrect;

    // Adicionar a classe correspondente
    optionElement.classList.add(isCorrect ? 'correct' : 'incorrect');

    // Desabilitar todas as opções
    document.querySelectorAll('input[name="answer"]').forEach(input => input.disabled = true);

    // Mostrar ou ocultar botões adicionais
    if (!isCorrect) {
        document.getElementById('check-answer').style.display = 'none';
        document.getElementById('show-solution').style.display = 'inline-block';
        document.getElementById('try-again').style.display = 'inline-block';
    }
});

// Evento do botão show-solution
document.getElementById('show-solution').addEventListener('click', () => {
    const exercise = exercises[currentExerciseIndex];
    document.querySelectorAll('.option').forEach(option => {
        const input = option.querySelector('input[name="answer"]');
        if (input.value === exercise.answer) {
            option.classList.add('correct');
        }
    });
});

// Evento do botão try-again
document.getElementById('try-again').addEventListener('click', () => {
    const exercise = exercises[currentExerciseIndex];
    exercise.selectedOption = null;
    exercise.isCorrect = null;
    renderExercise(); // Recarregar o exercício atual
});

// Navegação entre exercícios
document.getElementById('prev-btn').addEventListener('click', () => {
    if (currentExerciseIndex > 0) {
        currentExerciseIndex--;
        renderExercise();
    }
});

document.getElementById('next-btn').addEventListener('click', () => {
    if (currentExerciseIndex < exercises.length - 1) {
        currentExerciseIndex++;
        renderExercise();
    }
});

// Inicializa o primeiro exercício
renderExercise();