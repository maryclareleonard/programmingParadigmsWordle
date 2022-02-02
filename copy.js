//VARIABLE DECLARATION
let canvas = document.getElementById("myCanvas"); //store reference to canvas element
let ctx = canvas.getContext("2d"); ////store the 2d rendering context - tool used to paint in canvas

//keyboard parameters
let keyboardLetterList = ["q", "w", "e", "r", "t", "y", "u", "i", "o", "p", "a", "s", "d",
  "f", "g", "h", "j", "k", "l", "z", "x", "c", "v", "b", "n", "m"
];
let keyboardRow1 = 10;
let keyboardRow2 = 9;
let keyBoardRow3 = 7;

//We could parse this to get words: http://www.allscrabblewords.com/5-letter-words/

/*let fiveLetterWords = ["added", "salsa", "abode", "agent", "axles", "baker", "bagel", "cheer",
  "added", "spoon", "early", "gawks", "jeans", "lanky", "nacho",
  "olive", "panda", "paint", "tears", "vague", "weary", "yacht", "zones"
];*/

let wordOptions = ["aback", "abase", "abate", "abaya", "abbey", "abbot", "abets", "abhor", 
"abide", "abode", "abort", "about", "above", "abuse", "abuts", "abyss", "ached", "aches", 
"acids", "acing", "ackee", "acorn", "acres", "acrid", "acted", "actin", "actor", "acute", 
"adage", "adapt", "added", "adder", "addle", "adept", "adieu", "adios", "adits", "adman", 
"admin", "admit", "adobe", "adobo", "adopt", "adore", "adorn", "adult", "adzes", "aegis", 
"aeons", "aerie", "affix", "afire", "afoot", "afore", "after", "again", "agape", "agate", 
"agave", "agent", "aggro", "agile", "aging", "aglow", "agony", "agora", "agree", "ahead", 
"ahold", "aided", "aider", "aides", "ailed", "aimed", "aimer", "aioli", "aired", "aisle", 
"alarm", "album", "alder", "aleph", "alert", "algae", "algal", "alias", "alibi", "alien", 
"align", "alike", "alive", "alkyd", "alkyl", "allay", "alley", "allot", "allow", "alloy", 
"allyl", "aloes", "aloft", "aloha", "alone", "along", "aloof", "aloud", "alpha", "altar", 
"alter", "altos", "alums", "amass", "amaze", "amber", "ambit", "amble", "ambos", "amend", 
"amide", "amine", "amino", "amiss", "amity", "amnio", "among", "amour", "amped", "ample", 
"amply", "amuse", "ancho", "angel", "anger", "angle", "angry", "angst", "anima", "anime", 
"anion", "anise", "ankle", "annas", "annex", "annoy", "annul", "anode", "anole", "antic", 
"antis", "antsy", "anvil", "aorta", "apace", "apart", "aphid", "apnea", "apple", "apply", 
"apron", "apses", "apter", "aptly", "aquas", "arbor", "ardor", "areal", "areas", "areca", 
"arena", "argon", "argot", "argue", "argus", "arias", "arils", "arise", "armed", "armor", 
"aroma", "arose", "array", "arrow", "arses", "arson", "artsy", "asana", "ascot", "ashen", 
"ashes", "aside", "asked", "asker", "askew", "aspen", "aspic", "assay", "asses", "asset", 
"aster", "astir", "asura", "atlas", "atman", "atoll", "atoms", "atone", "atopy", "attic", 
"audio", "audit", "auger", "aught", "augur", "aunts", "aunty", "aural", "auras", "autos", 
"auxin", "avail", "avers", "avert", "avian", "avoid", "avows", "await", "awake", "award", 
"aware", "awash", "awful", "awoke", "axels", "axial", "axils", "axing", "axiom", "axion", 
"axles", "axons", "azide", "azole", "azure"];

