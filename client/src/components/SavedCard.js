import React from 'react';
import { List, Image } from 'semantic-ui-react'

const SavedCard = (props) => {
    console.log('props:', props.song.track.name)
    
    return(
        <List>
            <List.Item>
                <Image avatar size='small' src={props.song.track.album.images[0].url} />
                <List.Content>
                    <List.Header size='small' style={{fontFamily: 'outrun future', color: 'Aqua', fontSize: '20px', lineHeight: '20px'}}>{props.song.track.artists[0].name}</List.Header>
                    <List.Description size='small' style={{fontFamily: 'outrun future', color: 'DeepPink', fontSize: '20px', lineHeight: '20px'}}>{props.song.track.name}</List.Description>
                </List.Content>
            </List.Item>
        </List>
    )

}

export default SavedCard;


// <div>
//             <h4 className="White-font">{props.song.track.artists[0].name}</h4>
//             <br></br>
//             <img src={props.song.track.album.images[0].url} alt='' className="My-playlist-img"/>
//             <p className="White-font">--------------------------------</p>
//         </div>