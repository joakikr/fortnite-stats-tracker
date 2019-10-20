import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import ToggleButton from '@material-ui/lab/ToggleButton';
import ToggleButtonGroup from '@material-ui/lab/ToggleButtonGroup';

const useStyles = makeStyles(() => ({
    compareViewButton: {
        height: '30px',
        fontSize: '0.75rem'
    }
}));

const CompareViewButtonGroup = ({ view, handleCompareViewChange }) => {
    const classes = useStyles();

    return (
        <ToggleButtonGroup size="small" value={view} exclusive onChange={handleCompareViewChange}>
            <ToggleButton className={classes.compareViewButton} key={1} value="all">
                All
            </ToggleButton>
            <ToggleButton className={classes.compareViewButton} key={2} value="current">
                Current
            </ToggleButton>
        </ToggleButtonGroup>
    );
};

export default CompareViewButtonGroup;