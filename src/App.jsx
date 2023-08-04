import { useState } from 'react';

import Spotify from './util/Spotify';
// import * as mockData from './util/mockData';

import Playlist from './components/Playlist/Playlist';
import SearchBar from './components/SearchBar/SearchBar';
import SearchResults from './components/SearchResults/SearchResults.jsx';
import Footer from './components/Footer/Footer';

import './App.css'


function App() {
	const [searchResults, setSearchResults] = useState([]);
	const [playlistTracks, setPlaylistTracks] = useState([]);
	const [playlistName, setPlaylistName] = useState('Enter Playlist Name');

	// ADD TRACK TO PLAYLIST
	function addTrack(track) {
		// Do nothing if track already exists in playlist
		if (playlistTracks.find(savedTrack => savedTrack.id === track.id)) {
			return;
		}

		setPlaylistTracks(prev => [...prev, track]);
	}

	// REMOVE TRACK FROM PLAYLIST
	function removeTrack(track) {
		// Filter tracks into playlistTracks with id not equal to track.id
		setPlaylistTracks(prev => prev.filter(t => t.id !== track.id));
	}

	// UPDATE PLAYLIST NAME
	function updatePlaylistName(name) {
		setPlaylistName(name);
	}

	// SAVE PLAYLIST
	function savePlaylist() {
		// Get track URIs from playlistTracks
		const trackURIs = playlistTracks.map(track => track.uri);

		Spotify.savePlaylist(playlistName, trackURIs)
		.then(() => {
			setPlaylistName('New Playlist');
			setPlaylistTracks([]);
		});
	}

	// SEARCH
	function search(term) {
		console.log(term);

		Spotify.search(term)
			.then(searchResults => {
			setSearchResults(searchResults);
		});
	}

	return (
		<div className="app-container">
			<h1>Ja<span className="highlight">mmm</span>ing</h1>
			<div className="app">
				<div className="row">
					<div className="col-12">
						<div className="search-input">
							<SearchBar onSearch={search} />
						</div>
					</div>
				</div>

				<div className="app-body row">
					<div className="col-6">
						<div className="search-results-container">
							<SearchResults
								onAdd={addTrack}
								searchResults={searchResults}
							/>
						</div>
					</div>
					<div className="col-6">
						<div className="playlist-container">
							<Playlist
								playlistName={playlistName}
								playlistTracks={playlistTracks}
								onRemove={removeTrack}
								onNameChange={updatePlaylistName}
								onSave={savePlaylist}
							/>
						</div>
					</div>
				</div>
			</div>
			<Footer />
		</div>
	);
}

export default App;