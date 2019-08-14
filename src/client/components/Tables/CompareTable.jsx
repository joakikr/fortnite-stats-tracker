import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import TableSortLabel from '@material-ui/core/TableSortLabel';
import Paper from '@material-ui/core/Paper';

import StyledTableCell from '../StyledTableCell/StyledTableCell';
import { sortStable, getSorting } from '../../utils';

const useStyles = makeStyles(theme => ({
    root: {
        width: '100%',
        overflowX: 'auto',
        maxHeight: '300px',
        overflowY: 'scroll'
    }
}));

const headRows = [
    { id: 'username', label: 'Username', isNumeric: false },
    { id: 'matches', label: 'Matches', isNumeric: true },
    { id: 'wins', label: 'Wins', isNumeric: true },
    { id: 'win_percentage', label: 'Win%', isNumeric: true },
    { id: 'kills', label: 'Kills', isNumeric: true },
    { id: 'kd', label: 'K/d', isNumeric: true }
];

const CompareTable = ({ rows }) => {
    const classes = useStyles();
    const [order, setOrder] = React.useState('asc');
    const [orderBy, setOrderBy] = React.useState('username');

    const handleRequestSort = property => {
        const isDesc = orderBy === property && order === 'desc';
        setOrder(isDesc ? 'asc' : 'desc');
        setOrderBy(property);
    };

    const createSortHandler = property => () => {
        handleRequestSort(property);
    };

    return (
        <Paper square className={classes.root}>
            <Table className={classes.table}>
                <TableHead>
                    <TableRow>
                        {headRows.map(row => (
                            <StyledTableCell
                                key={row.id}
                                align={row.isNumeric ? 'right' : 'left'}
                                sortDirection={
                                    orderBy === row.id ? order : false
                                }
                            >
                                <TableSortLabel
                                    active={orderBy === row.id}
                                    direction={order}
                                    onClick={createSortHandler(row.id)}
                                >
                                    {row.label}
                                </TableSortLabel>
                            </StyledTableCell>
                        ))}
                    </TableRow>
                </TableHead>
                <TableBody>
                    {sortStable(rows, getSorting(order, orderBy)).map(row => (
                        <TableRow key={row.username}>
                            <StyledTableCell>
                                {row.username}
                            </StyledTableCell>
                            <StyledTableCell align="right">
                                {row.matches}
                            </StyledTableCell>
                            <StyledTableCell align="right">
                                {row.wins}
                            </StyledTableCell>
                            <StyledTableCell align="right">
                                {row.win_percentage}
                            </StyledTableCell>
                            <StyledTableCell align="right">
                                {row.kills}
                            </StyledTableCell>
                            <StyledTableCell align="right">
                                {row.kd}
                            </StyledTableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </Paper>
    );
};

export default CompareTable;
