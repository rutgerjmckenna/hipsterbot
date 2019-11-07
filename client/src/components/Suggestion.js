import React from 'react';

const Suggestion = (props) => {


    let showPlayer = props.uri === '' ? '' : <div><h4 className="White-font">Beep boop music 4 u!</h4><br></br><iframe src={`https://open.spotify.com/embed/track/${props.uri}`} title='player' width="300" height="80" frameborder="0" allowtransparency="true" allow="encrypted-media"></iframe></div>
    return(
        <body className="Suggestion-box">
            {showPlayer}
        </body>
    )

}

export default Suggestion