// black jack by ricky

// these are the suit values
let suits = ["hearts", "clubs", "diamonds", "spades"];
let values = [ "ace", "king", "queen", "jack",
    "ten", "nine", "eight", "seven", "six",
    "five", "four","three","two"];

// the button variables
let textArea = document.getElementById("text-area");
let newGameButton = document.getElementById("new-game-button");
let hitButton = document.getElementById("hit-button");
let stayButton = document.getElementById("stay-button");


// dom variables


// game variables
let gameStarted = false,
    gameOver = false,
    playerWon = false,
    gameTie = false,
    dealerCards = [],
    playerCards = [],
    dealerScore = 0,
    playerScore = 0,
    deck =[];


hitButton.style.display = 'none';
stayButton.style.display = 'none';
showStatus ();


newGameButton.addEventListener('click', function () {
    gameStarted = true;
    gameOver = false;
    playerWon = false;

    deck = createDeck();
    shuffleDeck(deck);
    dealerCards  = [ getNextCard(), getNextCard() ];
    playerCards  = [ getNextCard(), getNextCard() ];


    newGameButton.style.display = 'none';
    hitButton.style.display = 'inline';
    stayButton.style.display = 'inline';
    showStatus();
});

hitButton.addEventListener('click', function() {
    playerCards.push(getNextCard());
    checkForEndOfGame();
    showStatus();
});

stayButton.addEventListener('click', function () {
    gameOver = true;
    checkForEndOfGame();
    showStatus();
});

function createDeck () {
    let deck = [];
    for (let suitIdx = 0; suitIdx < suits.length; suitIdx++) {
        for (let valueIdx = 0; valueIdx < values.length; valueIdx++) {
            let card = {
                suit: suits[suitIdx],
                value: values[valueIdx]
            };
            deck.push( card );
        }

    }
    return deck;
}

function shuffleDeck(deck) {
    for (let i = 0; i < deck.length; i++) {
        let swapIdx = Math.trunc(Math.random() * deck.length);
        let tmp = deck[swapIdx];
        deck[swapIdx] = deck[i];
        deck[i] = tmp;
    }
}

function getCardString(card) {
    return card.value + ' of ' + card.suit;
}

function getNextCard() {
    return deck.shift();
}

function getCardNumbericValue(card) {
    switch (card.value) {
        case "ace":
            return 1;
        case 'two':
            return 2;
        case 'three':
            return 3;
        case 'four':
            return 4;
        case 'five':
            return 5;
        case 'six':
            return 6;
        case 'seven':
            return 7;
        case 'eight':
            return 8;
        case 'nine':
            return 9;
        default:
            return 10;
    }
}


function getScore(cardArray) {
    let score = 0;
    let hasAce = false;
    for (let i = 0; i < cardArray.length; i++) {
        let card = cardArray[i];
        score += getCardNumbericValue(card);
        if (card.value === 'ace') {
            hasAce = true;
        }
    }
    if (hasAce && score + 10 <= 21) {
        return score + 10;
    }
    return score;
}





function updateScores() {
    dealerScore = getScore(dealerCards);
    playerScore = getScore(playerCards);
    
}

function checkForEndOfGame() {
    updateScores();

    if(gameOver) {
        while(dealerScore < playerScore
            && playerScore <= 21
            && dealerScore <=21) {
            dealerCards.push(getNextCard());
            updateScores();
        }
    }
    
    if (playerScore > 21) {
        playerWon = false;
        gameOver = true;
    }
    else if (dealerScore > 21) {
        playerWon = true;
        gameOver = true;
    }
    else if (gameOver) {
        if (playerScore > dealerScore) {
            playerWon = true;
            gameOver = true;
        }
    }
    else if (playerScore === 21) {
        playerWon = true;
        gameOver = true;

    }
    else if (playerScore === dealerScore) {
        gameTie = true;
        gameOver = true;

    }
    else {
        playerWon = false;
    }
}

function showStatus() {
    if (!gameStarted) {
        textArea.innerText = "welcome to blackjack";
        return;
    }

    let dealerCardString = '';
    for (let i = 0; i <dealerCards.length; i++) {
        dealerCardString += getCardString(dealerCards[i]) + '\n';
    }

    let playerCardString = '';
    for (let i=0; i < playerCards.length; i++) {
        playerCardString += getCardString(playerCards[i]) + '\n';
    }

    updateScores();

    textArea.innerText =
        'Dealer Has: \n' +
        dealerCardString +
        '(score: '+ dealerScore + ')\n\n' +

        'Player Has: \n' +
        playerCardString +
        '(score: '+ playerScore + ')\n\n';
    
    if (gameOver) {
        if (playerWon) {
            textArea.innerText += 'you win';
        }
        else if (gameTie) {
            textArea.innerText += 'you have tied with the dealer'
        }
        else {
            textArea.innerText += 'dealer wins';
        }
        newGameButton.style.display = "inline";
        hitButton.style.display = 'none';
        stayButton.style.display = 'none';
    }

}




