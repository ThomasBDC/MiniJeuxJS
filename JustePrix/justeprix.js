//Générer un chiffre en aléatoire
//L'utilisateur fera des propositions
//Continuer tant qu'il n"a pas la bonne proposition
import { Confetti } from "../lib/confetti.js";
import { Utils } from "../lib/Utils/utils.js";

let NumberToFind = 0;
const resultDiv = document.getElementById("resultDiv");
const reboursDiv = document.getElementById("CompteARebours");
const GamePropalDiv = document.getElementById("GamePropalDiv");
let TempsRestant = 0;
let compteurInterval = null;

document.getElementById("beginGame")
    .addEventListener("click", function(){
        launchGame();
});

document.getElementById("checkPropalButton")
    .addEventListener("click", function(){
        checkPropal();
});

document.getElementById("userPropalInput")
    .addEventListener("keyup", function(event){
        if(event.key == 'Enter'){
            checkPropal();
        }
    });

function checkPropal(){
    let numberPropal = document.getElementById("userPropalInput").value;
    if(NumberToFind > numberPropal){
        resultDiv.innerHTML = "C'est plus ! ";
        let audio = new Audio("audio/plus.mp3");
        audio.play();
    }
    else if(NumberToFind < numberPropal){
        resultDiv.innerHTML = "C'est moins ! "  ;
        let audio = new Audio("audio/moins.mp3");
        audio.play();
    }
    else if(NumberToFind == numberPropal){
        resultDiv.innerHTML = "C'est gagné ! ";
        endGame(true);
    }
}

function launchGame(){
    Confetti.stopAnimationConfeti();
    NumberToFind = Utils.getRandomInt(1000);
    TempsRestant = 30;
    GamePropalDiv.style.display = "block";
    if(compteurInterval != null){
        clearInterval(compteurInterval);
    }
    compteurInterval = setInterval(() => {
        reboursDiv.innerText = TempsRestant;
        TempsRestant--;
        
        if(TempsRestant >= 20){
            reboursDiv.classList.remove("warning");
            reboursDiv.classList.remove("danger");
            reboursDiv.classList.add("cool");
        }
        else if(TempsRestant > 10){
            reboursDiv.classList.remove("cool");
            reboursDiv.classList.remove("danger");
            reboursDiv.classList.add("warning");
        }
        else if(TempsRestant >= 0){
            reboursDiv.classList.remove("cool");
            reboursDiv.classList.remove("warning");
            reboursDiv.classList.add("danger");
        }
        else if(TempsRestant < 0){
            clearInterval(compteurInterval);
            endGame(false);
        }
        
    }, 1000);
}

function endGame(gagne){
    if(gagne){
        Confetti.launchAnimationConfeti();
        let audio = new Audio("audio/Bipbip.mp3");
        audio.play();
        setTimeout(() =>{
            Confetti.stopAnimationConfeti();
        }, 5000);
    }
    else{
        let audio = new Audio("audio/perdu.mp3");
        audio.play();
    }
    GamePropalDiv.style.display= "none";
    clearInterval(compteurInterval);
    
}