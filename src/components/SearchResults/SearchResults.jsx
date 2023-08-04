import TrackList from '../TrackList/TrackList';

import './SearchResults.css';

const SearchResults = (props) => {
    return (
        <div className="search-results">
            <h2>Results</h2>
            <hr />
            <TrackList
                isRemoval={false}
                tracks={props.searchResults}
                onAdd={props.onAdd}
                onRemove={null}
            />
        </div>
    );
}

export default SearchResults;