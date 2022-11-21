/*
TODOLIST 

X Lancer un minuteur de x minute(s) (utiliser celui du pendu)
X Générer un calcul (deux chiffres aléatoires, (+ - *) en aléatoire)
O Laisser l'utilisateur faire des propositions.

V2
Paramétrer ma partie
Le temps du compte à rebours
Les opérateurs de la partie
Gérer les divisions
*/

const reboursDiv = document.getElementById("minuteur");
const calculDiv = document.getElementById("calcul");
const propalInput = document.getElementById("resultPropal");

const TempsMinuteurBase = 5;
let compteurInterval = null;
let TempsRestant =0;
let calculEncours = null;

document.getElementById("validPropal").addEventListener("click", () => {
    if(propalInput.value == calculEncours.result){
        alert("Bravo");
    }
    else{
        alert("Pas ça");
    }
});

function launchGame(){
    lancerMinuteur(TempsMinuteurBase);
}

function generateCalcul(){
    calculEncours = new Calcul(500);
    calculDiv.innerText = calculEncours.showCalcul;
}

function lancerMinuteur(tempsMinuteurBase){
    TempsRestant = tempsMinuteurBase;
    reboursDiv.innerText = TempsRestant;
    compteurInterval = setInterval(() => {
        //Le code ici va s'éxécuter toutes les 1 seconde
        TempsRestant --;
        reboursDiv.innerText = TempsRestant;
        if(TempsRestant == 0){
            clearInterval(compteurInterval);
                alert("fini");
        }
    }, 1000);
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

    #getRandomInt(max) {
        return Math.floor(Math.random() * max);
    }
}