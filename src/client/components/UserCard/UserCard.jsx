import React, { useState, useEffect } from 'react';
import { useSwipeable } from 'react-swipeable'
import PropTypes from 'prop-types';
import moment from 'moment';
import momentDuration from 'moment-duration-format';
import { makeStyles } from '@material-ui/core/styles';
import Box from '@material-ui/core/Box';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import Container from '@material-ui/core/Container';
import Avatar from '@material-ui/core/Avatar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import RefreshIcon from '@material-ui/icons/Refresh';

import GameViewButtonGroup from '../GameViewButtonGroup/GameViewButtonGroup';
import RecentMatchesTables from '../Tables/RecentMatchesTables';
import { 
    PLAYLIST, 
    COUNTDOWN_TIMER, 
    COUNTDOWN_TIMER_FORMATTED
} from '../../consts';
import { gameViewToGameIds, gameViewFilter } from '../../utils';

function createRow(id, matches, kills, wins, minutes, playlistId) {
    return {
        id,
        playlistId,
        type: PLAYLIST[playlistId],
        matches,
        kills,
        wins,
        minutes
    };
}

function createRows(matches) {
    return matches.map(
        ({ id, matches, kills, wins, minutes, playlistId }) =>
            createRow(id, matches, kills, wins, minutes, playlistId)
    );
}

function createTables(matches, view) {
    const rawGroups = {};
    const groups = {};

    const filter = gameViewFilter(view);
    filter(matches).forEach(match => {
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
    container: {
        [theme.breakpoints.down('sm')]: {
            padding: 0
        }
    },
    card: {
        marginBottom: theme.spacing(1)
    },
    avatar: {
        backgroundColor: theme.palette.secondary[600]
    },
    content: {
        padding: theme.spacing(1),
        paddingBottom: 0,
        [theme.breakpoints.up('md')]: {
            display: 'flex',
            justifyContent: 'flex-start',
            paddingBottom: theme.spacing(2)
        }
    },
    contentTableMeta: {
        display: 'flex',
        justifyContent: 'space-between',
        marginBottom: theme.spacing(1)
    },
    contentTable: {
        display: 'none',
        [theme.breakpoints.up('md')]: {
            display: 'block',
            width: '70%',
            marginRight: theme.spacing(1)
        }
    },
    statsContainer: {
        [theme.breakpoints.up('md')]: {
            margin: '0 40px'
        }
    },
    stats: {
        [theme.breakpoints.down('sm')]: {
            display: 'flex',
            flexWrap: 'wrap',
            alignItems: 'flex-end',
            justifyContent: 'space-between'
        }
    },
    statsItem: {
        paddingTop: 0,
        [theme.breakpoints.down('sm')]: {
            minWidth: '100px',
            width: 'auto'
        }
    },
    countdown: {
        display: 'flex',
        justifyContent: 'flex-start',
        padding: theme.spacing(1),
        [theme.breakpoints.up('md')]: {
            justifyContent: 'flex-end'
        }
    },
    mobileOnly: {
        [theme.breakpoints.up('md')]: {
            display: 'none'
        }
    }
}));

const stats = [
    { key: 'matches', value: 'Played' },
    { key: 'kills', value: 'Kills' },
    { key: 'wins', value: 'Wins' },
    { key: 'win_percentage', value: 'Win%' },
    { key: 'kd', value: 'K/d' }
];

const UserCard = ({ user, onRefresh, isActive }) => {
    const classes = useStyles();
    const generalStats = user.stats.all;
    const [gameView, setGameView] = useState('public');
    const recentMatchesTables = createTables(user.recentMatches, gameView);

    function handleSetGameView(_event, newView) {
        setGameView(newView);
    };

    let countdownTimer = null;
    const [timer, setTimer] = useState(COUNTDOWN_TIMER_FORMATTED);
    useEffect(() => {
        countdownTimer = COUNTDOWN_TIMER;
        const interval = setInterval(() => {
            const duration = moment.duration(countdownTimer, 'seconds');
            const formatted = duration.format("m[m] ss[s]");
            setTimer(formatted)
            
            countdownTimer -= 1;
            if (countdownTimer < 0) {
                onRefresh(user.epicUserHandle)
                setTimer(COUNTDOWN_TIMER_FORMATTED);
                countdownTimer = COUNTDOWN_TIMER;
            }
        }, 1000);

        if (!isActive) {
            clearInterval(interval);
        }

        return () => clearInterval(interval)
    }, [user, isActive])

    return (
        <Container maxWidth="md" className={classes.container} >
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
                    <Box className={classes.statsContainer}>
                        <Typography
                            variant="subtitle1"
                            color="textSecondary"
                            component="h2"
                        >
                            General stats
                        </Typography>
                        <List className={classes.stats}>
                            {stats.map((stat, index) => (
                                <ListItem
                                    className={classes.statsItem}
                                    key={`${user.epicUserHandle}-${index}`}
                                >
                                    <ListItemText primary={stat.value} secondary={generalStats[stat.key]} />
                                </ListItem>
                            ))}
                        </List>
                    </Box>
                    <Box className={classes.contentTable}>
                        <div className={classes.contentTableMeta}>
                            <Typography
                                variant="subtitle1"
                                color="textSecondary"
                                component="h2"
                            >
                                Recent Matches
                            </Typography>
                            <GameViewButtonGroup gameView={gameView} handleGameViewChange={handleSetGameView} />
                        </div>
                        <RecentMatchesTables tables={recentMatchesTables} ids={gameViewToGameIds(gameView)} />
                    </Box>
                    <CardActions className={`${classes.contentTableMeta} ${classes.mobileOnly}`} disableSpacing>
                        <Typography variant="subtitle2" component="span">
                            Recent Matches
                        </Typography>
                        <GameViewButtonGroup gameView={gameView} handleGameViewChange={handleSetGameView} />
                    </CardActions>
                    <div className={classes.mobileOnly}>
                        <RecentMatchesTables tables={recentMatchesTables} ids={gameViewToGameIds(gameView)} />
                    </div>
                </CardContent>
                <Box className={classes.countdown}>
                    <Typography
                        variant="caption"
                        color="textSecondary"
                        component="h2">
                        Stats update in { timer }
                    </Typography>
                </Box>
            </Card>
        </Container>
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
            playlist: PropTypes.string,
            kills: PropTypes.number,
            minutes: PropTypes.number,
            wins: PropTypes.number,
            matches: PropTypes.number,
            dateCollected: PropTypes.string,
            playlistId: PropTypes.number
        })
    )
};

export default UserCard;
