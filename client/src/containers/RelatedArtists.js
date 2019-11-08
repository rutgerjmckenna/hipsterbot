import React from 'react';
import Spotify from 'spotify-web-api-js'
import Playlists from './Playlists'
import Suggestion from '../components/Suggestion'
import SongInfo from '../components/SongInfo'

const spotifyWebApi = new Spotify();

class RelatedArtists extends React.Component {

    state = {
        foundTrackUri: ''
    }


    topTracks(){
        spotifyWebApi.getArtistTopTracks(this.props.id, "US")
            .then((response) => {
                let endArray = response.tracks.slice(6)
                let randomChoice = endArray[Math.floor(Math.random() * endArray.length)]
                let topTrackUri = randomChoice.uri.substr(14)
                this.setState({foundTrackUri: topTrackUri})
            })
    }
    // addToStarred(){
    //     spotifyWebApi.addToMySavedTracks(this.state.foundTrackUri)
    //     .then((response) => {
    //         console.log("response:", response)
    //     })
    // }



    render() {
        // let allRelated = this.state.relatedArtists.map(artist => <RelatedCard name={artist.name} pic={artist.images[0].url} key=''/>)
        return(
            <body className="Suggestion-box">
                <Suggestion uri={this.state.foundTrackUri}/>
                <button onClick={() => this.topTracks()} class="ui inverted button">
                    Find Artist
                </button>
                <br></br>
                <SongInfo uri={this.state.foundTrackUri} nowPlayingUri={this.props.nowPlayingUri}/>
                <br></br>
                <Playlists uri={this.state.foundTrackUri}/>
                <br></br>
            </body>
        )
    }
}

export default RelatedArtists

//NOTES NOTES NOTES NOTES NOTES

// <div> 
// {this.state.relatedNames}
// <img src={this.state.relatedPics}  alt='' style={{width: 100}}/>
// <br></br>
// <br></br>
// </div>



//ORIGINAL TOP TRACKS BEFORE RANDOM REFACTOR
// topTracks(){
//     spotifyWebApi.getArtistTopTracks(this.state.leastPopular, "US")
//         .then((response) => {
//             console.log("response:", response)
//             let topTrackUri = response.tracks[9].uri.substr(14)
//             this.setState({foundTrackUri: topTrackUri})
//         })
// }

  // let allRelated = this.state.relatedArtists.map(artist => <RelatedCard name={artist.name} pic={artist.images[0].url} key=''/>)
  //map over to find related artists above



//BEFORE REFACTOR
// getRelatedArtists(){
//     spotifyWebApi.getArtistRelatedArtists(this.props.id)
//       .then((response) => {
//         let relatedArtists = response.artists.map(artist => artist)
//         this.setState({relatedArtists: relatedArtists})
//       })
//   }

//LEAST POPULAR ORIGINAL
    // leastPopularArtist(){
    //     let sorted = this.state.relatedArtists.sort((a,b) => (a.popularity > b.popularity) ? 1 : -1)
    //     let startArray = sorted.slice(0, 3)
    //     let randomChoice = startArray[Math.floor(Math.random() * startArray.length)]
    //     this.setState({leastPopular: randomChoice.id})
    // }