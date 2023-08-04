import './SaveToSpotifyButton.css';

const SaveToSpotifyButton = (props) => {
    const handleOnClick = () => {
        console.log('playlist saved.');
        alert('Playlist saved successfully.');
        props.onClick();
    }

    return (
        <div className="save-to-spotify-button-container">
            <button
                className="save-to-spotify-button"
                onClick={handleOnClick}
            >
                SAVE TO SPOTIFY
            </button>
        </div>
    );
}

export default SaveToSpotifyButton;