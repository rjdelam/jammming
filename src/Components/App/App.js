import './App.css';
import React from 'react';
import ReactDOM from 'react-dom';
import {Playlist} from '../Playlist/Playlist.js';
import {SearchBar} from '../SearchBar/SearchBar.js';
import {SearchResults} from '../SearchResults/SearchResults.js';
import {Spotify} from '../util/Spotify.js';



class App extends React.Component 
{

  constructor(props)
  {
    super(props);
    this.state = {
      searchResults: [],
      playlistName: 'New Playlist',
      playlistTracks: []
    }
    this.addTrack = this.addTrack.bind(this);
    this.removeTrack = this.removeTrack.bind(this);
    this.updatePlaylistNames = this.updatePlaylistNames.bind(this);
    this.savePlaylist = this.savePlaylist.bind(this);
    this.search = this.search.bind(this);
  }

  addTrack(track)
  {
    if(this.state.playlistTracks.find(savedTrack => savedTrack.id === track.id))
    {
      return;
    }
    else
    {
      this.state.playlistTracks.push(track);
      this.setState({playlistTracks: this.state.playlistTracks});
    } 
  }

  removeTrack(track)
  {
    const trackIndex = this.state.playlistTracks.indexOf(track);
    this.state.playlistTracks.splice(trackIndex, trackIndex + 1);
    this.setState({playlistTracks: this.state.playlistTracks});
  }

  updatePlaylistNames(name)
  {
    this.setState({playlistName: name})
  }

  savePlaylist()
  {
    Spotify.savePlaylist(this.state.playlistName, this.state.playlistTracks);
  }

  async search(term)
  {
    this.searchResults = await Spotify.search(term);
    this.setState({searchResults: this.searchResults});
  }

  render()
  {
    return (
      <div>
        <h1>Ja<span className="highlight">mmm</span>ing</h1>
        <div className="App">
          <SearchBar onSearch={this.search}/>
          <div className="App-playlist">
            <SearchResults searchResults={this.state.searchResults} onAdd={this.addTrack}/>
            <Playlist playlistName={this.state.playlistName} playlistTracks={this.state.playlistTracks} onRemove={this.removeTrack} onNameChange={this.updatePlaylistNames} onSave={this.savePlaylist}/>
          </div>
        </div>
      </div>
    );
  }
}

export default App;