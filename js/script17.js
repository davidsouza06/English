const exercises = [
    { phrase: "fall into place ____", answers: ["start to happen in a satisfactory way, without problems"] },
    { phrase: "so far so good ____", answers: ["things are going well so far"] },
    { phrase: "in the same boat ____", answers: ["in the same difficult or unfortunate situation"] },
    { phrase: "kicking and screaming ____", answers: ["reluctantly and with a lot of resistance"] },
    { phrase: "rule of thumb ____", answers: ["a general principle based on experience or practice"] },
    { phrase: "can't put my finger on ____", answers: ["unable to identify or understand something precisely"] },
    { phrase: "go in one ear and out the other ____", answers: ["to be heard but immediately forgotten or ignored"] },
    { phrase: "in a nutshell ____", answers: ["in summary; briefly "] },
    { phrase: "set the scene ____", answers: ["describe situation so you know what's happening"] },
    { phrase: "make up one's mind ____", answers: ["to make a decision"] }
] 

const exercises2 = [
    { phrase: "get carried away ____", answers: ["to become overly excited or lose self-control"] },
    { phrase: "stand to reason ____", answers: ["to be logical or make sense"] },
    { phrase: "devil's advocate ____", answers: ["someone who presents counterargument for discussion"] },
    { phrase: "happily ever after ____", answers: ["a happy ending, especially in a story"] },
    { phrase: "throw in at the deep end ____", answers: ["put into a challenging situation without preparation"] },
    { phrase: "have a go ____", answers: ["to attempt or try something"] },
    { phrase: "pat on the back ____", answers: ["to give someone praise or recognition"] },
    { phrase: "sit on one's hands ____", answers: ["to do nothing, especially when action is needed"] }, 
    { phrase: "throw up one's hands ____", answers: ["to show frustration or resignation"] },
    { phrase: "watch this space ____", answers: ["wait and see what happens"] }
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
        exerciseText.innerHTML = `Exercise 17: Match the idioms with the definition`;
    } else {
        exerciseText.innerHTML = `Exercício 17: Combine as expressões idiomáticas com a definição`;
    }
    isTranslated = !isTranslated; // Alterna o estado da tradução
}