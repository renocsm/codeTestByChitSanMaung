import { makeStyles, Table, TableCell, TableHead, TablePagination, TableRow, TableSortLabel } from '@material-ui/core'
import React, { useState } from 'react'


const useStyles = makeStyles((theme) => ({

    table: {
        color: 'white',
        marginTop: theme.spacing(3),
        '& thead th': {
            fontWeight: '600',
            color: theme.palette.secondary.main,
            background: theme.palette.primary.light,
        },
        '& tbody td': {
            fontWeight: '300',
        },
        '& tbody tr:hover': {
            background: '#fffbf2',
            cursor: 'pointer'
        },


    },
    tableCell: {

        color: theme.palette.secondary.main,
        fontSize:'16px',
        fontWeight:'500px', 
        height:'100px',
        textAlign:'left',
        '&:hover': {
            color: '#488C52',
        },
        '& .MuiTableSortLabel-root': {
            '&:hover': {
                color: '#488C52',
            },
        },
        '& .MuiTableSortLabel-active': {
            color: '#488C52'
        },
        '& .MuiTableSortLabel-iconDirectionDesc': {
            
            color: '#488C52 !important'
        },
        '& .MuiTableSortLabel-iconDirectionAsc': {

            color: '#488C52 !important'
        },
        borderColor:'#488C52 !important',
        borderWidth: '3px !important'
    },
    TblPagination:{
        color:theme.palette.secondary.main,
        fontSize:'15px'
    }
}))

export default function UseTable(records, headCells, filterFn) {
 
    const classes = useStyles();
    const pages = [5, 10, 15]
    const [page, setPage] = useState(0)
    const [rowPerPage, setRowPerPage] = useState(pages[page])
    const [order, setOrder] = useState()
    const [orderBy, setOrderBy] = useState()

    const TblContainer = props => (
        <Table className={classes.table}>
            {
                props.children
            }
        </Table>
    )

    const TblHead = props => {

        const handleSortRequest = id => {
            const isAsc = orderBy === id && order === "asc";
            setOrder(isAsc ? 'desc' : 'asc')
            setOrderBy(id)
        }

        return (
            <TableHead className={classes.table}>
                <TableRow>

                    {
                        headCells.map((head, index) => (
                            <TableCell key={index} sortDirection={orderBy === head.id ? order : false} className={classes.tableCell}>
                                {
                                    head.disableSorting ? head.label :

                                        <TableSortLabel
                                            direction={orderBy === head.id ? order : 'asc'}
                                            active={orderBy === head.id}
                                            onClick={() => { handleSortRequest(head.id) }}>
                                            {head.label}
                                        </TableSortLabel>
                                }

                            </TableCell>
                        ))
                    }

                </TableRow>
            </TableHead>
        )
    }

    const handleChangePage = (event, newPage) => {
        setPage(newPage)
    }

    const handleChangeRowPerPage = event => {
        setRowPerPage(parseInt(event.target.value, 10))
        setPage(0)
    }


    function stableSort(array, comparator) {
        const stabilizedThis = array.map((el, index) => [el, index]);
        stabilizedThis.sort((a, b) => {
            const order = comparator(a[0], b[0]);
            if (order !== 0) return order;
            return a[1] - b[1];
        });
        return stabilizedThis.map((el) => el[0]);
    }

    function getComparator(order, orderBy) {
        return order === 'desc'
            ? (a, b) => descendingComparator(a, b, orderBy)
            : (a, b) => -descendingComparator(a, b, orderBy);
    }

    function descendingComparator(a, b, orderBy) {
        if (b[orderBy] < a[orderBy]) {
            return -1;
        }
        if (b[orderBy] > a[orderBy]) {
            return 1;
        }
        return 0;
    }

    const recordAfterPagingAndSorting = () => {
        return stableSort(filterFn.fn(records), getComparator(order, orderBy)).slice(page * rowPerPage, (page + 1) * rowPerPage)
    }

    const TblPagination = () => (
        <TablePagination
            component="div"
            rowsPerPageOptions={pages}
            count={records.length}
            rowsPerPage={rowPerPage}
            page={page}
            onChangePage={handleChangePage}
            onChangeRowsPerPage={handleChangeRowPerPage}
            className={classes.TblPagination}
        />
    )

    return {
        TblContainer,
        TblHead,
        TblPagination,
        recordAfterPagingAndSorting
    }
}
