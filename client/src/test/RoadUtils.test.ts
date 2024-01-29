import RoadUtils from "../utils/RoadUtils.ts";
import {describe, expect, test} from '@jest/globals';
import {Coordinate} from "../types";

describe('RoadUtils', () => {
    test('swapCoordinatesArray should swap each coordinate in the array', () => {
        const coordinates: Coordinate[] = [[1, 2], [3, 4], [5, 6]];
        const swapped = RoadUtils.swapCoordinatesArray(coordinates);
        expect(swapped).toEqual([[2, 1], [4, 3], [6, 5]]);
    });
    test('swapCoordinatesArray should word for single element inside the array', () => {
        const coordinates: Coordinate[] = [[7, 8]];
        const swapped = RoadUtils.swapCoordinatesArray(coordinates);
        expect(swapped).toEqual([[8, 7]]);
    });
    test('swapCoordinatesArray should word for empty array', () => {
        const coordinates: Coordinate[] = [];
        const swapped = RoadUtils.swapCoordinatesArray(coordinates);
        expect(swapped).toEqual([]);
    });
    test('should correctly calculate center with two coordinates', () => {
        const points: Coordinate[] = [[0, 0], [10, 10]];
        const center = RoadUtils.calculateCenterCoordinate(points);
        expect(center).toEqual([5, 5]);
    });
    test('should correctly calculate center with multiple coordinates', () => {
        const points: Coordinate[] = [[0, 0], [5, 5], [10, 10]];
        const center = RoadUtils.calculateCenterCoordinate(points);
        expect(center).toEqual([5, 5]);
    });
    test('should correctly calculate center with equidistant points', () => {
        const points: Coordinate[] = [[0, 0], [2, 2], [4, 4], [6, 6], [8, 8], [10, 10]];
        const center = RoadUtils.calculateCenterCoordinate(points);
        expect(center).toEqual([5, 5]);
    });
    test('should correctly calculate center with unevenly spaced points', () => {
        const points: Coordinate[] = [[0, 0], [1, 1], [4, 4], [10, 10]];
        const center = RoadUtils.calculateCenterCoordinate(points);
        expect(center).toEqual([5, 5]);
    });
    test('should return the point itself for single coordinate array', () => {
        const points: Coordinate[] = [[5, 5]];
        const center = RoadUtils.calculateCenterCoordinate(points);
        expect(center).toEqual([5, 5]);
    });
    test('should correctly calculate with real data', () => {
        const points: Coordinate[] = [[39.823229, 54.667664], [39.822784, 54.667758], [39.822011, 54.667867], [39.821134, 54.668022]]
        const center = RoadUtils.calculateCenterCoordinate(points);
        expect(center).toEqual([54.66784292294334, 39.82218174830089]);
    })

});