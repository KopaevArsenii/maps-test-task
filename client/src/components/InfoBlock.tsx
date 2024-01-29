import {FC} from "react";
import {Box} from "@mui/system";

interface InfoBlockProps {
    title: string,
    info: string | number
}

const InfoBlock:FC<InfoBlockProps> = ({ title, info }) => {
    return (
        <Box>
            <Box sx={{
                fontWeight: 'bold'
            }}>{title}</Box>
            <Box>{info}</Box>
        </Box>
    )
}

export default InfoBlock