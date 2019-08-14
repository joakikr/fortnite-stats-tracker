import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import StyledTableCell from '../StyledTableCell/StyledTableCell';

const useStyles = makeStyles(theme => ({
    root: {
        width: '100%',
        overflowX: 'auto',
        maxHeight: '300px',
        overflowY: 'scroll'
    }
}));

const headRows = [
    { id: 'date', label: 'Date', isNumeric: false },
    { id: 'matches', label: 'Matches', isNumeric: true },
    { id: 'wins', label: 'Kills', isNumeric: true },
    { id: 'win_percentage', label: 'Dubs', isNumeric: true },
    { id: 'kills', label: 'Time', isNumeric: true }
];

const RecentMatchesTable = ({ rows }) => {
    const classes = useStyles();

    return (
        <Paper square className={classes.root}>
            <Table className={classes.table}>
                <TableHead>
                    <TableRow>
                        {headRows.map(row => (
                            <StyledTableCell
                                key={row.id}
                                align={row.isNumeric ? 'right' : 'left'}
                            >
                                {row.label}
                            </StyledTableCell>
                        ))}
                    </TableRow>
                </TableHead>
                <TableBody>
                    {rows.map(row => (
                        <TableRow key={row.id}>
                            <StyledTableCell>
                                {row.date}
                            </StyledTableCell>
                            <StyledTableCell align="right">
                                {row.matches}
                            </StyledTableCell>
                            <StyledTableCell align="right">
                                {row.kills}
                            </StyledTableCell>
                            <StyledTableCell align="right">
                                {row.dubs}
                            </StyledTableCell>
                            <StyledTableCell align="right">
                                {row.minutes}
                            </StyledTableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </Paper>
    );
};

export default RecentMatchesTable;