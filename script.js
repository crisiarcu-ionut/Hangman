const wordList = [
    "tree",
    "star",
    "window",
    "mountain",
    "clock",
    "suitcase",
    "cloud",
    "pencil",
    "spring",
    "butterfly"
];

function startGame(){
    noLives = 7;
    chosenWordId = Math.floor(Math.random() * 10);
    shownString = "_";
    for (let i = 1; i < wordList[chosenWordId].length; ++i) {
        shownString = shownString.concat(" _");
    }
    displayLives();
    displayWord(shownString);
}

function displayLives() {
    document.getElementById("no-lives").innerHTML = noLives;
}

function displayWord(string) {
    document.getElementById("word").innerHTML = string;
}

function updateWord(letter) {
    let isLetterFound = false;
    for (let i = 0; i < wordList[chosenWordId].length; ++i) {
        if (wordList[chosenWordId][i] == letter) {
            shownString = shownString.slice(0, i * 2) + letter + shownString.slice(i * 2 + 1);
            isLetterFound = true;
        }
    }
    if (isLetterFound) {
        displayWord(shownString);
    } else {
        --noLives;
        displayLives();
    }
    if (isWin() || noLives == 0) {
        showEndOfGameText();
        document.querySelector("form button").disabled = true;
        displayWord(wordList[chosenWordId]);
    }
}

function isWin() {
    return !shownString.includes("_");
}

function showEndOfGameText() {
    let endTextElement = document.getElementsByTagName("h3")[0];
    if (!(isWin())) {
        endTextElement.innerHTML = "You Lost!";
        endTextElement.classList.replace("text-success", "text-danger");
    }
    endTextElement.classList.remove("visually-hidden");
}

function onBtnClick() {
    let letter = document.querySelector("form input").value;
    updateWord(letter);
}

document.querySelector("form input").addEventListener("keypress", function(event) {
    if (event.key === "Enter") {
        event.preventDefault();
        onBtnClick();
    }
});

startGame();