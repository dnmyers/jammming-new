import { config } from '../../config';

let accessToken = "";

const Spotify = {
    // GET ACCESS TOKEN
    getAccessToken() {
        console.log("getAccessToken()");
        if (accessToken) {
            return accessToken;
        }

        // Check for access_token match and expires_in match in URL
        const accessTokenMatch =
            window.location.href.match(/access_token=([^&]*)/);
        const expiresInMatch = window.location.href.match(/expires_in=([^&]*)/);

        if (accessTokenMatch && expiresInMatch) {
            accessToken = accessTokenMatch[1];
            const expiresIn = Number(expiresInMatch[1]);

            // Clear the parameters and grab a new access token when it expires
            window.setTimeout(() => (accessToken = ""), expiresIn * 1000);
            window.history.pushState("Access Token", null, "/");

            return accessToken;
        } else {
            const accessUrl = `https://accounts.spotify.com/authorize?client_id=${config.CLIENT_ID}&response_type=token&scope=playlist-modify-public&redirect_uri=${config.REDIRECT_URI}`;
            console.log(accessUrl);
            window.location = accessUrl;
            alert('Connecting to Spotify');
        }
    },

    // SEARCH FOR TRACK
    search(term) {
        console.log(`search(${term})`);
        const accessToken = Spotify.getAccessToken();

        return fetch(`https://api.spotify.com/v1/search?type=track&q=${term}`, {
            headers: {
                Authorization: `Bearer ${accessToken}`,
            },
        })
            .then(response => {
                console.info(response);
                return response.json();
            })
            .then((jsonResponse) => {
                if (!jsonResponse.tracks) {
                    return [];
                }

                console.info(jsonResponse);

                return jsonResponse.tracks.items.map(track => ({
                    id: track.id,
                    name: track.name,
                    artist: track.artists[0].name,
                    album: track.album.name,
                    uri: track.uri,
                }));
            });
    },

    // SAVE PLAYLIST
    savePlaylist(name, trackURIs) {
        console.log(`savePlaylist(${name}, ${trackURIs})`);
        if (!name || !trackURIs.length) {
            return;
        }

        const accessToken = Spotify.getAccessToken();
        const headers = { Authorization: `Bearer ${accessToken}` };

        let userID;

        // GET USERID
        return fetch(`https://api.spotify.com/v1/me`, { headers: headers })
            .then(response => response.json())
            .then(jsonResponse => {
                userID = jsonResponse.id;
                console.info(`userID: ${userID}`);

                // CREATE A NEW PLAYLIST AND GET PLAYLIST ID
                return fetch(
                    `https://api.spotify.com/v1/users/${userID}/playlists`,
                    {
                        headers: headers,
                        method: "POST",
                        body: JSON.stringify({ name: name }),
                    }
                )
                    .then(response => response.json())
                    .then(jsonResponse => {
                        const playlistID = jsonResponse.id;

                        // ADD TRACKS TO PLAYLIST
                        return fetch(
                            `https://api.spotify.com/v1/users/${userID}/playlists/${playlistID}/tracks`,
                            {
                                headers: headers,
                                method: "POST",
                                body: JSON.stringify({ uris: trackURIs }),
                            }
                        ).then(response => response.json());
                    });
            });
    },
};

export default Spotify;
