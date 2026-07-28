const sportsApiBaseUrl = import.meta.env.VITE_SPORTS_API_BASE_URL;

if (!sportsApiBaseUrl)
    throw Error('Missing VITE_SPORTS_API_BASE_URL');

export const env = {
    sportsApiBaseUrl,
};
