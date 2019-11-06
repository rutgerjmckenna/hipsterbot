import React from 'react';

const SavedCard = (props) => {
    console.log('props:', props.song.track)
    
    return(
        <div>
            <h4 className="White-font">{props.song.track.artists[0].name}</h4>
            <br></br>
            <img src={props.song.track.album.images[0].url} alt='' className="My-playlist-img"/>
            <p className="White-font">--------------------------------</p>
        </div>
    )

}

export default SavedCard;