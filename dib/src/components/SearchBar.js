import { useState, useEffect } from 'react';

function debounce(func, wait) {
    let timeout;
    return function (...args) {
        const context = this;
        clearTimeout(timeout);
        timeout = setTimeout(() => func.apply(context, args), wait);
    };
}


function SearchBar({onSearchChange, suggestions}) {

    const [searchTerm, setSearchTerm] = useState('');
    const [activeIndex, setActiveIndex] = useState(-1);

    useEffect(() => {
        const debouncedSearch = debounce(onSearchChange, 300); 
        if (searchTerm) {
            debouncedSearch(searchTerm);
            console.log ('debouncedSearch done')
        } else {
            onSearchChange('');
            console.log('onSearchChange')
        }
    }, [onSearchChange, searchTerm]);

    const handleInputChange = (event) => {
        setSearchTerm(event.target.value);
        setActiveIndex(-1);
    };

    const handleSuggestionClick = (suggestion) => {
        setSearchTerm(suggestion.name);
    };

    const handleKeyDown = (e) => {
        if (e.key === 'ArrowDown') {
            setActiveIndex((prev) => Math.min(prev + 1, suggestions.length - 1));
        } else if (e.key === 'ArrowUp') {
            setActiveIndex((prev) => Math.max(prev - 1, 0));
        } else if (e.key === 'Enter' && activeIndex >= 0) {
            handleSuggestionClick(suggestions[activeIndex]);
        }
    console.log('keydown handled :', e.key)
    };

    console.log('search bar before return')
    return (
        <div className="relative bg-gray-100 p-2 rounded-lg">
            <input
                type="text"
                placeholder="Type what you love..."
                value={searchTerm}
                onChange={handleInputChange}
                onKeyDown={handleKeyDown}
                className="px-4 py-2 w-full border-2 border-gray-300 bg-gray-100 rounded-lg focus:outline-none focus:border-black"
            />
            {searchTerm && (
                <ul className="absolute w-full mt-1 border-t-0 rounded-lg overflow-y-auto max-h-40 bg-white shadow-lg z-10 border-black border-2">
                    {suggestions.length > 0 ? (
                        suggestions.map((suggestion, index) => (
                            <li
                                key={suggestion.id}
                                onClick={() => handleSuggestionClick(suggestion)}
                                className={`px-4 py-2 cursor-pointer hover:bg-gray-200 ${index === activeIndex ? 'bg-gray-300' : ''}`}
                            >
                                <span className="font-semibold">{suggestion.name}</span>
                            </li>
                        ))
                    ) : (
                        <li className="px-4 py-2 font-semibold text-gray-500">No matches found</li>
                    )}
                </ul>
            )}
        </div>
    );
}

export default SearchBar;