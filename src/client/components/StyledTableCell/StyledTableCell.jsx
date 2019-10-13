import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import TableCell from '@material-ui/core/TableCell';

const useStyles = makeStyles(theme => ({
    root: {
        borderBottom: '0'
    },
    head: {
        backgroundColor: theme.palette.tableHeader[600],
        color: theme.palette.common.white
    },
    body: (props) => ({
        backgroundColor: theme.palette[props.grader][props.grading]
    }),
}));

const StyledTableCell = (props) => {
    const { grading, grader, ...rest } = props;
    const classes = useStyles({ grading, grader });
    return (
        <TableCell {...rest} size="small" classes={{ root: classes.root, head: classes.head, body: classes.body }}/>
    )
}

export default StyledTableCell;