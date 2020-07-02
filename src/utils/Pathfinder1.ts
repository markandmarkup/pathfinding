import { initialAvailableMoves } from "./Utils";
import { IPathfinderReturn } from "../interfaces/IPathfinderReturn";

export const pathfinder1 = (inputArray: Array<any>, start: Array<number>, end: Array<number>) : IPathfinderReturn => {
    // input array must be a 2d array or equal length arrays, including one "start" value and one "end" value
    let currentRoute = []; // each route position is an object of { position: [x, y], availableMoves: int/0-4/ }
    let currentPosition = start;
    let complete = false;
    let endX = end[0];
    let endY = end[1];
    let outputArray = inputArray.map(column => column.map(row => row));

    while (complete === false) {
        let currentX = currentPosition[0];
        let currentY = currentPosition[1];
        let availableMoves = [];

        if (currentX === endX && currentY === endY) {
            currentRoute.push({ position: currentPosition, availableMoves: 0 });
            complete = true;
            continue;
        } else {
            availableMoves = initialAvailableMoves(currentX, currentY);
            
            // remove blocking squares from available moves array
            availableMoves = availableMoves.filter((position) => {
                const x = position[0];
                const y = position[1];
                return (
                    x >= 0
                    && x < inputArray.length
                    && y >= 0
                    && y < inputArray[0].length
                    && inputArray[x][y] !== "block"
                    && !currentRoute.find(item => JSON.stringify(item.position) === JSON.stringify(position))
                    );
            })
            
            // sort available moves by priority, determined by the longest difference by axis to the goal
            availableMoves.sort((a, b) => {
                if (Math.abs(currentX - endX) > Math.abs(currentY - endY)
                || Math.abs(currentX - endX) === Math.abs(currentY - endY)) { //determines which axis to prioritise according to largest distance
                    
                    if (Math.abs(a[0] - endX) < Math.abs(b[0] - endX)) return -1; // sort items with the smaller x distance to the beginning of the array
                    if (Math.abs(a[0] - endX) > Math.abs(b[0] - endX)) return 1;
                    
                    if (Math.abs(a[1] - endY) < Math.abs(b[1] - endY)) return -1; // if x distance is the same, sort by y
                    if (Math.abs(a[1] - endY) < Math.abs(b[1] - endY)) return 1;
                    
                } else { // in this case the y distance must be greater than the x distance
                    
                    if (Math.abs(a[1] - endY) < Math.abs(b[1] - endY)) return -1; // sort by y first
                    if (Math.abs(a[1] - endY) > Math.abs(b[1] - endY)) return 1;
                    
                    if (Math.abs(a[0] - endX) < Math.abs(b[0] - endX)) return -1; // then sort by x
                    if (Math.abs(a[0] - endX) < Math.abs(b[0] - endX)) return 1;
                    
                }
            })

            // apply move according to availability and priority
            if (availableMoves.length < 1) {
                outputArray[currentPosition[0]][currentPosition[1]] = "deadEnd";
                currentRoute.push({ position: currentPosition, availableMoves: 0 });
                break; // path has failed
            } else {
                if (availableMoves[0][0] > currentPosition[0]) outputArray[currentPosition[0]][currentPosition[1]] = "pathRight";
                if (availableMoves[0][0] < currentPosition[0]) outputArray[currentPosition[0]][currentPosition[1]] = "pathLeft";
                if (availableMoves[0][1] > currentPosition[1]) outputArray[currentPosition[0]][currentPosition[1]] = "pathDown";
                if (availableMoves[0][1] < currentPosition[1]) outputArray[currentPosition[0]][currentPosition[1]] = "pathUp";
                currentRoute.push({ position: currentPosition, availableMoves: availableMoves.length });
                currentPosition = availableMoves[0];
            }
        }
    }

    return {
        success: complete,
        resultArray: new Array(outputArray),
        pathCount: 1,
        attemptCount: 1
    };
}
