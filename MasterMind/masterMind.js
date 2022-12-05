/**
 * 
 * TODO LIST
 * 
 * OK Générer la combinaison secrète (4 couleurs)
 *    Pouvoir proposer une combinaison
 *    Gérer début et fin de partie
 * 
 * 
 * Ajouter d'autres éléments si on a le temps
 */
import { Utils } from "../lib/Utils/utils.js";
import { Confetti } from "../lib/confetti.js";

const colors = ["red", "blue", "yellow", "pink"];
const allSelectDiv = document.getElementById("allSelect");
let colorTabToFind = null;
const nbColorToFind = 4;

document.getElementById("startButton").addEventListener("click", ()=> {
    launchGame();
});

function launchGame(){
    setAleaColorTab();
    //Afficher le tableau à trouver en console.
    console.log(colorTabToFind);
    allSelectDiv.innerHTML = "";
    generateLineSelect();
}


function checkProposition(){
    let allSelect = allSelectDiv.querySelectorAll("select");
    let propal = Array.from(allSelect, select => select.value).slice(0-nbColorToFind);

    let cptGoodPlace = 0;
    let cptBadPlace = 0;
    //Fait une copie du tableau (spread operator)
    let colorToFindCopy = [...colorTabToFind];
    
    //ON parcours le tableau de propositions
    //Pour vérifier les éléments bien placés
    for (let i = 0; i < propal.length; i++) {
        //On compare avec la couleur dans le tableau masqué, au même endroit
        if(propal[i] == colorToFindCopy[i]){
            //La proposition est bonne
            //Bonne couleur au bon endroit
            cptGoodPlace++;
            colorToFindCopy[i] = "trouvé";
            propal[i] = "trouvéCotePropal";
        }
    }

    //ON parcours le tableau de propositions
    //Pour vérifier les éléments de la bonne couleur mais mal placés
    for (let i = 0; i < propal.length; i++) {
        //On compare avec la couleur dans le tableau masqué, au même endroit
        if(propal[i] != "trouvéCotePropal"){
            let finded = false;
            colorToFindCopy.forEach((color, index) => {
                if(!finded){
                    if(propal[i] == color){
                        cptBadPlace++;
                        propal[i] = "trouvéCotePropal";
                        colorToFindCopy[index] = "trouvé";
                        finded = true;
                    }
                }
            });
        }
    }

    //Ajout de la ligne de message de points
    let lineResponse = document.createElement("div");
    lineResponse.innerText = "Bon endroit :"+cptGoodPlace+" | Mauvais endroit:"+cptBadPlace;
    allSelectDiv.appendChild(lineResponse);

    //Si on a autant de bonne de réponses que de cases dans mon tableau
    //secret, on a gagné
    if(cptGoodPlace == colorTabToFind.length){
        Confetti.launchAnimationConfeti();
        setTimeout(() =>{
            Confetti.stopAnimationConfeti();
        }, 5000);
    }

    //On génère des nouveaux select
    generateLineSelect();
}

function generateLineSelect(){
    let line = document.createElement("div");
    for (let index = 0; index < nbColorToFind; index++) {
        generateSelect(line);
    }
    let btn = document.createElement("button");
    btn.innerText = "OK";
    line.appendChild(btn);
    btn.addEventListener("click", () => {
        checkProposition();
    });
    allSelectDiv.appendChild(line);
}

function generateSelect(target){
    let mySelect = document.createElement("select");
    colors.forEach(color => {
        let colorOption = document.createElement("option");
        colorOption.innerHTML = color;
        colorOption.value = color;
        colorOption.style.backgroundColor = color;
        mySelect.appendChild(colorOption);
    });

    target.appendChild(mySelect);
}

function setAleaColorTab(size = 4){
    colorTabToFind = [];
    for (let index = 0; index < size; index++) {
        colorTabToFind.push(getAleaColor());
    }
}

function getAleaColor(){
    let aleaIndex = Utils.getRandomInt(colors.length);
    let aleaColor = colors[aleaIndex];
    return aleaColor;
}
