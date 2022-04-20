import {
    pushToBoard,
    isWinner,
    switchToNum,
    computerMove,
    checkPosition
} from './assets/module/game.js';

function main() {
    let gameTitle = document.querySelector(".game__title");
    let startGame = document.querySelector("#start-btn");
    let cellButtons = document.querySelectorAll(".cell");
    let isTaken;

    startGame.addEventListener('click', setGameField);

    for (const button of cellButtons) {
        button.addEventListener('click', function () {
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
            gameBreak(true);

            let randTime = Math.floor(Math.random() * 4000) + 1000;
            setTimeout(() => {
                let compCell = computerMove();
                let circle = createIcon(false);
                let btn = cellButtons[compCell];

                btn.append(circle);
                btn.classList.remove("cell--hover");
                btn.setAttribute("disabled", "");
                btn.style.cursor = "auto";

                gameBreak(false);

                let isCompWin = isWinner(false);
                if (isCompWin) {
                    console.log("User LOSE!");
                    gameOver(false);
                }
            }, randTime);
        }


        if (isUserWin) {
            gameOver(true);
        }
    }

    function createIcon(isUser) {
        let icon = document.createElement("i");
        icon.classList.add("fi");

        if (isUser) {
            icon.classList.add("fi-rr-plus", "icon-cross");
        } else {
            icon.classList.add("fi-rr-circle", "icon-circle");
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

    function colorCells(isUser) {
        const [firstCell, secondCell, thirdCell] = switchToNum();

        if (isUser) {
            gameTitle.innerHTML = "YOU WON!";
            cellButtons[firstCell].classList.add("cell--win");
            cellButtons[secondCell].classList.add("cell--win");
            cellButtons[thirdCell].classList.add("cell--win");
        } else {
            gameTitle.innerHTML = "YOU LOST...";
            cellButtons[firstCell].classList.add("cell--lose");
            cellButtons[secondCell].classList.add("cell--lose");
            cellButtons[thirdCell].classList.add("cell--lose");
        }
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
}
main();