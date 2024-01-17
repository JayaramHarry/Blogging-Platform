import React from 'react';
import "./style.css"

// Display No Results Found when there is no blog
const NoResultsFound = () => {
  return (
    <div className='no-result-found'>
      <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQXbUVN4LoFDPL06BilyS8FJ506cqA5bW4gWQ&usqp=CAU" alt="noResultFound"/>
      <p>No results found</p>
    </div>
  );
};

export default NoResultsFound;
