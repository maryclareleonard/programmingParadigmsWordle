//VARIABLE DECLARATION
let canvas = document.getElementById("myCanvas"); //store reference to canvas element
let ctx = canvas.getContext("2d"); ////store the 2d rendering context - tool used to paint in canvas

//keyboard parameters
keyboardLetterList = ["q","w","e","r","t","y","u","i","o","p","a","s","d",
                      "f","g","h","j","k","l","z","x","c","v","b","n","m"];
keyboardRow1 = 10;
keyboardRow2 = 9;
keyBoardRow3 = 7;

//We could parse this to get words: http://www.allscrabblewords.com/5-letter-words/

let fiveLetterWords = [ "added","salsa","abode","agent","axles","baker","bagel","cheer",
                        "added","spoon","early","gawks","jeans","lanky","nacho",
                        "olive","panda","paint","tears","vague","weary","yacht","zones"];

let brickHeight = 60;
let brickWidth = brickHeight;
let brickVerticalPadding = 10;
let brickHorizontalPadding = 10;
let defaultBrickLetter = "";
let defaultBrickColor = "#ffffff";
let defaultBrickTextColor = "#000000";
let defaultBrickBorderColor = "#d9d9d9";
let defaultBrickFont = "25px Arial";

let boardBricksVertical = 5;
let boardBricksHorizontal = 6;
let boardXPadding = 25;
let boardWidth = (boardBricksHorizontal * brickWidth) - boardXPadding + (boardBricksHorizontal * brickHorizontalPadding);
let boardYPadding = boardXPadding;
let numOfBricks = boardBricksVertical * boardBricksHorizontal;
let boardHeight = (boardBricksVertical * brickHeight) + boardYPadding + (boardBricksVertical * brickVerticalPadding);

let keyboardBrickHeight = 25;
let keyboardBrickWidth = keyboardBrickHeight;
let defaultKeyboardColor = "#d9d9d9";
let defaultKeyboardTextColor = "#000000";
let defaultKeyboardBorderColor = "#ffffff";
let keyboardXPadding = boardXPadding;
let keyboardYPadding = boardHeight + 150;
let defaultKeyboardFont = "15px Arial";
let keyboardRowBuffer = 10; 

//create random int 
function getRandomInt() {
    m = Math.random() * 2 + 2; //between 2 and 4 
    const d = new Date();
    if (d.getTime() % 2  == 0) { //determine direction based on even/odd millisecond
        m = -1 * m;
    }
    return m;
}

//CLASS DECLARATIONS
class Board {
    constructor(bricks, correctWord, currentLine, currentBrick) {
        this._bricks = bricks;
        this._correctWord = correctWord;
        this._currentLine = currentLine;
        this._currentBrick = currentBrick;
    }
    //getters
    getBricks()         { return this._bricks; }
    getCorrectWord()    { return this._correctWord; }
    getCurrentLine()    { return this._currentLine; }
    getCurrentBrick()   { return this._currentBrick; }

    //setters
    setBricks(bricks)               { this._bricks = bricks;} //array of bricks
    setCorrectWord(correctWord)     { this._correctWord = correctWord; }
    setCurrentLine(currentLine)     { this._currentLine = currentLine; }
    setCurrentBrick(currentBrick)   { this._currentBrick = currentBrick; }
}
class Keyboard {
    constructor(keyboardBricks) {
        this._keyboardBricks = keyboardBricks;
        this.row1Length = 10;           //first row # of letters on qwerty keyboard
        this.row2Length = 9;            //second row # of letters on qwerty keyboard
        this.row3Length = 7;            //third row # of letters on qwerty keyboard
        this.width = keyboardBrickWidth;
        this.height = keyboardBrickHeight;
    }
    //getters
    getKeyboardBricks() { return this._keyboardBricks; }
    getRow1Length()     { return this.row1Length; }
    getRow2Length()     { return this.row2Length; }
    getRow3Length()     { return this.row3Length; }
    getWidth()          { return this.width; }
    getHeight()         { return this.height; }
    //setters
    setKeyboardBricks(keyboardBricks) { this._keyBoardBricks = keyboardBricks;} //array of bricks
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
    getLetter1()            { return this._letter1; }
    getLetter2()            { return this._letter2; }
    getLetter3()            { return this._letter3; }
    getLetter4()            { return this._letter4; }
    getLetter5()            { return this._letter5; }
    getCorrectLetter1()     { return this._correctLetter1; }   
    getCorrectLetter2()     { return this._correctLetter2; }   
    getCorrectLetter3()     { return this._correctLetter3; }   
    getCorrectLetter4()     { return this._correctLetter4; }   
    getCorrectLetter5()     { return this._correctLetter5; }   

