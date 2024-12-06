const exercises = [
        { phrase: "1a. Negotiations between the management and workers <b><span class='highlight'>collapsed</span></b> when neither side reached an agreement.", answers: [] },
        { phrase: "1b. Negotiations between the management and workers ____ ____ when neither side reached an agreement.", answers: ["broke", "down"] },
        { phrase: "2a. Can you <b><span class='highlight'>calculate</span></b> the square root of 99?", answers: [] },
        { phrase: "2b.Can you ____ ____ the square root of 99?", answers: ["figure", "out"] },
        { phrase: "3a. The effects of the drug <b><span class='highlight'>disappeared</span></b> after a few hours.", answers: [] },
        { phrase: "3b. The effects of the drug ____ ____ after a few hours.", answers: ["wore", "off"] },
        { phrase: "4a. A lot of people get <b><span class='highlight'>exhausted</span></b> because of working too much.", answers: [] },
        { phrase: "4b. A lot of people get ____ ____ because of working too much.", answers: ["burned", "out"] },
        { phrase: "5a. Despite the dangers of organ transplants, most people <b><span class='highlight'>recover</span></b>.", answers: [] },
        { phrase: "5b. Despite the dangers of organ transplants, most people ____ ____. ", answers: ["pull", "through"] },
        { phrase: "6a. While negotiating, they were able to <b><span class='highlight'>resolve</span></b> the problem.", answers: [] },                                                                
        { phrase: "6b. While negotiating, they were able to ____ ____ the problem.", answers: ["sort", "out"] },
        { phrase: "7a. When parents decide to <b><span class='highlight'>live</span></b> <b><span class='highlight'>apart</span></b>, their children suffer.", answers: [, ] },
        { phrase: "7b. When parents decide to ____ ____, their children suffer.", answers: ["split", "up"] },
        { phrase: "8a. On opening night, only a few spectators <b><span class='highlight'>came</span></b>.", answers: [] },
        { phrase: "8b. On opening night, only a few spectators ____ ____.", answers: ["showed", "up"] },
        { phrase: "9a. Their Brazilian business partners <b><span class='highlight'>stopped</span></b> the deal.", answers: [] },
        { phrase: "9b. Their Brazilian business partners ____ ____ ____ the deal.", answers: ["backed", "out", "of"] },
        { phrase: "10a. People celebrate New Year’s Day by <b><span class='highlight'>exploding</span></b> fireworks.", answers: [] },
        { phrase: "10b. People celebrate New Year’s Day by ____ ____ fireworks.", answers: ["setting", "off"] },
        { phrase: "11a. New pension plans mean many people will have to <b><span class='highlight'>continue</span></b> working.", answers: [] },
        { phrase: "11b. New pension plans mean many people will have to ____ ____ working.", answers: ["keep", "on"] },
        { phrase: "12a. The plans were <b><span class='highlight'>delayed</span></b> because committee members disagreed.", answers: [] },
        { phrase: "12b. The plans were ____ ____ because committee members disagreed.", answers: ["held", "up"] }
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
        exerciseText.innerHTML = `3. In the following pairs of sentences, the verb needing replacement in sentences “a” are highlighted in red. 
        Replace these verbs with the correct phrasal verbs (some sentences have only one word needed and others need more) in red in sentences “b.” 
        As with the above exercise, <span class="highlight">don’t be concerned if you insert the wrong word(s)!</span> Continue choosing until the correct word(s) are chosen.`;
    } else {
        exerciseText.innerHTML = `3. Nos pares de sentenças seguintes, os verbos que precisam ser substituídos nas sentenças “a” estão destacados em vermelho. 
        Substitua esses verbos pelos verbos frasais corretos (algumas sentenças têm apenas uma palavra necessária e outras precisam de mais) em vermelho nas sentenças “b”. 
        Tal como acontece com o exercício acima, <span class="highlight">não se preocupe se inserir a(s) palavra(s) errada(s)!</span> Continue escolhendo até que as palavras corretas sejam escolhidas.`;
    }
    isTranslated = !isTranslated; // Alterna o estado da tradução
}
