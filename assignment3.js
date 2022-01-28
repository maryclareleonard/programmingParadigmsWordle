//VARIABLE DECLARATION
let canvas = document.getElementById("myCanvas"); //store reference to canvas element
let ctx = canvas.getContext("2d"); ////store the 2d rendering context - tool used to paint in canvas

//We could parse this to get words: http://www.allscrabblewords.com/5-letter-words/

let fiveLetterWords = []

brickHeight = 100;
brickWidth = 100;

boardBricksVertical = 6;
boardBricksHorizontal = 6;

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

}
class Brick {
    constructor(height,width,letter,color) {
        this._height = height;
        this._width = width;
        this._letter = letter;
        this._color = color;
        //this.letter = "a";       //by default no text in brick
        //this.color = "##d9d9d9";
    }
    //getters
    getHeight() {
        return this._height;
    }
    getWidth() {
        return this._width;
    }
    getLetter(){
        return this._letter;
    }
    getColor() {
        return this._color;
    }
    //setters
    setLetter (letter) {
        this._letter = letter;
    }
    setColor (color) {
        this._color = color;
    }
}
/*
//arrow key listeners for right goalie
document.addEventListener("keydown", keyDownHandler, false);

//stuck button and listener 
const button = document.querySelector('#stuck');
button.addEventListener('click', stuckButton);


function keyDownHandler(e) {
    if(e.key == "Up" || e.key == "ArrowUp"){
        upPressed = true;
    }
    else if(e.key == "Down" || e.key == "ArrowDown"){
        downPressed = true;
    }
}
*/
function drawBoard(brick1) {
    ctx.beginPath();
    //ctx.rect(10,10,10,10);
    //ctx.fillStyle = "#F9B8";
    //ctx.fill();
    ctx.rect(10,10,brick1.getHeight(),brick1.getWidth());
    ctx.fillStyle = brick1.getColor();
    ctx.strokeStyle = "#000000";    
    ctx.stroke();// add border
    ctx.fill();
    //ctx.fillStyle = "#FFFFFF";
    //ctx.font = "15px Comic Sans MS";
    //let scoreBoard = "  ScoreBoard  ";
    //let joinedText = `${scoreLeft}${scoreBoard}${scoreRight}`
    //ctx.fillText(brick1.getLetter(), 0, 0);
    ctx.closePath(); 
}

function draw() {
    //ctx.clearRect(0, 0, canvas.width, canvas.height);

    const brick1 = new Brick(brickHeight,brickWidth,"m","#d9d9d9");
    drawBoard(brick1);

    //requestAnimationFrame(draw); // function recalls itself infinitely
    //helps the browser render the game better than the fixed framerate we currently have implemented
    //draw() being executed again and again within a requestAnimationFrame loop 
    //control of framerate is given to browser instead of setting interval for smoother, more efficient loop
}


draw();