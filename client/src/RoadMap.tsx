import { MapContainer, TileLayer, Polyline, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import {FC} from "react";
import {Coordinate, Road} from "./types";

interface RoadMapProps {
    roads: Road[]
}

const RoadMap:FC<RoadMapProps> = ({ roads }) => {
    //Coordinates of the city of Рязань
    const center: Coordinate = [54.640246, 39.719048]
    const zoom: number = 10;

    // function swapCoordinatesIn3DArray(coords: number[][][]): LatLngExpression[] | LatLngExpression[][] {
    //     return coords.map(array2D =>
    //         array2D.map(coordinate =>
    //             [coordinate[1], coordinate[0]] as [number, number]
    //         )
    //     );
    // }


    function swapCoordinates(coordinates: [Coordinate[]]): Coordinate[] {
        return coordinates?.[0].map(coordinate => [coordinate[1], coordinate[0]])
    }
    return (
        <div className="map_wrapper">
            <MapContainer center={center} zoom={zoom} style={{ height: "100vh"}}>
                <TileLayer
                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                />
                {roads.map((road) => {

                    // console.log(road.coordinates)

                    if (road.coordinates) {
                        return (
                            <Polyline key={road.id} positions={swapCoordinates(road.coordinates)} color="red">
                                <Popup>
                                    <span>{road.name}</span>
                                </Popup>
                            </Polyline>
                        )
                    }
                })}

            </MapContainer>
        </div>
    )
};

export default RoadMap;
