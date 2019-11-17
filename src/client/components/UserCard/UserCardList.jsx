import React, { useRef, useState } from 'react';
import { useSprings, animated } from 'react-spring';
import { useDrag } from 'react-use-gesture';
import { useDispatch, useSelector } from 'react-redux';
import { makeStyles } from '@material-ui/core/styles';
import Box from '@material-ui/core/Box'

import UserCard from './UserCard';
import { fetchProfile, setProfile } from '../../state/actions';
import { getProfiles, getProfileUsernames, getActiveProfile, getProfileByUsername } from '../../state/selectors';

import './UserCard.less'

const SCALE_TRESHOLD = 50;

const useStyles = makeStyles(theme => ({
    desktopOnly: {
        display: 'none',
        [theme.breakpoints.up('md')]: {
            display: 'block',
        }
    },
    mobileOnly: {
        [theme.breakpoints.up('md')]: {
            display: 'none'
        }
    }
}));

const UserCardList = () => {
    // MUI
    const classes = useStyles();

    // React
    const [gameView, setGameView] = useState('public');
    function handleSetGameView(_event, newView) {
        setGameView(newView);
    };

    // Redux
    const dispatch = useDispatch();
    const users = useSelector(getProfiles);
    const profileUsernames = useSelector(getProfileUsernames);
    const activeProfile = useSelector(getActiveProfile);
    const user = useSelector((state) => getProfileByUsername(state, activeProfile))

    // Animation (Only for mobile devices)
    const index = useRef(0);
    const [springs, set] = useSprings(users.length, i => ({
        x: i * window.innerWidth,
        sc: 1,
        display: 'block'
    }));
    const bind = useDrag(
        ({ down, delta: [xDelta], direction: [xDir], initial: [xStart, yStart], xy: [xCurrent, yCurrent], cancel }) => {
            const xDis = Math.abs(xCurrent - xStart);
            const yDis = Math.abs(yCurrent - yStart);

            if (down && xDis > SCALE_TRESHOLD * 3) {
                /* Index calc with edges overlap
                const offset = xDir > 0 ? 1 : -1;
                let newIndex = (index.current + offset + users.length) % users.length;
                */

                const newIndex = Math.min(Math.max(index.current + (xDir > 0 ? 1 : -1), 0), users.length - 1);
                index.current = newIndex;
                cancel(newIndex);

                const newUsername = profileUsernames.find((_, index) => index === newIndex);
                if (newUsername) {
                    dispatch(setProfile(newUsername));
                }
            }

            set((i) => {
                if (i < index.current - 1 || i > index.current + 1) {
                    return { display: 'none' };
                }
                const sc = down && yDis < SCALE_TRESHOLD ? 1 - xDis / window.innerWidth : 1;
                const x = ((i - index.current) * (window.innerWidth + 20) + (down ? xDelta : 0)) * sc;
                return { x, sc, display: 'block' };
            });
        }
    );
    const layers = springs.map(({ x, display, sc }, i) => (
        <animated.div
            {...bind()}
            key={i}
            style={{ display, transform: x.interpolate(x => `translate3d(${x}px,0,0)`) }}
            className="user-card-list__mover"
        >
            <animated.div style={{ transform: sc.interpolate(s => `scale(${s})`) }} className="user-card-list__scaler">
                <UserCard 
                    user={users[i]} 
                    onRefresh={(username) => dispatch(fetchProfile(username))}
                    isActive={activeProfile === users[i].epicUserHandle}
                    handleSetGameView={handleSetGameView}
                    gameView={gameView}
                />
            </animated.div>
        </animated.div>
    ));

    return (
        <Box>
            <div className={`user-card-list ${classes.mobileOnly}`}>
                { layers }
            </div>
            <div className={`user-card-single ${classes.desktopOnly}`}>
                {user && (
                    <UserCard 
                        user={user} 
                        onRefresh={(username) => dispatch(fetchProfile(username))}
                        isActive={true}
                        handleSetGameView={handleSetGameView}
                        gameView={gameView}
                    />
                )}
            </div>
        </Box>
    )
};

export default UserCardList;
