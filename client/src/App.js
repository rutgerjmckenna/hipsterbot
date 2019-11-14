import React from 'react';
import './App.css';
import RelatedArtists from './containers/RelatedArtists'
import Player from './components/Player';
import Follower from './components/Follower';
import Favorites from './containers/Favorites'
import './Semantic-UI-CSS-master/semantic.min.css'
import { Grid, Image } from 'semantic-ui-react'
import { Header } from 'semantic-ui-react'
import { Card } from 'semantic-ui-react'
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
    <Grid style={{borderBottomColor: 'Aqua', borderStyle: 'solid', borderWidth: '20px'}}>
      <Grid.Column width={13}>
        <br></br>
        <Header style={{fontSize: '10em', float: 'left', fontFamily: 'outrun future', color: 'DeepPink', textShadow: '0 0 15px aqua, 0 0 20px aqua, 0 0 20px aqua'}}>Hipster Bot</Header>
      </Grid.Column>
      <Grid.Column width={2}>
        <h2 class="ui header" style={{fontFamily: 'morning star', color: 'DeepPink'}}>
          {this.state.userInfo.name}
        </h2>
        <Image circular src={this.state.userInfo.image} style={{borderColor: 'Aqua', borderStyle: 'solid', borderWidth: '5px', boxShadow: '0 0 15px aqua, 0 0 20px aqua, 0 0 20px aqua'}} />
        <br></br>
        <br></br>
        <a href={this.state.userInfo.spotifyUrl}>
          <button class="ui black button" style={{fontFamily: 'morning star', color: 'DeepPink', fontSize: '20px'}}>Open Spotify</button>
        </a>
      </Grid.Column>
    </Grid> 

    let myInfo = <div>
      <img src={this.state.userInfo.image} alt=''/>
      <h1>{this.state.userInfo.name}</h1>
      <h5>Followers {this.state.userInfo.followers}</h5>
      <a href={this.state.userInfo.spotifyUrl}>
        <button class="ui button">Open Spotify</button>
      </a>
      <Favorites/>
    </div>

    let arrows = this.state.nowPlaying.name !== '' ? <div><img src='https://www.stickpng.com/assets/thumbs/580b57fcd9996e24bc43c43d.png' alt='' style={{position: 'absolute', right: '-4.5em', width: '150px', top: '49em'}}/><img src='https://www.stickpng.com/assets/thumbs/580b57fcd9996e24bc43c43d.png' alt='' style={{position: 'absolute', right: '-4.5em', width: '150px', top: '37em'}}/><img src='https://www.stickpng.com/assets/thumbs/580b57fcd9996e24bc43c43d.png' alt='' style={{position: 'absolute', right: '-4.5em', width: '150px', top: '43em'}}/></div> : ''

    let disco = this.state.nowPlaying.name !== '' ? <img src='https://ryanmartinproductions.com/image/210389-full_disco-ball-clipart-free-download-best-disco-ball-clipart-on.png' alt='' style={{width: '250px', marginLeft: '80px', marginTop: '70px'}}/> : ''

    //Check currently playing
    let nowPlayingName = this.state.nowPlaying.name !== '' ? <div style={{fontFamily: 'morning star', color: 'DeepPink', fontSize: '20px'}}> Now Playing <br></br><br></br><div style={{fontFamily: 'outrun future', color: 'Aqua', fontSize: '40px', lineHeight: '50px'}}> {this.state.nowPlaying.name} </div><br></br><div  style={{fontFamily: 'morning star', color: 'DeepPink', fontSize: '20px'}}> by </div><div style={{fontFamily: 'outrun future', color: 'Aqua', fontSize: '30px', lineHeight: '50px'}}> {this.state.nowPlaying.artist} </div></div> : ''
    let nowPlayingImage = this.state.nowPlaying.name !== '' ? <div><img src={this.state.nowPlaying.image} alt='' style={{width: '500px', borderStyle: 'solid', borderColor: '#ff009a', borderWidth: '5px', boxShadow: '0 0 15px #ff009a, 0 0 20px #ff009a, 0 0 20px #ff009a'}}/></div> : ''
    let nowPlayingDevice = this.state.nowPlaying.name !== '' ? <div style={{fontFamily: 'morning star', color: 'DeepPink', fontSize: '20px'}}>Playing off <br></br><div style={{fontFamily: 'outrun future', color: 'Aqua', fontSize: '20px'}}> {this.state.nowPlaying.device} </div></div> : ''

    let nowPlayingCard = 
    <Card color='pink'>
      <Image src={this.state.nowPlaying.image} alt='' style={{width: 300}}/>
      <Card.Content>
        <Card.Header>{this.state.nowPlaying.artist}</Card.Header>
        <Card.Description>
        {this.state.nowPlaying.name}
        </Card.Description>
      </Card.Content>
      <Card.Content extra>
        {this.state.nowPlaying.device}
      </Card.Content>
    </Card>

    let whatsPlaying = this.state.nowPlaying.name !== '' ? nowPlayingCard : ''

    return (
      <div>
          <a href="http://localhost:8888">
            <button class="ui black button" style={{fontFamily: 'morning star', color: 'DeepPink', fontSize: '20px'}}>Login</button>
          </a>
        <br></br>
            {myProfile}
        <br></br>
        <br></br>
        <Grid>
        <Grid.Column floated='left' width={5} style={{borderStyle: 'solid', borderColor: '#ff009a', borderWidth: '5px', boxShadow: '0 0 15px #ff009a, 0 0 20px #ff009a, 0 0 20px #ff009a'}}>
          <button onClick={() => this.getNowPlaying()} class="ui black button" style={{marginLeft: '23px', fontFamily: 'morning star', color: 'DeepPink', fontSize: '20px'}}>
            Check Now PLaying
          </button>
        <br></br>
        <br></br>
        <br></br>
            <div>
              {nowPlayingName}
            </div>
            <br>
            </br>
            <div>
            {nowPlayingImage}
            <br>
            </br>
            </div>
            <div>
            {nowPlayingDevice}
            </div>
        <br></br>
            <Follower uri={this.state.nowPlaying.artistUri}/>
            <Player uri={this.state.nowPlaying.albumUri}/>
            {disco}
        <br></br>
        </Grid.Column>
        <Grid.Column style={{borderColor: 'Aqua', borderWidth: '10px', borderStyle: 'double', boxShadow: '0 0 15px aqua, 0 0 20px aqua, 0 0 20px aqua', width: '0px'}}>
          {arrows}
        </Grid.Column>
          <Grid.Column floated='right' width={5} style={{borderStyle: 'solid', borderColor: '#ff009a', borderWidth: '5px', boxShadow: '0 0 15px #ff009a, 0 0 20px #ff009a, 0 0 20px #ff009a'}}>
            <RelatedArtists id={this.state.relatedArtists} nowPlayingUri={currentUri}/>
            <br></br>
            <br></br>
            <br></br>
          <Favorites/>
          </Grid.Column>
          </Grid>
      </div>
    );
  }
}

export default App;

/*
<Header as='h2'>
  <Image src='client/public/Screen Shot 2019-11-12 at 3.51.38 PM.png' />
</Header>


<Header style={{fontSize: '10em', float: 'left'}}>Title</Header>
*/