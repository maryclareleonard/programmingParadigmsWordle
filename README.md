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
        
 
