import {FC, useEffect} from "react";
import axios from "axios";

const App: FC = () => {

    const fetchData = async () => {
        const { data } = await axios.get("http://localhost:3000/data");
        console.log(data);
        return data;
    }

    useEffect(() => {
        fetchData();
    }, []);
    return (
        <div>
            init
        </div>
    )
}

export default App;