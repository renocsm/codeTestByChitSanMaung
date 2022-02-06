import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import CircularProgress from '@material-ui/core/CircularProgress';
 

const useStyles = makeStyles((theme) => ({

    container: {

        margin: `0 auto`,
        width: "100%",
        height: "800px",
        display: 'flex',
        
        alignItems: 'center !important',
        justifyContent: 'center',
        [theme.breakpoints.down("sm")]: {
            height: "700px",
        }
    }
}));
const CircularIndeterminate = (props) => {
    const classes = useStyles();

    return (
        <div className={classes.container}>
            <div>
                <CircularProgress color="secondary" />
            </div>

        </div>
    );
}


export default CircularIndeterminate
