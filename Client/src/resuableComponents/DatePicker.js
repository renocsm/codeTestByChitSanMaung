import React from 'react'
import { KeyboardDatePicker, MuiPickersUtilsProvider } from '@material-ui/pickers'
import DateFnsUtils from '@date-io/date-fns'
import { makeStyles } from '@material-ui/styles'


const useStyles = makeStyles(theme=>({
    root:{
        color: theme.palette.secondary.main,
        "& .MuiOutlinedInput-root .MuiOutlinedInput-notchedOutline": {
            borderColor: theme.palette.secondary.main,
            color: theme.palette.secondary.main,
        },
        '& .Mui-focused': {
            color: theme.palette.secondary.main
        },
        '& .MuiFormLabel-colorSecondary': {
            color: theme.palette.secondary.main

        },
        '& .MuiFormLabel-root': {
            color: theme.palette.secondary.main

        },
        '& .MuiFormLabel-root.Mui-focused':{
            color: theme.palette.secondary.main
        },
        "& .MuiInputBase-input": {
            color: theme.palette.secondary.main,
        },
        '& .MuiSvgIcon-root': {
            fill: theme.palette.secondary.main
        },
    } ,
    
}))


export default function DatePicker(props) {

    const { name, label, value, onChange } = props
    const classes = useStyles()

    const convertToDefEventPara = (name, value) => ({
        target: {
            name, value
        }
    })

    return (
        <MuiPickersUtilsProvider utils={DateFnsUtils} >
            <KeyboardDatePicker 
                className={classes.root}
                format="MMM/dd/yyyy"
                name={name}
                value={value}
                onChange={date=> onChange(convertToDefEventPara(name,date))}
                label={label} disableToolbar variant="inline" inputVariant="outlined" focused={false} />
        </MuiPickersUtilsProvider>
    )
}
