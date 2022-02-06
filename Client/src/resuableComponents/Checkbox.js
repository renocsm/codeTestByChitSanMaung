import { FormControl, FormControlLabel, Checkbox as MuiCheckbox } from '@material-ui/core'
import { makeStyles } from '@material-ui/styles'
import React from 'react'

const useStyles = makeStyles(theme => ({
    root: {
        '& .MuiSvgIcon-root': {
            fill: theme.palette.secondary.main
        },
        '& .MuiFormControlLabel-root': {
            color:  theme.palette.secondary.main
        },
        
    },
     



}))

export default function Checkbox(props) {

    const { name, label, value, onChange } = props
    const classes = useStyles()

    const convertToDefEventPara = (name, value) => ({
        target: {
            name, value
        }
    })

    return (
        <FormControl className={classes.root}>
            <FormControlLabel
                control={<MuiCheckbox
                    name={name}
                    color="primary"
                    checked={value}
                    onChange={e => onChange(convertToDefEventPara(name, e.target.checked))}
                   
                />}
                label={label}
            />
        </FormControl>
    )
}
