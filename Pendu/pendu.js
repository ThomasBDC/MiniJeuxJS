/*
TODO : 
    X Générer un mot aléatoire
    X Afficher le mot en masqué _ _ _ _ _ _ _
    X Pouvoir proposer des lettres
    X Afficher les lettres trouvées
    X Gérer un nombre d'erreur max
    O Gérer la victoire    
    O Afficher des lettres visibles (en fonction de la difficulté)
*/
import { Confetti } from "../lib/confetti.js";

const allWords = ["ministre", "congolais", "constitution",
 "corompre", "petrole", "dictateur", "sapeur",
 "prisonnier", "chomage", "economie"];
const buttonPlay = document.getElementById("beginGame");
const wordToFindDiv = document.getElementById("wordToFindDiv");
const KeyBoardDiv= document.getElementById("KeyBoard");
const cptErreurDiv= document.getElementById("cptErreur");
const imgPendu = document.getElementById("imagePendu");
let wordToFind;
let wordToFindArray;
let cptErreur =0;
let cptLettreTrouvees =0;

buttonPlay.addEventListener("click", function(){
    initGame();
});


function initGame(){
    //Générer un mot au hasard*
    Confetti.stopAnimationConfeti();
    cptErreur = 0;
    imgPendu.className = '';
    imgPendu.classList.add("etat"+cptErreur);   
    cptLettreTrouvees =0;
    wordToFindDiv.innerHTML = '';
    wordToFind = generateWord();
    wordToFindArray = Array.from(wordToFind);
    
    let table = document.createElement("table");
    
    let line = document.createElement("tr");
    line.id="LineOfWord";
    wordToFindArray.forEach(letter => {
        //Créer un TD (case du tableau) par lettre
        let td = document.createElement("td");
        td.dataset.letter = letter;
        td.innerText = "_";
        line.appendChild(td);
    });

    table.appendChild(line);
    wordToFindDiv.appendChild(table);

    generateKeyBoard();
}

function generateKeyBoard(){
    KeyBoardDiv.innerHTML = '';
    let Alphabet = generateAlphabet();
    Alphabet.forEach(letter => {
        let lettreDiv =document.createElement("div");
        lettreDiv.innerHTML = letter;
        lettreDiv.classList.add("letterKeyBoard");
        KeyBoardDiv.appendChild(lettreDiv);

        lettreDiv.addEventListener("click", () => {
            if(checkLetterInWord(letter)){
                //Afficher la lettre dans le mot masqué
                let lineWord = document.getElementById("LineOfWord");
                let allTdOfWord = lineWord.children;
                Array.from(allTdOfWord).forEach(td => {
                    if(td.dataset.letter == letter){
                        td.innerHTML = letter;
                        cptLettreTrouvees ++;
                    }
                });

                if(cptLettreTrouvees == wordToFindArray.length){
                    KeyBoardDiv.innerHTML = '';
                    cptErreurDiv.innerHTML = 'Gagné, avec '+cptErreur+' erreur(s)';
                    Confetti.launchAnimationConfeti();
                    setTimeout(() =>{
                        Confetti.stopAnimationConfeti();
                    }, 5000);
                }
            }
            else{
                //Incrémenter le compteur d'erreur
                cptErreur++;
                cptErreurDiv.innerHTML = cptErreur;
                imgPendu.className = '';
                imgPendu.classList.add("etat"+cptErreur);
                if(cptErreur >= 4){
                    //On a perdu
                    cptErreurDiv.innerHTML = "Perdu, vous avez fait plus de 4 erreurs.";
                    let lineWord = document.getElementById("LineOfWord");
                    let allTdOfWord = lineWord.children;
                    Array.from(allTdOfWord).forEach(td => {
                        td.innerHTML = td.dataset.letter;
                    });
                    KeyBoardDiv.innerHTML = '';
                }
            }

            lettreDiv.style.visibility = "hidden";
        })
    });
}

function generateAlphabet(capital = false) {
	//return [...Array(26)].map((_, i) => String.fromCharCode(i + (capital ? 65 : 97)));
    // |                              |
    // |                              |
    // |                              |
    // V  la ligne du haut traduite   V
    let tab = [];
    let i = 65;
    if(!capital)
    {
        i += 32;
    }
    let finish = i+26;
    for(i; i<finish; i++){
        tab.push(String.fromCharCode(i));
    }
    return tab;
}

function generateWord(){
    let indexWord = getRandomInt(allWords.length);
    return allWords[indexWord];
}

function getRandomInt(max) {
    return Math.floor(Math.random() * max);
}

//Retourne true si la lettre est présente dans le mot
//Retourne false si la lettre est absente du mot
function checkLetterInWord(letter){
    let findLetter = false;
    wordToFindArray.forEach(letterOfWord => {
        if(letter == letterOfWord){
            findLetter =  true;
        } 
    });
    return findLetter;
}