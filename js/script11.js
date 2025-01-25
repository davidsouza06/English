const exercises = [
    { phrase: "bear in mind ____", answers: ["to remember or consider something"] },
    { phrase: "at the end of the day ____", answers: ["when everything is taken into consideration"] },
    { phrase: "the bottom line ____", answers: ["the most important aspect"] },
    { phrase: "take on board ____", answers: ["to consider new ideas, suggestions, or information"] },
    { phrase: "by and large ____", answers: ["for the most part"] },
    { phrase: "take for granted ____", answers: ["to assume something is true without questioning it"] },
    { phrase: "along the lines of ____", answers: ["similar in type; roughly comparable"] },
    { phrase: "at the back of my mind ____", answers: ["in one's thoughts but not at the forefront"] },
    { phrase: "sit on the fence ____", answers: ["to be undecided or not to take sides in a dispute"] },
    { phrase: "in the long run ____", answers: ["over an extended period of time"] }
] 

const exercises2 = [
    { phrase: "driving force ____", answers: ["the main factor that causes something to happen"] }, 
    { phrase: "on the face of it ____", answers: ["based on initial appearance; seemingly"] }, 
    { phrase: "in light of ____", answers: ["because of; considering"] },
    { phrase: "come into play ____", answers: ["to become a factor or influence in a situation"] }, 
    { phrase: "gold standard ____", answers: ["the best or most reliable example of something"] }, 
    { phrase: "what on earth...? ____", answers: ["used to express surprise or disbelief"] },
    { phrase: "it goes without saying ____", answers: ["obviously; as expected"] },
    { phrase: "trial and error ____", answers: ["a process of experimenting until a solution is found"] },
    { phrase: "over the top ____", answers: ["excessive or exaggerated"] },
    { phrase: "down the line ____", answers: ["at a later time"] }
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
        exerciseText.innerHTML = `Exercise 11: Match the idioms with the definition`;
    } else {
        exerciseText.innerHTML = `Exercício 11: Combine as expressões idiomáticas com a definição`;
    }
    isTranslated = !isTranslated; // Alterna o estado da tradução
}