import React from 'react';
import Spotify from 'spotify-web-api-js'

const spotifyWebApi = new Spotify();

class SongInfo extends React.Component{

    state = {
        //FOUND TRACK
        features: {
            acousticness: '',
            danceability: '',
            energy: '',
            instrumentalness: '',
            liveness: '',
            loudness: '',
            speechiness: '',
            bandName: ''
        },
        songInfo: {
            albumName: '',
            albumImage: '',
            artistName: '',
            songName: '',
            releaseDate: '',
            trackNumber: ''
        },
        //CURRENTLY PLAYING
        nowFeatures: {
            acousticness: '',
            danceability: '',
            energy: '',
            instrumentalness: '',
            liveness: '',
            loudness: '',
            speechiness: '',
            bandName: ''
        },
        nowInfo: {
            albumName: '',
            albumImage: '',
            artistName: '',
            songName: '',
            releaseDate: '',
            trackNumber: ''
        }
    }

    //SUGGESTED TRACK
    audioFeatures(){
        spotifyWebApi.getAudioFeaturesForTrack(this.props.uri)
        .then((response) => {
            this.setState({features: {
                acousticness: response.acousticness,
                danceability: response.danceability,
                energy: response.energy,
                instrumentalness: response.instrumentalness,
                liveness: response.liveness,
                loudness: response.loudness,
                speechiness: response.speechiness
            }
            })
        })
        this.getSong()
        this.getNowSong()
        this.audioFeaturesNowPlaying()
    }


    //NOW PLAYING
    audioFeaturesNowPlaying(){
        spotifyWebApi.getAudioFeaturesForTrack(this.props.nowPlayingUri)
        .then((response) => {
            this.setState({nowFeatures: {
                acousticness: response.acousticness,
                danceability: response.danceability,
                energy: response.energy,
                instrumentalness: response.instrumentalness,
                liveness: response.liveness,
                loudness: response.loudness,
                speechiness: response.speechiness
            }
        })
        })
    }


    //SUGGESTED TRACK
    getSong(){
        spotifyWebApi.getTrack(this.props.uri)
        .then((response) => {
            this.setState({songInfo: {
                albumName: response.album.name,
                albumImage: response.album.images[0].url,
                artistName: response.artists[0].name,
                songName: response.name,
                releaseDate: response.album.release_date,
                trackNumber: response.track_number
            }
            })
        })
    }

    //NOW PLAYING
    getNowSong(){
        spotifyWebApi.getTrack(this.props.nowPlayingUri)
        .then((response) => {
            this.setState({nowInfo: {
                albumName: response.album.name,
                albumImage: response.album.images[0],
                artistName: response.artists[0].name,
                songName: response.name,
                releaseDate: response.album.release_date,
                trackNumber: response.track_number
            }
            })
        })
    }





    render() {

        let dance = this.state.features.danceability > this.state.nowFeatures.danceability ? <p> easier to dance to </p> : <p> less danceable </p>
        let energy = this.state.features.energy > this.state.nowFeatures.energy ? <p> more energetic </p> : <p> less energetic </p>
        let loud = this.state.features.loudness > this.state.nowFeatures.loudness ? <p> louder </p> : <p> softer </p>
        let talky = this.state.features.speechiness > this.state.nowFeatures.speechiness ? <p> has more lyrics </p> : <p> has less lyrics </p>
        let instrumental = this.state.features.instrumentalness > this.state.nowFeatures.instrumentalness ? <p> more instrumental </p> : <p> less instrumental </p>
        let acoustic = this.state.features.acousticness > this.state.nowFeatures.acousticness ? <p> more acoustic </p> : <p> less acoustic </p>

        let advice = this.state.features.acousticness === '' ? '' :
        <div className="White-font">
            <h3>Beep boop!</h3>
            <img src={this.state.songInfo.albumImage} alt="" style={{width: 250}}/>
            <h2>{this.state.songInfo.songName}</h2>
            <h4>by</h4>
            <h2>{this.state.songInfo.artistName}</h2>
            <br></br>
            <br></br>
            {dance}
            {energy}
            {loud}
            {talky}
            {instrumental}
            {acoustic}
        </div>















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
            {advice}
            <button onClick={() => this.audioFeatures()} class="ui inverted button">
                Get Song Info
            </button>
        </div>
    )}
}

export default SongInfo