//brick variables
let brickHeight = 60;
let brickWidth = brickHeight;
let brickVerticalPadding = 10;
let brickHorizontalPadding = 10;
let defaultBrickLetter = "";
let defaultBrickColor = "#ffffff";
let defaultBrickTextColor = "#000000";
let defaultBrickBorderColor = "#d9d9d9";
let defaultBrickFont = "25px Arial";
//board variables
let boardBricksVertical = 5;
let boardBricksHorizontal = 6;
let boardXPadding = 25;
let boardWidth = (boardBricksHorizontal * brickWidth) - boardXPadding + (boardBricksHorizontal * brickHorizontalPadding);
let boardYPadding = boardXPadding;
let numOfBricks = boardBricksVertical * boardBricksHorizontal;
let boardHeight = (boardBricksVertical * brickHeight) + boardYPadding + (boardBricksVertical * brickVerticalPadding);

//keyboard variables
let keyboardBrickHeight = 25;
let keyboardBrickWidth = keyboardBrickHeight;
let defaultKeyboardColor = "#d9d9d9";
let defaultKeyboardTextColor = "#000000";
let defaultKeyboardBorderColor = "#ffffff";
let keyboardXPadding = boardXPadding;
let keyboardYPadding = boardHeight + 150;
let defaultKeyboardFont = "15px Arial";
let keyboardRowBuffer = 10;

let justDeleted = 0;

//mouse variables
let currentX = canvas.width / 2;
let currentY = canvas.height / 2;
let xOffset = 0;
let yOffset = 0;
let pressed = false;

//const secretWord = "wheat";

//mouse listeners
canvas.addEventListener("mousedown", dragStart, false);
canvas.addEventListener("mouseup", dragEnd, false);

//create random int 
function getRandomInt() {
    m = Math.random() * 2 + 2; //between 2 and 4 
    const d = new Date();
    if (d.getTime() % 2 == 0) { //determine direction based on even/odd millisecond
        m = -1 * m;
    }
    return m;
}

//CLASS DECLARATIONS
class Board {
  constructor(bricks, correctWord, currentLine, currentBrickNumber) {
    this._bricks = bricks;
    this._correctWord = correctWord;
    this._currentLine = currentLine;
    this._currentBrickNumber = currentBrickNumber;
  }
  //getters
  getBricks() {
    return this._bricks;
  }
  getCorrectWord() {
    return this._correctWord;
  }
  getCurrentLine() {
    return this._currentLine;
  }
  getCurrentBrickNumber() {
    return this._currentBrickNumber;
  }

  //setters
  setBricks(bricks) {
    this._bricks = bricks;
  } //array of bricks
  setCorrectWord(correctWord) {
    this._correctWord = correctWord;
  }
  setCurrentLine(currentLine) {
    this._currentLine = currentLine;
  }
  setCurrentBrickNumber(currentBrickNumber) {
    this._currentBrickNumber = currentBrickNumber;
  }

  //method 
  getStartingBrick() {
      return this._currentLine*5;
  }
}
class Keyboard {
  constructor(keyboardBricks) {
    this._keyboardBricks = keyboardBricks;
    this.row1Length = 10; //first row # of letters on qwerty keyboard
    this.row2Length = 9; //second row # of letters on qwerty keyboard
    this.row3Length = 7; //third row # of letters on qwerty keyboard
    this.width = keyboardBrickWidth;
    this.height = keyboardBrickHeight;
  }
  //getters
  getKeyboardBricks() {
    return this._keyboardBricks;
  }
  getRow1Length() {
    return this.row1Length;
  }
  getRow2Length() {
    return this.row2Length;
  }
  getRow3Length() {
    return this.row3Length;
  }
  getWidth() {
    return this.width;
  }
  getHeight() {
    return this.height;
  }
  //setters
  setKeyboardBricks(keyboardBricks) {
    this._keyBoardBricks = keyboardBricks;
  } //array of bricks
}

