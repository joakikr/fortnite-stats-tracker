import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import TableCell from '@material-ui/core/TableCell';
import { deepPurple } from '@material-ui/core/colors';

const useStyles = makeStyles(theme => ({
    root: {
        borderBottom: '0'
    },
    head: (props) => ({
        backgroundColor: props.headColor[600],
        color: theme.palette.common.white
    }),
    body: (props) => ({
        backgroundColor: props.bodyColor[props.grading]
    }),
}));

const StyledTableCell = (props) => {
    const { bodyColor, headColor, grading, ...rest } = props
    const classes = useStyles({ bodyColor, headColor, grading });
    return (
        <TableCell {...rest} classes={{ root: classes.root, head: classes.head, body: classes.body }}/>
    )
}

StyledTableCell.defaultProps = {
    bodyColor: deepPurple,
    headColor: deepPurple
};

export default StyledTableCell;