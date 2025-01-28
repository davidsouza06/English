const exercises = [
    { phrase: "state of the art ____", answers: ["very modern and using the most recent technology"] },
    { phrase: "bear with me ____", answers: ["be patient while someone else finishes a task"] },
    { phrase: "stepping stone ____", answers: ["action that helps one to make progress towards a goal"] },
    { phrase: "from scratch ____", answers: ["starting from the beginning with no prior preparation"] },
    { phrase: "bridge the gap ____", answers: ["connect two things or reduce difference between them"] },
    { phrase: "the big picture ____", answers: ["the overall perspective or objective, not just the details"] },
    { phrase: "in the early days ____", answers: ["in the beginning stages of an activity or period"] },
    { phrase: "get one's head round ____", answers: ["to understand or come to terms with something"] },
    { phrase: "go hand in hand with ____", answers: ["closely connected with something and affect each other"] },
    { phrase: "keep an eye on ____", answers: ["to watch or monitor something carefully"] }
] 

const exercises2 = [
    { phrase: "hang on a minute ____", answers: ["wait a moment"] },
    { phrase: "on the spot ____", answers: ["immediately; without delay"] },
    { phrase: "get to grips with ____", answers: ["to begin to understand or deal with something difficult"] },
    { phrase: "go through the roof ____", answers: ["to increase or rise rapidly"] },
    { phrase: "full circle ____", answers: ["to return to the original position or situation"] },
    { phrase: "that's another story ____", answers: ["that's a different issue or matter altogether"] },
    { phrase: "how on earth...? ____", answers: ["used to express surprise or disbelief"] },
    { phrase: "cast one's mind back ____", answers: ["to think back to a particular time or event"] },
    { phrase: "last resort ____", answers: ["the final option after all others have been tried"] },
    { phrase: "ring a bell ____", answers: ["to sound familiar"] }
]

let allOptions = shuffleAnswers(exercises);
let allOptions2 = shuffleAnswers(exercises2);


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

    renderExercises(exercises2, 'exercise-container-2', handleDrop, 2);
    renderOptions(allOptions2, 'options-container-2', handleDrag);
};

let isTranslated = false;
function toggleTranslation() {
    const exerciseText = document.getElementById('exercise-text');
    if (isTranslated) {
        exerciseText.innerHTML = `Exercise 13: Match the idioms with the definition`;
    } else {
        exerciseText.innerHTML = `Exercício 13: Combine as expressões idiomáticas com a definição`;
    }
    isTranslated = !isTranslated; // Alterna o estado da tradução
}
