import React from 'react';
import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Switch from '@material-ui/core/Switch';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(theme => ({
    root: {
        position: 'fixed',
        backgroundColor: theme.palette.darkModeToggle[800],
        color: theme.palette.common.white,
        bottom: 0,
        right: 0,
        padding: '4px 8px'
    }
}));

const DarkModeButton = ({ isDarkMode, toggleDarkMode }) => {
    const classes = useStyles();

    return (
        <FormGroup className={classes.root} row>
            <FormControlLabel
                control={
                    <Switch
                        checked={isDarkMode}
                        onChange={() => toggleDarkMode(!isDarkMode)}
                    />
                }
                label="PAN Mode"
            />
        </FormGroup>
    );
};

export default DarkModeButton;
