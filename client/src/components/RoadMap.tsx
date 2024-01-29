import {FC} from "react";
import { MapContainer, TileLayer, Polyline, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import InfoBlock from "./InfoBlock.tsx";
import {Stack} from "@mui/system";
import {Coordinate, Road} from "../types";
import RoadUtils from "../utils/RoadUtils.ts";

interface RoadMapProps {
    roads: Road[]
}

const RoadMap:FC<RoadMapProps> = ({ roads }) => {
    //Coordinates of the city of Рязань
    const center: Coordinate = [54.640246, 39.719048]
    const zoom: number = 10;

    return (
        <div className="map_wrapper">
            <MapContainer center={center} zoom={zoom} style={{ height: "100vh"}}>
                <TileLayer
                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                />
                {roads.map(road => {
                    if (road.id === 3) {
                        console.log(JSON.stringify(road.coordinates))
                    }
                    return (
                        <Polyline key={road.id} positions={RoadUtils.swapCoordinatesArray(road.coordinates[0])} color="red">
                            <Marker position={RoadUtils.calculateCenterCoordinate(road.coordinates[0])}>
                                <Popup>
                                    <Stack spacing={2}>
                                        <InfoBlock title={"Id:"} info={road.id} />
                                        <InfoBlock title={"Название:"} info={road.name} />
                                        <InfoBlock title={"Номер:"} info={road.number} />
                                        <InfoBlock title={"Тип:"} info={road.type} />
                                        <InfoBlock title={"Уникальный номер:"} info={road.unique_value} />
                                        <InfoBlock title={"Длинна дороги:"} info={RoadUtils.calculateRoadLength(road)} />
                                    </Stack>
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
