# Connect Four Game

## Overview

This Python script implements the Connect Four game using a class named `Board`. The `Board` class provides a two-dimensional list to represent the game area, along with variables for the number of rows and columns on the board. The default size is 6 rows and 7 columns, but the class is designed to handle boards of any size.

## Usage

To use the Connect Four game, follow these steps:

1. Import the `Board` class from the script.

    ```python
    from connect_four import Board
    ```

2. Create an instance of the `Board` class.

    ```python
    game_board = Board()
    ```

3. Interact with the game board using the provided methods.

    ```python
    # Example: Place a token in column 3
    game_board.place_token(column=3, token='X')
    ```

4. View the current state of the board.

    ```python
    # Example: Display the current board
    game_board.display_board()
    ```

## Board Representation

The game board is represented as a two-dimensional list with characters ('X', 'O', or ' ') to indicate player tokens or empty spaces. The row and column dimensions can be adjusted based on user preferences.

Example:
```plaintext
| | | | | | | |
| | | | | | | |
| | | | | | | |
| | | | | | | |
| | |O| |O| | |
| |X|X|X|O| | |
---------------
0 1 2 3 4 5 6

