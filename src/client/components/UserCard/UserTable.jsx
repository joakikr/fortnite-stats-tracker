import React from 'react';
import { withStyles, makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';

const useStyles = makeStyles(theme => ({
    root: {
        width: '100%',
        overflowX: 'auto',
        maxHeight: '300px',
        overflowY: 'scroll'
    }
}));

const StyledTableCell = withStyles(theme => ({
    head: {
        backgroundColor: theme.palette.common.black,
        color: theme.palette.common.white
    },
    body: {
        fontSize: 14
    }
}))(TableCell);

const UserTable = ({ rows }) => {
    const classes = useStyles();

    return (
        <Paper className={classes.root}>
            <Table className={classes.table}>
                <TableHead>
                    <TableRow>
                        <StyledTableCell>Date</StyledTableCell>
                        <StyledTableCell>Matches</StyledTableCell>
                        <StyledTableCell>Kills</StyledTableCell>
                        <StyledTableCell>Dubs</StyledTableCell>
                        <StyledTableCell>Time</StyledTableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {rows.map(row => (
                        <TableRow key={row.id}>
                            <StyledTableCell
                                align="right"
                                component="th"
                                scope="row"
                            >
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

export default UserTable;
