import { Grid, makeStyles, Paper } from '@material-ui/core';
import React from 'react';
import { Controls } from '../../../resuableComponents/Controls';
import { postData, } from '../../../API/API'
import { useHistory } from 'react-router-dom';

// reuseable component
import { UseForm, Form } from '../../../resuableComponents/useForm';
import Divider from '../../../resuableComponents/Divider'

const useStyles = makeStyles(theme => ({
    root: {
        display: 'flex',
        flexWrap: 'wrap',
        '& > *': {
            margin: 'theme.spacing(1)',
            width: "100%",
            maxheight: "500px",

        },
        maxWidth: '100%'
    },
    container: {
        padding: 0,
        margin: 0,
        justifyContent: 'center'
    },
    paper: {
        background: theme.palette.primary.main,
        marginTop: '10px',
        height: '500px',
        [theme.breakpoints.down('sm')]: {
            height: '700px',

        }
    },
    Input: {
        width: '75%',
        "& .MuiOutlinedInput-root .MuiOutlinedInput-notchedOutline": {
            borderColor: theme.palette.secondary.main,
            color: 'green'
        },
        '& .Mui-focused': {

            color: theme.palette.secondary.main,
        },
    },
    floatingLabelFocusStyle: {
        color: theme.palette.secondary.main,
    },
    inputInterior: {
        color: theme.palette.secondary.main,
    },
    newButton: {

        background: theme.palette.secondary.main,
        color: '#488C52',
        '&:hover': {
            background: '#488C52',
            color: theme.palette.secondary.main
        },
    },
    resetButton: {

        background: theme.palette.secondary.main,
        color: '#ff5f00',
        '&:hover': {
            background: '#ff5f00',
            color: theme.palette.secondary.main
        },
    },
}))


const initialFValues = {
    roleType: "",
}


export const getRoleCollettion = (data) => (
    data
)


const AddNewEmployeeRole = (props) => {

    const classes = useStyles();
    const history = useHistory();


    const validate = (fieldValues = values) => {

        let temp = { ...error }
        if ('roleType' in fieldValues)
            temp.roleType = fieldValues.roleType ? "" : "This Field is required"

        setError({ ...temp })

        if (fieldValues === values)
            return Object.values(temp).every(x => x === "")
    }

    const {
        values,
        error,
        setError,
        handleInputChange, resetForm } = UseForm(initialFValues, true, validate);


    const handleSubmit = async e => {
        e.preventDefault()

        if (validate()) {
            // eslint-disable-next-line 
            let res = await postData('Employee/AddNewRole', {
                "roleType": values.roleType
            })
            if (res.ok) {
                alert(res.message)
                history.push('/masterdata/employeerole');
                resetForm();
            } else {
                alert(res.message)
            }
        }
    }


    return (
        <>
            <Divider text={'MasterData/AddNewEmployeeRole'} />
            <Paper className={classes.paper} elevation={3}>
                <Form onSubmit={(e) => handleSubmit(e)}>
                    <Grid container>
                        <Grid item container md={6} xs={12}>
                            <Controls.Input
                                name="roleType"
                                label="Role Name"
                                value={values.roleType}
                                onChange={handleInputChange}
                                error={error.roleType}
                                className={classes.Input}
                                InputLabelProps={{
                                    className: classes.floatingLabelFocusStyle,
                                }}
                                InputProps={{
                                    className: classes.inputInterior
                                }}
                            />
                        </Grid>
                        <Grid item container style={{ marginLeft: 5 }}>
                            <div>
                                <Controls.Button
                                    variant="contained"
                                    color="primary"
                                    size="large"
                                    text="Submit"
                                    type="submit"
                                    className={classes.newButton}
                                />
                                <Controls.Button
                                    variant="contained"
                                    color="default"
                                    size="large"
                                    text="Reset"
                                    onClick={resetForm}
                                    className={classes.resetButton}
                                />
                            </div>
                        </Grid>
                    </Grid>
                </Form>
            </Paper>
        </>

    );
};

export default AddNewEmployeeRole;