class Word {
  constructor(letter1, correctLetter1, letter2, correctLetter2, letter3, correctLetter3, letter4, correctLetter4, letter5, correctLetter5) {
    this._letter1 = letter1;
    this._letter2 = letter2;
    this._letter3 = letter3;
    this._letter4 = letter4;
    this._letter5 = letter5;
    this._correctLetter1 = correctLetter1;
    this._correctLetter2 = correctLetter2;
    this._correctLetter3 = correctLetter3;
    this._correctLetter4 = correctLetter4;
    this._correctLetter5 = correctLetter5;
  }
  //getters
  getLetter1() {
    return this._letter1;
  }
  getLetter2() {
    return this._letter2;
  }
  getLetter3() {
    return this._letter3;
  }
  getLetter4() {
    return this._letter4;
  }
  getLetter5() {
    return this._letter5;
  }
  getCorrectLetter1() {
    return this._correctLetter1;
  }
  getCorrectLetter2() {
    return this._correctLetter2;
  }
  getCorrectLetter3() {
    return this._correctLetter3;
  }
  getCorrectLetter4() {
    return this._correctLetter4;
  }
  getCorrectLetter5() {
    return this._correctLetter5;
  }

  //setters
  setLetter1(letter1) {
    this._letter1 = letter1;
  }
  setLetter2(letter2) {
    this._letter2 = letter2;
  }
  setLetter3(letter3) {
    this._letter3 = letter3;
  }
  setLetter4(letter4) {
    this._letter4 = letter4;
  }
  setLetter5(letter5) {
    this._letter5 = letter5;
  }
  setCorrectLetter1(correctLetter1) {
    this._correctLetter1 = correctLetter1;
  }
  setCorrectLetter2(CorrectLetter2) {
    this._correctLetter2 = correctLetter2;
  }
  setCorrectLetter3(correctLetter3) {
    this._correctLetter3 = correctLetter3;
  }
  setCorrectLetter4(correctLetter4) {
    this._correctLetter4 = correctLetter4;
  }
  setCorrectLetter5(correctLetter5) {
    this._correctLetter5 = correctLetter5;
  }
}
class Brick {
  constructor(height, width, letter, color, borderColor, textColor, font, posX, posY) {
    this._height = height;
    this._width = width;
    this._posX = posX;
    this._posY = posY;
    this._letter = letter;
    this._color = color;
    this._borderColor = borderColor;
    this._textColor = textColor;
    this._font = font;
  }
  //getters
  getHeight() {
    return this._height;
  }
  getWidth() {
    return this._width;
  }
  getPosX() {
    return this._posX;
  }
  getPosY() {
    return this._posY;
  }
  getLetter() {
    return this._letter;
  }
  getColor() {
    return this._color;
  }
  getBorderColor() {
    return this._borderColor;
  }
  getTextColor() {
    return this._textColor;
  }
  getFont() {
    return this._font;
  }
  //setters
  //don't need setter for Height or Width
  setPosX(posX) {
    this._posX = posX;
  }
  setPosY(posY) {
    this._posY = posY;
  }
  setLetter(letter) {
    this._letter = letter;
  }
  setColor(color) {
    this._color = color;
  }
  setBorderColor(borderColor) {
    this._borderColor = borderColor;
  }
  setTextColor(textColor) {
    this._textColor = textColor;
  }
  setFont(font) {
    this._font = font;
  }
}
//select secret word
function selectSecretWord() {
  let wordOptions = ["aback", "abase", "abate", "abaya", "abbey", "abbot", "abets", "abhor", "abide", "abode", "abort", "about", "above", "abuse", "abuts", "abyss", "ached", "aches", "acids", "acing", "ackee", "acorn", "acres", "acrid", "acted", "actin", "actor", "acute", "adage", "adapt", "added", "adder", "addle", "adept", "adieu", "adios", "adits", "adman", "admin", "admit", "adobe", "adobo", "adopt", "adore", "adorn", "adult", "adzes", "aegis", "aeons", "aerie", "affix", "afire", "afoot", "afore", "after", "again", "agape", "agate", "agave", "agent", "aggro", "agile", "aging", "aglow", "agony", "agora", "agree", "ahead", "ahold", "aided", "aider", "aides", "ailed", "aimed", "aimer", "aioli", "aired", "aisle", "alarm", "album", "alder", "aleph", "alert", "algae", "algal", "alias", "alibi", "alien", "align", "alike", "alive", "alkyd", "alkyl", "allay", "alley", "allot", "allow", "alloy", "allyl", "aloes", "aloft", "aloha", "alone", "along", "aloof", "aloud", "alpha", "altar", "alter", "altos", "alums", "amass", "amaze", "amber", "ambit", "amble", "ambos", "amend", "amide", "amine", "amino", "amiss", "amity", "amnio", "among", "amour", "amped", "ample", "amply", "amuse", "ancho", "angel", "anger", "angle", "angry", "angst", "anima", "anime", "anion", "anise", "ankle", "annas", "annex", "annoy", "annul", "anode", "anole", "antic", "antis", "antsy", "anvil", "aorta", "apace", "apart", "aphid", "apnea", "apple", "apply", "apron", "apses", "apter", "aptly", "aquas", "arbor", "ardor", "areal", "areas", "areca", "arena", "argon", "argot", "argue", "argus", "arias", "arils", "arise", "armed", "armor", "aroma", "arose", "array", "arrow", "arses", "arson", "artsy", "asana", "ascot", "ashen", "ashes", "aside", "asked", "asker", "askew", "aspen", "aspic", "assay", "asses", "asset", "aster", "astir", "asura", "atlas", "atman", "atoll", "atoms", "atone", "atopy", "attic", "audio", "audit", "auger", "aught", "augur", "aunts", "aunty", "aural", "auras", "autos", "auxin", "avail", "avers", "avert", "avian", "avoid", "avows", "await", "awake", "award", "aware", "awash", "awful", "awoke", "axels", "axial", "axils", "axing", "axiom", "axion", "axles", "axons", "azide", "azole", "azure"];
  let rand = Math.floor(Math.random()*wordOptions.length);
  const secretWord = wordOptions[rand];
  return secretWord;
}



