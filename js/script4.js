const exercises = [
    { phrase: "____ dog is barking loudly outside.", answers: ["The"] },
    { phrase: "She found ____ book on the table.", answers: ["a"] },
    { phrase: "There is ____ apple in ____ basket.", answers: ["an", "the"] },
    { phrase: "____ sky is clear today.", answers: ["The"] },
    { phrase: "I need ____ new pair of shoes.", answers: ["a"] },
    { phrase: "She adopted ____ elephant at ____ zoo.", answers: ["an", "the"] },
    { phrase: "He borrowed ____ pen from ____ teacher.", answers: ["a", "the"] },
    { phrase: "I saw ____ interesting movie last night.", answers: ["an"] },
    { phrase: "____ pizza that we ordered was delicious.", answers: ["The"] },
    { phrase: "There is ____ big tree in ____ park.", answers: ["a", "the"] }  
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
        exerciseText.innerHTML = `4. Articles/identifiers are words that identify and are connected to nouns. The following sentences are without an article/identifier. 
                        Select and place the correct article/identifier in each of the following sentences.</br>
                
                        Here are the grammar rules: The identifier/article “a” is (followed by) connected to nouns that begin with a consonant;</br> 
                        The identifier/article “an” is connected to nouns that begin the <span class="highlight">SOUND</span> of a vowel;</br> 
                        The identifier/article “the” is connected to a noun beginning with a consonant or the sound of a vowel, and when the noun is specific or particular, 
                        whether singular or plural.`;
    } else {
        exerciseText.innerHTML = `4. Artigos/identificadores são palavras que identificam e estão conectadas a substantivos. As frases a seguir não têm artigo/identificador. 
        Selecione e coloque o artigo/identificador correto em cada uma das frases a seguir.</br>

        Aqui estão as regras gramaticais: O identificador/artigo “a” é (seguido por) conectado a substantivos que começam com uma consoante;</br> 
        O identificador/artigo “an” é conectado a substantivos que começam com o <span class="highlight">SOM</span> de uma vogal;</br> 
        O identificador/artigo “the” é conectado a um substantivo que começa com uma consoante ou o som de uma vogal, e quando o substantivo é específico ou particular, seja singular ou plural.`;
    }
    isTranslated = !isTranslated; // Alterna o estado da tradução
}
