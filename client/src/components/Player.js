import React from 'react';

//make player a class, adding a button component
//the BC will be a class to toggle small large player
//each with state for the button

const Player = (props) => {

    let newSrc = props.uri
    let mySrc = newSrc.substr(14)

    let showPlayer = props.uri === '' ? '' : <iframe src={`https://open.spotify.com/embed/album/${mySrc}`} title='player' width="300" height="380" frameborder="0" allowtransparency="true" allow="encrypted-media" className="Player"></iframe>

    return(
        <body>
            {showPlayer}
        </body>
    )

}

export default Player