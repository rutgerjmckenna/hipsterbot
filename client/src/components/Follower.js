import React from 'react';

const Follower = (props) => {

    let showFollower = props.uri === '' ? '' : <iframe src={`https://open.spotify.com/follow/1/?uri=${props.uri}?si=04ZGONtUSzC40rICRJkAEA&size=detail&theme=dark`} title='follower' width="300" height="56" scrolling="no" frameborder="0" allowtransparency="true" className="Follow-button"></iframe> 

    return(
        <body>
           {showFollower}
        </body>
    )

}

//style="border:none; overflow:hidden;"

export default Follower