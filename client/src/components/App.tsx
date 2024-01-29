import {FC, useEffect, useState} from "react";
import axios from "axios";
import {toast} from "react-toastify";

import Spinner from "./Spinner.tsx";
import RoadMap from "./RoadMap.tsx";
import { Road } from "../types";

import 'react-toastify/dist/ReactToastify.css';

const App: FC = () => {
    const [roads, setRoads] = useState<Road[]>([]);
    const [isLoading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string>("");
    const fetchData = async () => {
        try {
            const { data } = await axios.get<Road[]>("http://localhost:3000/data");
            setRoads(data);
        } catch(e) {
            setError("Ошибка при запроса данных! Попробуйте позже")
        } finally {
            setLoading(false)
        }
    }

    useEffect(() => {
        fetchData();
    }, []);

    useEffect(() => {
        if (error) {
            toast.error(error);
        }
    }, [error]);

    return (
        <div>
            {roads.length === 0 && isLoading ? <Spinner /> : <RoadMap roads={roads.filter(road => road.coordinates[0])} />}
        </div>
    )
}

export default App;