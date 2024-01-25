import {FC} from "react";
import "./InfoBlock.css"

interface InfoBlockProps {
    title: string,
    info: string | number
}

const InfoBlock:FC<InfoBlockProps> = ({ title, info }) => {
    return (
        <div>
            <div className="info_title">{title}</div>
            <div>{info}</div>
        </div>
    )
}

export default InfoBlock