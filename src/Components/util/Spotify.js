import { SearchBar } from "../SearchBar/SearchBar";

let accessToken ='';
let expirationTime = '';
const clientId = '3fccfbe3d48646329e47672cbcdc8a62';
const redirectURI = 'http://localhost:3000/';


const Spotify = {

    getAccessToken: () => 
    {
        if(accessToken)
        {
            return accessToken;
        }
        else
        {
            const accessTokenMatch = window.location.href.match(/access_token=([^&]*)/);
            const expiresInMatch = window.location.href.match(/expires_in=([^&]*)/);
            if(accessTokenMatch && expiresInMatch)
            {
                accessToken = accessTokenMatch[1];
                const expiresIn = Number(expiresInMatch[1]);

                window.setTimeout(() => accessToken = '', expiresIn * 1000);
                window.history.pushState('Access Token', null, '/');
                return accessToken;
            }
            else
            {
                accessToken = 
                window.location = `https://accounts.spotify.com/authorize?client_id=${clientId}&response_type=token&scope=playlist-modify-public&redirect_uri=${redirectURI}`;
            }
        }
    },

    search: input =>
    {
        const accessToken = Spotify.getAccessToken()

        return fetch(`https://api.spotify.com/v1/search?type=track&q=${input}`, {
            headers: {
                Authorization: `Bearer ${accessToken}`
            }
        })
        .then(response => {
            return response.json();
        })
        .then(jsonResponse => {
            if(!jsonResponse)
            {
                return [];
            }
            return jsonResponse.tracks.items.map(track => ({
                id: track.id,
                name: track.name,
                artist: track.artists[0].name,
                album: track.album.name,
                uri: track.uri
            }));
        });
    },

    savePlaylist: (name, tracks) =>
    {
        if(!(name && tracks))
        {
            return;
        }
        const currentAccessToken = Spotify.getAccessToken();
        const headers = {Authorization: `Bearer currentAccessToken`};
        let userId;
        let playlistId;
        fetch('https://api.spotify.com/v1/me', {headers: headers})
        .then(response => response.json)
        .then(jsonResponse => {
            userId = jsonResponse

            return fetch(`https://api.spotify.com/v1/users/${userId}/playlists`, {
                name: name,
                method: 'POST',
                body: JSON.stringify({name: name})
            })
            .then(response => response.json)
            .then(jsonResponse => { 
                playlistId = jsonResponse.id;
                return fetch('https://api.spotify.com/v1/users/{user_id}/playlists/{playlist_id}/tracks', {
                    headers: headers,
                    method: 'POST',
                    body: JSON.stringify({uris: tracks})
                })
            })
        });


        
    } 

};



export {Spotify};