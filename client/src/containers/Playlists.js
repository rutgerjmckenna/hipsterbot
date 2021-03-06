import React from 'react';
import Spotify from 'spotify-web-api-js'

const spotifyWebApi = new Spotify();


class Playlists extends React.Component{

    state = {
        starredPlaylist: {}
    }


    //refactor later to check if name is starred, not just first in the array!
    componentDidMount() {
        spotifyWebApi.getUserPlaylists('rubbermchenna')
        .then((response) => {
            let starred = response.items[0]
            this.setState({starredPlaylist: starred})
        })
    }

    addToSaved() {
        console.log("uri prompt:", this.props.uri)
        spotifyWebApi.addToMySavedTracks([this.props.uri])
        .then((response) => {
            console.log("add to saved:", response)
        })
    }

    removeFromSaved() {
        spotifyWebApi.removeFromMySavedTracks([this.props.uri])
        .then((response) => {
            console.log("removed from saved:", response)
        })
    }
 

    render() {
        return(
            <div>
                <button onClick={() => this.addToSaved()} class="ui inverted button">
                    Add to Saved
                </button>
                <br></br>
                <br></br>
                <button onClick={() => this.removeFromSaved()} class="ui inverted button">
                    Remove from Saved
                </button>
            </div>
        )
    }
}

export default Playlists