let startGame = document.querySelector(".button");

startGame.addEventListener('click', hideBackground);



function hideBackground() {
    let cover = document.createElement("div");

    this.setAttribute("disabled", "");

    cover.classList.add('cover');
    document.body.append(cover);

    // setTimeout(() => {
    //     sayHello(cover);
    // }, 3000);
}



// function sayHello(cover) {
//     let greet = document.createElement("h2");

//     greet.innerHTML = "Hello!";
//     greet.classList.add("cover__title");

//     cover.append(greet);
// }