    //setters
    setLetter1(letter1)                 { this._letter1 = letter1; }
    setLetter2(letter2)                 { this._letter2 = letter2; }
    setLetter3(letter3)                 { this._letter3 = letter3; }
    setLetter4(letter4)                 { this._letter4 = letter4; }
    setLetter5(letter5)                 { this._letter5 = letter5; }
    setCorrectLetter1(correctLetter1)   { this._correctLetter1 = correctLetter1;}
    setCorrectLetter2(CorrectLetter2)   { this._correctLetter2 = correctLetter2;}
    setCorrectLetter3(correctLetter3)   { this._correctLetter3 = correctLetter3;}
    setCorrectLetter4(correctLetter4)   { this._correctLetter4 = correctLetter4;}
    setCorrectLetter5(correctLetter5)   { this._correctLetter5 = correctLetter5;}
}
class Brick {
    constructor(height,width, letter, color, borderColor, textColor, font, posX, posY) {
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
    getHeight()         { return this._height; }
    getWidth()          { return this._width; }
    getPosX()           { return this._posX; }
    getPosY()           { return this._posY; }
    getLetter()         { return this._letter; }
    getColor()          { return this._color; }
    getBorderColor()    { return this._borderColor; }  
    getTextColor()      { return this._textColor; }
    getFont()       { return this._font; }
    //setters
    //don't need setter for Height or Width
    setPosX(posX)               { this._posX = posX; }
    setPosY(posY)               { this._posY = posY; }
    setLetter(letter)           { this._letter = letter; }
    setColor(color)             { this._color = color; }
    setBorderColor(borderColor) { this._borderColor = borderColor; }
    setTextColor(textColor)     { this._textColor = textColor; }
    setFont(font)               { this._font = font;}
}

//create bricks for the board
//return board 

function createWordleBoard() {
    board = [];
    for (let i =0; i < numOfBricks; i++){
        
        iBrick = new Brick(brickHeight, brickWidth,defaultBrickLetter,defaultBrickColor,defaultBrickBorderColor,defaultBrickTextColor,defaultBrickFont);
        board[i] = iBrick;
    }
    wordleBoard = new Board(board,fiveLetterWords[0],0,board[0]);
    return wordleBoard;
}

function createKeyboard() {
    keyboardBricks = [];
    for (let i=0; i < keyboardLetterList.length ; i++) {
        new Brick()
        keyboardLetter = new Brick(keyboardBrickHeight,keyboardBrickWidth,keyboardLetterList[i],defaultKeyboardColor,defaultKeyboardBorderColor, defaultKeyboardTextColor,defaultKeyboardFont);
        keyboardBricks[i] = keyboardLetter;
    }
    
    keyboard = new Keyboard(keyboardBricks);//dont need to set the other two parameters
    return keyboard;
}

//draws text within brick based on the parameters of this specific instance of the brick class
function drawText(brick) {
    ctx.beginPath();
    ctx.fillStyle = brick.getTextColor();
    ctx.font = brick.getFont();
    textXPos = brick.getPosX() + brick.getWidth()/2;
    textYPos = brick.getPosY() + brick.getHeight()/1.5; 
    ctx.textAlign = 'center';
    ctx.fillText(brick.getLetter(), textXPos, textYPos);
    ctx.closePath();
}

//draws the brick based on the parameters of this specific instance of the brick class
function drawBrick(brick) {
    ctx.beginPath();
    ctx.rect(brick.getPosX(),brick.getPosY(),brick.getHeight(),brick.getWidth());
    ctx.fillStyle = brick.getColor();
    ctx.fill();
    ctx.strokeStyle = brick.getBorderColor();    
    ctx.stroke();// add border
    ctx.closePath();
}

//calculate proper brick positioning
//returns brick with positions set
function wordleBrickPosition(i,wordleBoard) {
    /* TODO: here is where we can grab current brick and set its letter */

    /* --------testing purposes --------
    if (i == 0)     { wordleBoard.getBricks()[i].setLetter("M")}
    else if (i==4)  { wordleBoard.getBricks()[i].setLetter("K")}
    wordleBoard.getCurrentBrick().setLetter("q")
    --------*/

    if (i < 5)          { brickRow = 0; }
    else if (i < 10)    { brickRow = 1; }
    else if (i < 15)    { brickRow = 2; }
    else if (i < 20)    { brickRow = 3; }
    else if (i < 25)    { brickRow = 4; }
    else if (i < 30)    { brickRow = 5; }
    wordleBoard.getBricks()[i].setPosX(boardXPadding + (i*(brickWidth+brickHorizontalPadding)) - (brickRow * (boardWidth - boardXPadding - 2*brickHorizontalPadding)));
    wordleBoard.getBricks()[i].setPosY(boardYPadding + (brickRow*(brickHeight+brickVerticalPadding))); 
}

function keyboardPosition (i,keyboard) {
    if (i < keyboard.getRow1Length()) { 
        brickRow = 0; 
        keyboard.getKeyboardBricks()[i].setPosX(keyboardXPadding + (i*(keyboardBrickWidth+brickHorizontalPadding)));
    }
    else if (i < (keyboard.getRow1Length() + keyboard.getRow2Length())) { 
        brickRow = 1;
        keyboard.getKeyboardBricks()[i].setPosX(keyboardXPadding + (i*(keyboardBrickWidth+brickHorizontalPadding)) - (keyboard.getRow1Length() * keyboardBrickWidth) - ((keyboard.getRow1Length()-1) * brickHorizontalPadding) + keyboardRowBuffer);
    }
    else { 
        brickRow = 2; 
        keyboard.getKeyboardBricks()[i].setPosX(keyboardXPadding + (i*(keyboardBrickWidth+brickHorizontalPadding)) - 2*(keyboard.getRow1Length() * keyboardBrickWidth) - ((keyboard.getRow1Length()-1) * brickHorizontalPadding) - 2*keyboardRowBuffer);
    }
    
    keyboard.getKeyboardBricks()[i].setPosY(keyboardYPadding + (brickRow*(keyboardBrickHeight + brickVerticalPadding))); 
}


// gets brick position, draws each brick, then draws the text in each brick
function drawWordleBoard(wordleBoard) {
    for (i=0; i < wordleBoard.getBricks().length; i++){
        wordleBrickPosition(i,wordleBoard);
        drawBrick(wordleBoard.getBricks()[i]);
        drawText(wordleBoard.getBricks()[i]);
    }
}

function drawKeyboard(keyboard) {
    for (i=0; i < keyboard.getKeyboardBricks().length; i++) {
        keyboardPosition(i,keyboard);
        drawBrick(keyboard.getKeyboardBricks()[i]);
        drawText(keyboard.getKeyboardBricks()[i]);
    } 
}

function draw() {
    wordleBoard = createWordleBoard();
    drawWordleBoard(wordleBoard);

    keyboard = createKeyboard();
    drawKeyboard(keyboard);
    //registerKeyPresses(keyboard);
    

    requestAnimationFrame(draw); // function recalls itself infinitely
    //helps the browser render the game better than the fixed framerate we currently have implemented
    //draw() being executed again and again within a requestAnimationFrame loop 
    //control of framerate is given to browser instead of setting interval for smoother, more efficient loop
}

draw();