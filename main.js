import { pushToBoard, isWinner, switchToNum } from './assets/module/game.js';

function main() {
    let startGame = document.querySelector(".button");
    let cellButtons = document.querySelectorAll(".cell");

    startGame.addEventListener('click', setGameField);

    for (const button of cellButtons) {
        button.addEventListener('click', gameMove);
    }

    function setGameField() {
        let playgroundCover = document.querySelector("#playground");
        playgroundCover.classList.remove("display__none");
        playgroundCover.classList.add("cover");
    }

    function gameMove() {
        let isUserWin = isWinner(true);

        if (!isUserWin) {
            let numOfCell = parseInt(this.children[0].innerHTML);
            let crossIcon = createIcon(true);

            this.append(crossIcon);
            this.classList.remove("cell--hover");
            this.setAttribute("disabled", "");
            this.style.cursor = "auto";

            pushToBoard(numOfCell, true);
            isUserWin = isWinner(true);
        }

        if (!isUserWin) {
            computerMove();
        }

        if (isUserWin) {
            gameOver();
        }
    }

    function computerMove() {}

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

    function gameOver() {
        for (let btn of cellButtons) {
            btn.classList.remove("cell--hover");
            btn.setAttribute("disabled", "");
            btn.style.cursor = "auto";
        }
        colorCells(true);
    }

    function colorCells(isUser) {
        const [firstCell, secondCell, thirdCell] = switchToNum();

        if (isUser) {
            cellButtons[firstCell].classList.add("cell--win");
            cellButtons[secondCell].classList.add("cell--win");
            cellButtons[thirdCell].classList.add("cell--win");
        } else {
            cellButtons[firstCell].classList.add("cell--lose");
            cellButtons[secondCell].classList.add("cell--lose");
            cellButtons[thirdCell].classList.add("cell--lose");
        }
    }
}
main();