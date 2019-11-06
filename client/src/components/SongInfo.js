import React from 'react';
import Spotify from 'spotify-web-api-js'

const spotifyWebApi = new Spotify();

class SongInfo extends React.Component{

    state = {
        acousticness: '',
        danceability: '',
        energy: '',
        instrumentalness: '',
        liveness: '',
        loudness: '',
        speechiness: ''
    }

    audioFeatures(){
        spotifyWebApi.getAudioFeaturesForTrack(this.props.uri)
        .then((response) => {
            this.setState({
                acousticness: response.acousticness,
                danceability: response.danceability,
                energy: response.energy,
                instrumentalness: response.instrumentalness,
                liveness: response.liveness,
                loudness: response.loudness,
                speechiness: response.speechiness
            })
        })
    }




    render() {

        let songBreakdown = this.state.acousticness === '' ? '' :
        <ul className="White-font">
            <li>Acousticness: {this.state.acousticness}</li>
            <li>Danceability: {this.state.danceability}</li>
            <li>Energy: {this.state.energy}</li>
            <li>Instrumentalness: {this.state.instrumentalness}</li>
            <li>Liveness: {this.state.liveness}</li>
            <li>Loudness: {this.state.loudness}</li>
            <li>Speechiness: {this.state.speechiness}</li>
        </ul>

        return(
        <div>
            <br></br>
            {songBreakdown}
            <button onClick={() => this.audioFeatures()} class="ui inverted button">
                Get Song Info
            </button>
        </div>
    )}
}

export default SongInfo