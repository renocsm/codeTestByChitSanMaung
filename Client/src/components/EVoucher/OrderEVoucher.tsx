import { GetTokenLocalStorageForAuthorized } from '../../Stores/Storage.js'
import { Grid, makeStyles, Paper } from '@material-ui/core';
import React, { useState, useEffect } from 'react';
import { Controls } from '../../resuableComponents/Controls';
import { postData, getData } from '../../API/API'
 

// reuseable component
import { UseForm, Form } from '../../resuableComponents/useForm';
import Divider from '../../resuableComponents/Divider'
import axios from 'axios'
   
import {  useElements, useStripe, CardElement } from '@stripe/react-stripe-js';
 
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
        height: '600px',
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
    title: "",
    descrption: "",
    quantity: 1,
    accessPhoneNumber: "",
    orderDate: new Date(),
    paymentMethod: "Visa",
    imageUrl: "",
    giftToOther: false
}


export const getRoleCollettion = (data) => (
    data
)


const OrderEVoucher = (props) => {

    const classes = useStyles();
    // eslint-disable-next-line  
    const [genderItems, setGenderItems] = useState([])
    const history = useHistory();
        // eslint-disable-next-line  
    const [giftToOther, setGiftToOthr] = useState(false);
    const [roleItems, setRoleItems] = useState([
        { id: 1, title: 1 },
        { id: 2, title: 2 },
        { id: 3, title: 3 },
        { id: 4, title: 4 },
        { id: 5, title: 5 },
        { id: 6, title: 6 },
        { id: 7, title: 7 },
        { id: 8, title: 8 },
        { id: 9, title: 9 },
        { id: 10, title: 10 },
    ])
    const [phoneNumberOff, setPhoneNumberOff] = useState(true);

    const [totalAmount, setTotalAmount] = useState(0);
    const [picture, setPicture] = useState(null);

    const onChangePicture = e => {
        console.log('picture: ', picture);
        setPicture(e.target.files[0]);
    };

    useEffect(() => {
        const getGender = async () => {
            const res = await getData('Employee/GetGender')
            if (res.ok) {

                var temp = [];
                res.data.map((r, index) => temp.push({ id: r.genderId.toString(), title: r.genderType }))
                await setGenderItems(temp)
            }
        }
        const getRole = async () => {
            const resRole = await getData('Employee/GetRole')
            if (resRole.ok) {
                var tempRole = [];
                resRole.data.map((r, index) => tempRole.push({ id: r.roleId, title: r.roleType }))
                setRoleItems(tempRole)
            }
        }
        getGender();
        getRole();
    }, []);

    const validate = (fieldValues = values) => {

        let temp = { ...error }
        if ('title' in fieldValues)
            temp.title = fieldValues.title ? "" : "This Field is required"

        if ('accessPhoneNumbe' in fieldValues)
            temp.accessPhoneNumbe = fieldValues.accessPhoneNumbe.length > 9 ? "" : "This Field is required"
        if ('quantity' in fieldValues)
            temp.quantity = fieldValues.quantity.length !== 0 ? "" : "This Field is required"
        setError({ ...temp })

        if (fieldValues === values)
            return Object.values(temp).every(x => x === "")
    }

    const {
        values,
        error,
        setError,
        handleInputChange, resetForm } = UseForm(initialFValues, true, validate);

    useEffect(() => {
        const getTotal = async () => {
            setTotalAmount(values.quantity * 8)
        }

        getTotal();
    }, [values.quantity]);

    useEffect(() => {
        const giftCondition = async () => {

            setPhoneNumberOff(!values.giftToOther)
           
        }
        giftCondition();
    }, [values.giftToOther]);
 
     
    const stripe = useStripe();
    const elements = useElements();
    // eslint-disable-next-line  
    const [loading,setLoading] = useState(false);
    
    const handleSubmit = async e => {
        e.preventDefault()
     
        setLoading(true);
        let res = await postData('ticketOrder/GetPaymentData', {
            "quantity": values.quantity
        })
        
        
        if(res.ok){
            if (!stripe || !elements) return; // stripe not ready
            try{
                const cardElement = elements.getElement(CardElement);
                const paymentResult = await stripe.confirmCardPayment( res.data.data.clientSecret, {
                    payment_method: {
                        card: cardElement!,
                        billing_details: {
                            name: "Bob"
                        }
                    }
                });
            

                if(paymentResult.paymentIntent?.status === "succeeded"
                    ){
                        const formData = new FormData();
                        formData.append('Picture', picture);
                        formData.append('OrderDate', values.OrderDate);
                        formData.append('Quantity', values.quantity)
                        formData.append('AccessPhoneNumber', values.accessPhoneNumber)
                        formData.append('Title', values.title)
                        formData.append('Description', values.description)
                        formData.append('PaymentMethod', values.paymentMethod)
                        formData.append('VoucherType', values.giftToOther ? 'gift': 'own')
                        formData.append('paymentIntendId',res.data.data.id)
                        formData.append('clientSecret',res.data.data.clientSecret)
                        const token = GetTokenLocalStorageForAuthorized();
                        const result = await axios({
                            method: 'post', 
                            url: "https://localhost:44315/api/ticketOrder/buyTicket",
                            data: formData,
                            headers: {
                                'Accept': 'application/json',
                                'Content-Type': 'multipart/form-data',
                                'authorization': 'Bearer ' + token,
                                'cache-control': 'no-cache'
                            }
                        });

                        if(result.data.success){
                                setLoading(false)
                                alert('Order Successful')
                                history.push('/orderList');
                        }
                         
                    }else{
                        alert("Payment Uncessful")
                        console.log("payment Error")
                    }
            }catch{
                alert("Payment Uncessful")
                setLoading(false)
                 
            }
        }
        setLoading(false)

    }


    const CARD_OPTIONS = {
        iconStyle: "solid",
        style: {
            base: {
                iconColor: "#c4f0ff",
                color: "#fff",
                fontWeight: 500,
                fontFamily: "Roboto, Open Sans, Segoe UI, sans-serif",
                fontSize: "16px",
                fontSmoothing: "antialiased",
                ":-webkit-autofill": { color: "#fce883" },
                "::placeholder": { color: "#87bbfd" }
            },
            invalid: {
                iconColor: "#ffc7ee",
                color: "#ffc7ee"
            }
        }
    }

    return (

        <>
             
            <Divider text={'$8 Per Evoucher'} />
            <Paper className={classes.paper} elevation={3}>
                <Form onSubmit={(e) => handleSubmit(e)}>
                    <Grid container>

                        <Grid item container md={6} xs={12}>

                            <Controls.Input
                                name="totalAmount"
                                label="TotalAmount"
                                value={totalAmount ? totalAmount : 0}
                                onChange={handleInputChange}
                                error={error.totalAmount}
                                className={classes.Input}

                                InputLabelProps={{
                                    className: classes.floatingLabelFocusStyle,
                                }}
                                InputProps={{
                                    readOnly: true,
                                    className: classes.inputInterior
                                }}
                            />

                            <Controls.Input
                                name="title"
                                label="Title"
                                value={values.title}
                                onChange={handleInputChange}
                                error={error.title}
                                className={classes.Input}
                                InputLabelProps={{
                                    className: classes.floatingLabelFocusStyle,
                                }}
                                InputProps={{

                                    className: classes.inputInterior
                                }}
                            />


                            <Controls.Input
                                name="description"
                                label="Description"
                                value={values.Description}
                                onChange={handleInputChange}
                                error={error.description}
                                className={classes.Input}
                                InputLabelProps={{
                                    className: classes.floatingLabelFocusStyle,
                                }}
                                InputProps={{

                                    className: classes.inputInterior
                                }}
                            />

                            {
                                phoneNumberOff ?
                                    <></> : <Controls.Input
                                        type="tel"
                                        name="accessPhoneNumber"
                                        label="Phone Number"
                                        value={values.accessPhoneNumbe}
                                        onChange={handleInputChange}
                                        error={error.accessPhoneNumbe}
                                        className={classes.Input}
                                        InputLabelProps={{
                                            className: classes.floatingLabelFocusStyle,
                                        }}
                                        InputProps={{
                                            className: classes.inputInterior
                                        }}

                                    />
                            }
                            <Controls.Select
                                name="quantity"
                                label="Quantity"
                                value={values.quantity}
                                onChange={handleInputChange}
                                options={getRoleCollettion(roleItems)}
                                error={error.quantity}
                            />

                            <Controls.Checkbox
                                name="giftToOther"
                                label="Gift To Others"
                                value={values.giftToOther}
                                onChange={handleInputChange}
                            />

                            <div style={{marginTop:20,marginBottom:30}}>

                                <input
                                    type="file"
                                    //style={{ display: 'none' }}
                                    onChange={onChangePicture}
                                />
                            </div>
                        </Grid>

                    </Grid>
                    <Grid container>
                        <div style={{ width: 800 }}>
                            
                                <fieldset className="FormGroup">
                                    <div className="FormRow">
                                        <CardElement options={CARD_OPTIONS} />
                                    </div>
                                </fieldset>
                        </div>
                    </Grid>
                    <Grid container>
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
                </Form>
            </Paper>
        </>
    );
};

export default OrderEVoucher;