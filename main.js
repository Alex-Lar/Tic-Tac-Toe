import {
    pushToBoard,
    isWinner,
    switchToNum,
    computerMove,
    checkPosition,
    clearBoard
} from './assets/module/game.js';

function main() {
    let startGame = document.querySelector("#start-btn");
    let cellButtons = document.querySelectorAll(".cell");
    let restartBtn = document.querySelector(".game__button");
    let userTitle = document.querySelector("#user-name");
    let compTitle = document.querySelector("#bot-name");
    let isTaken;

    startGame.addEventListener('click', setGameField);
    restartBtn.addEventListener('click', restartGame);

    for (const button of cellButtons) {
        button.addEventListener('click', function() {
            let userCell = parseInt(this.children[0].innerHTML);

            isTaken = checkPosition(userCell);

            if (isTaken) {
                gameMove(userCell, button);
            } else {
                button.classList.add("cell--error");
                setTimeout(() => {
                    button.classList.remove("cell--error");
                }, 600);
            }
        });
    }

    function setGameField() {
        let playgroundCover = document.querySelector("#playground");
        playgroundCover.classList.remove("display__none");
        playgroundCover.classList.add("cover");
    }

    function gameMove(userCell, btn) {
        let isUserWin = isWinner(true);

        if (!isUserWin) {
            let cross = createIcon(true);

            btn.append(cross);
            btn.classList.remove("cell--hover");
            btn.setAttribute("disabled", "");
            btn.style.cursor = "auto";

            pushToBoard(userCell, true);
            isUserWin = isWinner(true);
        }

        if (!isUserWin) {
            let compCell = computerMove();
            if (compCell !== null) {
                gameBreak(true);
                changeTitleName();
                let randTime = Math.floor(Math.random() * 2500) + 500;
                setTimeout(() => {
                    let circle = createIcon(false);
                    let btn = cellButtons[compCell];

                    btn.append(circle);
                    btn.classList.remove("cell--hover");
                    btn.setAttribute("disabled", "");
                    btn.style.cursor = "auto";

                    gameBreak(false);

                    let userLost = isWinner(false);
                    if (userLost) {
                        gameOver(false);
                    }
                    if (!userLost) {
                        changeTitleName();
                    }
                }, randTime);
            } else {
                draw();
            }
        }


        if (isUserWin) {
            gameOver(true);
        }
    }

    function createIcon(isUser) {
        let icon = document.createElement("i");
        // icon.classList.add("fi");

        if (isUser) {
            icon.classList.add("fi", "fi-rs-cross", "icon-cross");
        } else {
            icon.classList.add("fi", "fi-rs-circle", "icon-circle");
        }

        return icon;
    }

    function gameOver(isUser) {
        for (let btn of cellButtons) {
            btn.classList.remove("cell--hover");
            btn.setAttribute("disabled", "");
            btn.style.cursor = "auto";
        }

        colorCells(isUser);
    }

    function draw() {
        for (let btn of cellButtons) {
            btn.classList.remove("cell--hover");
            btn.setAttribute("disabled", "");
            btn.style.cursor = "auto";
        }
        userTitle.innerHTML = "IT'S A DRAW!";

    }

    function colorCells(isUser) {
        const [firstCell, secondCell, thirdCell] = switchToNum();

        if (isUser) {
            userTitle.innerHTML = "YOU WON!";
            cellButtons[firstCell].classList.add("cell--win");
            cellButtons[secondCell].classList.add("cell--win");
            cellButtons[thirdCell].classList.add("cell--win");
        } else {
            compTitle.innerHTML = "YOU LOST!";
            cellButtons[firstCell].classList.add("cell--lose");
            cellButtons[secondCell].classList.add("cell--lose");
            cellButtons[thirdCell].classList.add("cell--lose");
        }
    }

    function restartGame() {
        let icons = document.querySelectorAll(".fi");

        for (let btn of cellButtons) {
            btn.classList.remove("cell--win");
            btn.classList.remove("cell--lose");

            for (let icon of icons) {
                if (btn.contains(icon)) {
                    icon.remove();
                }
            }
        }

        for (let btn of cellButtons) {
            btn.classList.add("cell--hover");
            btn.removeAttribute("disabled", "");
            btn.style.cursor = "pointer";
        }

        userTitle.innerHTML = "YOU";
        compTitle.innerHTML = "COMP";
        userTitle.classList.add("title__user");
        userTitle.classList.remove("display__none");
        compTitle.classList.add("display__none");
        compTitle.classList.remove("title__comp");

        clearBoard();
    }

    function gameBreak(pause) {
        if (pause) {
            for (let btn of cellButtons) {
                btn.classList.remove("cell--hover");
                btn.setAttribute("disabled", "");
                btn.style.cursor = "auto";
            }
        }
        if (!pause) {
            for (let btn of cellButtons) {
                btn.classList.add("cell--hover");
                btn.removeAttribute("disabled", "");
                btn.style.cursor = "pointer";
            }
        }
    }

    function changeTitleName() {
        userTitle.classList.toggle("title__user");
        userTitle.classList.toggle("display__none");
        compTitle.classList.toggle("display__none");
        compTitle.classList.toggle("title__comp");
    }
}
main();