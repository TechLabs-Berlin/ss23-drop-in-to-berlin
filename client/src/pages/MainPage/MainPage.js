import NavBar from '../../components/NavBar/NavBar';
import RestList from '../../components/RestaurantList/RestaurantListBE';
import SearchBar from '../../components/SearchBar/SearchBar';
import './MainPage.css';
import { useState } from 'react';

function MainPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedRating, setSelectedRating] = useState(1);
  const [selectedPrice, setSelectedPrice] = useState(4);

  const backgroundImage = document.getElementById('background-image-header');
  backgroundImage.style.backgroundPositionY = `calc(50% - 4rem)`;

  return (
    <div>
      <section
        className='main-page-header-section'
        id='background-image-header'>
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
