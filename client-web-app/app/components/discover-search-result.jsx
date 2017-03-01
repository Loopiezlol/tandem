import React from 'react';

// class SearchResult extends React.Component {
function SearchResult() {
  const name = 'Seba Raba';
  const description = 'This is the text we are going to use for description it has to be pretty long to be tested in a good manner.';
  const handleClick = () => {
  };
  return (
    <div className="main">
      <div className="search-result">
        <img className="search-result-image" src="https://facebook.github.io/react/img/logo_og.png" alt="HTML" />
        <p className="name">{name}</p>
        <p className="description">{description}</p>
        <button className="message-button" onClick={handleClick}> message </button>
      </div>
    </div>
  );
}

export default SearchResult;