//create bricks for the board
//return board 
function createWordleBoard() {
  board = [];
  for (let i = 0; i < numOfBricks; i++) {

    iBrick = new Brick(brickHeight, brickWidth, defaultBrickLetter, defaultBrickColor, defaultBrickBorderColor, defaultBrickTextColor, defaultBrickFont);
    board[i] = iBrick;
  }
  wordleBoard = new Board(board, fiveLetterWords[0], 0, 0);
  return wordleBoard;
}

function createKeyboard() {
  keyboardBricks = [];
  for (let i = 0; i < keyboardLetterList.length; i++) {
    keyboardLetter = new Brick(keyboardBrickHeight, keyboardBrickWidth, keyboardLetterList[i], defaultKeyboardColor, defaultKeyboardBorderColor, defaultKeyboardTextColor, defaultKeyboardFont);
    keyboardBricks[i] = keyboardLetter;
  }

  keyboard = new Keyboard(keyboardBricks); //dont need to set the other two parameters
  return keyboard;
}

//need to be global for mouse listener
wordleBoard = createWordleBoard();
keyboard = createKeyboard();

//functions for mouse listeners
function dragStart(e) {
  pressed = false;
}

function dragEnd(e) {
  pressed = true;
  isClickPointInKeyboard(e.clientX, e.clientY);
}

