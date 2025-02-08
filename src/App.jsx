import { useState } from 'react';
import './App.css';
import characterData from './data/characters.json'; // Assuming you are importing the characters data

function App() {
    const [selectedClasses, setSelectedClasses] = useState([]);

    const allClasses = [...new Set(characterData.characters.flatMap(character => character.classifications))];

    const toggleClass = (className) => {
        setSelectedClasses((prevSelectedClasses) =>
            prevSelectedClasses.includes(className)
                ? prevSelectedClasses.filter((cls) => cls !== className)
                : [...prevSelectedClasses, className]
        );
    };

    const filteredCharacters = selectedClasses.length
        ? characterData.characters.filter((character) =>
            selectedClasses.every((cls) => character.classifications.includes(cls))
        )
        : characterData.characters;

    return (
        <div className="app">
            <h1>Party Animals Classifications</h1>

            <div className="filter-container">
                <div className="filter-buttons">
                    {allClasses.map((cls, index) => (
                        <button
                            key={index}
                            className={`filter-button ${selectedClasses.includes(cls) ? 'selected' : ''}`}
                            onClick={() => toggleClass(cls)}
                        >
                            {cls}
                        </button>
                    ))}
                </div>
            </div>

            <div className="card-grid">
                {filteredCharacters.map((character, index) => (
                    <div className="card" key={index}>
                        <div className="card-info">
                            <h3>{character.name}</h3>
                        </div>
                        <img src={character.image} alt={character.name} className="card-image" />
                        <div className="tags">
                            {character.classifications.length === 0
                                ? <span className="tag">No classifications</span>
                                : character.classifications.map((cls, index) => (
                                    <span className="tag" key={index}>{cls}</span>
                                ))
                            }
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default App;
