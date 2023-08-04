import PlaylistNameInput from '../PlaylistNameInput/PlaylistNameInput';
import TrackList from '../TrackList/TrackList';
import SaveToSpotifyButton from '../SaveToSpotifyButton/SaveToSpotifyButton'; 

import './Playlist.css';

const Playlist = (props) => {
    function handleNameChange({ target }) {
        props.onNameChange(target.value);
    }

    return (
        <div className="playlist">
            <PlaylistNameInput 
                playlistName={props.playlistName}  
                handleNameChange={handleNameChange}
            />
            <div className="tracklist-container">
                <TrackList
                    isRemoval={true}
                    tracks={props.playlistTracks}
                    onRemove={props.onRemove}
                    className="playlist-tracklist"
                />
            </div>
            <div className="save-playlist-container">
                <SaveToSpotifyButton
                    className="save-playlist-button"
                    onClick={props.onSave}
                />
            </div>
        </div>
    );
}

export default Playlist;