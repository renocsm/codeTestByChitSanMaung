import { makeStyles } from '@material-ui/core';
import React,{ useState,useEffect} from 'react'

export  const UseForm=(initialFValues,validateOnChange=false,validate)=> { 
     
    const [values, setValues] = useState(initialFValues);
    const [error, setError] = useState({}) 

    

    useEffect(() => {
        setValues(initialFValues)
    }, [initialFValues])
    
    const handleInputChange = e => {
        const { name, value } = e.target
        setValues({
            ...values,
            [name]: value
        })
        if(validateOnChange)
        validate({[name]:value})
    }

    const resetForm=()=>{
        setValues(initialFValues); 
        setError({})
    } 

     

    return { 
        values,
        setValues,
        error,
        setError,
        handleInputChange ,
        resetForm
    }
}
 


const useStyles = makeStyles(theme => (
    {
        root: {
            '& .MuiFormControl-root': {
                width: "80%",
                margin: theme.spacing(1)
            }
        }
    }
))

  export function Form (props) {

    const classes= useStyles();
    const {children,...other}=props;

    return (
        <form className={classes.root} autoComplete="off" {...other}>
                {props.children}
        </form>
    )
}

