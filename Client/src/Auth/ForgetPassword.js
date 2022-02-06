
import { Grid, makeStyles, Paper,CssBaseline } from '@material-ui/core';
import React from 'react';
import { Controls } from '../resuableComponents/Controls';
import { UseForm, Form } from '../resuableComponents/useForm';


const useStyles = makeStyles(theme => ({
    body: {
        padding: 0,
        margin: 0
    },
    root: {
        display: 'flex',
        flexWrap: 'wrap',
        '& > *': {
            margin: 'theme.spacing(1)',
            width: "100%",
            maxheight: "1000px",

        },
        maxWidth: '100%',
        alignItems: 'center',
        margin: 0,
        padding: 0,
        height: '750px',
        background: theme.palette.primary.main,

    },
    container: {
        padding: 0,
        margin: 0,
        justifyContent: 'center'
    },
    paper: {
        background: theme.palette.primary.main,
        height: '500px',
        alignItems: 'center !important',
        justifyContent: 'center',
        display: 'inherit',
        flexDirection: 'column',
        maring: 0,
        paddding: 0
    },
    Input: {
        width: '400px !important',
        "& .MuiOutlinedInput-root .MuiOutlinedInput-notchedOutline": {
            borderColor: theme.palette.secondary.main,
            color: 'green'
        },
        '& .Mui-focused': {
            color: theme.palette.secondary.main,
        },
        '& .MuiIconButton-root': {
            color: theme.palette.secondary.main
        }
    },
    floatingLabelFocusStyle: {
        color: theme.palette.secondary.main,
    },
    inputInterior: {
        color: theme.palette.secondary.main,
    },
    newButton: {
        width: '200px',
        background: theme.palette.secondary.main,
        color: '#488C52',
        '&:hover': {
            background: '#488C52',
            color: theme.palette.secondary.main
        },
    },

    form: {
        width: '100%', // Fix IE 11 issue.
        marginTop: theme.spacing(1),
    },
    avatar: {
        margin: theme.spacing(1),
        backgroundColor: theme.palette.secondary.main,
    },

    typo: {
        color: theme.palette.secondary.main,
        '&:hover': {
            cursor: 'pointer',
            color: '#488C52'
        },
    }
}))


const initialFValues = {
    email: "",
    password: "",
}


export const getRoleCollettion = (data) => (
    data
)


const ForgetPassword = (props) => {

    const classes = useStyles();
    const validate = (fieldValues = values) => {

        let temp = { ...error }
         
        if ('email' in fieldValues)
            temp.email = (/^[a-zA-Z0-9]+@[a-zA-Z0-9]+\.[A-Za-z]+$/).test(fieldValues.email) ? "" : "Email is not valid"
        setError({ ...temp })

        if (fieldValues === values)
            return Object.values(temp).every(x => x === "")
    }

    const {
        values,
        error,
        setError,
        handleInputChange } = UseForm(initialFValues, true, validate);


    const handleSubmit = async e => {
        e.preventDefault()

        if (validate()) {

        }
    }
 
    return (
       <div className={classes.root}>
           <CssBaseline/>
                    <Paper className={classes.paper}  >

                        <Form onSubmit={(e) => handleSubmit(e)}>


                            <Grid container>

                                <Controls.Input
                                    autoComplete="off"
                                    name="email"
                                    label="Email"
                                    value={values.email}
                                    onChange={handleInputChange}
                                    error={error.email}
                                    className={classes.Input}
                                    InputLabelProps={{
                                        className: classes.floatingLabelFocusStyle,
                                    }}
                                    InputProps={{
                                        autoComplete: 'off',
                                        className: classes.inputInterior
                                    }}
                                    type="text"
                                />
                            </Grid>
                            <Grid container
                                spacing={0}
                                direction="column"
                                alignItems="center"
                                justify="center"
                            >
                                <Grid item xs={12} style={{ alignItems: 'center', justifyContent: 'center' }}>
                                    <Controls.Button
                                        variant="contained"
                                        color="primary"
                                        size="large"
                                        text="Request Email"
                                        type="submit"
                                        className={classes.newButton}
                                    />
                                </Grid>
                            </Grid>
                        </Form>
                    </Paper>
                </div> 
    );
};

// function Copyright() {
//     return (
//         <Typography variant="body2" color="textSecondary" align="center">
//             {'Copyright © '}
//             <Link color="inherit" href="https://material-ui.com/">
//                 Your Website
//         </Link>{' '}
//             {new Date().getFullYear()}
//             {'.'}
//         </Typography>
//     );
// }
export default ForgetPassword;