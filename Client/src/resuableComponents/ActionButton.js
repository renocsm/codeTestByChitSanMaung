import { Button, makeStyles } from '@material-ui/core';
import React from 'react'

const useStyles = makeStyles(theme=>({
    root:{
        minWidth:0,
        margin:theme.spacing(0.5),
        width:'25px',
        height:'25px', 
        
    },
    secondary:{
        background:theme.palette.secondary.light,
        '& .MuiButton-label':{
            color:theme.palette.secondary.main
        }
    } ,
    primary:{
        background:theme.palette.primary.light,
        '& .MuiButton-label':{
            color:theme.palette.primary.main
        }
    }

}))

export default function ActionButton(props) {

    const {color,children,onClick,...other} = props; 
    const classes = useStyles()

    return (
        <Button onClick={onClick} className={`${classes.root} ${classes[color]} `} {...other}>
                {children}
        </Button>
    )
}
