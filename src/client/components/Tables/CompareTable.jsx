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

const grading = {
    'matches': (val) => {
        if (val < 1000) return 50;
        else if (val < 4000) return 100;
        else if (val < 8000) return 300;
        else if (val < 15000) return 400;
        else return 500;
    },
    'wins': (val) => {
        if (val < 500) return 50;
        else if (val < 1500) return 100;
        else if (val < 3500) return 300;
        else if (val < 7000) return 400;
        else return 500;
    },
    'win_percentage': (val) => {
        const withoutPercentage = parseFloat(val.split('%')[0]);
        if (withoutPercentage < 5) return 50;
        else if (withoutPercentage < 15) return 100;
        else if (withoutPercentage < 30) return 300;
        else if (withoutPercentage < 50) return 400;
        else return 500;
    },
    'kills': (val) => {
        if (val < 10000) return 50;
        else if (val < 20000) return 100;
        else if (val < 50000) return 300;
        else if (val < 100000) return 400;
        else return 500;
    },
    'kd': (val) => {
        if (val < 1) return 50;
        else if (val < 3) return 100;
        else if (val < 6) return 300;
        else if (val < 10) return 400;
        else return 500;
    },
}

const headRows = [
    { id: 'username', label: 'Username', isNumeric: false },
    { id: 'matches', label: 'Matches', isNumeric: true },
    { id: 'wins', label: 'Wins', isNumeric: true },
    { id: 'win_percentage', label: 'Win%', isNumeric: true },
    { id: 'kills', label: 'Kills', isNumeric: true },
    { id: 'kd', label: 'K/d', isNumeric: true }
];

const getGrading = (id, value) => {
    const grader = grading[id];

    if (grader) {
        return grader(value);
    }
    
    return 50;
}

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
            <Table>
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
                            <StyledTableCell align="right" grading={getGrading('matches', row.matches)}>
                                {row.matches}
                            </StyledTableCell>
                            <StyledTableCell align="right" grading={getGrading('wins', row.wins)}>
                                {row.wins}
                            </StyledTableCell>
                            <StyledTableCell align="right" grading={getGrading('win_percentage', row.win_percentage)}>
                                {row.win_percentage}
                            </StyledTableCell>
                            <StyledTableCell align="right" grading={getGrading('kills', row.kills)}>
                                {row.kills}
                            </StyledTableCell>
                            <StyledTableCell align="right" grading={getGrading('kd', row.kd)}>
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
