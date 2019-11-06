import React from 'react';
import Spotify from 'spotify-web-api-js'
import SearchCard from './SearchCard'

const spotifyWebApi = new Spotify();

class SearchBar extends React.Component{

    constructor(){
        super();
        const params = this.getHashParams();
        this.state ={
          loggedIn: params.access_token ? true : false,
          query: '',
          searchedArtists: []
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
        console.log(hashParams)
        return hashParams;
      }

      handleSearch = (event) => {
        this.setState({query: event.target.value})
        this.getSearchedArtists()
    }

    getSearchedArtists() {
        spotifyWebApi.searchArtists(this.state.query)
            .then((response) => {
                // debugger
                console.log(response)
                console.log(response.artists.items)
                let foundArtists = response.artists.items.map(artist => artist.name.includes(this.state.query) ? artist : null)
                console.log(foundArtists)
                this.setState({searchedArtists: foundArtists})

                // let items = response.tracks.items.map(item => item)
                // let artists = items.map(artist => artist)
                // debugger
                // let foundArtist = response.tracks.items.artists.name.map(artist => artist.includes(this.state.query))
                // this.setState({searchedTrack: {name: foundArtist}})
                //     console.log(this.state.searchedTrack.name)
            })
        }

        // handleSearch = (event) => {
        //     this.setState({query: event.target.value})
        // }
    
        preventDefaulter = (event) => {
            event.preventDefault()
            this.getSearchedArtists()
        }

    render() {
        let allSearch = this.state.searchedArtists.map(artist => <SearchCard artist={artist}/>)
        return(
            <div>
                <form onSubmit={this.preventDefaulter}>
                    <input type='text' placeholder='Search for Track' value={this.state.query} onChange={this.handleSearch}/>
                    <input type='submit'/>
                </form>

                {allSearch}
            </div>
        )//end of return
    }//end of render
}//end of class

export default SearchBar

