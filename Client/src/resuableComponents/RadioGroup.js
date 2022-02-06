import { RadioGroup as MuiRadioGroup, FormControl, FormControlLabel, FormLabel, Radio } from '@material-ui/core';
import { makeStyles } from '@material-ui/styles';
import React from 'react'

const useStyles = makeStyles(theme => ({

    labelColor: {
        color: theme.palette.secondary.main,
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

        }
    },


}))

export default function RadioGroup(props) {
    const { name, label, value, onChange, items, defaultValue } = props;
    const classes = useStyles();

    return (
        <FormControl>
            <FormLabel className={classes.labelColor} focused={false}>{label}</FormLabel>
            <MuiRadioGroup
                row={true}
                name={name}
                value={value}
                onChange={onChange}
                defaultValue={defaultValue? defaultValue: 'male'}
            >
                {
                    items.map((item, index) => (
                        <FormControlLabel className={classes.labelColor} key={item.id} value={item.title} control={<Radio />} label={item.title} />
                    ))
                }

            </MuiRadioGroup>

        </FormControl>
    )
}
