# Command Line Tic-Tac-Toe
________________________________________________________________________________
<!-- @import "[TOC]" {cmd="toc" depthFrom=2 depthTo=6 orderedList=false} -->
________________________________________________________________________________

In this project, you will write an interactive Python program that plays
Tic-Tac-Toe. You will use the following ideas that you have learned so far:

* using variables
* using lists
* using tuples
* using functions to organize your code
* using `print` to print information to the terminal
* using `input()` to get input from the player
* using loops
* converting strings to integers
* using `if` statements

## The game

In case you have forgotten how Tic-Tac-Toe is played, here's the [Wikipedia
article on Tic-Tac-Toe][1].

## Set Up

Make sure that you're running a variation of Python 3.8 in your terminal. Type
`python --version` and make sure the version begins with "3.8".

Clone the starter repository from
https://github.com/appacademy-starters/python-tic-tac-toe.

Change the working directory into your cloned repository. Open it with Visual
Studio Code and do your work in the **tic_tac_toe.py** file.

To run the file, type `python tic_tac_toe.py` in your terminal.

## The starter file

The file **tic_tac_toe.py** already has some fully-written functions in there
for you, so that you don't have to do things like print the board. The rest of
the file contains stubbed-out functions for you to complete so that the game
will work.

Make sure you do good validation of player input so that they can't enter
something meaningless or wrong.

Your job is to complete the functions based on the comments in the functions to
get the game play to work. The comments in the functions comply with the
specifications in [PEP 257 - Docstring Conventions][2]. You'll see lots of that
type of documentation in your Python career, so it's good to start, now!

## Functions to complete

Below is the recommended order to finish the stubbed-out functions. As you
finish writing each function, think about how you could test that the function
is working as expected.

### Grid space value

Begin by rendering numbers in the Tic-Tac-Toe grid. Complete the  `space_value`
function and take a moment to figure out its expected behavior by observing how
it is used in the `draw_board` function.

### Get game move

Then go through and complete the `get_player_move`, `get_random_move`, and
`is_board_full` functions. To generate random moves, think about how to use the
[`shuffle`][3] method from the `random` module.

Note that you can make use of the `is_space_free` function to verify whether a
user's move in `get_player_move` or the computer's move in `get_random_move` is
valid. You can also use the `is_space_free` function to check whether the game
board is full in the `is_board_full` function.

### End of game

Go through and finish the `is_winner` function to determine whether the the
specified letter is a winner. Lastly, finish the `play_again` function to take
in user input and determine if the player wants to play again.

Congratulations! You have written an interactive Python program to play
Tic-Tac-Toe with a simple AI in the command line!


[1]: https://en.wikipedia.org/wiki/Tic-tac-toe#Game_play
[2]: https://www.python.org/dev/peps/pep-0257/
[3]: https://docs.python.org/3/library/random.html?highlight=shuffle#random.shuffle
