import { CURRENT_SEASON_IDS } from '../consts';

function transformStatsAll(stats) {
    return {
        matches: stats.find((elem) => elem.key === 'Matches Played').value,
        kills: stats.find((elem) => elem.key === 'Kills').value,
        wins: stats.find((elem) => elem.key === 'Wins').value,
        win_percentage: stats.find((elem) => elem.key === 'Win%').value.split('%')[0],
        kd: stats.find((elem) => elem.key === 'K/d').value
    };
}

function transformStatsCurrent(stats) {
    const current = {
        matches: 0,
        kills: 0,
        wins: 0,
        win_percentage: 0,
        kd: 0
    };

    Object.keys(stats)
        .filter(key => CURRENT_SEASON_IDS.includes(key))
        .forEach(key => {
            const iter = stats[key];
            current.matches += iter.matches.valueInt;
            current.kills += iter.kills.valueInt;
            current.wins += iter.top1.valueInt;
        });

    current.matches = current.matches.toString();
    current.kills = current.kills.toString();
    current.wins = current.wins.toString();
    current.win_percentage = parseFloat(100 * current.wins / (Math.max(current.matches, 1))).toFixed(0);
    current.kd = parseFloat(current.kills / Math.max(current.matches - current.wins, 1)).toFixed(2);

    return current;
}

function transformStats(lifeTimeStats, stats) {
    const all = transformStatsAll(lifeTimeStats)
    const current = transformStatsCurrent(stats);

    return {
        all,
        current
    }
}

function transformRecentMatches(recentMatches) {
    return recentMatches.map((match) => ({
        id: match.id,
        kills: match.kills,
        minutes: match.minutesPlayed,
        wins: match.top1,
        matches: match.matches,
        dateCollected: match.dateCollected,
        playlistId: match.playlistId
    }));
}

export function transformProfile(profile) {
    const recentMatches = transformRecentMatches(profile.recentMatches);
    const stats = transformStats(profile.lifeTimeStats, profile.stats);

    return {
        platformName: profile.platformName,
        platformNameLong: profile.platformNameLong,
        epicUserHandle: profile.epicUserHandle,
        recentMatches,
        stats
    }
}