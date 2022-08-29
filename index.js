import ancientsData from './data/ancients.js';
import difficulties from './data/difficulties.js';
import {
    brownCards,
    blueCards,
    greenCards
} from './data/mythicCards/index.js';

let currentAncient;
let currentDifficulty;
let miniGreen = [];
let miniBrown = [];
let miniBlue = [];

let ancients_container = document.getElementById('ancients_container');

ancients_container.innerHTML = `<div class="ancient"><img class = "ancientimg" alt="ancien" src="${ancientsData[0].cardFace}"></div><div class="ancient"><img class="ancientimg" alt="ancien" src="${ancientsData[1].cardFace}"></div><div class="ancient"><img class="ancientimg" alt="ancien" src="${ancientsData[2].cardFace}"></div><div class="ancient"><img class="ancientimg" alt="ancien" src="${ancientsData[3].cardFace}"></div>`;


let difficulty_container = document.getElementById('difficulty_container');

difficulty_container.innerHTML = `<button class="diffbtn">${difficulties[0].name}</button>
<button class="diffbtn">${difficulties[1].name}</button>
<button class="diffbtn">${difficulties[2].name}</button>
<button class="diffbtn">${difficulties[3].name}</button>
<button class="diffbtn">${difficulties[4].name}</button>`;

function resetDecks() {
    miniGreen = [];
    miniBrown = [];
    miniBlue = [];
}

function shuffle(deck) {
    return deck.sort(
        () => Math.random() - 0.5
    );
}

function findCard(deck, dlist) {
    shuffle(deck);
    for (let i = 0; i < deck.length; i++) {
        if (dlist.includes(deck[i].difficulty)) {
            return deck.splice(i, 1)[0];
        }
    }
    return findCard(deck, ['normal']);
}

document.querySelectorAll('.ancient').forEach(
    (el, idx) => el.addEventListener('click', setancient.bind(idx))
);

function setancient() {
    currentAncient = ancientsData[this];
    console.log('Выбран', currentAncient.name);
    // добавить сброс колоды reset currentdeck
}

document.querySelectorAll('.diffbtn').forEach(
    (el, idx) => el.addEventListener('click', setdiff.bind(idx))
);

function setdiff() {
    currentDifficulty = difficulties[this];
    console.log('Выбрана сложность', currentDifficulty.name)
    // добавить сброс колоды reset currentdeck
}

document.getElementById('startbtn').addEventListener('click', start);

function start() {
    if (!currentAncient || !currentDifficulty) return;
    let i = 0;
    const greenCardsCopy = greenCards.slice();
    const brownCardsCopy = brownCards.slice();
    const blueCardsCopy = blueCards.slice();
    resetDecks();

    for (i = 0; i < currentAncient.firstStage.greenCards + currentAncient.secondStage.greenCards + currentAncient.thirdStage.greenCards; i++) {
        miniGreen.push(findCard(greenCardsCopy, currentDifficulty.cardTypes));
    }
    shuffle(miniGreen);
    console.log('MiniGreen', miniGreen);


    for (i = 0; i < currentAncient.firstStage.brownCards + currentAncient.secondStage.brownCards + currentAncient.thirdStage.brownCards; i++) {
        miniBrown.push(findCard(brownCardsCopy, currentDifficulty.cardTypes));
    }
    shuffle(miniBrown);
    console.log('MiniBrown', miniBrown);


    for (i = 0; i < currentAncient.firstStage.blueCards + currentAncient.secondStage.blueCards + currentAncient.thirdStage.blueCards; i++) {
        miniBlue.push(findCard(blueCardsCopy, currentDifficulty.cardTypes));
    }
    shuffle(miniBlue);
    console.log('MiniBlue', miniBlue);
}

let firstStageStack = [];
let secondStageStack = [];
let thirdStageStack = [];


function nextcard() {
    if (firstStageStack.length < currentAncient.firstStage.greenCards) {
        firstStageStack.push(miniGreen.pop());
        return;
    }
    if (firstStageStack.length < (currentAncient.firstStage.greenCards + currentAncient.firstStage.blueCards)) {
        firstStageStack.push(miniBlue.pop());
        return;
    }
    if (firstStageStack.length < (currentAncient.firstStage.greenCards + currentAncient.firstStage.blueCards + currentAncient.firstStage.brownCards)) {
        firstStageStack.push(miniBrown.pop());
        return;
    }
    if (secondStageStack.length < currentAncient.secondStage.greenCards) {
        secondStageStack.push(miniGreen.pop());
        return;
    }
    if (secondStageStack.length < (currentAncient.secondStage.greenCards + currentAncient.secondStage.blueCards)) {
        secondStageStack.push(miniBlue.pop());
        return;
    }
    if (secondStageStack.length < (currentAncient.secondStage.greenCards + currentAncient.secondStage.blueCards + currentAncient.secondStage.brownCards)) {
        secondStageStack.push(miniBrown.pop());
        return;
    }
    if (thirdStageStack.length < currentAncient.thirdStage.greenCards) {
        thirdStageStack.push(miniGreen.pop());
        return;
    }
    if (thirdStageStack.length < (currentAncient.thirdStage.greenCards + currentAncient.thirdStage.blueCards)) {
        thirdStageStack.push(miniBlue.pop());
        return;
    }
    if (thirdStageStack.length < (currentAncient.thirdStage.greenCards + currentAncient.thirdStage.blueCards + currentAncient.thirdStage.brownCards)) {
        thirdStageStack.push(miniBrown.pop());
        return;
    }

    shuffle(firstStageStack);
    shuffle(secondStageStack);
    shuffle(thirdStageStack);

    console.log(firstStageStack);
    console.log(secondStageStack);
    console.log(thirdStageStack);
}

document.getElementById('nextcard').addEventListener('click', nextcard);

function resultstack(stack1, stack2, stack3) {
    let result = [firstStageStack, secondStageStack, thirdStageStack].flat();
    return result

}

document.getElementById('resultstack').addEventListener('click', resultstack);


