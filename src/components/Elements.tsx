import React from 'react';
import { styled } from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import styles from '../App.module.scss';

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
    borderRight: 'none',
    borderLeft: 'none',
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  '&:nth-of-type(odd)': {
    backgroundColor: theme.palette.action.hover,
  },
  // hide last border
  '&:last-child td, &:last-child th': {
    border: 0,
  },
}));

const StyledTableHead = styled(TableHead)(({ theme }) => ({
  backgroundColor: '#2D416F',
}));

function createData(
  name: string,
  calories: number,
  fat: number,
  carbs: number,
  protein: number
) {
  return { name, calories, fat, carbs, protein };
}

const rows = [
  createData('Frozen yoghurt', 159, 6.0, 24, 4.0),
  createData('Ice cream sandwich', 237, 9.0, 37, 4.3),
  createData('Eclair', 262, 16.0, 24, 6.0),
  createData('Cupcake', 305, 3.7, 67, 4.3),
  createData('Gingerbread', 356, 16.0, 49, 3.9),
];

export default function Elements() {
  return (
    <div className={`${styles.contentWrapper} ${styles.elementWrapper}`}>
      <p className={styles.breadcrumbText}>
        Payroll Management <span className={styles.breadcrumb}>{'>'} </span>{' '}
        Elements setup <span className={styles.breadcrumb}>{'>'}</span> Elements
      </p>
      <div className={styles.elementWrapper__elementContainer}>
        <h3>Elements</h3>
        <div className={styles.elementWrapper__elementManagement}>
          <button>Create Element +</button>
          <button className={styles.elementWrapper__createButton}>
            Create Element +
          </button>
        </div>
        <div className={styles.elementWrapper__dataTable}>
          <TableContainer component={Paper}>
            <Table sx={{ minWidth: 700 }} aria-label='customized table'>
              <StyledTableHead>
                <TableRow>
                  <StyledTableCell>Name</StyledTableCell>
                  <StyledTableCell align='right'>
                    Element Category
                  </StyledTableCell>
                  <StyledTableCell align='right'>
                    Element Classification
                  </StyledTableCell>
                  <StyledTableCell align='right'>Status</StyledTableCell>
                  <StyledTableCell align='right'>
                    Date & Time Modified
                  </StyledTableCell>
                  <StyledTableCell align='right'>Modified By</StyledTableCell>
                  <StyledTableCell align='right'>Action</StyledTableCell>
                </TableRow>
              </StyledTableHead>
              <TableBody>
                {rows.map((row) => (
                  <StyledTableRow key={row.name}>
                    <StyledTableCell component='th' scope='row'>
                      {row.name}
                    </StyledTableCell>
                    <StyledTableCell align='right'>
                      {row.calories}
                    </StyledTableCell>
                    <StyledTableCell align='right'>{row.fat}</StyledTableCell>
                    <StyledTableCell align='right'>{row.carbs}</StyledTableCell>
                    <StyledTableCell align='right'>
                      {row.protein}
                    </StyledTableCell>
                    <StyledTableCell align='right'>
                      {row.protein}
                    </StyledTableCell>
                    <StyledTableCell align='right'>
                      {row.protein}
                    </StyledTableCell>
                  </StyledTableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </div>
      </div>
    </div>
  );
}
