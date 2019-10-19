export const GENERAL_STATS = ['Matches Played', 'Wins', 'Win%', 'Kills', 'K/d'];

export const PLAYLIST = {
    29: 'PG',
    32: 'Solo',
    31: 'Duos',
    33: 'Squad',
    97: 'Creative',
    107: 'A. Solo',
    109: 'A. Trios',
    108: 'A. Squad',
    161: 'Rumble'
}

export const KD_VALID_IDS_PUBLIC = [31, 32, 33];
export const KD_VALID_IDS_AREBA = [107, 108, 109];
export const KD_VALID_IDS_ALL = [...KD_VALID_IDS_PUBLIC, ...KD_VALID_IDS_AREBA];

export const COUNTDOWN_TIMER = 150; // 2min 30sec
export const COUNTDOWN_TIMER_FORMATTED = '2m 30s';
