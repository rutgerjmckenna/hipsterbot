import React from 'react';


class PlayerButton extends React.Component{

    state = {
        clicked: false
    }

    clickHandler = (event) => {
        if(event.target.value === false){
            event.target.value === true
        } elseif(event.target.value === true) {
            event.target.value === false
        }
    }

    render() {
        return(
            <div>
                <button value={this.state.clicked} onClick={()=>this.clickHandler}> Expand Player </button>
            </div>
        )
    }
}

export default PlayerButton