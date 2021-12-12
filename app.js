const keyboard = document.getElementById('qwerty');
const phrase = document.getElementById('phrase');
const lifes = document.getElementsByClassName('tries');
const lostLifes = document.getElementsByClassName('lost');

const startScreen = document.getElementById('overlay');
const startButton = document.querySelector('.btn__reset');
const startScreenHead = startScreen.querySelector('.title');

let missed = 0;
let resetGame = 0;

const phrases = [
    'blockchain', 
    'see eye to eye',  
    'a blessing in disguise', 
    'take it with a grain of salt', 
    'fortune favors the bold'
]

// Hide overlay and reset game when clicked
startButton.addEventListener('click', (e) =>{   
    if (resetGame === 1) {
        reset();
    } else { 
    startScreen.style.display = 'none';     
    }  
});

// Get random phrase from the array
function getRandomPhraseAsArray(arr) {
    // Get a random index from array length and split each character in an array 
    let randomPhrase = Math.floor(Math.random() * arr.length);
    let splitPhrase = arr[randomPhrase].split('');
    return splitPhrase;
};


// Add phrase to the window
function addPhrasetoDisplay(arr){
    const ul = document.querySelector('ul');
    const randomPhrase = getRandomPhraseAsArray(arr);
    
    // Loop trough array, create a list item for each letter and append to HTML ul
    for (let i = 0; i < randomPhrase.length; i++) {
        const liNode = document.createElement('li');
        liNode.textContent = randomPhrase[i];
        ul.appendChild(liNode);

        // Add class of space to elements of array that are not letters and class letter to letters
        if (randomPhrase[i].includes(' ')) {
            liNode.className = "space";
        } else {
            liNode.className = "letter";
        }       
    }
};
addPhrasetoDisplay(phrases); 



// Check if letter is in the phrase
function checkLetter(btn){
    const letters = document.getElementsByClassName('letter');   
    var match = null;
   
    for (let i = 0; i < letters.length; i++){      
        if (btn === letters[i].textContent){        
            letters[i].className = 'letter show';
            match = btn;
        }  
    }
    return match;
}

//Add event listener to buttons of keyboard displayed
keyboard.addEventListener('click', (e) =>{
    // Reads what's the text content of button
    const checkBtn = e.target.textContent;

     // Check if the click is a button and does not have chosen class
    if (e.target.tagName === 'BUTTON' && e.target.className !== 'chosen'){
        e.target.className = 'chosen';
        const match = checkLetter(checkBtn);
        let phraseLetters = document.getElementsByClassName('letter');
        let showed = document.getElementsByClassName('show');

        // If there is no match, remove one heart and increase missed counter
        if (match === null){
            missed++;
            lifes[0].firstChild.src = 'http://127.0.0.1:5500/images/lostHeart.png';
            lifes[0].className = 'lost';
            lost();
        } // Show winning screen if letters that have show class equals letter that have letter class and give value for reset func
            else if (phraseLetters.length === showed.length){
                startScreen.className = 'win';
                startScreen.style.display = 'flex';
                startScreenHead.textContent = "You've won!"
                startButton.textContent = 'Play again';
                resetGame = 1;
            
        }
              
    }
})

// Show losing screen if missed counter is equal to 5 and give value for reset func
function lost() {
    if (missed === 5) {
        startScreen.className = 'lose';
        startScreenHead.textContent = "Try Again!";
        startScreen.style.display = 'flex';
        startButton.textContent = 'Play again';
        resetGame = 1;
    }
}

// Reset hearts, phrase and remove chosen class to buttons
function reset() {
    missed = 0;
    resetGame = 0; 
    
    // Changes image and class of hearts to reset them
    function resetHearts() {
        for (i = 0; i < lostLifes.length; i + 0) {
            lostLifes[i].firstChild.src = 'http://127.0.0.1:5500/images/liveHeart.png';
            lostLifes[i].className = 'tries';
        }  
    }
    // Deletes old phrase
    function resetPhrase() {
        phrase.firstElementChild.innerHTML = "";
    }

    // Removes the chosen class from all buttons
    function resetKeyboard() {
        const buttons = document.querySelectorAll('button');
        for (i = 0; i < buttons.length; i++) {
            buttons[i].className = "";
        }
    }
    
    overlay.style.display = 'none';
    resetKeyboard();
    resetPhrase();
    resetHearts();
    // Add new phrase to display
    addPhrasetoDisplay(phrases);
}







