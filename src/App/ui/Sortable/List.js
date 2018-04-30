// import React dependecies
import React from 'react';

// import Sortable dependecies
import { SortableContainer } from 'react-sortable-hoc';

// import de sortable list items
import SortableItem from './Item';

// create sortable list
const SortableList = SortableContainer(({players, comments, handleTextChange, points}) => {
    // render the list
    return (
      <ul className="collapsible" data-collapsible="accordion">      
        {players.map((value, index) => (
            <SortableItem 
              key={`item-${index}`} 
              sortIndex={index} 
              index={index} 
              value={value} 
              handleTextChange={handleTextChange}
            />
        ))}
      </ul>
    );
});
  
// export the list for use in other files/components
export default SortableList;