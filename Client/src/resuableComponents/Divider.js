import React from 'react';
import { Typography, Divider as DividerComponent } from '@material-ui/core'
import { makeStyles } from '@material-ui/styles';


const useStyles = makeStyles((theme) => ({
    divider: {
        // Theme Color, or use css color in quote
        background: theme.palette.secondary.main,
        marginBottom: '10px'
    },
}))

const Divider = (props) => {
    const classes = useStyles();
    return (
        <>
            <Typography variant="h6" noWrap color="secondary" style={{ marginBottom: '10px', marginTop: '10px', color: 'green' }}>
                 {props.text}
            </Typography>
            <DividerComponent classes={{ root: classes.divider }} />
        </>
    );
};

export default Divider;