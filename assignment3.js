//VARIABLE DECLARATION
let canvas = document.getElementById("myCanvas"); //store reference to canvas element
let ctx = canvas.getContext("2d"); ////store the 2d rendering context - tool used to paint in canvas

//We could parse this to get words: http://www.allscrabblewords.com/5-letter-words/

let fiveLetterWords = []

brickHeight = 50;
brickWidth = brickHeight;
brickVerticalPadding = 10;
brickHorizontalPadding = 10;


boardBricksVertical = 5;
boardBricksHorizontal = 6;
boardWidth = (boardBricksHorizontal*brickWidth);
boardXPadding = 25;
boardYPadding = boardXPadding;
numOfBricks = boardBricksVertical * boardBricksHorizontal;

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
    constructor(bricksVertical, bricksHorizontal, word, correctWord) {
        this._bricksVertical = bricksVertical;
        this._bricksHorizontal = bricksHorizontal;
        this._word = word;
        this._correctWord = correctWord;
    }
    //getters
    getBricksVertical()     {   return this._bricksVertical; }
    getBricksHorizontal()   {   return this._bricksHorizontal; }
    getWord()               {   return this._word; }
    getCorrectWord()        {   return this._correctWord; }

    //setters
    setBricksVertical(bricksVertical)       {   this._bricksVertical = bricksVertical;}
    setBricksHorizontal(bricksHorizontal)   {   this._bricksHorizontal = bricksHorizontal;}
    setWord(word)                           {   this._word = word; }
    setCorrectWord(correctWord)             {   this._correctWord = correctWord; }
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
    getLetter1()            {   return this._letter1; }
    getLetter2()            {   return this._letter2; }
    getLetter3()            {   return this._letter3; }
    getLetter4()            {   return this._letter4; }
    getLetter5()            {   return this._letter5; }
    getCorrectLetter1()     {   return this._correctLetter1; }   
    getCorrectLetter2()     {   return this._correctLetter2; }   
    getCorrectLetter3()     {   return this._correctLetter3; }   
    getCorrectLetter4()     {   return this._correctLetter4; }   
    getCorrectLetter5()     {   return this._correctLetter5; }   

    //setters
    setLetter1(letter1)                 {   this._letter1 = letter1; }
    setLetter2(letter2)                 {   this._letter2 = letter2; }
    setLetter3(letter3)                 {   this._letter3 = letter3; }
    setLetter4(letter4)                 {   this._letter4 = letter4; }
    setLetter5(letter5)                 {   this._letter5 = letter5; }
    setCorrectLetter1(correctLetter1)   {   this._correctLetter1 = correctLetter1;}
    setCorrectLetter2(CorrectLetter2)   {   this._correctLetter2 = correctLetter2;}
    setCorrectLetter3(correctLetter3)   {   this._correctLetter3 = correctLetter3;}
    setCorrectLetter4(correctLetter4)   {   this._correctLetter4 = correctLetter4;}
    setCorrectLetter5(correctLetter5)   {   this._correctLetter5 = correctLetter5;}
}
class Brick {
    constructor(height,width,letter,color,borderColor) {
        this._height = height;
        this._width = width;
        this._letter = letter;
        this._color = color;
        this._borderColor = borderColor;
        //this.letter = "a";       //by default no text in brick
        //this.color = "##d9d9d9";
    }
    //getters
    getHeight()         {   return this._height; }
    getWidth()          {   return this._width; }
    getLetter()         {   return this._letter; }
    getColor()          {   return this._color; }
    getBorderColor()    {   return this._borderColor; }  
    //setters
    //don't need setter for Height or Width
    setLetter (letter)          {   this._letter = letter; }
    setColor (color)            {   this._color = color; }
    setBorderColor(borderColor) {   this._borderColor = borderColor; }
}

//create board from words
function createBoard() {
    board = new Board();
    //alert("here in createBoard");
    for (let i =0; i < numOfBricks; i++ ){
        brick = "bricks" + i;
        iBrick = new Brick(brickHeight, brickWidth,"","#d9d9d9","#000000");
        board[i] = iBrick;
    }

    return board;
}

//create word from bricks
function createWord() {
    
    
    //return word;
}

function drawBoard(board) {
    for (i=0; i < numOfBricks; i++){
        brick = "brick" + i;
        //alert(brick);
        iBrick = board[i];
        if (i < 5)          {   brickRow = 0; }
        else if (i < 10)    {   brickRow = 1; }
        else if (i < 15)    {   brickRow = 2; }
        else if (i < 20)    {   brickRow = 3; }
        else if (i < 25)    {   brickRow = 4; }
        else if (i < 30)    {   brickRow = 5; }
        iBrickXPos = boardXPadding + (i*(brickWidth+brickVerticalPadding)) - brickRow * boardWidth;
        iBrickYPos = boardYPadding + (brickRow*(brickHeight+brickHorizontalPadding)); 
        ctx.beginPath();
        //ctx.rect(10,10,10,10);
        //ctx.fillStyle = "#F9B8";
        //ctx.fill();
        ctx.rect(iBrickXPos,iBrickYPos,iBrick.getHeight(),iBrick.getWidth());
        ctx.fillStyle = iBrick.getColor();
        ctx.strokeStyle = iBrick.getBorderColor();    
        ctx.stroke();// add border
        ctx.fill();
        //ctx.fillStyle = "#FFFFFF";
        //ctx.font = "15px Comic Sans MS";
        //let scoreBoard = "  ScoreBoard  ";
        //let joinedText = `${scoreLeft}${scoreBoard}${scoreRight}`
        //ctx.fillText(brick1.getLetter(), 0, 0);
        ctx.closePath(); 
    }
}

function draw() {
    //ctx.clearRect(0, 0, canvas.width, canvas.height);
    
    board =createBoard();
    drawBoard(board);

    //requestAnimationFrame(draw); // function recalls itself infinitely
    //helps the browser render the game better than the fixed framerate we currently have implemented
    //draw() being executed again and again within a requestAnimationFrame loop 
    //control of framerate is given to browser instead of setting interval for smoother, more efficient loop
}


draw();