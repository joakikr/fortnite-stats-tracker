import React, { Fragment } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Chip from '@material-ui/core/Chip';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';

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
        padding: theme.spacing(0.5),
    },
    chip: {
        margin: theme.spacing(0.5)
    }
}));

const RecentSearch = ({ usernames, setProfile }) => {
    const classes = useStyles();
    return (
        <Paper className={classes.root}>
            <Typography variant="subtitle1" component="h2">Recently search players</Typography>
            <div className={classes.list}>
                {usernames.map(username => (
                    <Chip
                        className={classes.chip}
                        key={username}
                        label={username}
                        variant="outlined"
                        color="primary"
                        onClick={() => setProfile(username)}
                    />
                    ))}
            </div>
        </Paper>
    );
};

export default RecentSearch;
