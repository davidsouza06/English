const exercises = [
    { phrase: "I want ____ go ____ the park today.", answers: ["to", "to"] },
    { phrase: "She is ____ tired ____ walk any farther.", answers: ["too", "to"] },
    { phrase: "We bought ____ tickets ____ the concert.", answers: ["two", "to"] },
    { phrase: "This soup is ____ hot ____ eat right now.", answers: ["too", "to"] },
    { phrase: "He invited his ____ friends ____ the game.", answers: ["two", "to"] },
    { phrase: "I have ____ finish my homework before ____ o'clock.", answers: ["to", "two"] },
    { phrase: "It’s ____ early ____ start cooking dinner.", answers: ["too", "to"] },
    { phrase: "They decided ____ bring ____ cakes for the party.", answers: ["to", "two"] },
    { phrase: "The car is ____ expensive ____ buy right now.", answers: ["too", "to"] },
    { phrase: "She gave me ____ reasons why she wants ____ move.", answers: ["two", "to"] },
    { phrase: "He has ____ leave by ____ in the afternoon.", answers: ["to", "two"] },
    { phrase: "This room is ____ small ____ fit everyone.", answers: ["too", "to"] },
    { phrase: "We need ____ buy ____ more chairs for the table.", answers: ["to", "two"] },
    { phrase: "It was ____ late ____ change our plans.", answers: ["too", "to"] },
    { phrase: "I have ____ exams ____ study for this week.", answers: ["two", "to"] },
    { phrase: "She was ____ busy ____ answer the phone.", answers: ["too", "to"] },
    { phrase: "He brought ____ books ____ read on the plane.", answers: ["two", "to"] },
    { phrase: "We went ____ the store ____ buy ____ bottles of water.", answers: ["to", "to", "two"] },
    { phrase: "The coffee is ____ bitter for my taste.", answers: ["too"] },
    { phrase: "They gave ____ awards ____ the best performers.", answers: ["two", "to"] }
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
        exerciseText.innerHTML = `9. Are you confused about when and how to use “to, too, and two?” Don’t be! Many Americans also mistakenly use the wrong words – especially “to” and “too.”</p>
      Grammar rules: “to” indicates direction and is also a preposition; “too” is identical to “also,” and also describes an excessive amount of something; and “two” = “2.”`;
    } else {
        exerciseText.innerHTML = `9. Você está confuso sobre quando e como usar “to, too, and two?” Não fique! Muitos americanos também usam erroneamente as palavras erradas – especialmente “to” e “too.</p>
Regras gramaticais: “to” indica direção e também é uma preposição, enquanto “too” é idêntico a “also” e também descreve uma quantidade excessiva de algo. “Two” = “2”`;
    }
    isTranslated = !isTranslated; // Alterna o estado da tradução
}