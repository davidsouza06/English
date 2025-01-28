const exercises = [
    { phrase: "It’s unfair when they keep changing the rules and _____ halfway through the project.", options: ["moving the goalposts", "calling the cavalry", "putting things on the back burner"], answer: "moving the goalposts", selectedOption: null, isCorrect: null },
    { phrase: "This hammer should _____ for now, but we might need something more specific later.", options: ["get the picture", "do the job", "spring to mind"], answer: "do the job", selectedOption: null, isCorrect: null },
    { phrase: "His lack of preparation _____ one simple thing: he didn’t take the exam seriously.", options: ["boils down to", "calls the cavalry", "gets his act together"], answer: "boils down to", selectedOption: null, isCorrect: null },
    { phrase: "We had to put the new website development project _____ until the budget was approved.", options: ["out of one’s hands", "on the back burner", "bog standard"], answer: "on the back burner", selectedOption: null, isCorrect: null },
    { phrase: "If this situation gets any worse, we may need to _____ and get additional support.", options: ["call the cavalry", "spring to mind", "move the goalposts"], answer: "call the cavalry", selectedOption: null, isCorrect: null },
    { phrase: "Back in the _____, life seemed simpler and more relaxed.", options: ["golden age", "good old days", "behind the scenes"], answer: "good old days", selectedOption: null, isCorrect: null },
    { phrase: "The _____ of my career was receiving the award for best director.", options: ["high point", "golden age", "bog standard"], answer: "high point", selectedOption: null, isCorrect: null },
    { phrase: "The negotiations were happening _____, and we didn’t hear anything until the agreement was announced.", options: ["out of one’s hands", "behind the scenes", "in the good old days"], answer: "behind the scenes", selectedOption: null, isCorrect: null },
    { phrase: "There is a _____ between what is allowed and what is not in this particular rule.", options: ["bog standard", "grey area", "high point"], answer: "grey area", selectedOption: null, isCorrect: null },
    { phrase: "_____ did they manage to finish the project in just two weeks?", options: ["Ring a bell", "How on earth", "Bear with me"], answer: "How on earth", selectedOption: null, isCorrect: null },
    { phrase: "Why don’t you _____ at solving this puzzle? It’s really tricky.", options: ["get the picture", "have a stab at", "get (your) act together"], answer: "have a stab at", selectedOption: null, isCorrect: null },
    { phrase: "That _____: why didn’t they inform us about the policy change sooner?", options: ["gets the picture", "boils down to", "begs the question"], answer: "begs the question", selectedOption: null, isCorrect: null },
    { phrase: "The design looks _____ to me, nothing special but functional.", options: ["bog standard", "touchy-feely", "high point"], answer: "bog standard", selectedOption: null, isCorrect: null },
    { phrase: "Let’s _____ before we make any decisions to ensure we understand the facts correctly.", options: ["have a stab at", "get something straight", "spring to mind"], answer: "get something straight", selectedOption: null, isCorrect: null },
    { phrase: "_____, you might remember how challenging the beginning of the course was.", options: ["Go through the roof", "Cast your mind back", "Get to grips with"], answer: "Cast your mind back", selectedOption: null, isCorrect: null },
    { phrase: "Could you _____ the kids while I take this call?", options: ["keep an eye on", "ring a bell", "get one's head round"], answer: "keep an eye on", selectedOption: null, isCorrect: null },
    { phrase: "It’s _____ now, so we’ll just have to wait for their decision.", options: ["behind the scenes", "out of one’s hands", "out of the blue"], answer: "out of one’s hands", selectedOption: null, isCorrect: null },
    { phrase: "Once the project manager explained the plan, I began to _____.", options: ["move the goal posts", "get the picture", "boil down to"], answer: "get the picture", selectedOption: null, isCorrect: null },
    { phrase: "The 1920s are often referred to as the _____ of jazz music.", options: ["high point", "golden age", "grey area"], answer: "golden age", selectedOption: null, isCorrect: null },
    { phrase: "When thinking of great athletes, the name Serena Williams always _____.", options: ["springs to mind", "calls the cavalry", "moves the goalposts"], answer: "springs to mind", selectedOption: null, isCorrect: null }
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
