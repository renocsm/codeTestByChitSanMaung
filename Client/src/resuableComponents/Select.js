import { FormControl, FormHelperText, InputLabel, MenuItem, Select as MuiSelect } from '@material-ui/core';
import { makeStyles } from '@material-ui/styles';
import React from 'react'


const useStyles = makeStyles(theme => ({
    root:{
        width:'75%',
        "& .MuiOutlinedInput-root .MuiOutlinedInput-notchedOutline": {
            borderColor: theme.palette.secondary.main,
            color: theme.palette.secondary.main,
           
        },
        "& .MuiSelect-select": {
            color: theme.palette.secondary.main,
        },
        '& .MuiSvgIcon-root': {
            fill: theme.palette.secondary.main
        },
        
    },
    select: { 
       
        "& ul": {
            backgroundColor: theme.palette.secondary.main,
            color:theme.palette.primary.main
        },
        "& li": {
            fontSize: 15,
        },
        
    },
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
}));

    


export default function Select(props) {

    const { name, label, value, onChange, options, error = null,acceptValue } = props;
    const classes = useStyles();

    return (
        <FormControl variant="outlined" className={classes.root}   {...(error ? { error: true, helperText: error } : { helperText: '' })}>
            <InputLabel className={classes.labelColor} focused={false}>{label}</InputLabel>
            <MuiSelect
                label={label}
                name={name}
                value={value}
                onChange={onChange}
                MenuProps={{ classes: { paper: classes.select } }}
                className={classes.select}
            >
                <MenuItem value="None"></MenuItem>
                {
                    options.map(item => (
                        <MenuItem key={item.id} value={acceptValue?item.id:item.title}>{item.title}</MenuItem>
                    ))
                }
            </MuiSelect>
            {error ? <FormHelperText>{error}</FormHelperText> : <></>}
        </FormControl>
    )
}
