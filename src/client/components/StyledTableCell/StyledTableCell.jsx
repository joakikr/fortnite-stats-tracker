import { withStyles } from '@material-ui/core/styles';
import TableCell from '@material-ui/core/TableCell';
import { deepPurple } from '@material-ui/core/colors';

const StyledTableCell = withStyles(theme => ({
    head: {
        backgroundColor: deepPurple[500],
        color: theme.palette.common.white
    }
}))(TableCell);

export default StyledTableCell;