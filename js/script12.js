const exercises = [
    { phrase: "Cultural differences often _____ when working with international teams.", options: ["at the back of my mind", "sit on the fence", "come into play"], answer: "come into play", selectedOption: null, isCorrect: null },
    { phrase: "_____ made you choose such a difficult topic for your presentation?", options: ["What on earth", "At the back of my mind", "Over the top"], answer: "What on earth", selectedOption: null, isCorrect: null },
    { phrase: "Many people _____ their health _____ until they get sick.", options: ["bear _____ in mind", "take _____ for granted", "take _____ on board"], answer: "take _____ for granted", selectedOption: null, isCorrect: null },
    { phrase: "The _____ behind her success is her determination and hard work.", options: ["driving force", "gold standard", "bottom line"], answer: "driving force", selectedOption: null, isCorrect: null },
    { phrase: "I learned how to perfect this skill through _____.", options: ["along the lines of", "come into play", "trial and error"], answer: "trial and error", selectedOption: null, isCorrect: null },
    { phrase: "_____, the idea seemed great, but after further research, we discovered many flaws.", options: ["On the face of it", "By and large", "What on earth"], answer: "On the face of it", selectedOption: null, isCorrect: null },
    { phrase: "We’ll only know the true impact of this decision further _____.", options: ["at the end of the day", "in light of", "down the line"], answer: "down the line", selectedOption: null, isCorrect: null },
    { phrase: "Their customer service is considered the _____ in the industry.", options: ["driving force", "over the top", "gold standard"], answer: "gold standard", selectedOption: null, isCorrect: null },
    { phrase: "The investment may seem risky now, but _____, it could yield significant returns.", options: ["by and large", "in the long run", "down the line"], answer: "in the long run", selectedOption: null, isCorrect: null },
    { phrase: "The presentation was impressive, but _____, we still need to see if the plan will work.", options: ["take on board", "at the end of the day", "on the face of it"], answer: "at the end of the day", selectedOption: null, isCorrect: null },
    { phrase: "He refused to _____ so he gave an opinion about the controversial policy change.", options: ["sit on the fence", "take for granted", "come into play"], answer: "sit on the fence", selectedOption: null, isCorrect: null },
    { phrase: "_____ her dedication to the project, it’s no surprise she was promoted.", options: ["In light of", "Down the line", "Come into play"], answer: "In light of", selectedOption: null, isCorrect: null },
    { phrase: "Even though I agreed to the plan, I always had doubts _____ about its effectiveness.", options: ["at the back of my mind", "down the line", "at the bottom line"], answer: "at the back of my mind", selectedOption: null, isCorrect: null },
    { phrase: "With so many job offers, she can really _____ which role she wants.", options: ["pick and choose", "bear in mind", "take for granted"], answer: "pick and choose", selectedOption: null, isCorrect: null },
    { phrase: "The new product will be _____ of the one we released last year, but with improved features.", options: ["at the back of my mind", "along the lines of", "over the top"], answer: "along the lines of", selectedOption: null, isCorrect: null },
    { phrase: "_____, people in this area are friendly and welcoming, but it can be a bit expensive to live here.", options: ["Over the top", "By and large", "In the long run"], answer: "By and large", selectedOption: null, isCorrect: null },
    { phrase: "The _____ is that we need to improve our customer service if we want to keep our clients.", options: ["gold standard", "driving force", "bottom line"], answer: "bottom line", selectedOption: null, isCorrect: null },
    { phrase: "I’ll definitely _____ what you said and try to improve my writing for the next test.", options: ["take on board", "sit on the fence", "take for granted"], answer: "take on board", selectedOption: null, isCorrect: null },
    { phrase: "I think their reaction to the situation was a bit _____. It wasn’t such a big deal.", options: ["at the back of my mind", "over the top", "along the lines of"], answer: "over the top", selectedOption: null, isCorrect: null },
    { phrase: "_____ that safety is always a priority in this type of work.", options: ["Down the line", "By and large", "It goes without saying"], answer: "It goes without saying", selectedOption: null, isCorrect: null },
    
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