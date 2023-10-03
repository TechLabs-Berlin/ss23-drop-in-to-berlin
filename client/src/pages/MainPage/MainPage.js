import NavBar from '../../components/NavBar/NavBar';
import RestList from '../../components/RestaurantList/RestaurantListBE';
import SearchBar from '../../components/SearchBar/SearchBar';
import './MainPage.css';
import { useState, useRef, useEffect } from 'react';

function MainPage() {
  const backgroundImageRef = useRef(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedRating, setSelectedRating] = useState(1);
  const [selectedPrice, setSelectedPrice] = useState(4);
  const [isSearchModeRecommend, setIsSearchModeRecommend] = useState(true);
  const [backgroundPositionY, setBackgroundPositionY] =
    useState('calc(50% - 2rem)');

  console.log('the main page state of search term is:', searchTerm)

  useEffect(() => {
    // Check if the ref is available (component has rendered)
    if (backgroundImageRef.current) {
      backgroundImageRef.current.style.backgroundPositionY =
        backgroundPositionY;
    }
  }, [backgroundPositionY]);

  const changeSearchMode = () => {
    setIsSearchModeRecommend(!isSearchModeRecommend);
  };

  return (
    <div>
      <section
        className='main-page-header-section'
        id='main-page-background-image-header'
        ref={backgroundImageRef}>
        <NavBar />
        <div className='main-page-searchbar-and-button-outer-wrapper'>
          <div className='main-page-searchbar-and-button-wrapper'>
            <SearchBar
              className='main-page-search-bar'
              searchTerm={searchTerm}
              setSearchTerm={setSearchTerm}
              selectedRating={selectedRating}
              setSelectedRating={setSelectedRating}
              selectedPrice={selectedPrice}
              setSelectedPrice={setSelectedPrice}
              isSearchModeRecommend={isSearchModeRecommend}></SearchBar>
            <button onClick={changeSearchMode} className='btn-search-by-name'>
              {isSearchModeRecommend
                ? 'Or search by restaurant name'
                : 'Or get recommendations'}
            </button>
          </div>
        </div>
      </section>
      <section className='main-page-rest-list-section'>
        <div className='main-page-rest-list-wrapper'>
          <h2 className='rest-list-main-page-header'>
            Some great Restaurants from around the city
          </h2>
          <RestList
            term={searchTerm}
            rating={4}
            price={4}
            isSearchModeRecommend={false}
            limit={4}
          />
        </div>
      </section>
    </div>
  );
}

export default MainPage;
