import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Chip from '@material-ui/core/Chip';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import Add from '@material-ui/icons/Add';
import Tooltip from '@material-ui/core/Tooltip';
import Box from '@material-ui/core/Box';
import Container from '@material-ui/core/Container';
import IconButton from '@material-ui/core/IconButton';
import Remove from '@material-ui/icons/Remove';
import DeleteIcon from '@material-ui/icons/Delete';
import ClearAllIcon from '@material-ui/icons/ClearAll';

const useStyles = makeStyles(theme => ({
    root: {
        display: 'flex',
        justifyContent: 'center',
        flexDirection: 'column',
        flexWrap: 'wrap',
        padding: theme.spacing(2),
        marginTop: -theme.spacing(2),
        marginBottom: theme.spacing(2),
        [theme.breakpoints.down('sm')]: {
            padding: theme.spacing(1),
            marginBottom: theme.spacing(1)
        }
    },
    container: {
        [theme.breakpoints.down('sm')]: {
            padding: 0
        }
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
        justifyContent: 'flex-start',
        flexWrap: 'no-wrap',
        overflowX: 'scroll',
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
    clearCompares,
    clearRecentlySearched
}) => {
    const classes = useStyles();
    return (
        <Paper square className={classes.root}>
            <Container maxWidth="md" className={classes.container}>
                <Box className={classes.header}>
                    <Typography variant="subtitle1" component="h2">
                        Recently searched players{' '}
                        <Typography variant="subtitle2" component="span">
                            (+&nbsp;to&nbsp;compare)
                        </Typography>
                    </Typography>
                    <Box className={classes.button}>
                        <Tooltip title="Clear all recently searched">
                            <IconButton
                                className={classes.button}
                                aria-label="clear all recently searched"
                                onClick={clearRecentlySearched}
                            >
                                <DeleteIcon />
                            </IconButton>
                        </Tooltip>
                        <Tooltip title="Clear all in compare table">
                            <IconButton
                                className={classes.button}
                                aria-label="clear all in compare table"
                                onClick={clearCompares}
                            >
                                <ClearAllIcon />
                            </IconButton>
                        </Tooltip>
                    </Box>
                </Box>
                <Box className={classes.list}>
                    {usernames.map(username => {
                        let icon = <Add />;
                        let color = 'primary';

                        if (compare.includes(username)) {
                            icon = <Remove />;
                            color = 'secondary';
                        }
                        return (
                            <Chip
                                className={classes.chip}
                                key={username}
                                label={username}
                                variant="outlined"
                                color={color}
                                deleteIcon={icon}
                                onDelete={() => toggleToCompare(username)}
                                onClick={() => setProfile(username)}
                            />
                        );
                    })}
                </Box>
            </Container>
        </Paper>
    );
};

export default RecentSearch;
