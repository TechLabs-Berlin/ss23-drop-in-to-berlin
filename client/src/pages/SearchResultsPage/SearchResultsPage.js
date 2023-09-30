import NavBar from '../../components/NavBar/NavBar';
import SearchBar from '../../components/SearchInput/SearchInput';
import { useParams, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import './SearchResultsPage.css';
import RestList from '../../components/RestaurantList/RestaurantListBE';

function SearchResultsPage() {
    // extracting the search query from the URL
    const { term, rating, price } = useParams();

    const [searchResults, setSearchResults] = useState([])
    const [searchTerm, setSearchTerm] = useState(term);
    const [selectedRating, setSelectedRating] = useState(rating);
    const [selectedPrice, setSelectedPrice] = useState(price);

    const navigate = useNavigate();
  
  
    console.log('This ist the search term:', term)

  
    return (
      <div>
        <NavBar />
        
        
        {/* {searchResults.length === 0 ? (
          <div className="empty-results">
            <p>Oops! {term} leads to no results</p>
            <p>Maybe switch up the mood, explore broader terms or check for any typos.</p>
          </div>
        ) : ( */}

          <div>
          <h1 className="project-name">These Restaurants seem to fit you</h1>
          <h2 className="search-title">Search Results for "{term}"</h2>
          <SearchBar
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
        selectedRating={selectedRating}
        setSelectedRating={setSelectedRating}
        selectedPrice={selectedPrice}
        setSelectedPrice={setSelectedPrice}
      />
          <RestList rating ={selectedRating} price ={selectedPrice} limit={6}/>
          </div>
          {/* )} */}
          
      </div>
    );
}

export default SearchResultsPage;