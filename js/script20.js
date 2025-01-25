const exercises = [
    { phrase: "We need to _____ if we want to finish this project by the end of the week.", options: ["get cracking", "drag our feet", "go back to square one"], answer: "get cracking", selectedOption: null, isCorrect: null },
    { phrase: "When asked how much the repairs would cost, he gave an estimate _____.", options: ["not to put too fine a point on it", "off the top of his head", "ef"], answer: "dig his heels in", selectedOption: null, isCorrect: null },
    { phrase: "He was hesitant to _____, but he decided to express his opinion, even though it might not be popular.", options: ["put his head above the parapet", "get a move on", "tick the boxes"], answer: "put his head above the parapet", selectedOption: null, isCorrect: null },
    { phrase: "If you don’t start acting soon, people will think you’re just _____ about this decision.", options: ["dragging your feet", "in the driving seat", "at loggerheads"], answer: "dragging your feet", selectedOption: null, isCorrect: null },
    { phrase: "With so many job offers, she can really _____ which role she wants.", options: ["pick and choose", "give the game away", "get a fair share"], answer: "pick and choose", selectedOption: null, isCorrect: null },
    { phrase: "We’ve been _____ about this issue for days, and it’s getting in the way of progress.", options: ["digging our heels in", "at loggerheads", "going back to square one"], answer: "at loggerheads", selectedOption: null, isCorrect: null },
    { phrase: "He’ll _____ if you tell him the surprise before the party!", options: ["give the game away", "get a move on", "pick and choose"], answer: "give the game away", selectedOption: null, isCorrect: null },
    { phrase: "We thought we had finished the design, but after the client’s feedback, we had to _____.", options: ["go back to square one", "tick the boxes", "get a fair share"], answer: "go back to square one", selectedOption: null, isCorrect: null },
    { phrase: "I don’t know the exact details, but _____, I think the event starts at 7 p.m.", options: ["off the top of my head", "a fair share", "dig my heels in"], answer: "dig my heels in", selectedOption: null, isCorrect: null },
    { phrase: "She tends to _____ and refuse to compromise once she’s made up her mind about something.", options: ["drag her feet", "dig her heels in", "pick and choose"], answer: "dig her heels in", selectedOption: null, isCorrect: null },
    { phrase: "We’ve gone through several designs, but none of them seem to _____ for the client.", options: ["tick the boxes", "give the game away", "get cracking"], answer: "tick the boxes", selectedOption: null, isCorrect: null },
    { phrase: "I was in a difficult situation and needed to speak up. So, _____, I have to leave the meeting early.", options: ["get cracking", "on that note", "hand on heart"], answer: "on that note", selectedOption: null, isCorrect: null },
    { phrase: "The plan isn’t _____ yet, so we can still make changes if necessary.", options: ["set in stone", "in a rut", "dragging our feet"], answer: "set in stone", selectedOption: null, isCorrect: null },
    { phrase: "_____, it was a difficult meeting, and many people left frustrated.", options: ["Hand on heart", "To say the least", "Tick the boxes"], answer: "To say the least", selectedOption: null, isCorrect: null },
    { phrase: "I can say _____ that I gave my best effort in preparing for the IELTS exam.", options: ["hand on heart", "give the game away", "drag my feet"], answer: "hand on heart", selectedOption: null, isCorrect: null },
    { phrase: "It’s time to _____ and start preparing for the upcoming presentation.", options: ["get a move on", "at loggerheads", "pick and choose"], answer: "get a move on", selectedOption: null, isCorrect: null },
    { phrase: "We’re really _____ on how to handle the budget for this project.", options: ["at loggerheads", "going back to square one", "dragging our feet"], answer: "at loggerheads", selectedOption: null, isCorrect: null },
    { phrase: "If you don’t know what to do, why not _____ and see how it goes?", options: ["dig your heels in", "have a crack at it", "get cracking"], answer: "have a crack at it", selectedOption: null, isCorrect: null },
    { phrase: "The company CEO is now _____ and will make the final decision on the merger.", options: ["dragging his feet", "in the driving seat", "off the top of his head"], answer: "in the driving seat", selectedOption: null, isCorrect: null },
    { phrase: "I feel like I’m _____ in my job; nothing ever changes, and there’s no room for growth.", options: ["in a rut", "set in stone", "at loggerheads"], answer: "in a rut", selectedOption: null, isCorrect: null },
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