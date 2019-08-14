import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import TableCell from '@material-ui/core/TableCell';
import { deepPurple } from '@material-ui/core/colors';

const useStyles = makeStyles(theme => ({
    root: {
        borderBottom: '0'
    },
    head: {
        backgroundColor: deepPurple[600],
        color: theme.palette.common.white
    },
    body: (props) => ({
        backgroundColor: deepPurple[props.grading]
    }),
}));

const StyledTableCell = (props) => {
    const classes = useStyles(props);
    return (
        <TableCell {...props} classes={{ root: classes.root, head: classes.head, body: classes.body }}/>
    )
}   

export default StyledTableCell;