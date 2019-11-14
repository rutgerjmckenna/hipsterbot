import React from 'react';
import Spotify from 'spotify-web-api-js'
import { Button } from 'semantic-ui-react';

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
            <div class="ui buttons">
                <Button.Group compact>
                <Button onClick={() => this.addToSaved()} color='black' style={{fontFamily: 'outrun future', color: 'DeepPink', fontSize: '20px'}}>
                    Save
                </Button>
                <Button onClick={() => this.removeFromSaved()} color='black' style={{fontFamily: 'outrun future', color: 'Aqua', fontSize: '20px'}}>
                    Remove
                </Button>
                </Button.Group>
            </div>
        )
    }
}

export default Playlists