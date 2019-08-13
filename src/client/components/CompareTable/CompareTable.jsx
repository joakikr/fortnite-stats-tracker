import React from 'react';
import { withStyles, makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import { deepPurple } from '@material-ui/core/colors';

const useStyles = makeStyles(theme => ({
    root: {
        width: '100%',
        overflowX: 'auto',
        maxHeight: '300px',
        overflowY: 'scroll',
    }
}));

const StyledTableCell = withStyles(theme => ({
    head: {
        backgroundColor: deepPurple[500],
        color: theme.palette.common.white
    },
    body: {
        fontSize: 14
    }
}))(TableCell);

const CompareTable = ({ rows }) => {
    const classes = useStyles();

    return (
        <Paper className={classes.root}>
            <Table className={classes.table}>
                <TableHead>
                    <TableRow>
                        <StyledTableCell align="right">Username</StyledTableCell>
                        <StyledTableCell align="right">Matches</StyledTableCell>
                        <StyledTableCell align="right">Win</StyledTableCell>
                        <StyledTableCell align="right">Win %</StyledTableCell>
                        <StyledTableCell align="right">Kills</StyledTableCell>
                        <StyledTableCell align="right">K/d</StyledTableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {rows.map(row => (
                        <TableRow key={row.username}>
                            <StyledTableCell
                                align="right"
                                component="th"
                                scope="row"
                            >
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
