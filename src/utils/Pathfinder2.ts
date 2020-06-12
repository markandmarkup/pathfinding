import { initialAvailableMoves, coordsToTextArray } from "./Utils";
import { IPathfinderReturn } from "../interfaces/IPathfinderReturn";

export const pathfinder2 = (inputArray: Array<any>, start: Array<number>, end: Array<number>) : IPathfinderReturn => {
    let allRoutes = [];
    let routePartials = [];

    const routeBuilder = (currentPosition: Array<number>, currentRoute: Array<any>, end: Array<number>) : void => {
        let currentX = currentPosition[0];
        let currentY = currentPosition[1];
        let availableMoves = initialAvailableMoves(currentX, currentY);

        currentRoute.push(currentPosition);

        if (JSON.stringify(currentPosition) !== JSON.stringify(end)) {
            availableMoves = availableMoves.filter((position) => {
                const x = position[0];
                const y = position[1];
                return (
                    x >= 0
                    && x < inputArray.length
                    && y >= 0
                    && y < inputArray[0].length
                    && inputArray[x][y] !== "block"
                    && !currentRoute.find(item => JSON.stringify(item) === JSON.stringify(position))
                    );
            })

            if (availableMoves.length === 1) {
                routeBuilder(availableMoves[0], Array.from(currentRoute), end);
            } else if (availableMoves.length > 1) {
                routePartials.push(Array.from(currentRoute));
                availableMoves.forEach(position => routeBuilder(position, Array.from(routePartials[routePartials.length - 1]), end));
                routePartials.pop();
            }

        } else {
            allRoutes.push(Array.from(currentRoute));
        }
    }

    routeBuilder(start, [], end);
    console.log('All:');
    console.log(allRoutes);

    if (allRoutes.length > 0) {
        const shortestRoute = allRoutes.reduce((shortest, current) => {
            return shortest.length <= current.length ? shortest : current;
        })
        return {
            success: true,
            resultArray: coordsToTextArray(shortestRoute, inputArray),
            pathCount: allRoutes.length
        };
    } else {
        return {
            success: false,
            resultArray: [],
            pathCount: 0
        };
    }

}
