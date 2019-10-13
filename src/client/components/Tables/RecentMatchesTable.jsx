import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Box from '@material-ui/core/Box';
import StyledTableCell from '../StyledTableCell/StyledTableCell';

const useStyles = makeStyles(theme => ({
    root: {
        width: '100%'
    },
    table: {
        [theme.breakpoints.up('md')]: {
            minWidth: '500px'
        }
    }
}));

const headRows = [
    { id: 'type', label: 'Type', isNumeric: false },
    { id: 'matches', label: '#M', isNumeric: true },
    { id: 'kills', label: '#K', isNumeric: true },
    { id: 'wins', label: '#W', isNumeric: true },
    { id: 'time', label: '#min', isNumeric: true }
];

const RecentMatchesTable = ({ rows }) => {
    const classes = useStyles();

    return (
        <Box className={classes.root}>
            <Table size='small' className={classes.table}>
                <TableHead>
                    <TableRow>
                        {headRows.map(row => (
                            <StyledTableCell
                                grader='tableHeader'
                                key={row.id}
                                align={row.isNumeric ? 'right' : 'left'}
                            >
                                {row.label}
                            </StyledTableCell>
                        ))}
                    </TableRow>
                </TableHead>
                <TableBody>
                    {rows.map((row, index) => {
                        const grading = index % 2 === 0 ? 'low' : 'high'
                        return (
                            <TableRow key={row.id}>
                                <StyledTableCell grader='tableBody' grading={grading}>
                                    {row.type}
                                </StyledTableCell>
                                <StyledTableCell grader='tableBody' grading={grading} align="right">
                                    {row.matches}
                                </StyledTableCell>
                                <StyledTableCell grader='tableBody' grading={grading} align="right">
                                    {row.kills}
                                </StyledTableCell>
                                <StyledTableCell grader='tableBody' grading={grading} align="right">
                                    {row.wins}
                                </StyledTableCell>
                                <StyledTableCell grader='tableBody' grading={grading} align="right">
                                    {row.minutes}
                                </StyledTableCell>
                            </TableRow>
                        );
                    })}
                </TableBody>
            </Table>
        </Box>
    );
};

export default RecentMatchesTable;
