import './Track.css';

const Track = (props) => {
    renderAction(isRemoval) {
        // Displays a button element with - as its content if the isRemoval property is true,
        // and a + <button> element if the isRemoval property is false.
        // Set the class name to Track-action
        if(isRemoval) {
            return (
                <button className="Track-action" onClick={removeTrack}>-</button>
            )
        } else {
            return (
                <button className="Track-action" onClick={addTrack}>+</button>
            )
        }
    }

    addTrack() {
        props.onAdd(props.track);
    }

    removeTrack() {
        props.onRemove(props.track);
    }
    
    return (
        <div className="Track">
            <div className="Track-information">
                <h3>{props.track.name}</h3>
                <p>{props.track.artist} | {props.track.album}</p>
            </div>
            <button className="Track-action" onClick={addTrack}>
                {renderAction(props.isRemoval)}
            </button>
        </div>
    );
}

export default Track;