import React from 'react';

const SearchCard = (props) => {
    console.log('artist props:', props.artist)
    return(

        <div> 
            <p>Ahoy!</p>
            {/* {props.artist.name} */}
            {/* {props.artist.pic.url === undefined ? <p></p> : <img src={props.artist.pic.url}  alt='' style={{width: 100}}/>} */}
            <br></br>
        </div>

    )

}

export default SearchCard