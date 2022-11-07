/*
TODO : 
    X Générer un mot aléatoire
    X Afficher le mot en masqué _ _ _ _ _ _ _
    O Pouvoir proposer des lettres
    O Afficher les lettres trouvées
    O Gérer un nombre d'erreur max
    O Afficher des lettres visibles (en fonction de la difficulté)
*/

const allWords = ["ministre", "congolais", "constitution",
 "corompre", "petrole", "dictateur", "sapeur",
 "prisonnier", "chomage", "economie"];
const buttonPlay = document.getElementById("beginGame");
const wordToFindDiv = document.getElementById("wordToFindDiv");
const KeyBoardDiv= document.getElementById("KeyBoard");

buttonPlay.addEventListener("click", function(){
    initGame();
});


function initGame(){
    //Générer un mot au hasard
    wordToFindDiv.innerHTML = '';
    let wordToFind = generateWord();
    let wordToFindArray = Array.from(wordToFind);
    
    let table = document.createElement("table");
    
    let line = document.createElement("tr");
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