
import { Grid, InputAdornment, Table, TableBody, TableCell, TableRow, Tooltip, IconButton, TableContainer,Paper } from '@material-ui/core'
import { makeStyles } from '@material-ui/styles'
import React, { useState, useEffect } from 'react'
import { Controls } from '../../resuableComponents/Controls'
import { Add, DeleteForever, EditOutlined, MoreHoriz, Search } from '@material-ui/icons'
import { Link } from 'react-router-dom'
import { getData, postData } from '../../API/API'
import { Typography } from '@material-ui/core'

// router dom 
import { useHistory } from 'react-router-dom';


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

const WorkerList = (props) => {

    const history = useHistory();
    const [loading, setLoading] = useState(false);

    const headCells = [
        { id: 'fullName', label: ' Name' },

        { id: 'mobile', label: 'Phone Number' },
        { id: 'nrc', label: 'NRC' },
        { id: 'gender', label: 'Gender' },
        { id: 'DOB', label: 'Date Of Birth' },
        { id: 'role', label: 'Role', },
        { id: 'actions', label: 'Actions', disableSorting: true }
    ]

    const [employees, setEmployees] = useState([])
    // eslint-disable-next-line
    const [filterFn, setFilterFn] = useState({ fn: items => { return items } })
    const classes = useStyles();
    const [deleteEmployeeId, setDeleteEmployeeId] = useState(0);


    useEffect(() => {
        setLoading(true)
        const getEmployees = async () => {
            const res = await getData('EVoucher/GetAllEVoucherList')
             console.log(res)
            setLoading(false)
        }
        getEmployees();
    }, [deleteEmployeeId]);

    const { TblHead, TblPagination, recordAfterPagingAndSorting } = UseTable(employees, headCells, filterFn);

    const handleSearch = e => {

        let target = e.target;

        setFilterFn({
            fn: items => {

                if (target.value === "")
                    return items
                else
                    return items.filter(x =>
                        x.name.toString().toLowerCase().indexOf(target.value.toLowerCase()) !== -1 ||
                        x.email.toString().toLowerCase().indexOf(target.value.toLowerCase()) !== -1 ||
                        x.phoneNumber.toString().toLowerCase().indexOf(target.value.toLowerCase()) !== -1 ||
                        x.nrc.toString().toLowerCase().indexOf(target.value.toLowerCase()) !== -1 ||
                        x.role.toString().toLowerCase().indexOf(target.value.toLowerCase()) !== -1 ||
                        x.gender.toString().toLowerCase().indexOf(target.value.toLowerCase()) !== -1 ||
                        x.birthdate.toString().toLowerCase().indexOf(target.value.toLowerCase()) !== -1
                    )
            }
        })
    }

    const DeleteEmployee = async employeeId => {

        let res = await postData('MKEmployee/DeleteEmployee', {
            "Employee_ID": employeeId,
        })
        if (res.ok) {
            alert(res.message)
            setDeleteEmployeeId(employeeId)
        } else {
            alert(res.message)
        }
    }

    const WorkerDetail = async employeeId => {
        history.push(`/home/WorkerDetails/${employeeId}`)
    }

    return (
        <Grid container direction="column" style={{ display: 'flex' }}>

            <Grid item container className={classes.container} direction="column">

                <Grid item >
                    <Divider text={'Dashboard/WorkerList'} />
                </Grid>

                <Grid item container direction="row" style={{ display: 'flex' }}>
                    <Grid item xs={12} sm={12} md={8} lg={9}>
                        <Controls.Input
                            className={classes.searchInput}
                            InputProps={{
                                startAdornment: (<InputAdornment position="start"><Search style={{color:'#488C52'}} /></InputAdornment>),
                                className: classes.searchInterior
                            }}
                            InputLabelProps={{
                                className: classes.floatingLabelFocusStyle,
                            }}
                            label='Search'
                            onChange={handleSearch}
                        ></Controls.Input>
                    </Grid>

                    <Grid item xs={12} sm={12} md={4} lg={3}>
                        <Controls.Button
                            text="Add New"
                            variant="outlined"
                            startIcon={<Add />}
                            className={classes.newButton}
                            component={Link}
                            to={'/home/addNewWorkers'}

                        />
                    </Grid>
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
                                                employees.length <= 0 ? (<>
                                                    <Typography variant="h6" color="secondary" style={{ marginTop: '20px' }}>
                                                        No User To Show
                                                    </Typography>
                                                </>) : (
                                                    recordAfterPagingAndSorting().map((item, index) => (
                                                        <TableRow key={index} classes={{ root: index === 0 || index % 2 === 0 ? classes.tableRowBy2 : classes.tableRow }} >
                                                            <TableCell className={classes.tableCell} >{item.name}</TableCell>

                                                            <TableCell className={classes.tableCell} >{item.phoneNumber}</TableCell>
                                                            <TableCell className={classes.tableCell}>{item.nrc}</TableCell>
                                                            <TableCell className={classes.tableCell}>{item.gender}</TableCell>
                                                            <TableCell className={classes.tableCell}>{convertUTCDateToLocalDate(item.birthdate)}</TableCell>
                                                            <TableCell className={classes.tableCell}>{item.role}</TableCell>
                                                            <TableCell style={{ width: 200 }}>

                                                                <Tooltip title="Edit" arrow>
                                                                    <IconButton color="secondary" size="small" component={Link}
                                                                        to={`/home/EditWorker/${item.employee_ID}`} >
                                                                        <EditOutlined fontSize="small" color="inherit" />
                                                                    </IconButton>
                                                                </Tooltip>

                                                                <Tooltip title="Delete" arrow>
                                                                    <IconButton color="primary" size="small"
                                                                        onClick={() => { DeleteEmployee(item.employee_ID) }}>
                                                                        <DeleteForever fontSize="small" color="error" />
                                                                    </IconButton>
                                                                </Tooltip>

                                                                <Tooltip title="Detail" arrow >
                                                                    <IconButton color="secondary" size="small"
                                                                        onClick={() => { WorkerDetail(item.employee_ID) }}>
                                                                        <MoreHoriz fontSize="small" color="inherit" />
                                                                    </IconButton>
                                                                </Tooltip>

                                                            </TableCell>
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
export default WorkerList;