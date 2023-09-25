import { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

function debounce(func, wait) {
  let timeout;
  return function (...args) {
    const context = this;
    clearTimeout(timeout);
    timeout = setTimeout(() => func.apply(context, args), wait);
  };
}

function SearchBar({ searchTerm, setSearchTerm }) {
  const [activeIndex, setActiveIndex] = useState(-1);
  const [searchSuggestions, setSearchSuggestions] = useState([]);

  const handleSearchChange = async (searchTerm) => {
    try {
      const response = await axios.get(
        `http://localhost:3001/suggestions?term=${searchTerm}`
      );
      const restaurantNames = response.data.map((item, index) => ({
        key: index,
        name: item.name,
        reference: item.reference,
      }));
      setSearchSuggestions(restaurantNames);
      console.log(searchSuggestions);
    } catch (error) {
      console.error('RestList error:', error);
    }
  };

  useEffect(() => {
    const debouncedSearch = debounce(handleSearchChange, 300);
    if (searchTerm) {
      debouncedSearch(searchTerm);
    }
  }, [searchTerm]);

  const handleInputChange = (e) => {
    setSearchTerm(e.target.value);
    setActiveIndex(-1);
  };

  const handleSuggestionClick = (suggestion) => {
    setSearchTerm(suggestion.name);
  };

  const handleKeyDown = (e) => {
    if (e.key === 'ArrowDown') {
      setActiveIndex((prev) =>
        Math.min(prev + 1, searchSuggestions.length - 1)
      );
    } else if (e.key === 'ArrowUp') {
      setActiveIndex((prev) => Math.max(prev - 1, 0));
    } else if (e.key === 'Enter' && activeIndex >= 0) {
      handleSuggestionClick(searchSuggestions[activeIndex]);
    }
  };

  console.log(
    'searchBar before return, with this suggestions:',
    searchSuggestions
  );

  return (
    <div className='mb-0 p-4'>
      <div className='relative bg-gray-100 p-2 rounded-lg'>
        <input
          type='text'
          style={{ width: '600px' }}
          placeholder='Type what you love...'
          value={searchTerm}
          onChange={handleInputChange}
          onKeyDown={handleKeyDown}
          className='px-4 py-2 w-full h-12 border-2 border-gray-300 bg-gray-100 rounded-lg focus:outline-none focus:border-black'
        />
        {searchTerm && (
          <ul className='absolute w-full mt-1 border-t-0 rounded-lg overflow-y-auto max-h-40 bg-white shadow-lg z-10 border-black border-2'>
            {searchSuggestions.length > 0 ? (
              searchSuggestions.map((suggestion, index) => (
                <Link
                  to={`/rest/${suggestion.reference}`}
                  key={`${suggestion.reference}-search-suggestion`}>
                  <li
                    onClick={() => handleSuggestionClick(suggestion)}
                    className={`px-4 py-2 cursor-pointer hover:bg-gray-200 ${
                      index === activeIndex ? 'bg-gray-300' : ''
                    }`}>
                    <span className='font-semibold'>{suggestion.name}</span>
                  </li>
                </Link>
              ))
            ) : (
              <li className='px-4 py-2 font-semibold text-gray-500'>
                No matches found
              </li>
            )}
          </ul>
        )}
      </div>
      <div className='mt-4 space-y-4'></div>
    </div>
  );
}

export default SearchBar;