function checkWhichKeypressed(x, y) {
  for (let i = 0; i < keyboard.getKeyboardBricks().length; i++) {
    leftXBound = keyboard.getKeyboardBricks()[i].getPosX();
    rightXBound = leftXBound + keyboardBrickWidth;

    topYBound = keyboard.getKeyboardBricks()[i].getPosY();
    bottomYBound = topYBound + keyboardBrickHeight;

    if (x >= leftXBound && x <= rightXBound) {
      if (y >= topYBound && y <= bottomYBound) {
        keypressLetter = keyboard.getKeyboardBricks()[i].getLetter();
        wordleBoard.getBricks()[wordleBoard.getCurrentBrickNumber()].setLetter(keypressLetter);
        //stop at last brick on wordle board
        if ((wordleBoard.getCurrentBrickNumber() + 1 < (wordleBoard.getBricks().length)) && (wordleBoard.getCurrentBrickNumber() + 1)%5) {
          wordleBoard.setCurrentBrickNumber(wordleBoard.getCurrentBrickNumber() + 1);
        }
      }
    }
  }
}

function isClickPointInKeyboard(x, y) {
  if (pressed) {
    leftXBound = keyboard.getKeyboardBricks()[0].getPosX(); //qX
    rightXBound = keyboard.getKeyboardBricks()[keyboard.getRow1Length() - 1].getPosX(); //pX 
    topYBound = keyboard.getKeyboardBricks()[0].getPosY(); //qY 
    bottomYBound = keyboard.getKeyboardBricks().at(-1).getPosY(); //mY 

    if (x >= leftXBound && x <= (rightXBound + keyboardBrickWidth + brickHorizontalPadding)) {
      if (y >= topYBound && y <= (bottomYBound + keyboardBrickHeight)) {
        checkWhichKeypressed(x, y);
      }
    }

	// Check if either enter or delete was pressed
    if((y > keyboardYPadding + (2 * (keyboardBrickHeight + brickVerticalPadding))) && (y < (keyboardYPadding + (2 * (keyboardBrickHeight + brickVerticalPadding)) + keyboardBrickHeight)))  {
    	// ENTER
        if ((x > keyboardXPadding - 8) && (x < (keyboardXPadding - 8 + keyboardBrickWidth + keyboardXPadding))) {
            if (!((wordleBoard.getCurrentBrickNumber() + 1) % 5)) {
                // Call function to check this word against set word
                checkWord();
            }
	    // DELETE
        } else if ((x > (13 * keyboardXPadding + 2)) && (x < (13 * keyboardXPadding + 2 + keyboardBrickWidth + keyboardXPadding))) {
            let currentLineStartingBrick = wordleBoard.getStartingBrick()
            let deleteRequestBrick = wordleBoard.getCurrentBrickNumber()-1;
            //if try to go outside of first position
            if (wordleBoard.getCurrentBrickNumber()-1 < 0) {
                alert("You cannot delete if you have not written to yet!");
                wordleBoard.setCurrentBrickNumber(0);
            }
            //if you try to go to the last line
            else if (deleteRequestBrick < currentLineStartingBrick) {
                alert("Nice try! You cannot edit your last guess."); 
            }
            else {      //past both error conditions so allow change
                //the brick that we just entered into is one behind currentBrick so change that to defaultBrickLetter (which is empty string)
                alert(currentLineStartingBrick + 4);
                alert(wordleBoard.getCurrentBrickNumber())
                if (wordleBoard.getCurrentBrickNumber()  == (currentLineStartingBrick + 4)) {
                    alert("here")     
                    
                    wordleBoard.getBricks()[wordleBoard.getCurrentBrickNumber()].setLetter(defaultBrickLetter);
                    wordleBoard.setCurrentBrickNumber(wordleBoard.getCurrentBrickNumber()); 
                }
                else {
                    wordleBoard.getBricks()[wordleBoard.getCurrentBrickNumber()-1].setLetter(defaultBrickLetter); 
                    //next write to what we just erased
                    wordleBoard.setCurrentBrickNumber(wordleBoard.getCurrentBrickNumber() - 1);
                }
            }    
       	}
    }
  }
}

