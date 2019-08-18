import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';
import RecentMatchesTable from '../Tables/RecentMatchesTable';
import { KD_VALID_IDS } from '../../consts';

const useStyles = makeStyles(theme => ({
    scroll: {
        overflowX: 'auto',
        [theme.breakpoints.up('md')]: {
            minWidth: '550px',
            maxHeight: '300px',
            overflowY: 'scroll',
        }
    },
    scrollBox: {
        marginBottom: theme.spacing(2)
    },
    scrollHeader: {
        display: 'flex'
    },
    scrollHeaderItem: {
        marginRight: theme.spacing(2)
    }
}));

const getKdForRowGroup = (rows, validIds) => {
    const accumulatedValidRows = rows
        .filter(row => validIds.includes(row.playlistId))
        .reduce(
            (acc, row) => [
                acc[0] + row.matches,
                acc[1] + row.kills,
                acc[2] + row.wins
            ],
            [0, 0, 0]
        );

    let kd = 0;
    if (accumulatedValidRows[0] !== 0) {
        // If they won, we assume they survided and substract one from number of matches
        kd =
            accumulatedValidRows[1] /
            Math.max(accumulatedValidRows[0] - accumulatedValidRows[2], 1);
    }

    return kd.toFixed(2);
};

const RecentMatchesTables = ({ tables }) => {
    const classes = useStyles();
    const entires = Object.entries(tables);

    if (entires.length === 0) {
        return (
            <Typography variant="body2" color="textSecondary" component="span">
                There are no recent matches.
            </Typography>
        );
    }

    return (
        <Box className={classes.scroll}>
            {Object.entries(tables).map(([date, rows]) => (
                <Box
                    className={classes.scrollBox}
                    key={`recent-matches-table-${date}`}
                >
                    <Box className={classes.scrollHeader}>
                        <Box className={classes.scrollHeaderItem}>
                            <Typography
                                color="textPrimary"
                                variant="subtitle2"
                                component="span"
                            >
                                Session:
                            </Typography>
                            <Typography
                                color="textSecondary"
                                variant="body2"
                                component="span"
                            >
                                {new Date(date).toLocaleDateString('no')}
                            </Typography>
                        </Box>
                        <Box className={classes.scrollHeaderItem}>
                            <Typography
                                color="textPrimary"
                                variant="subtitle2"
                                component="span"
                            >
                                K/d:
                            </Typography>
                            <Typography
                                color="textSecondary"
                                variant="body2"
                                component="span"
                            >
                                {getKdForRowGroup(rows, KD_VALID_IDS)}
                            </Typography>
                        </Box>
                    </Box>
                    <RecentMatchesTable rows={rows} />
                </Box>
            ))}
        </Box>
    );
};

export default RecentMatchesTables;
