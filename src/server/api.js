const API_FT = 'https://api.fortnitetracker.com';
const FT = 'https://fortnitetracker.com/';

const profile = (platform, username) => `${API_FT}/v1/profile/${platform}/${username}`;
const matches = (account) => `${API_FT}/v1/profile/account/${account}`;
const season = (season, account) => `${FT}/api/v0/profile/${account}/stats?platform=psn&season=${season}&isCompetitive=false`;

module.exports = {
    profile,
    matches
}