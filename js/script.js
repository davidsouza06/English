const exercises = [
    { phrase: "1. Many parents do not know how to bring ____ (raise) their children.", answers: ["up"] },
    { phrase: "2. The town council members stormed ____ (departed) over plans for the new supermarket.", answers: ["out"] },
    { phrase: "3. Some company owners refuse to face ____ ____ (accept unpleasant results) their corporate responsibilities, causing negative results.", answers: ["up", "to"] },
    { phrase: "4. Yesterday, we had to call ____ (stop something) our family get together.", answers: ["off"] },
    { phrase: "5. He can always count ____ (depend) his best friend when he needs him.", answers: ["on"] },
    { phrase: "6. Many under-developed nations fail to catch ____ (get the same results) with their more developed neighbors.", answers: ["up"] },
    { phrase: "7. As the wind dies ____, (gets weaker) it starts to feel hotter.", answers: ["down"] },
    { phrase: "8. Too many students drop ____ ____ (leave) school every year.", answers: ["out", "of"] },
    { phrase: "9. Some politicians can't figure ____ (unable to understand) why they are disliked.", answers: ["out"] },
    { phrase: "10. You can find ____ (discover) so much information on the Internet.", answers: ["out"] },
    { phrase: "11. As we grow ____ (mature), our priorities change.", answers: ["up"] },
    { phrase: "12. Students are required to hand ____ (submit) their homework tomorrow.", answers: ["in"] }
];

const exercises2 = [
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
];

