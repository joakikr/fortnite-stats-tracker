import React, { useRef } from 'react';
import { useSprings, animated } from 'react-spring';
import { useDrag } from 'react-use-gesture';
import { useDispatch, useSelector } from 'react-redux';

import UserCard from './UserCard';
import { fetchProfile, setProfile } from '../../state/actions';
import { getProfiles, getProfileUsernames, getActiveProfile } from '../../state/selectors';

import './UserCard.less'

const UserCardList = () => {
    // Redux
    const dispatch = useDispatch();
    const users = useSelector(getProfiles);
    const profileUsernames = useSelector(getProfileUsernames);
    const activeProfile = useSelector(getActiveProfile);

    // Animation
    const index = useRef(0);
    const [springs, set] = useSprings(users.length, i => ({
        x: i * window.innerWidth,
        sc: 1,
        display: 'block'
    }));
    const bind = useDrag(
        ({ down, delta: [xDelta], direction: [xDir], distance, cancel, velocity }) => {
            if ((xDir === 1 || xDir === -1) && velocity > 2) {
                if (down && distance > window.innerWidth / 2) {
                    const offset = xDir > 0 ? 1 : -1;
                    const newIndex = (index.current + offset + users.length) % users.length;
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
                    const x = (i - index.current) * window.innerWidth + (down ? xDelta : 0);
                    const sc = down ? 1 - distance / window.innerWidth / 2 : 1;
                    return { x, sc, display: 'block' };
                });
            }

        }
    );
    const layers = springs.map(({ x, display, sc }, i) => (
        <animated.div
            {...bind()}
            key={i}
            style={{ display, transform: x.interpolate(x => `translate3d(${x}px,0,0)`) }}
        >
            <animated.div style={{ transform: sc.interpolate(s => `scale(${s})`) }}>
                <UserCard 
                    user={users[i]} 
                    onRefresh={(username) => dispatch(fetchProfile(username))}
                    isActive={activeProfile === users[i].epicUserHandle}
                />
            </animated.div>
        </animated.div>
    ));

    return (
        <div className="user-card-list">
            { layers }
        </div>
    )
};

export default UserCardList;
