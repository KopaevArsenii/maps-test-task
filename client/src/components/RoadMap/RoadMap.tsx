import { MapContainer, TileLayer, Polyline, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import {FC} from "react";
import {Coordinate, Road} from "../../types";
import InfoBlock from "../InfoBlock/InfoBlock.tsx";
import "./RoadMap.css"

interface RoadMapProps {
    roads: Road[]
}

const RoadMap:FC<RoadMapProps> = ({ roads }) => {
    //Coordinates of the city of Рязань
    const center: Coordinate = [54.640246, 39.719048]
    const zoom: number = 10;

    function swapCoordinate(coordinate: Coordinate): Coordinate {
        return [coordinate[1], coordinate[0]];
    }

    function swapCoordinatesArray(coordinates: Coordinate[]): Coordinate[] {
        return coordinates.map(coordinate => swapCoordinate(coordinate))
    }

    function calculateRoadLength(road: Road): string {
        return (road.end - road.begin).toFixed(2);
    }

    function distance(a: Coordinate, b: Coordinate): number {
        const [x1, y1] = a;
        const [x2, y2] = b;
        return Math.sqrt((x2 - x1) ** 2 + (y2 - y1) ** 2);
    }

    function interpolate(a: Coordinate, b: Coordinate, ratio: number): Coordinate {
        const [x1, y1] = a;
        const [x2, y2] = b;
        return [x1 + (x2 - x1) * ratio, y1 + (y2 - y1) * ratio];
    }

    function calculateCenterCoordinate(points: Coordinate[]): Coordinate {
        //edge case with 2 coordinates
        if (points.length == 2) {
            return interpolate(points[0], points[1], 0.5);
        }

        const totalLength = points.reduce((acc, curr, idx, arr) => {
            if (idx === 0) return 0;
            const prev = arr[idx - 1];
            return acc + distance(prev, curr);
        }, 0);

        let accumulatedLength = 0;
        const halfLength = totalLength / 2;

        for (let i = 0; i < points.length - 1; i++) {
            const d = distance(points[i], points[i + 1]);
            if (accumulatedLength + d >= halfLength) {
                const overshoot = halfLength - accumulatedLength;
                const ratio = overshoot / d;
                return interpolate(points[i], points[i + 1], ratio)
            }
            accumulatedLength += d;
        }
        // Return the last point if something goes wrong
        return points[points.length - 1];
    }



    return (
        <div className="map_wrapper">
            <MapContainer center={center} zoom={zoom} style={{ height: "100vh"}}>
                <TileLayer
                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                />
                {roads.map(road => {
                    return (
                        <Polyline key={road.id} positions={swapCoordinatesArray(road.coordinates[0])} color="red">
                            <Marker position={swapCoordinate(calculateCenterCoordinate(road.coordinates[0]))}>
                                <Popup>
                                    <div className={"info-wrapper"}>
                                        <InfoBlock title={"Id:"} info={road.id} />
                                        <InfoBlock title={"Название:"} info={road.name} />
                                        <InfoBlock title={"Номер:"} info={road.number} />
                                        <InfoBlock title={"Тип:"} info={road.type} />
                                        <InfoBlock title={"Уникальный номер:"} info={road.unique_value} />
                                        <InfoBlock title={"Длинна дороги:"} info={calculateRoadLength(road)} />
                                    </div>
                                </Popup>
                            </Marker>
                        </Polyline>
                    )
                })}
            </MapContainer>
        </div>
    )
};

export default RoadMap;
