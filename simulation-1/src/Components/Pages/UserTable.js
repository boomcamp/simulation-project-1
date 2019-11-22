import React,{useState} from 'react'

import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TablePagination from '@material-ui/core/TablePagination';
import TableRow from '@material-ui/core/TableRow';

import axios from 'axios';


const columns = [
    {id: 'username', label: 'User Name', minWidth: 170},
    {id: 'firstName', label: 'First Name', minWidth: 170},
    {id: 'lastName', label: 'Last Name', minWidth: 170},
    {id: 'email', label: 'Email', minWidth: 170},
    {id: 'active', label: 'Active', minWidth: 170},
    {id: 'action', label: 'Action', minWidth: 170},
];

const useStyles = makeStyles({
    root: {
      width: '100%',
    },
    tableWrapper: {
      maxHeight: 440,
      overflow: 'auto',
    },
  });



export default function UserTable() {

    const classes = useStyles();
    const [page, setPage] = React.useState(0);
    const [rowsPerPage, setRowsPerPage] = React.useState(10);
    const [rowdata ,  setRowData] = useState([]);

  
    const handleChangePage = (event, newPage) => {
      setPage(newPage);
    };
  
    const handleChangeRowsPerPage = event => {
      setRowsPerPage(+event.target.value);
      setPage(0);
    };


    function GetData(){
        return axios.get('http://localhost:3000/users',{
            headers: {Authorization: `Bearer ${localStorage.getItem('Token')}`}
        })
        .then(data=>{

            // console.log(data);

            return setRowData(data.data);
        })
        .catch(e=>{
            console.warn(e);
        })
    }
    
    GetData();

    // console.log(rowdata);

    return (
        <Paper>
            <div>
                <Table stickyHeader aria-label="sticky table" >
                    <TableHead>
                        <TableRow>
                        {columns.map(column => (
                            <TableCell
                            key={column.id}
                            align={column.align}
                            style={{ minWidth: column.minWidth }}
                            >
                            {column.label}
                            </TableCell>
                        ))}
                        </TableRow>
                    </TableHead>
                        {rowdata.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map(row => {
                            return (
                            <TableRow hover role="checkbox" tabIndex={-1} key={row.code}>
                                {columns.map(column => {
                                const value = row[column.id];
                                
                                return (
                                    <TableCell key={column.id} align={column.align}>
                                    {column.format && typeof value === 'number' ? column.format(value) : value}

                                    {column.id === 'active' ? (value ?'active':'not'):''}

                                    </TableCell>
                                );
                                })}
                            </TableRow>
                            );
                        })}
                    <TableBody>
                            
                    </TableBody>
                </Table>
            </div>

            <TablePagination
                rowsPerPageOptions={[10, 25, 100]}
                component="div"
                count={rowdata.length}
                rowsPerPage={rowsPerPage}
                page={page}
                backIconButtonProps={{
                'aria-label': 'previous page',
                }}
                nextIconButtonProps={{
                'aria-label': 'next page',
                }}
                onChangePage={handleChangePage}
                onChangeRowsPerPage={handleChangeRowsPerPage}
            />
        </Paper>
    )
}
