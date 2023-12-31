import { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import './SearchInput.css';

function debounce(func, wait) {
  let timeout;
  return function (...args) {
    const context = this;
    clearTimeout(timeout);
    timeout = setTimeout(() => func.apply(context, args), wait);
  };
}

function SearchInput({
  searchTerm,
  setSearchTerm,
  placeholder,
  isSearchModeRecommend,
  handleEnterPress,
}) {
  const [activeIndex, setActiveIndex] = useState(-1);
  const [searchSuggestions, setSearchSuggestions] = useState([]);

  const handleSearchChange = async (searchTerm) => {
    try {
      const response = await axios.get(
        `https://berlin-bites-backend.onrender.com/suggestions?term=${searchTerm}`
      );
      const restaurantNames = response.data.map((item, index) => ({
        key: index,
        name: item.name,
        reference: item.reference,
        _id: item._id,
      }));
      setSearchSuggestions(restaurantNames);
      console.log(searchSuggestions);
    } catch (error) {
      console.error('RestList error:', error);
    }
  };

  useEffect(() => {
    const debouncedSearch = debounce(handleSearchChange, 300);
    // only show suggestions if search mode is by restaurant name
    if (searchTerm && !isSearchModeRecommend) {
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
    console.log('the active index of suggestions was: ', activeIndex)
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

  const placeholderClassName =
    placeholder == 'Please enter something to search for...'
      ? 'red-placeholder'
      : '';

  return (
    <div className='search-bar-and-suggestions-wrapper'>
      <input
        type='text'
        placeholder={placeholder}
        value={searchTerm}
        onChange={handleInputChange}
        onKeyDown={(e) => {
          handleKeyDown(e);
          handleEnterPress(e);
        }}
        className={`search-bar-input ${placeholderClassName}`}
      />

      {searchSuggestions.length > 0 && !isSearchModeRecommend && searchTerm && (
        <ul className='search-bar-suggestion-list'>
          {searchSuggestions.map((suggestion, index) => (
            <Link
              to={`/rest/${suggestion._id}`}
              key={`${suggestion._id}-search-suggestion`}>
              <li
                onClick={() => handleSuggestionClick(suggestion)}
                className={`suggestion-item ${
                  index === activeIndex ? 'background-grey' : ''
                }`}>
                <span className='font-semibold'>{suggestion.name}</span>
              </li>
            </Link>
          ))}
        </ul>
      )}
    </div>
  );
}

export default SearchInput;
