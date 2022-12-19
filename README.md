
# 32Dice

Based on the game 32Dice originally published by [https://www.universitygames.com](University Games).

# Rules

## Game Setup

Each player rolls a series of 16 dice. Place the dice in the order they were rolled on the board on each player's side.

## Gameplay

Players take turns either moving one of their die or flipping one of their die to change its value.

* Each die can move in any of the 8 directions.
* A die must move the exact number of spaces equal to its value.
* If a die is flipped, it can only be flipped to an adjacent side, not the opposite side.
* For example, a die that is showing a value of 1 can not be flipped to 6, because that would be on the opposite side.

## Winning the game

A checkmate occurs when a player is able to move any one of their pieces to the back rank of their opponent's side of the board without it being able to be immediately captured on the next turn.

# Development notes

I'm producing this app somewhat ad-hoc without much pre-planning, mostly as an excercise in React and SPA.

# Starting the app

This app was created with Create React App, with the Typescript template. The standard command to kick off the app is `npm start`. Don't forget to do an `npm i` first.

# Todo list

* Draw a piece on the board and style it to look nice.
* Provide an interface to change the value of the piece.
* Click on a piece to select it.
* Highlight legal moves when a piece is selected
* Detect for checkmate.

# Game logic notes

## Determining a legal move

Take a pieces position and its value. A legal move is any move orthogonaly or diagonally equal to the value, no more and no less.

Generally, a piece of value i located at [x,y] will have the following legal moves on an infinitely large board with no blockers:

* [ x + i, y ]
* [ x - i, y ]
* [ x, y + i ]
* [ x, y - i ]
* [ x + i, y + i ]
* [ x + i, y - i ]
* [ x - i, y + i ]
* [ x - i, y - i ]

If any of these values are greater than 7 or less than 0, then that is not actually a legal move.

## Detecting for blocks

If a piece exists in between the selected piece and a legal square then the move is not legal.

Calculating rays? 

For a selected square and all its legal moves, check every space between it and the destination square for the presence of a piece?

If a piece exists, then the destination is not legal.

## Detecting for checkmate

TODO