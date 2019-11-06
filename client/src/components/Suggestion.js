import React from 'react';

const Suggestion = (props) => {


    let showPlayer = props.uri === '' ? '' : <iframe src={`https://open.spotify.com/embed/track/${props.uri}`} title='player' width="300" height="80" frameborder="0" allowtransparency="true" allow="encrypted-media"></iframe>
    return(
        <body>
            {showPlayer}
        </body>
    )

}

export default Suggestion