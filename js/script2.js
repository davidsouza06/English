const exercises = [
    { phrase: "1. Salaries often don’t keep ____ (increase) with the cost of living.", answers: ["up"] },
    { phrase: "2. Your report is very detailed, but it leaves ____ (does not include) some important details.", answers: ["out"] },
    { phrase: "3. The history teacher pointed ____ (showed) all of the locations where similar incidents occurred.", answers: ["out"] },
    { phrase: "4. Before you write your book, you need to look ____ (research) the country's history.", answers: ["into"] },
    { phrase: "5. Very few employees carried ____ (continued) working before the strike happened.", answers: ["on"] },
    { phrase: "6. When homeowners fall ____ (become late) with their mortgage payments, the bank will take their home.", answers: ["behind"] },
    { phrase: "7. The best way to lose weight is to cut ____ (reduce) the amount of sugar eaten.", answers: ["down"] },
    { phrase: "8. Vegetarians cut meat ____ (stop) from their diet.", answers: ["out"] },
    { phrase: "9. The family’s business was taken ____ (purchased) by a large company.", answers: ["over"] },
    { phrase: "10. My cell phone stopped working so I had to make ____ (improvise) with my laptop.", answers: ["do"] },
    { phrase: "11. My new book will put ____ (suggest) the arguments for capitalism.", answers: ["forward"] },
    { phrase: "12. When I look ____ (think about the past) at my childhood, I have good memories of my first school.", answers: ["back"] }
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
        exerciseText.innerHTML = `Exercise 2`;
    } else {
        exerciseText.innerHTML = `Exercício 2`;
    }
    isTranslated = !isTranslated; // Alterna o estado da tradução
}

function toggleTranslation() {
    const exerciseText = document.getElementById('exercise-text');
    if (isTranslated) {
        exerciseText.innerHTML = `2. This exercise introduces you to additional commonly used English phrasal verbs. Each sentence provides the formal verb in parentheses. 
                        Your task is to replace the formal verbs with phrasal verbs. Choosing an incorrect phrasal verb will be indicated by that word becoming red. 
                        The purpose of this exercise is to grow your vocabulary knowledge and use.</br> 
                        Be patient, and as with the four other separate exercises in this English course, refer to them often to reinforce your understanding and knowledge.`;
    } else {
        exerciseText.innerHTML = `2. Este exercício apresenta outros verbos frasais comumente usados ​​em inglês. Cada frase fornece o verbo formal entre parênteses. 
                        Sua tarefa é substituir os verbos formais por verbos frasais. A escolha de um verbo frasal incorreto será indicada pela palavra ficando vermelha. 
                        O objetivo deste exercício é aumentar seu conhecimento e uso de vocabulário.</br> 
                        Seja paciente e, como acontece com os outros quatro exercícios separados deste curso de inglês, consulte-os com frequência para reforçar sua compreensão e conhecimento.`;
    }
    isTranslated = !isTranslated; // Alterna o estado da tradução
}

// Estado atual da página
// let currentPage = 1;
// const totalPages = 10;

// // Função para atualizar a exibição da página
// function showPage(pageNumber) {
//     for (let i = 1; i <= totalPages; i++) {
//         const page = document.getElementById(`page${i}`);
//         page.style.display = i === pageNumber ? 'block' : 'none';
//     }
// }

// // Função para navegar para a próxima página
// function goToNextPage() {
//     if (currentPage < totalPages) {
//         currentPage++;
//         showPage(currentPage);
//     }
// }

// // Função para navegar para a página anterior
// function goToPreviousPage() {
//     if (currentPage > 1) {
//         currentPage--;
//         showPage(currentPage);
//     }
// }

// // Configurar eventos dos botões
// document.getElementById('voltar-btn').addEventListener('click', goToPreviousPage);
// document.getElementById('avancar-btn').addEventListener('click', goToNextPage);

// // Exibe a primeira página ao carregar o script
// showPage(currentPage);
