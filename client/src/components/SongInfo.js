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

        let dance = this.state.features.danceability > this.state.nowFeatures.danceability ? <p style={{fontFamily: 'morning star', color: 'DeepPink', fontSize: '30px', margin: '0px'}}> more danceable</p> : <h2 style={{fontFamily: 'morning star', color: 'DeepPink', fontSize: '30px', margin: '0px'}}> less danceable </h2>
        let energy = this.state.features.energy > this.state.nowFeatures.energy ? <p style={{fontFamily: 'morning star', color: 'DeepPink', fontSize: '30px', margin: '0px'}}> more energetic </p> : <p style={{fontFamily: 'morning star', color: 'DeepPink', fontSize: '30px', margin: '0px'}}> less energetic </p>
        let loud = this.state.features.loudness > this.state.nowFeatures.loudness ? <p style={{fontFamily: 'morning star', color: 'DeepPink', fontSize: '30px', margin: '0px'}}> louder </p> : <p style={{fontFamily: 'morning star', color: 'DeepPink', fontSize: '30px', margin: '0px'}}> softer </p>
        let talky = this.state.features.speechiness > this.state.nowFeatures.speechiness ? <p style={{fontFamily: 'morning star', color: 'DeepPink', fontSize: '30px', margin: '0px'}}> more lyrical </p> : <p style={{fontFamily: 'morning star', color: 'DeepPink', fontSize: '30px', margin: '0px'}}> less lyrical </p>
        let instrumental = this.state.features.instrumentalness > this.state.nowFeatures.instrumentalness ? <p style={{fontFamily: 'morning star', color: 'DeepPink', fontSize: '30px', margin: '0px'}}> more instrumental </p> : <p style={{fontFamily: 'morning star', color: 'DeepPink', fontSize: '30px', margin: '0px'}}> less instrumental </p>
        let acoustic = this.state.features.acousticness > this.state.nowFeatures.acousticness ? <p style={{fontFamily: 'morning star', color: 'DeepPink', fontSize: '30px', margin: '0px'}}> more acoustic </p> : <p style={{fontFamily: 'morning star', color: 'DeepPink', fontSize: '30px', margin: '0px'}}> less acoustic </p>

        let advice = this.state.features.acousticness === '' ? '' :
        <div>
            <br>
            </br>
            <h2 style={{fontFamily: 'outrun future', color: 'Aqua', fontSize: '40px'}}>{this.state.songInfo.songName}</h2>
            <h4 style={{fontFamily: 'morning star', color: 'DeepPink', fontSize: '20px'}}>by</h4>
            <h2 style={{fontFamily: 'outrun future', color: 'Aqua', fontSize: '30px'}}>{this.state.songInfo.artistName}</h2>
            <br>
            </br>
            <br>
            </br>
            <img src={this.state.songInfo.albumImage} alt="" style={{width: '100%', borderStyle: 'solid', borderColor: '#ff009a', borderWidth: '5px', position: 'relative', boxShadow: '0 0 15px #ff009a, 0 0 20px #ff009a, 0 0 20px #ff009a'}}/>
            <br></br>
            <br></br>
            <h2 style={{fontFamily: 'outrun future', color: 'Aqua', fontSize: '30px'}}>This song is</h2>
            <br></br>
            {dance}
            {energy}
            {loud}
            {talky}
            {instrumental}
            {acoustic}
            <h2 style={{fontFamily: 'outrun future', color: 'Aqua', fontSize: '30px'}}>than yours</h2>
        </div>















        let songBreakdown = this.state.acousticness === '' ? '' :
        <ul>
            <li>Acousticness: {this.state.acousticness}</li>
            <li>Danceability: {this.state.danceability}</li>
            <li>Energy: {this.state.energy}</li>
            <li>Instrumentalness: {this.state.instrumentalness}</li>
            <li>Liveness: {this.state.liveness}</li>
            <li>Loudness: {this.state.loudness}</li>
            <li>Speechiness: {this.state.speechiness}</li>
        </ul>

        return(
        <div  className='Song-info'>
            <br></br>
            <button onClick={() => this.audioFeatures()} class="ui black button" style={{fontFamily: 'morning star', color: 'DeepPink', fontSize: '20px'}}>
                Get Song Info
            </button>
            {advice}
        </div>
    )}
}

export default SongInfo