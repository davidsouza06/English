const exercises = [
    { phrase: "He couldn't decide for weeks, but eventually, he had to _____ and choose which university to attend.", options: ["fall into place", "make up his mind", "watch this space"], answer: "make up his mind", selectedOption: null, isCorrect: null },
    { phrase: "When they threw me _____ on my first day, I had to learn everything quickly without much help.", options: ["in a nutshell", "in at the deep end", "in the same boat"], answer: "in at the deep end", selectedOption: null, isCorrect: null },
    { phrase: "My colleagues and I are all _____ when it comes to the budget cuts; we're all equally affected.", options: ["in the same boat", "sit on our hands", "make up our minds"], answer: "in the same boat", selectedOption: null, isCorrect: null },
    { phrase: "So far, the project is going according to plan. _____!", options: ["So far so good", "Stand to reason", "Fall into place"], answer: "So far so good", selectedOption: null, isCorrect: null },
    { phrase: "At the end of the story, the hero married the princess, and they lived _____.", options: ["happily ever after", "kicking and screaming", "throwing up their hands"], answer: "happily ever after", selectedOption: null, isCorrect: null },
    { phrase: "The teacher gave the instructions, but for some students, it just _____.", options: ["goes in one ear and out the other", "can't put my finger on", "stands to reason"], answer: "goes in one ear and out the other", selectedOption: null, isCorrect: null },
    { phrase: "We need someone to play _____ and question whether this plan is really feasible.", options: ["a pat on the back", "devil's advocate", "make up one's mind"], answer: "make up one's mind", selectedOption: null, isCorrect: null },
    { phrase: "I just can't seem to _____ what's wrong with the presentation, but something feels off.", options: ["make up my mind", "fall into place", "put my finger on"], answer: "put my finger on", selectedOption: null, isCorrect: null },
    { phrase: "It _____ that if you study hard, you’ll have a better chance of passing the IELTS test.", options: ["stands to reason", "kicks and screams", "sits on your hands"], answer: "stands to reason", selectedOption: null, isCorrect: null },
    { phrase: "When he received the award, he deserved more than just a _____; his performance was outstanding.", options: ["happily ever after", "pat on the back", "fall into place"], answer: "pat on the back", selectedOption: null, isCorrect: null },
    { phrase: "Let me _____ for you: The story begins with a young girl in a small village.", options: ["set the scene", "throw up my hands", "in a nutshell"], answer: "set the scene", selectedOption: null, isCorrect: null },
    { phrase: "I wanted to quit, but after some time, everything started to ____", options: ["throw up my hands", "get carried away", "fall into place"], answer: "fall into place", selectedOption: null, isCorrect: null },
    { phrase: "When I heard about the extra work, I was tempted to _____ in frustration, but I decided to keep going.", options: ["throw up my hands", "in a nutshell", "happily ever after"], answer: "throw up my hands", selectedOption: null, isCorrect: null },
    { phrase: "I tend to _____ when I get excited about a new project and start planning too much.", options: ["sit on my hands", "get carried away", "watch this space"], answer: "get carried away", selectedOption: null, isCorrect: null },
    { phrase: "If you're not sure how to approach the problem, why don’t you _____ and see if you can find a solution?", options: ["have a go", "sit on your hands", "get carried away"], answer: "have a go", selectedOption: null, isCorrect: null },
    { phrase: "Instead of just sitting there _____, you should actively participate in the discussion.", options: ["athrowing up your hands", "kicking and screaming", "sitting on your hands"], answer: "sitting on your hands", selectedOption: null, isCorrect: null },
    { phrase: "They dragged me along to the meeting, _____ because I didn’t want to go.", options: ["happily ever after", "in a nutshell", "kicking and screaming"], answer: "kicking and screaming", selectedOption: null, isCorrect: null },
    { phrase: "I need to take a break and think about this before I can _____ about the next steps.", options: ["make up my mind", "set the scene", "watch this space"], answer: "make up my mind", selectedOption: null, isCorrect: null },
    { phrase: "_____, we’re planning to release the product next month, but we’ll announce more details soon.", options: ["Sit on our hands", "Watch this space", "Stand to reason"], answer: "Watch this space", selectedOption: null, isCorrect: null },
    { phrase: "The rule of _____ is to review your work before submitting it, no matter how confident you feel.", options: ["thumb", "devil's advocate", "pat on the back"], answer: "thumb", selectedOption: null, isCorrect: null }
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