const exercises = [
    { phrase: "get cracking ____", answers: ["to start working on something quickly"] },
    { phrase: "have a crack at ____", answers: ["to attempt or try something"] },
    { phrase: "not to put too fine a point on it ____", answers: ["to be blunt or direct"] },
    { phrase: "give the game away ____", answers: ["to reveal a secret or surprise"] },
    { phrase: "get a move on ____", answers: ["to hurry up"] },
    { phrase: "hand on heart ____", answers: ["to speak honestly and sincerely"] },
    { phrase: "put (one's) head above the parapet ____", answers: ["to take a risk by expressing an opinion or taking action"] },
    { phrase: "a fair share ____", answers: ["a reasonable portion or amount"] },
    { phrase: "to say the least ____", answers: ["to understate; to put it mildly"] },
    { phrase: "pick and choose ____", answers: ["to have the luxury of selecting from many options"] }
] 

const exercises2 = [
    { phrase: "at loggerheads ____", answers: ["in strong disagreement or conflict"] },
    { phrase: "drag one's feet ____", answers: ["to act slowly or delay something"] },
    { phrase: "in the driving seat ____", answers: ["to be in control or in a dominant position"] },
    { phrase: "go back to square one ____", answers: ["to start over from the beginning"] },
    { phrase: "set in stone ____", answers: ["permanently fixed or decided"] },
    { phrase: "off the top of one's head ____", answers: ["without careful thought or investigation"] },
    { phrase: "in a rut ____", answers: ["in a monotonous routine"] },
    { phrase: "tick the boxes ____", answers: ["to meet all the criteria or requirements"] },
    { phrase: "dig one's heels in ____", answers: ["to refuse to change one's opinion or actions"] },
    { phrase: "on that note ____", answers: ["following from what was just mentioned"] }
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
        exerciseText.innerHTML = `Exercise 19: Match the idioms with the definition`;
    } else {
        exerciseText.innerHTML = `Exercício 19: Combine as expressões idiomáticas com a definição`;
    }
    isTranslated = !isTranslated; // Alterna o estado da tradução
}