import {FC, useEffect, useState} from "react";
import axios from "axios";
import { Road } from "../../types";
import RoadMap from "../RoadMap/RoadMap.tsx";

const App: FC = () => {
    const [roads, setRoads] = useState<Road[]>([]);

    const fetchData = async () => {
        const { data } = await axios.get<Road[]>("http://localhost:3000/data");
        setRoads(data);
    }

    useEffect(() => {
        fetchData();
        roads.forEach(road => {
            if (road.id == 3) {
                console.log(JSON.stringify(road))
            }
        })
        console.log(roads);
    }, []);
    return (
        <div>
            {roads.length === 0 ? <div>Loading</div> : <RoadMap roads={roads.filter(road => road.coordinates[0])} />}
        </div>
    )
}

export default App;