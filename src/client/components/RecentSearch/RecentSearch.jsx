import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Chip from '@material-ui/core/Chip';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import Add from '@material-ui/icons/Add';
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

const RecentSearch = ({ usernames, compare, setProfile, toggleToCompare }) => {
    const classes = useStyles();

    return (
        <Paper square className={classes.root}>
            <Typography variant="subtitle1" component="h2">
                Recently searched players (+ to compare)
            </Typography>
            <div className={classes.list}>
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
            </div>
        </Paper>
    );
};

export default RecentSearch;
