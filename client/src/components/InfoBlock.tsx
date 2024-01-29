import {FC} from "react";
import {Box} from "@mui/system";
import styles from "../styles/InfoBlock.module.scss"

interface InfoBlockProps {
    title: string,
    info: string | number
}

const InfoBlock:FC<InfoBlockProps> = ({ title, info }) => {
    return (
        <Box>
            <Box className={styles.title}>
                {title}
            </Box>
            <Box>
                {info}
            </Box>
        </Box>
    )
}

export default InfoBlock