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
  const [backgroundPositionY, setBackgroundPositionY] = useState('calc(50% - 2rem)');

  useEffect(() => {
    // Check if the ref is available (component has rendered)
    if (backgroundImageRef.current) {
      backgroundImageRef.current.style.backgroundPositionY = backgroundPositionY;
    }
  }, [backgroundPositionY]);

  return (
    <div>
      <section
        className='main-page-header-section'
        id='background-image-header' ref={backgroundImageRef}>
        <NavBar />
          <div className='searchbar-and-button-outer-wrapper'>
            <div className='searchbar-and-button-wrapper'>
              <SearchBar
                className='main-page-search-bar'
                searchTerm={searchTerm}
                setSearchTerm={setSearchTerm}
                selectedRating={selectedRating}
                setSelectedRating={setSelectedRating}
                selectedPrice={selectedPrice}
                setSelectedPrice={setSelectedPrice}>
                {' '}
              </SearchBar>
              <button className='btn-search-by-name'>
                Or search by restaurant name
              </button>
            </div>
          </div>
      </section>
      <section className='main-page-rest-list-section'>
        <div className='main-page-rest-list-wrapper'>
          <h2 className='rest-list-main-page-header'>
            Some great Restaurants from around the city
          </h2>
          <RestList rating={selectedRating} price={selectedPrice} limit={4} />
        </div>
      </section>
    </div>
  );
}

export default MainPage;
