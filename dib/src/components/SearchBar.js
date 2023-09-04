import { useState, useEffect, useContext } from 'react';
import RestContext from "../context/RestContext"
import { Link } from 'react-router-dom';

function debounce(func, wait) {
    let timeout;
    return function (...args) {
        const context = this;
        clearTimeout(timeout);
        timeout = setTimeout(() => func.apply(context, args), wait);
    };
}

function SearchBar() {
    const [searchTerm, setSearchTerm] = useState('');
    const [activeIndex, setActiveIndex] = useState(-1);
    const [searchSuggestions, setSearchSuggestions] = useState([]);
    const { restaurants } = useContext(RestContext);

    const handleSearchChange = (searchTerm) => {
        const filteredResults = restaurants.filter(restaurant =>
            restaurant.name.toLowerCase().includes(searchTerm.toLowerCase())
        );
        setSearchSuggestions(filteredResults.slice(0, 8));
    };

    useEffect(() => {
        const debouncedSearch = debounce(handleSearchChange, 300);
        if (searchTerm) {
            debouncedSearch(searchTerm);
        }
    }, [searchTerm, restaurants]);

    const handleInputChange = (event) => {
        setSearchTerm(event.target.value);
        setActiveIndex(-1);
    };

    const handleSuggestionClick = (suggestion) => {
        setSearchTerm(suggestion.name);
    };

    const handleKeyDown = (e) => {
        if (e.key === 'ArrowDown') {
            setActiveIndex((prev) => Math.min(prev + 1, searchSuggestions.length - 1));
        } else if (e.key === 'ArrowUp') {
            setActiveIndex((prev) => Math.max(prev - 1, 0));
        } else if (e.key === 'Enter' && activeIndex >= 0) {
            handleSuggestionClick(searchSuggestions[activeIndex]);
        }
    };

    /* 
    const displayedSearchSuggestions = searchSuggestions.map(restaurant => (
        <div key={restaurant.id} className="border p-4 rounded">
            <img src={restaurant.imageURL} alt={restaurant.name} className="w-full h-48 object-cover rounded" />
            <h2 className="text-xl font-semibold mt-2">{restaurant.name}</h2>
            <p className="text-gray-600">{restaurant.description}</p>
        </div>
    ))
    */

  return (
    <div className="mb-0 p-4">
        <div className="relative bg-gray-100 p-2 rounded-lg">
        <input
        type="text"
        style={{ width: '600px' }}
        placeholder="Type what you love..."
        value={searchTerm}
        onChange={handleInputChange}
        onKeyDown={handleKeyDown}
            className="px-4 py-2 w-full h-12 border-2 border-gray-300 bg-gray-100 rounded-lg focus:outline-none focus:border-black"
        />
         {searchTerm && (
             <ul className="absolute w-full mt-1 border-t-0 rounded-lg overflow-y-auto max-h-40 bg-white shadow-lg z-10 border-black border-2">
                {searchSuggestions.length > 0 ? (
                    searchSuggestions.map((suggestion, index) => (
                    <Link to={`/rest/${suggestion.reference}`}>
                        <li
                        key={suggestion.id}
                        onClick={() => handleSuggestionClick(suggestion)}
                        className={`px-4 py-2 cursor-pointer hover:bg-gray-200 ${index === activeIndex ? 'bg-gray-300' : ''}`}
                        >
                        <span className="font-semibold">{suggestion.name}</span>
                        </li>
                        </Link>
                    ))
                ) : (
                     <li className="px-4 py-2 font-semibold text-gray-500">No matches found</li>
                    )}
                 </ul>
               )}
          </div>
          <div className="mt-4 space-y-4">
           {/* displayedSearchSuggestions */}
          </div>
       </div>
    );
}

export default SearchBar;