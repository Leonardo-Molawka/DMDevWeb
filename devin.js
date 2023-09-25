var counter;
var mysteryNumber = 0;
let messError = "Veuillez insérer un nombre entier s'il vous plaît";
let messLose = "Vous avez perdu ! Le nombre mystère était";
let messWin = "Vous avez gagné ! Le nombre mystère était bien";
let messPlus = "Votre nombre est trop petit";
let messMoins = "Votre nombre est trop grand";
var buttonValidate;
var inputElement;
var reponse;

function init() { // fonction appelée au chargement de la page
    counter = 1;
    mysteryNumber = Math.floor(Math.random() * 101);
    console.log(mysteryNumber);
    buttonValidate = document.getElementById("valider");
    buttonValidate.textContent = "Essayer";
    inputElement = document.getElementById("input");
    reponse = document.getElementById("message");
    buttonValidate.addEventListener("click", calculate);
}

function calculate() { // fonction appelée lors du clic sur le bouton
    var valueInput = inputElement.value;
    var intInput = parseInt(valueInput); // conversion en entier
    if (counter !== 6) {
        if (isNaN(intInput)) {
            messageReponse(messError, "black");
            ++counter;
            return;
        }
    }

    if (intInput === mysteryNumber) {
        messageReponse(messWin, "green", mysteryNumber);
        replay();
        return;
    }
    else if (intInput < mysteryNumber) {
        messageReponse(messPlus, "blue");
    }
    else {
        messageReponse(messMoins, "blue");
    }
    if (counter === 6) {
        messageReponse(messLose, "red", mysteryNumber);
        replay();
        return;
    }
    ++counter;
}

function messageReponse(messageWanted, color, mystere) {
    mystere = mystere || ""; // si mystere n'est pas défini, on met une chaîne vide
    reponse.innerHTML = '<span style="color: ' + color + ';">[' + counter + '] ' + messageWanted + ' ' + mystere + '</span>';
}

function replay() {
    buttonValidate.textContent = "Rejouer";
    buttonValidate.removeEventListener("click", calculate);
    buttonValidate.addEventListener("click", function reset() {
        reponse.innerHTML = "";
        inputElement.value = "";
        buttonValidate.removeEventListener("click", reset);
        init();
    });
}
