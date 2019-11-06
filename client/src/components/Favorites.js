import React from 'react';
import Spotify from 'spotify-web-api-js'
import SavedCard from './SavedCard'

const spotifyWebApi = new Spotify();

class Favorites extends React.Component{


    state = {
        topArtists: [],
        topTracks: [],
        recentlyPlayed: [],
        savedTracks: []
    }

    getSavedTracks(){
        spotifyWebApi.getMySavedTracks()
        .then((response) => {
            console.log(response.items)
            let savedArray = response.items
            this.setState({savedTracks: savedArray})
        })
    }


    render(){
        let savedTrackScroll = this.state.savedTracks.map(trackObj => <SavedCard song={trackObj}/>)
        return(
            <div>
                <button onClick={() => this.getSavedTracks()} class="ui inverted button">Saved Tracks</button>
                <div className="My-playlist-scroll">
                {savedTrackScroll}
                </div>
            </div>
        )
    }


}

export default Favorites