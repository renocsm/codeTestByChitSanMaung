
import { Grid, Table, TableBody, TableCell, TableRow,  TableContainer,Paper } from '@material-ui/core'
import { makeStyles } from '@material-ui/styles'
import React, { useState, useEffect } from 'react'
   
import { getData } from '../../API/API'
import { Typography } from '@material-ui/core'
 


//reuseable components 
import UseTable from '../../resuableComponents/UseTable'
import Loading from '../../resuableComponents/Loading'
import Divider from '../../resuableComponents/Divider'

//Universal
import  convertUTCDateToLocalDate  from '../../Universal/DateTime'


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
        background: '#1f2e40',
        marginTop: '10px',
        
    },
    searchInput: {
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
    searchInterior: {
        color: theme.palette.secondary.main,
    },
    newButton: {

        [theme.breakpoints.up("md")]: {
            position: 'absolute',
            right: '25px',
        },

        background: theme.palette.secondary.main,
        color: '#488C52',
        '&:hover': {
            background: '#488C52',
            color: theme.palette.secondary.main
        },
        fontSize: '100'
    },

    tableCell: {

        color: theme.palette.secondary.main,
        fontSize: '15px',
        alignItems: 'center',
        justifyContent: 'center',
        textAlign: 'left',
        width: 200,
        height: 80


    },
    tableRow: {
        background: theme.palette.primary.main,
        '&:hover': {
            background: '#151D29',
        },
    },
    tableRowBy2: {
        background: '#1E2A3A',
        '&:hover': {
            background: '#151D29',
        },
    },
    divider: {
        // Theme Color, or use css color in quote
        background: theme.palette.secondary.main,
        marginBottom: '10px'
    },
    tableContainer: {
        alignItems: "stretch",
        overflow: "Hidden"
    },



}))

const OrderList = (props) => {

   
    const [loading, setLoading] = useState(false);

    const headCells = [
        { id: 'OrderDate', label: ' Order Date' },

        { id: 'totalAmount', label: 'Total Amount ($)' },
        { id: 'quantity', label: 'Ticket Amount' },
        { id: 'OrderStatus', label: 'Order Status' },
       
    ]

    const [orders, setOrders] = useState([])
    // eslint-disable-next-line
    const [filterFn, setFilterFn] = useState({ fn: items => { return items } })
    const classes = useStyles();
  


    useEffect(() => {
        setLoading(true)
        const getOrder = async () => {
            const res = await getData('ticketOrder/GetAllTicket')
            if (res.ok) {
                setOrders(res.data.reverse())
            }
            setLoading(false)
        }
        getOrder();
    }, []);

    const { TblHead, TblPagination, recordAfterPagingAndSorting } = UseTable(orders, headCells, filterFn);
 
     

    return (
        <Grid container direction="column" style={{ display: 'flex' }}>

            <Grid item container className={classes.container} direction="column">

                <Grid item >
                    <Divider text={'Orders List'} />
                </Grid>

                 
            </Grid>

            <Grid item xs={12} md={12} className={classes.tableContainer} style={{ overflow: 'auto' }} >
                {
                    loading ?
                        <Loading /> : (
                           
                                
                                <Paper className={classes.paper} elevation={2}>
                                <TableContainer style={{ maxWidth: 'auto' }}>
                                    <Table>
                                        <TblHead />

                                        <TableBody>
                                            {
                                                orders.length <= 0 ? (<>
                                                    <Typography variant="h6" color="secondary" style={{ marginTop: '20px' }}>
                                                        No User To Show
                                                    </Typography>
                                                </>) : (
                                                    recordAfterPagingAndSorting().map((item, index) => (
                                                        <TableRow key={index} classes={{ root: index === 0 || index % 2 === 0 ? classes.tableRowBy2 : classes.tableRow }} >
                                                            <TableCell className={classes.tableCell} >{convertUTCDateToLocalDate(item.orderDate)}</TableCell>
                                                            <TableCell className={classes.tableCell} >$ {item.amount}</TableCell>
                                                            <TableCell className={classes.tableCell}>{item.quantity}</TableCell>
                                                            <TableCell className={classes.tableCell}>{item.orderStatus === 1 ? "successful": "peding"}</TableCell>
                                                             
                                                        </TableRow>
                                                    ))
                                                )
                                            }
                                        </TableBody>
                                    </Table>
                                </TableContainer>
                                <TblPagination />
                                </Paper>                            
                        )
                }
            </Grid>

        </Grid>
    )

}
export default OrderList;