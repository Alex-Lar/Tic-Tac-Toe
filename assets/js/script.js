function main() {
    let startGame = document.querySelector(".button");
    let cellButtons = document.querySelectorAll(".cell");

    startGame.addEventListener('click', setGameField);

    for (const button of cellButtons) {
        button.addEventListener('click', userMove);   
    }
}
main();


function setGameField() {
    let playgroundCover = document.querySelector("#playground");
    playgroundCover.classList.remove("display__none");
    playgroundCover.classList.add("cover");
}


function userMove() {
    let crossIcon = createIcon(true);
    this.append(crossIcon);


    this.classList.remove("cell--hover");   
    this.setAttribute("disabled", "");   
    // this.style.cursor = "not-allowed";  
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