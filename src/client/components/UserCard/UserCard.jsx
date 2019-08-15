import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import clsx from 'clsx';
import Box from '@material-ui/core/Box';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import Collapse from '@material-ui/core/Collapse';
import Avatar from '@material-ui/core/Avatar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import { blue, deepPurple } from '@material-ui/core/colors';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import RecentMatchesTable from '../Tables/RecentMatchesTable';
import { GENERAL_STATS, PLAYLIST } from '../../consts';
import RefreshIcon from '@material-ui/icons/Refresh';

function createRow(id, matches, kills, wins, minutes, playlistId) {
    return {
        id,
        type: PLAYLIST[playlistId],
        matches,
        kills,
        wins,
        minutes: `${minutes}min`
    };
}

function createRows(matches) {
    return matches.map(
        ({ id, matches, kills, top1, minutesPlayed, playlistId }) =>
            createRow(id, matches, kills, top1, minutesPlayed, playlistId)
    );
}

function createTables(matches) {
    const rawGroups = {};
    const groups = {};

    matches.forEach(match => {
        let date = match.dateCollected.split('T')[0];
        if (date in rawGroups) {
            rawGroups[date].push(match);
        } else {
            rawGroups[date] = [match];
        }
    });

    Object.keys(rawGroups).forEach(key => {
        groups[key] = createRows(rawGroups[key]);
    });

    return groups;
}

const useStyles = makeStyles(theme => ({
    card: {
        marginBottom: theme.spacing(1)
    },
    expand: {
        transform: 'rotate(0deg)',
        marginLeft: 'auto',
        transition: theme.transitions.create('transform', {
            duration: theme.transitions.duration.shortest
        })
    },
    expandOpen: {
        transform: 'rotate(180deg)'
    },
    avatar: {
        backgroundColor: blue[500]
    },
    actions: {
        [theme.breakpoints.up('md')]: {
            display: 'none'
        }
    },
    content: {
        paddingBottom: 0,
        [theme.breakpoints.up('md')]: {
            display: 'flex',
            justifyContent: 'space-evenly',
            paddingBottom: theme.spacing(2)
        }
    },
    contentTable: {
        display: 'none',
        [theme.breakpoints.up('md')]: {
            display: 'block'
        }
    },
    statsItem: {
        paddingTop: 0
    },
    scroll: {
        overflowX: 'auto',
        maxHeight: '300px',
        overflowY: 'scroll',
        border: `1px solid ${deepPurple[600]}`,
        [theme.breakpoints.up('md')]: {
            minWidth: '550px'
        }
    }
}));

const RecentMatchesTables = ({ tables }) => {
    const classes = useStyles();
    return (
        <Box className={classes.scroll}>
            {Object.entries(tables).map(([date, rows]) => (
                <RecentMatchesTable
                    key={`recent-matches-table-${date}`}
                    date={date}
                    rows={rows}
                />
            ))}
        </Box>
    );
};

const UserCard = ({ user, onRefresh }) => {
    const classes = useStyles();
    const generalStats = user.lifeTimeStats.filter(stat =>
        GENERAL_STATS.includes(stat.key)
    );
    const recentMatchesTables = createTables(user.recentMatches);
    const [expanded, setExpanded] = useState(false);

    function handleExpandClick() {
        setExpanded(!expanded);
    }

    return (
        <Card className={classes.card} square>
            <CardHeader
                avatar={<Avatar className={classes.avatar}>F</Avatar>}
                action={
                    <IconButton
                        onClick={() => onRefresh(user.epicUserHandle)}
                        aria-label="refresh"
                    >
                        <RefreshIcon />
                    </IconButton>
                }
                title={user.epicUserHandle}
                subheader={user.platformNameLong}
            />
            <CardContent className={classes.content}>
                <Box>
                    <Typography
                        variant="subtitle1"
                        color="textSecondary"
                        component="h2"
                    >
                        General stats
                    </Typography>
                    <List>
                        {generalStats.map(({ key, value }, index) => (
                            <ListItem
                                className={classes.statsItem}
                                key={`${user.epicUserHandle}-${index}`}
                            >
                                <ListItemText primary={key} secondary={value} />
                            </ListItem>
                        ))}
                    </List>
                </Box>
                <Box className={classes.contentTable}>
                    <Typography
                        variant="subtitle1"
                        color="textSecondary"
                        component="h2"
                    >
                        Recent Matches
                    </Typography>
                    <RecentMatchesTables tables={recentMatchesTables} />
                </Box>
                <CardActions className={classes.actions} disableSpacing>
                    <Typography variant="subtitle2" component="span">
                        See recent matches...
                    </Typography>
                    <IconButton
                        className={clsx(classes.expand, {
                            [classes.expandOpen]: expanded
                        })}
                        onClick={handleExpandClick}
                        aria-expanded={expanded}
                        aria-label="show more"
                    >
                        <ExpandMoreIcon />
                    </IconButton>
                </CardActions>
                <Collapse
                    className={classes.actions}
                    in={expanded}
                    timeout="auto"
                    unmountOnExit
                >
                    <RecentMatchesTables tables={recentMatchesTables} />
                </Collapse>
            </CardContent>
        </Card>
    );
};

UserCard.propTypes = {
    accountId: PropTypes.string,
    platformId: PropTypes.number,
    platformName: PropTypes.string,
    platformNameLong: PropTypes.string,
    epicUserHandle: PropTypes.string,
    stats: PropTypes.objectOf(
        PropTypes.objectOf(
            PropTypes.shape({
                label: PropTypes.string,
                field: PropTypes.string,
                category: PropTypes.string,
                valueInt: PropTypes.number,
                value: PropTypes.string,
                rank: PropTypes.number,
                percentile: PropTypes.number,
                displayValue: PropTypes.string
            })
        )
    ),
    lifeTimeStats: PropTypes.arrayOf(PropTypes.object),
    recentMatches: PropTypes.arrayOf(
        PropTypes.shape({
            id: PropTypes.number,
            accountId: PropTypes.string,
            playlist: PropTypes.string,
            kills: PropTypes.number,
            minutesPlayed: PropTypes.number,
            top1: PropTypes.number,
            top5: PropTypes.number,
            top6: PropTypes.number,
            top10: PropTypes.number,
            top12: PropTypes.number,
            top25: PropTypes.number,
            matches: PropTypes.number,
            top3: PropTypes.number1,
            dateCollected: PropTypes.string,
            score: PropTypes.number,
            platform: PropTypes.number,
            playlistId: PropTypes.number,
            playersOutlived: PropTypes.number
        })
    )
};

export default UserCard;
