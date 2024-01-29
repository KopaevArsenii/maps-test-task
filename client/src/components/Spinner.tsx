import {FC} from "react";
import {Box} from "@mui/system";

import spinner from "../assets/spinner.svg"


const Spinner:FC = () => {
    return (
        <Box sx={{
            width: '100%',
            height: '100vh',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center'
        }}>
            <img width={48} height={48} src={spinner} alt="Loading..."/>
        </Box>
    )
}

export default Spinner
