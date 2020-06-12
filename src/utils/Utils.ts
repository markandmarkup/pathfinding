
/** Converts an integer to x, y coordinates in an array [2,3]
 * 
 * @param index 
 * @param cols 
 */
export const indexToXYArray = (index: number, cols: number) : Array<number> => {
    let output = [];
    output[0] = index % cols;
    output[1] = Math.floor(index / cols);
    return output;
}

/** Converts a 1d array into a 2d 'grid' for pathfinding calculation
 *  Output format: [col[row, row], col[row, row] ...]
 * 
 * @param inputArray 
 * @param cols 
 * @param rows 
 */

export const convertArrayTo2D = (inputArray: Array<any>, cols: number, rows: number) : Array<any> => {
    let output = new Array(cols).fill('');
    output = output.map(i => new Array(rows).fill(''));

    inputArray.forEach((item, index) => {
        let x = index % cols;
        let y = Math.floor(index / cols);
        output[x][y] = item;
    })
    return output;
}

/** Converts a 2d 'grid' array to 1d linear format for display on FE
 * 
 * @param inputArray 
 */
export const convertArrayTo1D = (inputArray: Array<any>) : Array<any> => {
    let output = [];

    inputArray.forEach((column, x) => {
        column.forEach((row, y) => {
            output[(y * inputArray.length) + x] = row;
        })
    })
    return output;
}

/** Returns an array of coordinates for all squares around the given x, y input
 * 
 * @param currentX 
 * @param currentY 
 */
export const initialAvailableMoves = (currentX: number, currentY: number) : Array<any> => {
    return [
        [currentX + 1, currentY],
        [currentX - 1, currentY],
        [currentX, currentY + 1],
        [currentX, currentY - 1],
    ];
}

/** Takes a list of coordinates in a path generated from a pathfinder and
 * updates the input array to provide a 2d text array for output
 * 
 * @param coordsArray - Array list of x,y coordinates [[1,0],[1,1],[2,1]...]
 * @param inputTextArray  - The input 2d array of text strings [['a', 'b', 'c'], ['d', 'e', 'f'], ...]
 */
export const coordsToTextArray = (coordsArray: Array<any>, inputTextArray: Array<any>) : Array<any> => {

    coordsArray.forEach((position, index) => {
        if (index < coordsArray.length -1) {
            let nextPosition = coordsArray[index + 1];
            if (nextPosition[0] > position[0]) inputTextArray[position[0]][position[1]] = "pathRight";
            if (nextPosition[0] < position[0]) inputTextArray[position[0]][position[1]] = "pathLeft";
            if (nextPosition[1] > position[1]) inputTextArray[position[0]][position[1]] = "pathDown";
            if (nextPosition[1] < position[1]) inputTextArray[position[0]][position[1]] = "pathUp";
        }
    })

    let coordsLastPosition = coordsArray[coordsArray.length -1];
    if (inputTextArray[coordsLastPosition[0]][coordsLastPosition[1]] !== "end") {
        inputTextArray[coordsLastPosition[0]][coordsLastPosition[1]] = "deadEnd";
    }

    return inputTextArray;
}