/**
 * DEROULEMENT D'UN TOUR :
 * OK Générer des cartes aléatoirement
 * LAisser les cartes visibles pendant 5 secondes
 * Choisir une carte au hasard parmis les cartes tirées
 * Laisser 3 secondes au joueur pour choisir une carte
 * Si gagné recommencer le tour
 * Si perdu, fin de la partie
 * 
 * Sauvegarder le score en cookie
 * 
 */

//TODO Générer des cartes aléatoirement
import { Utils } from "../lib/Utils/utils.js";

const plateau = document.getElementById("CardsPlateau");

generateCards(30);

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