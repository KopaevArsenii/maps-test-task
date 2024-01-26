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

    function swapCoordinatesArray(coordinates: [Coordinate[]]): Coordinate[] {
        return coordinates?.[0].map(coordinate => swapCoordinate(coordinate))
    }


    function calculateCenterPosition(coordinates: [Coordinate[]]): Coordinate {
        if (coordinates?.[0].length % 2 === 0 && coordinates?.[0].length > 2) {
            const preMiddle = Math.round(coordinates?.[0].length / 2);
            const postMiddle = preMiddle + 1;

            // console.log(coordinates?.[0], preMiddle, postMiddle);
            const first = coordinates?.[0][preMiddle];
            const second = coordinates?.[0][postMiddle];
            return [(first[1] + second[1]) / 2, (first[0] + second[0]) / 2]

            // return [0, 0]
        } else {
            const index = Math.round(coordinates?.[0].length / 2);
            // console.log(index)
            return [coordinates?.[0]?.[index][1], coordinates?.[0]?.[index][0]]
        }
    }

    return (
        <div className="map_wrapper">
            <MapContainer center={center} zoom={zoom} style={{ height: "100vh"}}>
                <TileLayer
                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                />
                {roads.map((road) => {

                    // if (road.id === 413) {
                    //     console.log(road.coordinates)
                    // }

                    return (
                        <Polyline key={road.id} positions={swapCoordinatesArray(road.coordinates)} color="red">
                            <Marker position={calculateCenterPosition(road.coordinates)}>
                                <Popup>
                                    <div className={"info_wrapper"}>
                                        <InfoBlock title={"Id:"} info={road.id} />
                                        <InfoBlock title={"Название:"} info={road.name} />
                                        <InfoBlock title={"Номер:"} info={road.number} />
                                        <InfoBlock title={"Тип:"} info={road.type} />
                                        <InfoBlock title={"Уникальный номер:"} info={road.unique_value} />
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
