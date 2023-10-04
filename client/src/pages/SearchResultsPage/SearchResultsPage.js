import NavBar from '../../components/NavBar/NavBar';
import SearchBar from '../../components/SearchBar/SearchBar';
import { useParams, useNavigate } from 'react-router-dom';
import { useState, useRef, useEffect, useContext } from 'react';
import './SearchResultsPage.css';
import RestList from '../../components/RestaurantList/RestaurantListBE';
import RestaurantContext from '../../context/RestaurantContext';

function SearchResultsPage() {
  // extracting the search query from the URL
  const { term, rating, price } = useParams();

  const [searchTerm, setSearchTerm] = useState('');
  const [selectedRating, setSelectedRating] = useState(0);
  const [selectedPrice, setSelectedPrice] = useState(0);
  const {isSearchModeRecommend, setIsSearchModeRecommend} = useContext(RestaurantContext)

  const backgroundImageSearchRef = useRef(null);
  const [backgroundPositionY, setBackgroundPositionY] = useState(
    'calc(50% - 3rem)'
  );



  useEffect(() => {
    // Check if the ref is available (component has rendered)
    if (backgroundImageSearchRef.current) {
      backgroundImageSearchRef.current.style.backgroundPositionY =
        backgroundPositionY;
    }
  }, [backgroundPositionY]);

  const changeSearchMode = () => {
    setIsSearchModeRecommend(!isSearchModeRecommend);
    console.log('after changing search mode in search result page, search mode recommend is', isSearchModeRecommend)
  };

  return (
    <div>
      <section
        className='search-page-header-section'
        id='background-image-header'
        ref={backgroundImageSearchRef}>
        <NavBar />
        <div className='search-page-searchbar-and-button-outer-wrapper'>
          <div className='search-page-searchbar-and-button-wrapper'>
            <SearchBar
              className='search-page-search-bar'
              searchTerm={searchTerm}
              setSearchTerm={setSearchTerm}
              selectedRating={selectedRating}
              setSelectedRating={setSelectedRating}
              selectedPrice={selectedPrice}
              setSelectedPrice={setSelectedPrice}>
              {' '}
            </SearchBar>
            <button onClick={changeSearchMode} className='btn-search-by-name'>
              {isSearchModeRecommend ? 'Or search by restaurant name' : 'Or get recommendations' }
              </button>
          </div>
          
        </div>
        <div className='search-page-results-header-text-wrapper'>
            <h1 className='search-page-results-header-text'>Looking for <span id='search-results-highlight'>{term}</span> ? Here some nice restaurants:</h1>
          </div>
      </section>
      
      <section className='search-page-rest-list-section'>
        <div className='search-page-rest-list-wrapper'>
          
          <RestList
            rating={selectedRating != 0 ? selectedRating : rating}
            price={selectedPrice != 0 ? selectedPrice : price}
            term={searchTerm ? searchTerm : term}
            limit={4}
            isSearchModeRecommend={isSearchModeRecommend}
          />
        </div>
      </section>
    </div>
  );
}

export default SearchResultsPage;
