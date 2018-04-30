// import React dependecies
import React from 'react';

// import Sortable dependecies
import { SortableElement } from 'react-sortable-hoc';

// import CommentInput component
import CommentInput from './Input';

// create sortable list item
const SortableItem = SortableElement(({value, sortIndex, handleTextChange}) => {
    // calculate the point, based on the posision within the list
  
    // declare the player's name
    var playerName = value.player;
    
    // render the component
    return (
      <li id={value.player}>
        <div className="collapsible-header">{value.player}<span className="badge">{value.points}</span></div>
        <div className="collapsible-body"><span><CommentInput index={sortIndex} player={playerName} comment={value.comment} handleTextChange={(text, playerName, sortIndex) => handleTextChange(text, playerName, sortIndex)} /></span></div>
      </li>
    )
});

// export the item(s) for use in other files/components
export default SortableItem;