/**
 * DEROULEMENT D'UN TOUR :
 * OK Générer des cartes aléatoirement
 * OK LAisser les cartes visibles pendant 5 secondes
 * OK Choisir une carte au hasard parmis les cartes tirées
 * Laisser 3 secondes au joueur pour choisir une carte
 * OK Si gagné recommencer le tour
 * OK Si perdu, fin de la partie
 * 
 * Sauvegarder le score en cookie
 * 
 */

//TODO Générer des cartes aléatoirement
import { Utils } from "../lib/Utils/utils.js";

const plateau = document.getElementById("CardsPlateau");
const elementToFindDiv = document.getElementById("elementToFind");
const nbTourGagneSpan = document.getElementById("nbTourGagneSpan");
const nbCardsParam = 5;
let nbTourGagne = 0;
let classCardToFind;

document.getElementById("newGameButton").addEventListener("click", newGame);

function newGame(){
    nbTourGagne = 0;
    newTour();
}


function newTour(){
    nbTourGagneSpan.innerText = nbTourGagne;
    plateau.innerHTML = "";
    elementToFindDiv.innerHTML = "";
    generateCards(nbCardsParam);
    let nbCardToFind = Utils.getRandomInt(nbCardsParam);
    let cardsPlateau = plateau.querySelectorAll(".perso");
    classCardToFind = cardsPlateau[nbCardToFind].classList; 
    console.log(classCardToFind);
    setTimeout(() => {
        let allCards = document.querySelectorAll(".perso");
        allCards.forEach(card => {
            card.classList.add("hidden");
            card.addEventListener("click", function clickOnCard(){
                if(card.classList.contains("hidden")){
                    if(classCardToFind.value == card.classList.value){
                        nbTourGagne++;
                        newTour();
                    }
                    else{
                        alert("perdu !");
                        allCards.forEach(cardWhenLoose => {
                            cardWhenLoose.classList.remove("hidden");
                        });
                    }
                }
            });
        });
        let newCardToFind = document.createElement("div");
        newCardToFind.classList = classCardToFind;
        newCardToFind.classList.remove("hidden");
        elementToFindDiv.appendChild(newCardToFind);
      }, "5000");

}

function generateCards(nbCards){
    //Je génère autant de carte que nbCards
    for (let i = 0; i < nbCards; i++) {
        //Je crée le div
        let newCard = document.createElement("div");
        newCard.classList.add("perso");
        //Je génère un chiffre aléatoire, pour que ma carte soit aléatoire
        let nbPersoAlea = Utils.getRandomInt(24);
        newCard.classList.add("perso"+nbPersoAlea);

        //J'ajoute chaque carte au plateau
        plateau.appendChild(newCard);
    }
}


