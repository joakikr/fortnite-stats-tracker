import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Chip from '@material-ui/core/Chip';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import Add from '@material-ui/icons/Add';
import Button from '@material-ui/core/Button';
import Box from '@material-ui/core/Box';
import Remove from '@material-ui/icons/Remove';

const useStyles = makeStyles(theme => ({
    root: {
        display: 'flex',
        justifyContent: 'center',
        flexDirection: 'column',
        flexWrap: 'wrap',
        padding: theme.spacing(2),
        marginTop: theme.spacing(2),
        marginBottom: theme.spacing(1)
    },
    header: {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'baseline'
    },
    button: {
        flex: '0 0 auto'
    },
    list: {
        display: 'flex',
        justifyContent: 'center',
        flexWrap: 'wrap',
        padding: theme.spacing(0.5)
    },
    chip: {
        margin: theme.spacing(0.5)
    }
}));

const RecentSearch = ({
    usernames,
    compare,
    setProfile,
    toggleToCompare,
    clearCompares
}) => {
    const classes = useStyles();
    return (
        <Paper square className={classes.root}>
            <Box className={classes.header}>
                <Typography variant="subtitle1" component="h2">
                    Recently searched players{' '}
                    <Typography variant="subtitle2" component="span">
                        (+ to compare)
                    </Typography>
                </Typography>
                <Button
                    color="secondary"
                    className={classes.button}
                    onClick={clearCompares}
                >
                    Clear compares
                </Button>
            </Box>
            <Box className={classes.list}>
                {usernames.map(username => {
                    const icon = compare.includes(username) ? (
                        <Remove />
                    ) : (
                        <Add />
                    );
                    return (
                        <Chip
                            className={classes.chip}
                            key={username}
                            label={username}
                            variant="outlined"
                            color="primary"
                            deleteIcon={icon}
                            onDelete={() => toggleToCompare(username)}
                            onClick={() => setProfile(username)}
                        />
                    );
                })}
            </Box>
        </Paper>
    );
};

export default RecentSearch;
