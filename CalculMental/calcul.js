/*
TODOLIST 

X Lancer un minuteur de x minute(s) (utiliser celui du pendu)
X Générer un calcul (deux chiffres aléatoires, (+ - *) en aléatoire)
X Laisser l'utilisateur faire des propositions.

V2
Paramétrer ma partie
Le temps du compte à rebours
Les opérateurs de la partie
Gérer les divisions
*/

const reboursDiv = document.getElementById("minuteur");
const calculDiv = document.getElementById("calcul");
const propalInput = document.getElementById("resultPropal");
const messengerDiv = document.getElementById("messenger");
const showPlayingDiv = document.querySelectorAll(".showPlayingDiv");
const nbSecondsGameInput = document.getElementById("nbSecondsGame");
const maxNumberCalcInput = document.getElementById("maxNumberCalc");

let TempsMinuteurBase = 10;//paramétrable
let maxCalculNumber = 20;//Paramétrable
let compteurInterval = null;
let TempsRestant =0;
let calculEncours = null;
let cptGoodAnswer = 0;
let cptBadAnswer = 0;
let allCalculRecap = '';

document.getElementById("validPropal").addEventListener("click", () => {
    checkInputValue();
});

propalInput.addEventListener("keyup", event => {
    if(event.key == 'Enter'){
        checkInputValue();
    }
});

function checkInputValue(){
    if(propalInput.value == calculEncours.result){
        messengerDiv.innerText="Bravo, vous avez trouvé";
        cptGoodAnswer++;
        allCalculRecap += `${calculEncours.showCalculWithResult} | <span class="goodAnswer">${propalInput.value}</span> <br/>`;
    }
    else{
        messengerDiv.innerText=`Ce n'est pas le résultat ${calculEncours.showCalculWithResult}`;
        cptBadAnswer ++;
        allCalculRecap += `${calculEncours.showCalculWithResult} | <span class="badAnswer">${propalInput.value}</span> <br/>`;
    }
    propalInput.value = "";
    generateCalcul();
}

function launchGame(){
    if(nbSecondsGameInput.value != undefined){
        TempsMinuteurBase = nbSecondsGameInput.value;
    }

    if(maxNumberCalcInput.value != undefined){
        maxCalculNumber = maxNumberCalcInput.value;
    }

    allCalculRecap = "";
    cptGoodAnswer = 0;
    cptBadAnswer = 0;
    messengerDiv.innerHTML = "";
    lancerMinuteur(TempsMinuteurBase);
    generateCalcul();
    displayPlayingDiv(true);
}

function generateCalcul(){
    calculEncours = new Calcul(maxCalculNumber);
    calculDiv.innerText = calculEncours.showCalcul;
}

function lancerMinuteur(tempsMinuteurBase){
    clearInterval(compteurInterval);
    TempsRestant = tempsMinuteurBase;
    reboursDiv.innerText = TempsRestant;
    compteurInterval = setInterval(() => {
        //Le code ici va s'éxécuter toutes les 1 seconde
        TempsRestant --;
        reboursDiv.innerText = TempsRestant;
        if(TempsRestant == 0){
            clearInterval(compteurInterval);
            displayPlayingDiv(false);
            messengerDiv.innerHTML = `Bonne(s) réponse(s) : ${cptGoodAnswer} <br/>`;
            messengerDiv.innerHTML += `Mauvais(s) réponse(s) : ${cptBadAnswer} <br/>`;

            let totalQuestions = cptBadAnswer + cptGoodAnswer;
            let pourcentageGoodAnswer =  100 * cptGoodAnswer/totalQuestions;

            messengerDiv.innerHTML += `Ratio : ${pourcentageGoodAnswer}% <br/>`;
            messengerDiv.innerHTML += allCalculRecap;
        }
    }, 1000);
}

function displayPlayingDiv(show){
    let displayProperty = "none";
    if(show){
        displayProperty = "block"
    }

    showPlayingDiv.forEach(element => {
        element.style.display = displayProperty;
    });
}
class Calcul {
    #operators = ['*', '-', '+']; 
    nombre1;
    nombre2;
    operator;

    constructor(maximum) {
        this.nombre1 = this.#getRandomInt(maximum);
        this.nombre2 = this.#getRandomInt(maximum);
        this.operator = this.#operators[this.#getRandomInt(3)];
    }

    get result(){
        return eval(this.nombre1+this.operator+this.nombre2);
    }

    get showCalcul(){
        return `${this.nombre1} ${this.operator} ${this.nombre2}`;
    }

    get showCalculWithResult(){
        return `${this.showCalcul} = ${this.result}`;
    }

    #getRandomInt(max) {
        return Math.floor(Math.random() * max);
    }
}