// checks the submitted word against the accepted word
function checkWord() {
        let letterIndex = 0;
        let currBrick = wordleBoard.getCurrentBrickNumber() - 4;
        let userWord = wordleBoard.getBricks()[currBrick + 0].getLetter() + wordleBoard.getBricks()[currBrick + 1].getLetter() + wordleBoard.getBricks()[currBrick + 2].getLetter() + wordleBoard.getBricks()[currBrick + 3].getLetter() + wordleBoard.getBricks()[currBrick + 4].getLetter();
        // Check user inputted word against the correct word and update the wordle board
        for (let i = 0; i < 5; i++) {
            letterIndex = keyboardLetterList.indexOf(userWord[i]);
            if (secretWord.includes(userWord[i])) {
                wordleBoard.getBricks()[currBrick + i].setColor("#FFFFA7");
                keyboard.getKeyboardBricks()[letterIndex].setColor("#FFFFA7");
            } else {
                wordleBoard.getBricks()[currBrick + i].setColor("#6A6A6A");
                keyboard.getKeyboardBricks()[letterIndex].setColor("#6A6A6A");
            }
            if (secretWord[i] == userWord[i]) {
                wordleBoard.getBricks()[currBrick + i].setColor("#98FB98");
                keyboard.getKeyboardBricks()[letterIndex].setColor("#98FB98");
            }
        }
        wordleBoard.setCurrentBrickNumber(wordleBoard.getCurrentBrickNumber() + 1);
}

//draws text within brick based on the parameters of this specific instance of the brick class
function drawText(brick) {
  ctx.beginPath();
  ctx.fillStyle = brick.getTextColor();
  ctx.font = brick.getFont();
  textXPos = brick.getPosX() + brick.getWidth() / 2;
  textYPos = brick.getPosY() + brick.getHeight() / 1.5;
  ctx.textAlign = 'center';
  ctx.fillText(brick.getLetter(), textXPos, textYPos);
  ctx.closePath();
}

//draws the brick based on the parameters of this specific instance of the brick class
function drawBrick(brick) {
  ctx.beginPath();
  ctx.rect(brick.getPosX(), brick.getPosY(), brick.getHeight(), brick.getWidth());
  ctx.fillStyle = brick.getColor();
  ctx.fill();
  ctx.strokeStyle = brick.getBorderColor();
  ctx.stroke(); // add border
  ctx.closePath();
}

//calculate proper brick positioning
//returns brick with positions set
function wordleBrickPosition(i) {
  if (i < 5) {
    brickRow = 0;
  } else if (i < 10) {
    brickRow = 1;
  } else if (i < 15) {
    brickRow = 2;
  } else if (i < 20) {
    brickRow = 3;
  } else if (i < 25) {
    brickRow = 4;
  } else if (i < 30) {
    brickRow = 5;
  }
  wordleBoard.getBricks()[i].setPosX(boardXPadding + (i * (brickWidth + brickHorizontalPadding)) - (brickRow * (boardWidth - boardXPadding - 2 * brickHorizontalPadding)));
  wordleBoard.getBricks()[i].setPosY(boardYPadding + (brickRow * (brickHeight + brickVerticalPadding)));
}

function keyboardPosition(i) {
  if (i < keyboard.getRow1Length()) {
    brickRow = 0;
    keyboard.getKeyboardBricks()[i].setPosX(keyboardXPadding + (i * (keyboardBrickWidth + brickHorizontalPadding)));
  } else if (i < (keyboard.getRow1Length() + keyboard.getRow2Length())) {
    brickRow = 1;
    keyboard.getKeyboardBricks()[i].setPosX(keyboardXPadding + (i * (keyboardBrickWidth + brickHorizontalPadding)) - (keyboard.getRow1Length() * keyboardBrickWidth) - ((keyboard.getRow1Length() - 1) * brickHorizontalPadding) + keyboardRowBuffer);
  } else {
    brickRow = 2;
    keyboard.getKeyboardBricks()[i].setPosX(keyboardXPadding + (i * (keyboardBrickWidth + brickHorizontalPadding)) - 2 * (keyboard.getRow1Length() * keyboardBrickWidth) - ((keyboard.getRow1Length() - 1) * brickHorizontalPadding) - 2 * keyboardRowBuffer);
  }

  keyboard.getKeyboardBricks()[i].setPosY(keyboardYPadding + (brickRow * (keyboardBrickHeight + brickVerticalPadding)));
}


