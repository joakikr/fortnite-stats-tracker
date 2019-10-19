import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';
import momentDuration from 'moment-duration-format';
import { makeStyles } from '@material-ui/core/styles';
import clsx from 'clsx';
import Box from '@material-ui/core/Box';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import Collapse from '@material-ui/core/Collapse';
import Container from '@material-ui/core/Container';
import Avatar from '@material-ui/core/Avatar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import RefreshIcon from '@material-ui/icons/Refresh';

import GameViewButtonGroup from '../GameViewButtonGroup/GameViewButtonGroup';
import RecentMatchesTables from '../Tables/RecentMatchesTables';
import { 
    GENERAL_STATS, 
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
        ({ id, matches, kills, top1, minutesPlayed, playlistId }) =>
            createRow(id, matches, kills, top1, minutesPlayed, playlistId)
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
            alignItems: 'flex-end'
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
        justifyContent: 'flex-end',
        padding: theme.spacing(1)
    },
    mobileOnly: {
        [theme.breakpoints.up('md')]: {
            display: 'none'
        }
    },
}));

const UserCard = ({ user, onRefresh }) => {
    const classes = useStyles();
    const generalStats = user.lifeTimeStats.filter(stat =>
        GENERAL_STATS.includes(stat.key)
    );
    const [gameView, setGameView] = useState('public');
    const [expanded, setExpanded] = useState(true);
    const recentMatchesTables = createTables(user.recentMatches, gameView);

    function handleExpandClick() {
        setExpanded(!expanded);
    }

    function handleSetGameView(_event, newView) {
        if (newView) {
            setExpanded(true);
        }
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
        return () => clearInterval(interval)
    }, [user])

    return (
        <Container maxWidth="md" className={classes.container}>
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
                        <div>
                            <GameViewButtonGroup gameView={gameView} handleGameViewChange={handleSetGameView} />
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
                        </div>
                    </CardActions>
                    <Collapse
                        className={classes.mobileOnly}
                        in={expanded}
                        timeout="auto"
                        unmountOnExit
                    >
                        <RecentMatchesTables tables={recentMatchesTables} ids={gameViewToGameIds(gameView)} />
                    </Collapse>
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
