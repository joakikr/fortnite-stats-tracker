import React from 'react';

const Search = ({ onChange, onClick }) => (
  <div>
    <input
      type="text"
      placeholder="Brukernavn..."
      onChange={event => onChange(event.target.value)}
    />
    <button onClick={onClick}>Søk på bruker</button>
  </div>
);

export default Search;
