import './PlaylistNameInput.css';

const PlaylistNameInput = (props) => {
    return (
        <div className="playlist-name-input">
            <input 
                type="text"
                value={props.playlistName} 
                onChange={props.handleNameChange} 
            />
            <hr />
        </div>
    );
}

 export default PlaylistNameInput;