// gets brick position, draws each brick, then draws the text in each brick
function drawWordleBoard() {
  for (i = 0; i < wordleBoard.getBricks().length; i++) {
    wordleBrickPosition(i, wordleBoard);
    drawBrick(wordleBoard.getBricks()[i]);
    drawText(wordleBoard.getBricks()[i]);
  }
}

function drawBackspace(brick) {
	ctx.beginPath();
    ctx.beginPath();
    ctx.fillStyle = "#d9d9d9";
    ctx.rect(brick.getPosX() + 1.5*keyboardXPadding, brick.getPosY(), keyboardBrickWidth + keyboardXPadding, keyboardBrickHeight);
    ctx.fill();
    ctx.fillStyle = "#000000";
    ctx.font = "10px Arial";
    ctx.textAlign = 'center';
    ctx.fillText("DELETE", brick.getPosX() + (keyboardBrickWidth + 1.5*keyboardXPadding ), brick.getPosY() + 15);
    ctx.closePath();
    ctx.closePath();
}

function drawSubmit(brick) {
	ctx.beginPath();
    ctx.fillStyle = "#d9d9d9";
    ctx.rect(brick.getPosX() - (keyboardBrickWidth + 1.5*keyboardXPadding), brick.getPosY(), keyboardBrickWidth + keyboardXPadding, keyboardBrickHeight);
    ctx.fill();
    ctx.fillStyle = "#000000";
    ctx.font = "10px Arial";
    ctx.textAlign = 'center';
    ctx.fillText("ENTER", brick.getPosX() - (keyboardBrickWidth + 1.5*keyboardXPadding) + 25, brick.getPosY() + 15);
    ctx.closePath();
}

function drawKeyboard() {
  for (i = 0; i < keyboard.getKeyboardBricks().length; i++) {
    keyboardPosition(i);
    drawBrick(keyboard.getKeyboardBricks()[i]);
    drawText(keyboard.getKeyboardBricks()[i]);
    if(i == 19){
    	drawSubmit(keyboard.getKeyboardBricks()[i]);
    }
    if(i == 25) {
    	drawBackspace(keyboard.getKeyboardBricks()[i]);
    }
  }
}

function updateCurrentLine() {
    currentBrick = wordleBoard.getCurrentBrickNumber();
    if (currentBrick > 0 && currentBrick < 5) {
        wordleBoard.setCurrentLine(0);
    }
    else if (currentBrick >= 5 && currentBrick < 10) {
        wordleBoard.setCurrentLine(1);
    }
    else if (currentBrick >= 10 && currentBrick < 15) {
        wordleBoard.setCurrentLine(2);
    }
    else if (currentBrick >= 15 && currentBrick < 20) {
        wordleBoard.setCurrentLine(3);
    }
    else if (currentBrick >= 20 && currentBrick < 25) {
        wordleBoard.setCurrentLine(4);
    }
    else if (currentBrick >= 25 && currentBrick < 30) {
        wordleBoard.setCurrentLine(5);
    }
}

function draw() {
  drawWordleBoard();
  drawKeyboard();
  updateCurrentLine();

  requestAnimationFrame(draw); // function recalls itself infinitely
  //helps the browser render the game better than the fixed framerate we currently have implemented
  //draw() being executed again and again within a requestAnimationFrame loop 
  //control of framerate is given to browser instead of setting interval for smoother, more efficient loop
}

draw();
