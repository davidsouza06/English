const exercises = [
    { phrase: "<strong>Gilberto:</strong> Hi, ____ name is Gilberto. It is nice ____ meet you. ____ is your name?", answers: ["my", "to", "What"] },		
    { phrase: "<strong>Ana:</strong> Hi, Gilberto. It’s nice to ____ you ____. My name ____ Ana.", answers: ["meet", "too", "is"] },
    { phrase: "<strong>Gilberto:</strong> Hi, Ana: ____ do you ____?", answers: ["Where", "live"] },
    { phrase: "<strong>Ana:</strong> I live ____ Chicago. Where ____ you live?", answers: ["in", "do"] },
    { phrase: "<strong>Gilberto:</strong> I live in Chicago too. Do you ____ living ____?", answers: ["like", "here"] },
    { phrase: "<strong>Ana:</strong> ____, I love ____. The weather ____ very nice, especially ____ the summer. Do ____ like it here?", answers: ["Yes", "it", "is", "in", "you"] },
    { phrase: "<strong>Gilberto:</strong> Yes, I do. It’s hot here ____ July ____ I like hot ____.", answers: ["in", "and", "weather"] },
    { phrase: "<strong>Ana:</strong> ____ you been to Lake Michigan? It’s very large ____ the water temperature ____ cold!", answers: ["Have", "but", "is"] },
    { phrase: "<strong>Gilberto:</strong> No, ____ yet. Maybe ____ ____ go together. ____ you interested?", answers: ["not", "we", "can", "Are"] },
    { phrase: "<strong>Ana:</strong> Yes, I’m interested. Can we go ____ Saturday?", answers: ["this"] },
    { phrase: "<strong>Gilberto:</strong> That’s perfect. See you ____.", answers: ["then"] } 
]

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
    if (correctAnswers.includes(data)) {
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
        exerciseText.innerHTML = `5. This exercise introduces you to a random conversation between two people who don’t know each other. Select the correct missing words.`;
    } else {
        exerciseText.innerHTML = `5. Este exercício apresenta a você uma conversa aleatória entre duas pessoas que não se conhecem. Selecione as palavras corretas que faltam.`;
    }
    isTranslated = !isTranslated; // Alterna o estado da tradução
}