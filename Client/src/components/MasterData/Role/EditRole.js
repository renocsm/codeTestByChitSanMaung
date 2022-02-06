import { Grid, makeStyles, Paper } from '@material-ui/core';
import React, { useState, useEffect } from 'react';
import { UseForm, Form } from '../../../resuableComponents/useForm';
import { postData } from '../../../API/API'

import { Controls } from '../../../resuableComponents/Controls';
import Divider from '../../../resuableComponents/Divider'
// router dom 
import { useHistory } from 'react-router-dom'; 

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
        height: '500px'
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


export const getRoleCollettion = (data) => (
    data
)
const EditRole = (props) => {

    const classes = useStyles();
    const history = useHistory();
 
 
    // eslint-disable-next-line
    const [roleId, setRoleId] = useState(props.match.params.id)
    const [initialFValues, setInitialFValues] = useState({
        roleType: "",
    })

     

    const validate = (fieldValues = values) => {

        let temp = { ...error }
    
        if ('roleType' in fieldValues)
            temp.roleType = fieldValues.roleType ? "" : "This Field is required"
       
        setError({ ...temp })

        if (fieldValues === values)
            return Object.values(temp).every(x => x === "")
    }



    useEffect(() => {
        const getRole = async () => {
            let res = await postData('Employee/GetRoleById', {
                "roleId": roleId
            })

            if (res.ok) {
                const roleInfo = res.data.data[0]
                console.log('role',roleInfo)
                setInitialFValues({
                    roleType: roleInfo.roleType,
                })
            }
        }
        getRole();
    }, [roleId]);

    const {
        values,
        error,
        setError,
        handleInputChange, resetForm } = UseForm(initialFValues, true, validate);

    const handleSubmit = async e => {
        e.preventDefault()
      
        if (validate()) {
            // eslint-disable-next-line
            let res = await postData('Employee/EditEmployeeRole', {
                "roleId": roleId,
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
        <div className={classes.root}> 
        <Divider text={'Dashboard/WorkerList/EditWorker'}/>
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
        </div>

    );
};

export default EditRole;