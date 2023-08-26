import { useContext, useState } from 'react';
import SearchBar from '../components/SearchBar';
import RestContext from "../context/RestContext"

function SearchBarPage() {
    
    const { restaurants } = useContext(RestContext);
    const [searchSuggestions, setSearchSuggestions] = useState([])

    const handleSearchChange = (searchTerm) => {
        const filteredResults = restaurants.filter(restaurant =>
            restaurant.name.toLowerCase().includes(searchTerm.toLowerCase())
        );
        setSearchSuggestions(filteredResults.slice(0, 8));
        console.log ('handled SearchChange')
    };

    //

    /* const displayedSearchSuggestions = searchSuggestions.map(restaurant => (
        <div key={restaurant.id} className="border p-4 rounded">
            <img src={restaurant.imageURL} alt={restaurant.name} className="w-full h-48 object-cover rounded" />
            <h2 className="text-xl font-semibold mt-2">{restaurant.name}</h2>
            <p className="text-gray-600">{restaurant.description}</p>
        </div>
    )) */

    console.log('search bar before return')
    
    return (
        <div className="p-4">
            <SearchBar onSearchChange={handleSearchChange} suggestions={searchSuggestions} />
            <div className="mt-4 space-y-4">
                {/* {searchSuggestions ? displayedSearchSuggestions : null} */}
            </div>
        </div>
    );
}

export default SearchBarPage;