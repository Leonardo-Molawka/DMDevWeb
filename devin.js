var counter;
var nbMystere = 0;
let messError = "Veuillez insérer un nombre entier s'il vous plaît";
let messLose = "Vous avez perdu ! Le nombre mystère était";
let messWin = "Vous avez gagné ! Le nombre mystère était bien";
let messPlus = "C'est plus";
let messMoins = "C'est moins";
var buttonValider;
var inputElement;
var reponse;

function init() { // fonction appelée au chargement de la page
    counter = 1;
    nbMystere = Math.floor(Math.random() * 101);
    console.log(nbMystere);
    buttonValider = document.getElementById("valider");
    buttonValider.textContent = "Essayer";
    inputElement = document.getElementById("input");
    reponse = document.getElementById("message");
    buttonValider.addEventListener("click", calculate);
}

function calculate() { // fonction appelée lors du clic sur le bouton
    var valueInput = inputElement.value;
    var intInput = parseInt(valueInput); // essaye de convertir en entier
    if (counter !== 6) {
        if (isNaN(intInput)) {
            messageReponse(messError, "black");
            ++counter;
            return;
        }
    }

    if (intInput === nbMystere) {
        messageReponse(messWin, "green", nbMystere);
        replay();
        return;
    }
    else if (intInput < nbMystere) {
        messageReponse(messPlus, "blue");
    }
    else {
        messageReponse(messMoins, "blue");
    }
    if (counter === 6) {
        messageReponse(messLose, "red", nbMystere);
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
    buttonValider.textContent = "Rejouer";
    buttonValider.removeEventListener("click", calculate);
    buttonValider.addEventListener("click", function reset() {
        reponse.innerHTML = "";
        inputElement.value = "";
        buttonValider.removeEventListener("click", reset);
        init();
    });
}
