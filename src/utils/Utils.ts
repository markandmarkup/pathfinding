
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

    let output = inputTextArray.map(column => column.map(row => row))

    console.log("Coord to text output");
    console.log(output);

    coordsArray.forEach((position, index) => {
        if (index < coordsArray.length -1) {
            let nextPosition = coordsArray[index + 1];
            if (nextPosition[0] > position[0]) output[position[0]][position[1]] = "pathRight";
            if (nextPosition[0] < position[0]) output[position[0]][position[1]] = "pathLeft";
            if (nextPosition[1] > position[1]) output[position[0]][position[1]] = "pathDown";
            if (nextPosition[1] < position[1]) output[position[0]][position[1]] = "pathUp";
        }
    })

    let coordsLastPosition = coordsArray[coordsArray.length -1];
    if (output[coordsLastPosition[0]][coordsLastPosition[1]] !== "end") {
        output[coordsLastPosition[0]][coordsLastPosition[1]] = "deadEnd";
    }

    return output;
}

export const checkStraightLine = (inputArray: Array<any>, start: number[], end: number[]): boolean => {

    return true;

    return false;

}

export const calculateStraightLine = (start: number[], end: number[]): Array<any> => {
    const [x0, y0] = start;
    const [x1, y1] = end;
    const xSize = Math.abs(x1 - x0) + 1;
    const ySize = Math.abs(y1 - y0) + 1;
    let result = [];

    console.log(x0);
    console.log(y0);
    console.log(x1);
    console.log(y1);
    console.log(xSize);
    console.log(ySize);

    if (xSize === 1) {
        for(let i = 0; i < ySize; i++) {
            result.push(Array.from([x0, y0 + i]));
        }
    }

    if (ySize === 1) {
        for(let i = 0; i < xSize; i++) {
            result.push(Array.from([x0 + i, y0]));
        }
    }

    return result;
}