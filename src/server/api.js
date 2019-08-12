const profile = (username) => `https://api.fortnitetracker.com/v1/profile/psn/${username}`;
const matches = (account) => `https://api.fortnitetracker.com/v1/profile/account/${account}`;
const season = (season, account) => `https://fortnitetracker.com/api/v0/profile/${account}/stats?platform=psn&season=${season}&isCompetitive=false`;

module.exports = {
    profile,
    matches
}