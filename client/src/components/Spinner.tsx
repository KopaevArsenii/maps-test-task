import {FC} from "react";
import {Box} from "@mui/system";
import styles from "../styles/Spinner.module.scss"

import spinner from "../assets/spinner.svg"


const Spinner:FC = () => {
    return (
        <Box className={styles.wrapper}>
            <img width={48} height={48} src={spinner} alt="Loading..."/>
        </Box>
    )
}

export default Spinner
