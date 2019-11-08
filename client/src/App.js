import React from 'react';
import './App.css';
import RelatedArtists from './containers/RelatedArtists'
import Player from './components/Player';
import Follower from './components/Follower';
import Favorites from './containers/Favorites'
import './Semantic-UI-CSS-master/semantic.min.css'
import { Grid, Image } from 'semantic-ui-react'
import Spotify from 'spotify-web-api-js'

const spotifyWebApi = new Spotify();

class App extends React.Component{

  constructor(){
    super();
    const params = this.getHashParams();
    this.state ={
      loggedIn: params.access_token ? true : false,
      nowPlaying: {
        name: '',
        image: '',
        artist: '',
        device: '',
        deviceId: '',
        artistId: '',
        albumUri: '',
        artistUri: '',
        trackId: ''
      },
      userInfo: {
        name: '',
        image: '',
        followers: 0,
        spotifyUrl: ''
      },
      relatedArtists: []
    }
    if(params.access_token){
      spotifyWebApi.setAccessToken(params.access_token)
    }
  }

  getHashParams() {
    var hashParams = {};
    var e, r = /([^&;=]+)=?([^&;]*)/g,
        q = window.location.hash.substring(1);
    while ( e = r.exec(q)) {
       hashParams[e[1]] = decodeURIComponent(e[2]);
    }
    return hashParams;
  }
  

  componentDidMount(){
    spotifyWebApi.getUser('rubbermchenna')
    .then((response) => {
      this.setState({userInfo: {
        name: response.display_name,
        image: response.images[0].url,
        followers: response.followers.total,
        spotifyUrl: response.external_urls.spotify
      }
      })
    })
  }


  getNowPlaying(){
    spotifyWebApi.getMyCurrentPlaybackState()
      .then((response) => {
        this.setState({nowPlaying: {
          name: response.item.name,
          image: response.item.album.images[0].url,
          artist: response.item.artists[0].name,
          device: response.device.name,
          deviceId: response.device.id,
          artistId: response.item.artists[0].id,
          albumUri: response.item.album.uri,
          artistUri: response.item.artists[0].uri,
          trackId: response.item.id
        }})
        this.getRelatedArtists()
      })
  }

  skipToNextSong(){
    spotifyWebApi.skipToNext()
    .then((response) => {
      console.log("skip response:", response)
    })
    this.getNowPlaying()
  }


  //get the api to both randomize artists AND tracks rather than just tracks
  getRelatedArtists(){
    spotifyWebApi.getArtistRelatedArtists(this.state.nowPlaying.artistId)
      .then((response) => {
        let relatedArtists = response.artists.map(artist => artist)
        let sorted = relatedArtists.sort((a,b) => (a.popularity > b.popularity) ? 1 : -1)
        let startArray = sorted.slice(0, 3)
        let randomChoice = startArray[Math.floor(Math.random() * startArray.length)]
        this.setState({relatedArtists: randomChoice.id})
      })
  }

  render() {
    //User Info
    let currentUri = this.state.nowPlaying.trackId
    
    let myProfile =
    <h2 class="ui header">
      <img src={this.state.userInfo.image} class="ui circular image" />
      {this.state.userInfo.name}
    </h2>


    let myInfo = <div>
      <img src={this.state.userInfo.image} alt='' className="Profile-img"/>
      <h1 className="Profile-name">{this.state.userInfo.name}</h1>
      <h5 className="Profile-name">Followers {this.state.userInfo.followers}</h5>
      <a href={this.state.userInfo.spotifyUrl} className="Profile-name">
        <button class="ui inverted button">Open Spotify</button>
      </a>
      <Favorites/>
    </div>

    //Check currently playing
    let nowPlayingName = this.state.nowPlaying.name !== '' ? <div className="White-font"> Now Playing: <br></br> {this.state.nowPlaying.artist} <br></br> {this.state.nowPlaying.name } </div> : ''
    let nowPlayingImage = this.state.nowPlaying.name !== '' ? <div><img src={this.state.nowPlaying.image} alt='' style={{width: 300}}/></div> : ''
    let nowPlayingDevice = this.state.nowPlaying.name !== '' ? <div className="White-font">Playing off of: <br></br> {this.state.nowPlaying.device}</div> : ''

    return (
      <div className="App">
          <a href="http://localhost:8888" className="Login">
            <button class="ui inverted button">Login With Current Active Spotify Account</button>
          </a>
        <br></br>
            {myInfo}
        <br></br>
        <br></br>
          <button onClick={() => this.getNowPlaying()} class="ui inverted button">
            Check Now Playing
          </button>
        <br></br>
        <br></br>
        <br></br>
          <button onClick={() => this.skipToNextSong()} class="ui inverted button">Skip To Next Song</button>
        <br></br>
        <br></br>
            <div className="Now-name">
              {nowPlayingName}
            </div>
            <div className="Now-image">
            {nowPlayingImage}
            </div>
            <div className="Now-device">
            {nowPlayingDevice}
            </div>
        <br></br>
            <Follower uri={this.state.nowPlaying.artistUri} className="Follow-button"/>
        <br></br>
        <br></br>
        <br></br>
        <br></br>
        <br></br>
        <br></br>
            <Player uri={this.state.nowPlaying.albumUri}/>
        <br></br>
            <RelatedArtists id={this.state.relatedArtists} nowPlayingUri={currentUri} className="Suggestion-box"/>
            <br></br>
            <br></br>
            <br></br>
          <img src="https://www.freeiconspng.com/uploads/robot-icon-6.png" className="Img"/>
      </div>
    );
  }
}

export default App;
