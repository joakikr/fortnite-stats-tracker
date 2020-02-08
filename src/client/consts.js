export const GENERAL_STATS = ['Matches Played', 'Wins', 'Win%', 'Kills', 'K/d'];
export const CURRENT_SEASON_IDS = ['curr_p2', 'curr_p10', 'curr_p9']; 

export const PLAYLIST = {
    29: 'PG',
    32: 'Solo',
    31: 'Duos',
    33: 'Squad',
    97: 'Creative',
    107: 'A.Solo',
    106: 'A.Duos',
    109: 'A.Trios',
    108: 'A.Squad',
    161: 'Rumble',
    259: 'Storm King'
}

export const KD_VALID_IDS_PUBLIC = [31, 32, 33];
export const KD_VALID_IDS_AREBA = [106, 107, 108, 109];
export const KD_VALID_IDS_LTM = [161, 259];
export const KD_VALID_IDS_ALL = [...KD_VALID_IDS_PUBLIC, ...KD_VALID_IDS_AREBA];

export const COUNTDOWN_TIMER = 150; // 2min 30sec
export const COUNTDOWN_TIMER_FORMATTED = '2m 30s';

export const SWIPE = {
    LEFT: 'Left',
    RIGHT: 'Right',
    TRESHOLD_DISTANCE: 70,
    TRESHOLD_VELOCITY: 0.4
}

export const PLATFORM = {
    PSN: 'psn',
    XBOX: 'xbox',
    PC: 'pc'
};

export const LOCAL_STORAGE = {
    SAVED_PROFILES: 'fst-profiles-v3'
}