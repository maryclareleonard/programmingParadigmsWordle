# programmingParadigmsWordle

Four Classes:

Board 
- maintains 
    - bricks, 
    - correct word, 
    - current line and 
    - current brick number
- also contains a method to see what the startingBrick of the current line is (simple arithmetic based on the currentLine parameter of the Board class

Keyboard
- maintains 
    - keyboardBricks 
        - (same as bricks of the board class but renamed for specificity)
    - lengths for each of the rows
        - (note there are no setters for these as the QWERTY keyboard has specified row lengths)
    - width, height
    
 Word
 - maintains 5 letters and 5 correct letters to keep track of what is in the bricks to compare what should be in them
 
 Brick 
 - maintains
    - height, width
    - posX and posY
    - letter (within the brick)
    - color (of the background of the brick)
    - borderColor, textColor, Font 
        - (these were important as we use the same bricks for the Board and Keyboard classes)



Functions:

selectSecretWord
-  selects the secret word randomly from list given on assignment sheet

createWordleBoard
- create Bricks to fill Board
- wordleBoard created with array of these new Bricks

createKeyBoard
- create Bricks to fill Keyboard
- keyboard created with array of these new Bricks
        
dragStart and dragEnd 
- mouse listeners to get keyboard presses

checkWhichKeyPressed
- is called by isClickPointInKeyboard (therefore we know mouse press is within keyboard) 
    - less checking than if we look on every mouse press
- based on the bounds of each keyboard piece - finds which key user was pressing on and set the current brick on the wordleboard to have that letter
 
isClickPointInKeyBoard
- uses bounds of keyboard pieces q, p, and m (a few of the extremeties) to find if mouse press is within bounds of keyboard
- determines if enter pressed
    - check if word in word list - if so then calls checkWord
- determines if delete pressed 
    - edge cases so you get error messages if you try to delete when nothing at position 0 AND if you try to delete part of your last guess
    - handles deleting the currentbrick characters but only in that word!

wordInList
- check if word in our list of options so user is not guessing invalid words

youWon
- display message based on line 
- stop accepting input

youLost
- display message
- stop accepting input


