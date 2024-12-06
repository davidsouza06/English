const exercises = [
    { phrase: "Last weekend, my family and I ____ to the countryside to ____ my uncle. We ____ for two hours to reach his small farmhouse. When we ____, my uncle ____ us with a big hug.", answers: ["went", "visit", "drove", "arrived", "welcomed"] }, 
    { phrase: "He ____ us around his farm, where he ____ vegetables and ____ some animals. I ____ chickens, cows, and even a horse. My sister ____ the chickens, and they quickly ____ the corn she gave them.", answers: ["showed", "grows", "keeps", "saw", "fed", "ate"] }, 
    { phrase: "My uncle then ____ us to his vegetable garden, where he ____ tomatoes, carrots, and peppers. I ____ a few ripe tomatoes, and they ____ so fresh. Later, we all ____  under a big tree and ____ lunch together.", answers: ["took", "grows", "picked", "smelled", "sat", "ate"] },
    { phrase: "My aunt had ____ sandwiches, and we ____ them with fresh milk from their cows. After lunch, my dad and uncle ____ a game of cards while we ____. My sister and I ____ to walk around the field and explore more.", answers: ["made", "enjoyed", "played", "watched", "decided"] },
    { phrase: "We ____ a little pond and ____ stones on the water. When the sun ____ to set, we ____ it was time to leave. We ____ goodbye to my uncle and aunt, and then we ____ back home, feeling happy and relaxed.", answers: ["found", "skipped", "began", "knew", "said", "drove"] },
    { phrase: "It ____ a wonderful day, and I hope we can ____ them again soon!", answers: ["was", "visit"] }     
];

let allOptions = shuffleAnswers(exercises);

function shuffleAnswers(exerciseList) {
    return exerciseList.flatMap(ex => ex.answers).sort(() => Math.random() - 0.5);
}

let removedOptionsByPage = {};

function renderExercises(exerciseList, containerId, dropHandler, dropboxPrefix) {
    const container = document.getElementById(containerId);
    container.innerHTML = '';

    exerciseList.forEach((exercise, index) => {
        let phraseHTML = exercise.phrase;

        exercise.answers.forEach((_, i) => {
            const dropboxId = `${dropboxPrefix}-${index}-${i}`;
            phraseHTML = phraseHTML.replace(
                '____',
                `<span class="dropbox" id="${dropboxId}"></span>`
            );
        });

        const phraseElement = document.createElement('div');
        phraseElement.className = 'phrase';
        phraseElement.innerHTML = phraseHTML;
        container.appendChild(phraseElement);

        exercise.answers.forEach((_, i) => {
            const dropboxId = `${dropboxPrefix}-${index}-${i}`;
            const dropbox = document.getElementById(dropboxId);

            if (dropbox) {
                dropbox.addEventListener('drop', (event) =>
                    handleDrop(event, exerciseList, [], removedOptionsByPage, dropboxPrefix)
                );
                dropbox.addEventListener('dragover', allowDrop);
            }
        });
    });
}

function renderOptions(options, containerId, dragHandler) {
    const container = document.getElementById(containerId);
    container.innerHTML = '';

    options.forEach(option => {
        const optionElement = document.createElement('div');
        optionElement.className = 'option';
        optionElement.innerHTML = option;
        optionElement.draggable = true;
        optionElement.addEventListener('dragstart', dragHandler);
        container.appendChild(optionElement);
    });
}

function allowDrop(event) {
    event.preventDefault();
}

function handleDrag(event) {
    const data = event.target.innerHTML;
    console.log('Dragging:', data);
    event.dataTransfer.setData('text', data);
}

function handleDrop(event, exerciseList, options, removedOptions, pageId) {
    event.preventDefault();

    const data = event.dataTransfer.getData('text');
    if (!data) {
        console.error('No data received in drop event');
        return;
    }

    const dropboxId = event.target.id;
    const [exerciseIndex, answerIndex] = dropboxId.split('-').slice(1).map(Number);
    const correctAnswers = exerciseList[exerciseIndex]?.answers || [];
    const expectedAnswer = correctAnswers[answerIndex];

    // Atualiza o conteúdo do espaço de drop
    event.target.innerHTML = data;
    console.log(pageId)

    if (!removedOptionsByPage[pageId]) {
        removedOptionsByPage[pageId] = [];
    }

    // Remover a opção do container de opções disponíveis
    const optionsContainer = document.getElementById(`options-container-${pageId}`);
    if (!optionsContainer) {
        console.error(`Options container with id options-container-${pageId} not found`);
        return;
    }

    const matchedOption = Array.from(optionsContainer.children).find(option => option.innerHTML === data);
    if (matchedOption) {
        matchedOption.remove();
        removedOptionsByPage[pageId].push(data); 
    }

    console.log("removedOptions:", removedOptionsByPage);

    // Aplica a classe de feedback e estilos
    if (data === expectedAnswer) {
        event.target.classList.add('correct');
        } else {
        event.target.classList.add('incorrect');
        addRemoveButton(event.target, data, pageId);
    }
}

function addRemoveButton(dropbox, data, dropboxPrefix) {
    // Evita adicionar múltiplos botões de remoção
    if (dropbox.querySelector('.remove-btn')) return;

    const removeButton = document.createElement('div');
    removeButton.className = 'remove-btn';
    removeButton.innerHTML = 'X';

    // Evento de clique para remover o conteúdo do dropbox
    removeButton.onclick = function () {
        dropbox.innerHTML = '';
        dropbox.classList.remove('incorrect');
        dropbox.classList.remove('correct');

        const optionsContainer = document.getElementById(`options-container-${dropboxPrefix}`);
        const optionElement = document.createElement('div');
        optionElement.className = 'option';
        optionElement.innerHTML = data;
        optionElement.draggable = true;
        optionElement.addEventListener('dragstart', handleDrag);
        optionsContainer.appendChild(optionElement);

        removeButton.remove();
    };
    dropbox.appendChild(removeButton);
}

window.onload = function () {
    renderExercises(exercises, 'exercise-container-1', handleDrop, 1);
    renderOptions(allOptions, 'options-container-1', handleDrag);
};

let isTranslated = false;
function toggleTranslation() {
    const exerciseText = document.getElementById('exercise-text');
    if (isTranslated) {
        exerciseText.innerHTML = `7. Understanding English verb tenses is easier than Portuguese verb tenses since English verbs are gender-neutral and do not change regardless of nouns. In this paragraph, choose the correct verb tense, but be aware that some are irregular verbs.</p>
    The grammar rules: When regular verbs are past tense, an “-ed” is added to the end of the verb. However, the spelling of irregular verbs change when they are conjugated.`;
    } else {
        exerciseText.innerHTML = `7. Entender os tempos verbais em inglês é mais fácil do que os tempos verbais em português, já que os verbos em inglês são neutros em termos de gênero e não mudam independentemente dos substantivos. Neste parágrafo, escolha o tempo verbal correto, mas esteja ciente de que alguns são verbos irregulares.</p>
As regras gramaticais: Quando os verbos regulares estão no passado, um “-ed” é adicionado ao final do verbo. No entanto, a grafia dos verbos irregulares muda quando eles são conjugados.`;
    }
    isTranslated = !isTranslated; // Alterna o estado da tradução
}
