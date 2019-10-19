import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import ToggleButton from '@material-ui/lab/ToggleButton';
import ToggleButtonGroup from '@material-ui/lab/ToggleButtonGroup';

const useStyles = makeStyles(() => ({
    gameViewButton: {
        height: '30px',
        fontSize: '0.75rem'
    }
}));

const GameViewButtonGroup = ({ gameView, handleGameViewChange }) => {
    const classes = useStyles();

    return (
        <ToggleButtonGroup size="small" value={gameView} exclusive onChange={handleGameViewChange}>
            <ToggleButton className={classes.gameViewButton} key={1} value="public">
                Public
            </ToggleButton>
            <ToggleButton className={classes.gameViewButton} key={2} value="arena">
                Arena
            </ToggleButton>
        </ToggleButtonGroup>
    );
};

export default GameViewButtonGroup;