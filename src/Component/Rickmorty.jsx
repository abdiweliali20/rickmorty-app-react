import React, { useState, useEffect } from 'react';
import './../index.css';

function RickAndMorty() {
  const apiUrl = "https://rickandmortyapi.com/api/character";
  const [characters, setCharacters] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [showCharacters, setShowCharacters] = useState(false);
  const [selectedCharacter, setSelectedCharacter] = useState(null);

  useEffect(() => {
    const fetchCharacters = async () => {
      try {
        const response = await fetch(apiUrl);
        if (!response.ok) {
          throw new Error('Failed to fetch character data');
        }
        const data = await response.json();
        setCharacters(data.results);
      } catch (error) {
        console.error('Error fetching character data:', error);
      }
    };

    fetchCharacters();

    return () => {
      // Cleanup code (if any)
    };
  }, []);

  const filteredCharacters = characters.filter(character =>
    character.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleSearchInputChange = (event) => {
    setSearchQuery(event.target.value);
    setShowCharacters(false);
    setSelectedCharacter(null);
  };

  const handleSearchButtonClick = () => {
    setShowCharacters(true);
    setSelectedCharacter(null);
  };

  const handleCharacterClick = (character) => {
    setSelectedCharacter(character);
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <header className="text-3xl font-bold mb-4">RICK$MORTY APP</header>
      <h2 className="text-xl font-semibold mb-2">Characters</h2>
      <nav className="mb-4">
        <input
          type="text"
          placeholder='Enter character name'
          value={searchQuery}
          onChange={handleSearchInputChange}
          className="border border-gray-300 rounded-md py-2 px-4 w-full"
        />
        <button
          type='button'
          onClick={handleSearchButtonClick}
          className="mt-2 bg-blue-500 text-white rounded-md py-2 px-4 hover:bg-blue-600 transition duration-300"
        >
          Search
        </button>
      </nav>
      <div>
        {showCharacters && (
          <ul>
            {filteredCharacters.map(character => (
              <li
                key={character.id}
                onClick={() => handleCharacterClick(character)}
                className="cursor-pointer py-2 px-4 border-b border-gray-300 hover:bg-gray-100 transition duration-300"
              >
                {character.name}
              </li>
            ))}
          </ul>
        )}
        {selectedCharacter && (
          <div>
            <h2 className="text-xl font-semibold mb-2">Details of {selectedCharacter.name}</h2>
            <p>Status: {selectedCharacter.status}</p>
            <p>Species: {selectedCharacter.species}</p>
          </div>
        )}
      </div>
    </div>
  );
}

export default RickAndMorty;
