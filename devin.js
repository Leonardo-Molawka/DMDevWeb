var counter;
var nbMystere = 0;
var messError = "On a dit un nombre entier";
var messLose = "C'est perdu ! Le nombre Mystère était";
var messWin = "C'est gagné ! Le nombre Mystère était bien";
var messPlus = "C'est plus";
var messMoins = "C'est moins";
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
    buttonValider.addEventListener("click", calculer);
}

function calculer() { // fonction appelée lors du clic sur le bouton
    var valeurInput = inputElement.value;
    var entierInput = parseInt(valeurInput); // essaye de convertir en entier
    if (counter !== 6) {
        if (isNaN(entierInput)) {
            messageReponse(messError, "black");
            ++counter;
            return;
        }
    }

    if (entierInput === nbMystere) {
        messageReponse(messWin, "green", nbMystere);
        rejouer();
        return;
    }
    else if (entierInput < nbMystere) {
        messageReponse(messPlus, "blue");
    }
    else {
        messageReponse(messMoins, "blue");
    }
    if (counter === 6) {
        messageReponse(messLose, "red", nbMystere);
        rejouer();
        return;
    }
    ++counter;
}

function messageReponse(messageWanted, color, mystere) {
    mystere = mystere || ""; // si mystere n'est pas défini, on met une chaîne vide
    reponse.innerHTML = '<span style="color: ' + color + ';">[' + counter + '] ' + messageWanted + ' ' + mystere + '</span>';
}

function rejouer() {
    buttonValider.textContent = "Rejouer";
    buttonValider.removeEventListener("click", calculer);
    buttonValider.addEventListener("click", function reset() {
        reponse.innerHTML = "";
        inputElement.value = "";
        buttonValider.removeEventListener("click", reset);
        init();
    });
}