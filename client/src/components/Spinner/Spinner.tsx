import {FC} from "react";
import "./Spinner.css"
import spinner from "../../assets/spinner.svg"


const Spinner:FC = () => {
    return (
        <div className={"spinner_wrapper"}>
            <img className={"spinner_svg"} src={spinner} alt="Loading..."/>
        </div>
    )
}

export default Spinner
