import React from 'react';

const Suggestion = (props) => {


    let showPlayer = props.uri === '' ? '' : <div><iframe src={`https://open.spotify.com/embed/track/${props.uri}`} title='player' width="300" height="80" frameborder="0" allowtransparency="true" allow="encrypted-media"></iframe></div>
    return(
        <body className="Suggestion-box" style={{float: 'left', margin: '0px'}}>
            {showPlayer}
        </body>
    )

}

export default Suggestion