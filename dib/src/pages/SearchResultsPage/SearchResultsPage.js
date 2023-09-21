import NavBar from '../../components/NavBar/NavBar';
import SearchBar from '../../components/SearchBar/SearchBar';
import RestCard from "../../components/RestaurantCard/RestaurantCard";
import Filter from '../../components/Filter/Filter';
import Button from '../../components/Button/Button';
import { IoSearch } from 'react-icons/io5';
import { useParams, useNavigate } from 'react-router-dom';
import { useContext, useState, useEffect } from 'react';
import RestContext from "../../context/RestaurantContext";
import './SearchResultsPage.css';

function SearchResultsPage() {
  // extracting the search query from the URL
  const { query } = useParams();

  const navigate = useNavigate();
  const { restaurants } = useContext(RestContext);
  
  const [searchTerm, setSearchTerm] = useState("");
  
  // state to manage the display limit for results and the increment amount
  const [filteredResults, setFilteredResults] = useState([]);
  const [displayLimit, setDisplayLimit] = useState(10);
  const incrementBy = 5;
  
  useEffect(() => {
    // fetch and filter the data based on the search query
    const results = restaurants.filter(restaurant =>
    restaurant.name.toLowerCase().includes(query.toLowerCase())
    );
    setFilteredResults(results);
  }, [query, restaurants]);
  
  const handleFindClick = () => {
    // navigate to the new search results page
    navigate(`/search/${searchTerm}`);
    // reset the searchTerm to clear the input and the dropdown
    setSearchTerm('');
  };
  
  const handleLoadMore = () => {
    setDisplayLimit(prevLimit => prevLimit + incrementBy);
  };
  
  return (
    <div>
     <NavBar />
      <h1 className="project-name">Searching in Berlin Bites</h1>
        <div className="search-container">
          <SearchBar searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
          <Button secondary outline rounded onClick={handleFindClick}>
            <IoSearch />
            Find
          </Button>
        </div>
        <div className="filter-wrapper">
          <Filter
            initialLabel="Price"
            options={['Affordable', 'Medium', 'High']}
          />
          <Filter
            initialLabel="Rating"
            options={[1, 2, 3, 4, 5]}
          />
        </div>
        <h2 className="search-title">Search Results for "{query}"</h2>
        {filteredResults.length === 0 ? (
          <div className="empty-results">
            <p>Oops! We couldn't vibe with "{query}" in Berlin Bites.</p>
            <p>Maybe switch up the mood, explore broader terms or check for any typos.</p>
          </div>
        ) : (
          <div className="restaurant-cards-container">
            {filteredResults.slice(0, displayLimit).map(restaurant => (
              <RestCard key={restaurant.id} rest={restaurant} />
            ))}
          </div>
        )}
        {filteredResults.length > 0 && displayLimit < filteredResults.length && (
        <div style={{ textAlign: 'center', marginTop: '20px' }}>
        <div className="load-more-container">
            <Button primary rounded onClick={handleLoadMore}>
                Show More
            </Button>
        </div>
        </div>
    )}
    </div>
  );
}
  
export default SearchResultsPage;