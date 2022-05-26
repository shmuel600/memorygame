const cardsArray = [
    { id: 1, card: '&#128525;', isDone: false, },
    { id: 2, card: '&#128525;', isDone: false, },
    { id: 3, card: '&#128561;', isDone: false, },
    { id: 4, card: '&#128561;', isDone: false, },
    { id: 5, card: '&#128564;', isDone: false, },
    { id: 6, card: '&#128564;', isDone: false, },
    { id: 7, card: '&#128520;', isDone: false, },
    { id: 8, card: '&#128520;', isDone: false, },
    { id: 9, card: '&#128545;', isDone: false, },
    { id: 10, card: '&#128545;', isDone: false, },
    { id: 11, card: '&#129313;', isDone: false, },
    { id: 12, card: '&#129313;', isDone: false, }];
const cardBacks = document.querySelectorAll('.back');
const cards = document.querySelectorAll('.inner');
const header = document.querySelector('header');
header.style.flexDirection = "column";
document.querySelector('a').style.margin = "30px";

//score
let score = 0;
const scorePreview = document.createElement('div');
scorePreview.textContent = "Your score: " + score;
document.querySelector('section').append(scorePreview);

//lives
const gameOver = document.querySelector('a');
let lives = 6;
const livesPreview = document.createElement('div');
livesPreview.classList.add("lives-count");
livesPreview.textContent = "Lives left: " + lives;
document.querySelector('section').append(livesPreview);

//restart game
const restartGame = document.createElement('button');
restartGame.classList.add("restart");
restartGame.textContent = "Restart Game";
restartGame.onclick = startGame;
header.prepend(restartGame);

function startGame() {
    gameOver.textContent = "Memory Game";
    gameOver.style.color = "white";
    lives = 6;
    livesPreview.textContent = "Lives left: " + lives;
    shuffleArray(cardsArray);
    for (let i = 0; i < cardsArray.length; i++) {
        cardBacks[i].innerHTML = cardsArray[i].card;
        cardBacks[i].classList.remove("foundCard");
        cards[i].classList.remove("flipped");
    }
    turn();
}
function turn() {
    let flippedCard = false;
    let cardIndex = -1;
    for (let i = 0; i < cardsArray.length; i++) {
        cards[i].onclick = function () {
            cards[i].classList.add("flipped");
            if (!flippedCard || i === cardIndex) {
                flippedCard = true;
                cardIndex = i;
            }
            else {
                if (cardBacks[cardIndex].innerHTML === cardBacks[i].innerHTML) {
                    cardBacks[cardIndex].classList.add("foundCard");
                    cardBacks[i].classList.add("foundCard");
                    score++;
                    scorePreview.textContent = "Your score: " + score;
                    if (score === 6) {
                        document.querySelector('section').style.display = "none";
                        document.querySelector('.lives-count').style.display = "none";
                        document.querySelector('.restart').style.display = "none";
                        document.querySelector('header').style = "min-height: 80vh";
                        gameOver.innerHTML = "YOU WON! </br> you scored all pairs, with " + (6 - lives) + " misses. </br> press here to restart";
                        gameOver.style.color = "green";
                        i = cardsArray.length;
                    }
                }
                else if (cardBacks[cardIndex].innerHTML !== cardBacks[i].innerHTML) {
                    let secondCard = i;
                    setTimeout(function () {
                        cards[cardIndex].classList.remove("flipped");
                        cards[secondCard].classList.remove("flipped");
                    }, 1000);
                    lives--;
                    livesPreview.textContent = "Lives left: " + lives;
                    if (lives === 0) {
                        setTimeout(function () {
                            document.querySelector('section').style.display = "none";
                            document.querySelector('.lives-count').style.display = "none";
                            document.querySelector('.restart').style.display = "none";
                            document.querySelector('header').style = "min-height: 80vh";
                            gameOver.innerHTML = "Game Over </br> press here to restart";
                            gameOver.style.color = "red";
                            i = cardsArray.length;
                        }, 700);
                    }
                }
                flippedCard = false;
            }
        };
    }
}

function shuffleArray() {
    return cardsArray.sort(function () { return Math.random() - 0.5; });
}
startGame();
//show cardsArray > done ?
//turn > chooseCard = chooseCard

//choose card


//back.text === back.text
//.foundCard to back
//.flipped to inner