const exercises3 = [
        { phrase: "1a. Negotiations between the management and workers <b><span class='highlight'>collapsed</span></b> when neither side reached an agreement.", answers: [] },
        { phrase: "1b. Negotiations between the management and workers ____ ____ when neither side reached an agreement.", answers: ["broke", "down"] },
        { phrase: "2a. Can you <b><span class='highlight'>calculate</span></b> the square root of 99?", answers: [] },
        { phrase: "2b.Can you ____ ____ the square root of 99?", answers: ["figure", "out"] },
        { phrase: "3a. The effects of the drug <b><span class='highlight'>disappeared</span></b> after a few hours.", answers: [] },
        { phrase: "3b. The effects of the drug ____ ____ after a few hours.", answers: ["wear", "off"] },
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

const exercises4 = [
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

const exercises5 = [
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

const exercises6 = [
    { phrase: "____ going to the store later, and ____ got a long list of things to buy. ", answers: ["I'm", "I've"] }, 
    { phrase: "____ been a while since I last went, and ____ in need of almost everything. ", answers: ["It's", "I'm"] },
    { phrase: "____ like to purchase some snacks and also some chips or cookies, because I think", answers: ["I'd"] },
    { phrase: "____ be needed during this week. ____ it interesting how quickly food disappears from the kitchen? ", answers: ["they’ll", "Isn't"] },
    { phrase: "____ be spending a lot of money but ____ okay since ____ going to be a party at my", answers: ["I'll", "that’s", "there’s"] },
    { phrase: " house next weekend. While ____ out shopping, ____ probably a good idea to put gas in my car.  ", answers: ["I’m", "it’s"] },
    { phrase: "____ like to go to the nearest gas station, but ____ not possible because the grocery store is far from my home. ", answers: ["I’d", "that’s"] },
    { phrase: "Who knows how ____ get there if I run out of gas! ____ nervous about driving my car when ____ cold outside running out of gas ____ very smart. ", answers: ["I’ll", "I’m", "it’s", "isn’t"] }
]

const exercises7 = [
    { phrase: "Last weekend, my family and I ____ to the countryside to ____ my uncle. We ____ for two hours to reach his small farmhouse. When we ____, my uncle ____ us with a big hug. He ____ us around his farm, where he ____ vegetables and ____ some animals. I ____ chickens, cows, and even a horse. My sister ____ the chickens, and they quickly ____ the corn she gave them. My uncle then ____ us to his vegetable garden, where he ____ tomatoes, carrots, and peppers. I ____ a few ripe tomatoes, and they ____ so fresh. Later, we all ____  under a big tree and ____ lunch together. My aunt had ____ sandwiches, and we ____ them with fresh milk from their cows. After lunch, my dad and uncle ____ a game of cards while we ____. My sister and I ____ to walk around the field and explore more. We ____ a little pond and ____ stones on the water. When the sun ____ to set, we ____ it was time to leave. We ____ goodbye to my uncle and aunt, and then we ____ back home, feeling happy and relaxed. It ____ a wonderful day, and I hope we can ____ them again soon!", answers: ["went", "visit", "drove", "arrived", "welcomed", "showed", "grows", "keeps", "saw", "fed", "ate", "took", "grows", "picked", "smelled", "sat", "ate", "made", "enjoyed", "played", "watched", "decided", "found", "skipped", "began", "knew", "said", "drove", "was", "visit"] }     
]

const exercises8 = [
        { phrase: "____ is your favorite color?", answers: ["What"] },
        { phrase: "____ do you live?", answers: ["Where"] },
        { phrase: "____ did you arrive?", answers: ["When"] },
        { phrase: "____ are you studying English?", answers: ["Why"] },
        { phrase: "____ do you make a cake?", answers: ["How"] },
        { phrase: "____ is your best friend?", answers: ["Who"] },
        { phrase: "____ book did you read last?", answers: ["What"] },
        { phrase: "____ many siblings do you have?", answers: ["How"] },
        { phrase: "____ much does this shirt cost?", answers: ["How"] },
        { phrase: "____ kind of movies do you like?", answers: ["What"] },
        { phrase: "____ did you go on vacation?", answers: ["Where"] },
        { phrase: "____ will you finish your project?", answers: ["When"] },
        { phrase: "____ often do you exercise?", answers: ["How"] },
        { phrase: "____ taught you to play the guitar?", answers: ["Who"] },
        { phrase: "____ did you decide to learn a new language?", answers: ["Why"] },
        { phrase: "____ time does the class start?", answers: ["What"] },
        { phrase: "____ long have you been living here?", answers: ["How"] },
        { phrase: "____ restaurant do you recommend?", answers: ["What"] },
        { phrase: "____ can I help you with this problem?", answers: ["How"] },
        { phrase: "____ does this bag belong to?", answers: ["Who"] }
]

const exercises9 = [
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

const exercises10 = [
        { phrase: "I have ____ friends.", answers: ["many"] },
        { phrase: "How ____ is this apple?", answers: ["much"] },
        { phrase: "She drinks ____ water every day.", answers: ["much"] },
        { phrase: "There are ____ books in the library.", answers: ["many"] },
        { phrase: "How ____ cats do you see?", answers: ["many"] },
        { phrase: "We don't have ____ time.", answers: ["much"] },
        { phrase: "There are ____ stars in the sky.", answers: ["many"] },
        { phrase: "I don't eat ____ candy.", answers: ["much"] },
        { phrase: "How ____ pencils do you have?", answers: ["many"] },
        { phrase: "He doesn't have ____ toys.", answers: ["many"] },
        { phrase: "There isn't ____ milk in the fridge.", answers: ["much"] },
        { phrase: "How ____ days are in a week?", answers: ["many"] },
        { phrase: "We need ____ chairs for the party.", answers: ["many"] },
        { phrase: "She doesn’t spend ____ money.", answers: ["much"] },
        { phrase: "There are ____ flowers in the garden.", answers: ["many"] }
]

let allOptions = shuffleAnswers(exercises);
let allOptions2 = shuffleAnswers(exercises2);
let allOptions3 = shuffleAnswers(exercises3);
let allOptions4 = shuffleAnswers(exercises4);
let allOptions5 = shuffleAnswers(exercises5);
let allOptions6 = shuffleAnswers(exercises6);
let allOptions7 = shuffleAnswers(exercises7);
let allOptions8 = shuffleAnswers(exercises8);
let allOptions9 = shuffleAnswers(exercises9);
let allOptions10 = shuffleAnswers(exercises10);

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

    renderExercises(exercises2, 'exercise-container-2', handleDrop, 2);
    renderOptions(allOptions2, 'options-container-2', handleDrag);

    renderExercises(exercises3, 'exercise-container-3', handleDrop, 3);
    renderOptions(allOptions3, 'options-container-3', handleDrag);

    renderExercises(exercises4, 'exercise-container-4', handleDrop, 4);
    renderOptions(allOptions4, 'options-container-4', handleDrag);

    renderExercises(exercises5, 'exercise-container-5', handleDrop, 5);
    renderOptions(allOptions5, 'options-container-5', handleDrag);

    renderExercises(exercises6, 'exercise-container-6', handleDrop, 6);
    renderOptions(allOptions6, 'options-container-6', handleDrag);

    renderExercises(exercises7, 'exercise-container-7', handleDrop, 7);
    renderOptions(allOptions7, 'options-container-7', handleDrag);

    renderExercises(exercises8, 'exercise-container-8', handleDrop, 8);
    renderOptions(allOptions8, 'options-container-8', handleDrag);

    renderExercises(exercises9, 'exercise-container-9', handleDrop, 9);
    renderOptions(allOptions9, 'options-container-9', handleDrag);

    renderExercises(exercises10, 'exercise-container-10', handleDrop, 10);
    renderOptions(allOptions10, 'options-container-10', handleDrag);
};

let isTranslated = false;
function toggleTranslation() {
    const exerciseText = document.getElementById('exercise-text');
    if (isTranslated) {
        exerciseText.innerHTML = `1. Understanding and using English phrasal verbs will help you improve your fluency. This exercise is designed for that purpose. 
        “Drag and drop” the correct word (some of these sentences require two separate words) to complete every sentence. 
        <span class="highlight">Don’t worry if you select the wrong word(s)!</span> This exercise will immediately let you know if you chose the correct or incorrect words. 
        If you chose incorrectly, you will be able to reselect. The meaning of the needed phrasal verbs is in parentheses beside the empty box.`;
    } else {
        exerciseText.innerHTML = `1. Compreender e usar verbos frasais em inglês ajudará você a melhorar sua fluência. Este exercício foi projetado para esse propósito. 
        “Arraste e solte” a palavra correta (algumas dessas frases exigem duas palavras separadas) para completar cada frase. 
        <span class="highlight">Não se preocupe se você selecionar a palavra(s) errada(s)!</span> Este exercício imediatamente lhe dirá se você escolheu as palavras corretas ou incorretas. 
        Se você escolheu incorretamente, poderá selecionar novamente. O significado dos verbos frasais necessários está entre parênteses ao lado da caixa vazia.`;
    }
    isTranslated = !isTranslated; // Alterna o estado da tradução
}

function toggleTranslation2() {
    const exerciseText = document.getElementById('exercise-text2');
    if (isTranslated) {
        exerciseText.innerHTML = `Exercise 2`;
    } else {
        exerciseText.innerHTML = `Exercício 2`;
    }
    isTranslated = !isTranslated; // Alterna o estado da tradução
}

function toggleTranslation3() {
    const exerciseText = document.getElementById('exercise-text3');
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

function toggleTranslation4() {
    const exerciseText = document.getElementById('exercise-text4');
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
        O identificador/artigo “an” é conectado a substantivos que começam com o SOM de uma vogal;</br> 
        O identificador/artigo “the” é conectado a um substantivo que começa com uma consoante ou o som de uma vogal, e quando o substantivo é específico ou particular, seja singular ou plural.`;
    }
    isTranslated = !isTranslated; // Alterna o estado da tradução
}

function toggleTranslation5() {
    const exerciseText = document.getElementById('exercise-text5');
    if (isTranslated) {
        exerciseText.innerHTML = `5. This exercise introduces you to a random conversation between two people who don’t know each other. Select the correct missing words.`;
    } else {
        exerciseText.innerHTML = `5. Este exercício apresenta a você uma conversa aleatória entre duas pessoas que não se conhecem. Selecione as palavras corretas que faltam.`;
    }
    isTranslated = !isTranslated; // Alterna o estado da tradução
}

function toggleTranslation6() {
    const exerciseText = document.getElementById('exercise-text6');
    if (isTranslated) {
        exerciseText.innerHTML = `6. This exercise is to introduce you to the English use of contractions. 
    Contractions combine nouns/pronouns with verbs/auxiliary verbs (including “not”), and are commonly used in conversations and informal writing.`;
    } else {
        exerciseText.innerHTML = `6. Este exercício é para introduzir você ao uso de contrações em inglês. As contrações combinam substantivos/pronomes com verbos/verbos auxiliares (incluindo “not”), e são comumente usadas em conversas e escrita informal.`;
    }
    isTranslated = !isTranslated; // Alterna o estado da tradução
}

function toggleTranslation7() {
    const exerciseText = document.getElementById('exercise-text7');
    if (isTranslated) {
        exerciseText.innerHTML = `7. Understanding English verb tenses is easier than Portuguese verb tenses since English verbs are gender-neutral and do not change regardless of nouns. In this paragraph, choose the correct verb tense, but be aware that some are irregular verbs.</p>
    The grammar rules: When regular verbs are past tense, an “-ed” is added to the end of the verb. However, the spelling of irregular verbs change when they are conjugated.`;
    } else {
        exerciseText.innerHTML = `7. Entender os tempos verbais em inglês é mais fácil do que os tempos verbais em português, já que os verbos em inglês são neutros em termos de gênero e não mudam independentemente dos substantivos. Neste parágrafo, escolha o tempo verbal correto, mas esteja ciente de que alguns são verbos irregulares.</p>
As regras gramaticais: Quando os verbos regulares estão no passado, um “-ed” é adicionado ao final do verbo. No entanto, a grafia dos verbos irregulares muda quando eles são conjugados.`;
    }
    isTranslated = !isTranslated; // Alterna o estado da tradução
}

function toggleTranslation8() {
    const exerciseText = document.getElementById('exercise-text8');
    if (isTranslated) {
        exerciseText.innerHTML = `8. English interrogatives are used to obtain information from someone or about something. 
        These interrogatives are popularly known as the “Five Ws and H” words. Choose the correct interrogative words for each sentence.`;
    } else {
        exerciseText.innerHTML = `8. Interrogativas em inglês são usadas para obter informações de alguém ou sobre algo. 
        Essas interrogativas são popularmente conhecidas como as palavras “Five Ws and H”. Escolha as palavras interrogativas corretas para cada frase.`;
    }
    isTranslated = !isTranslated; // Alterna o estado da tradução
}

function toggleTranslation9() {
    const exerciseText = document.getElementById('exercise-text9');
    if (isTranslated) {
        exerciseText.innerHTML = `9. Are you confused about when and how to use “to, too, and two?” Don’t be! Many Americans also mistakenly use the wrong words – especially “to” and “too.”</p>
      Grammar rules: “to” indicates direction and is also a preposition; “too” is identical to “also,” and also describes an excessive amount of something; and “two” = “2.”`;
    } else {
        exerciseText.innerHTML = `9. Você está confuso sobre quando e como usar “to, too, and two?” Não fique! Muitos americanos também usam erroneamente as palavras erradas – especialmente “to” e “too.</p>
Regras gramaticais: “to” indica direção e também é uma preposição, enquanto “too” é idêntico a “also” e também descreve uma quantidade excessiva de algo. “Two” = “2”`;
    }
    isTranslated = !isTranslated; // Alterna o estado da tradução
}

function toggleTranslation10() {
    const exerciseText = document.getElementById('exercise-text10');
    if (isTranslated) {
        exerciseText.innerHTML = `10. “Much” or “Many” to describe an amount of something?</br>
       Grammar rules: Use “many” for countable nouns and “much” for a large quantity/uncountable of one type.</br>
       Choose the correct word for each sentence.`;
    } else {
        exerciseText.innerHTML = `10. Much” ou “Many” para descrever uma quantidade de algo?</br>
        Regras gramaticais: Use “many” para substantivos contáveis ​​e “much” para uma grande quantidade/incontável de um tipo.</br>
        Escolha a palavra correta para cada frase.`;
    }
    isTranslated = !isTranslated; // Alterna o estado da tradução
}

// Estado atual da página
let currentPage = 1;
const totalPages = 10;

// Função para atualizar a exibição da página
function showPage(pageNumber) {
    for (let i = 1; i <= totalPages; i++) {
        const page = document.getElementById(`page${i}`);
        page.style.display = i === pageNumber ? 'block' : 'none';
    }
}

// Função para navegar para a próxima página
function goToNextPage() {
    if (currentPage < totalPages) {
        currentPage++;
        showPage(currentPage);
    }
}

// Função para navegar para a página anterior
function goToPreviousPage() {
    if (currentPage > 1) {
        currentPage--;
        showPage(currentPage);
    }
}

// Configurar eventos dos botões
document.getElementById('voltar-btn').addEventListener('click', goToPreviousPage);
document.getElementById('avancar-btn').addEventListener('click', goToNextPage);

// Exibe a primeira página ao carregar o script
showPage(currentPage);
