
import { Grid, InputAdornment, Table, TableBody, TableCell, TableRow, Tooltip, IconButton, TableContainer, Paper } from '@material-ui/core'
import { makeStyles } from '@material-ui/styles'
import React, { useState, useEffect } from 'react'
import { Controls } from '../../../resuableComponents/Controls'
import { Add, DeleteForever, EditOutlined, Search } from '@material-ui/icons'
import { Link } from 'react-router-dom'
import { getData, postData } from '../../../API/API'
import { Typography } from '@material-ui/core'
 

//reuseable components 
import UseTable from '../../../resuableComponents/UseTable'
import Loading from '../../../resuableComponents/Loading'
import Divider from '../../../resuableComponents/Divider'


//Universal
import  convertUTCDateToLocalDate  from '../../../Universal/DateTime'

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

const RoleList = (props) => {

     
    const [loading, setLoading] = useState(false);

    const headCells = [
        { id: 'roleType', label: 'Role Type' },
        {id: 'createDate',label : 'Created Date (MM/DD/YY)'},
        { id: 'actions', label: 'Actions', disableSorting: true }
    ]

    const [employeeRoles, setEmployeeRoles] = useState([])
    // eslint-disable-next-line
    const [filterFn, setFilterFn] = useState({ fn: items => { return items } })
    const classes = useStyles();
    const [deleteEmployeeRoleId, setDeleteEmployeeRoleId] = useState(0);


    useEffect(() => {
        setLoading(true)
        const getEmployeesRoles = async () => {
            const res = await getData('Employee/GetRole')
            if (res.ok) {
                setEmployeeRoles(res.data.reverse())
            }
            setLoading(false)
        }
        getEmployeesRoles();
    }, [deleteEmployeeRoleId]);

    const { TblHead, TblPagination, recordAfterPagingAndSorting } = UseTable(employeeRoles, headCells, filterFn);

    const handleSearch = e => {

        let target = e.target;

        setFilterFn({
            fn: items => {

                if (target.value === "")
                    return items
                else
                    return items.filter(x =>
                        x.roleType.toString().toLowerCase().indexOf(target.value.toLowerCase()) !== -1
                    )
            }
        })
    }

    const DeleteEmployeeRole = async employeeRoleId => {

        let res = await postData('Employee/DeleteEmployeeRole', {
            "roleId": employeeRoleId
        })
        if (res.ok) {
            alert(res.message)
            setDeleteEmployeeRoleId(employeeRoleId)
        } else {
            alert(res.message)
        }
    }

    return (
        <Grid container direction="column" style={{ display: 'flex' }}>

            <Grid item container className={classes.container} direction="column">

                <Grid item >
                    <Divider text={'MasterData/EmployeeRole'} />
                </Grid>

                <Grid item container direction="row" style={{ display: 'flex' }}>
                    <Grid item xs={12} sm={12} md={8} lg={9}>
                        <Controls.Input
                            className={classes.searchInput}
                            InputProps={{
                                startAdornment: (<InputAdornment position="start"> <Search color={'#488C52'} /> </InputAdornment>),
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
                            to={'/masterdata/addemployeerole'}

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
                                                employeeRoles.length <= 0 ? (<>
                                                    <Typography variant="h6" color="secondary" 
                                                    style={{ marginTop: '20px', marginLeft:'12px',color:'red' }}>
                                                        No Employee Role To Show
                                                    </Typography>
                                                </>) : (
                                                    recordAfterPagingAndSorting().map((item, index) => (
                                                        <TableRow key={index} classes={{ root: index === 0 || index % 2 === 0 ? classes.tableRowBy2 : classes.tableRow }} >

                                                            <TableCell className={classes.tableCell}> {item.roleType} </TableCell>
                                                            <TableCell className={classes.tableCell}> {convertUTCDateToLocalDate(item.createDate)} </TableCell>
                                                            <TableCell style={{ width: 200, alignContent: 'flex-end' }}>

                                                                <Tooltip title="Edit" arrow>
                                                                    <IconButton color="secondary" size="small" component={Link}
                                                                        to={`/masterdata/EditRole/${item.roleId}`} >
                                                                         <EditOutlined fontSize="small" color="inherit" />
                                                                    </IconButton>
                                                                </Tooltip>

                                                                <Tooltip title="Delete" arrow>
                                                                    <IconButton color="primary" size="small"
                                                                        onClick={() => { DeleteEmployeeRole(item.roleId) }}>
                                                                        <DeleteForever fontSize="small" color="error" />
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
export default RoleList;