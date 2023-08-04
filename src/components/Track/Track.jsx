import './Track.css';

const Track = (props) => {
    function renderAction(isRemoval) {
        // Displays a button element with - as its content if the isRemoval property is true,
        // and a + <button> element if the isRemoval property is false.
        // Set the class name to Track-action
        if(isRemoval) {
            return (
                <button className="track-action" onClick={removeTrack}>-</button>
            )
        } else {
            return (
                <button className="track-action" onClick={addTrack}>+</button>
            )
        }
    }

    function addTrack() {
        props.onAdd(props.track);
    }

    function removeTrack() {
        props.onRemove(props.track);
    }
    
    return (
        <div className="track">
            <div className="track-information">
                <h3 className="track-name">{props.track.name}</h3>
                <p className="track-artist">{props.track.artist}</p>
                <p className="track-album">{props.track.album}</p>
            </div>
            <div 
                className="track-action"
            >
                {
                    renderAction(
                        props.isRemoval
                    )
                }
            </div>
        </div>
    );
}

export default Track;