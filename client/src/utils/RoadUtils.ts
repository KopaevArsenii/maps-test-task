import {Coordinate, Road} from "../types";

class RoadUtils {
     static #swapCoordinate(coordinate: Coordinate): Coordinate {
        return [coordinate[1], coordinate[0]];
    }

    static #distance(a: Coordinate, b: Coordinate): number {
        const [x1, y1] = a;
        const [x2, y2] = b;
        return Math.sqrt((x2 - x1) ** 2 + (y2 - y1) ** 2);
    }

    static #interpolate(a: Coordinate, b: Coordinate, ratio: number): Coordinate {
        const [x1, y1] = a;
        const [x2, y2] = b;
        return [x1 + (x2 - x1) * ratio, y1 + (y2 - y1) * ratio];
    }

    static swapCoordinatesArray(coordinates: Coordinate[]): Coordinate[] {
        return coordinates.map(coordinate => this.#swapCoordinate(coordinate))
    }

    static calculateRoadLength(road: Road): string {
        return (road.end - road.begin).toFixed(2);
    }

    static calculateCenterCoordinate(points: Coordinate[]): Coordinate {
        //edge case with 2 coordinates
        if (points.length == 2) {
            return this.#interpolate(points[0], points[1], 0.5);
        }

        const totalLength = points.reduce((acc, curr, idx, arr) => {
            if (idx === 0) return 0;
            const prev = arr[idx - 1];
            return acc + this.#distance(prev, curr);
        }, 0);

        let accumulatedLength = 0;
        const halfLength = totalLength / 2;

        for (let i = 0; i < points.length - 1; i++) {
            const d = this.#distance(points[i], points[i + 1]);
            if (accumulatedLength + d >= halfLength) {
                const overshoot = halfLength - accumulatedLength;
                const ratio = overshoot / d;
                return this.#swapCoordinate(this.#interpolate(points[i], points[i + 1], ratio));
            }
            accumulatedLength += d;
        }
        // Return the last point if something goes wrong
        return this.#swapCoordinate(points[points.length - 1]);
    }
}

export default RoadUtils