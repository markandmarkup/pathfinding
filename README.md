# Exploring Pathfinding Algorithms

This project is a self imposed challenge with a goal of trying to find efficient pathfinding algorithms.

The algorithm must find a continuous path from 'Start' to 'End', given the following rules:

- The path can move from its current square to any adjacent square in a move: up, down, left or right
- The path cannot enter a 'Block' square
- The path cannot visit the same square twice
- The algorithm should strive to find the shortest possible path from Start to End

The app has been put together to chart my progress as I explore new algorithm ideas and compare them with one another.

Written in React/Typescript with some unit testing thrown in for good measure.

## Installation

1. Clone the repo locally to your machine via SSH
2. CD to the root folder of the project
3. Run with `npm start` - the app will luanch on localhost:3000 by default

## User Guide

1. Select a block type from the radio selections - 'Start', 'End', 'Block' or 'Neutral'
2. Click a square on the grid to apply the selected block type. There can only be one 'Start' and 'End' square, but multiple 'Block' squares
3. Choose which algorithm to run from the drop-down
4. Click **Run** to run the algorithm when everything's set up (it may take some time to see the results depending on your pc and the algorithm choice!)
5. **Reset** returns the grid to the configuration when 'Run' was last clicked
6. **Clear** returns all blocks in the grid to 'Neutral'

## Screenshot
![Screenshot of the Pathfinding app](https://raw.githubusercontent.com/markandmarkup/pathfinding/master/public/images/screenshot.PNG "Screenshot")