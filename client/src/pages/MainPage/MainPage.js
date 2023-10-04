import NavBar from '../../components/NavBar/NavBar';
import RestList from '../../components/RestaurantList/RestaurantListBE';
import SearchBar from '../../components/SearchBar/SearchBar';
import './MainPage.css';
import { useState, useRef, useEffect, useContext } from 'react';
import RestaurantContext from '../../context/RestaurantContext';

function MainPage() {
  const backgroundImageRef = useRef(null);
  const [isSearchExecuted, setIsSearchExecuted] = useState(false)
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedRating, setSelectedRating] = useState(1);
  const [selectedPrice, setSelectedPrice] = useState(4);
  const [backgroundPositionY, setBackgroundPositionY] =
    useState('calc(50% - 2rem)');
  const {isSearchModeRecommend, setIsSearchModeRecommend} = useContext(RestaurantContext)

  console.log('the main page state of search term is:', searchTerm)
  console.log('Main page, Selected rating:', selectedRating);
  console.log('Main page, Selected price:', selectedPrice);

  useEffect(() => {
    // Check if the ref is available (component has rendered)
    if (backgroundImageRef.current) {
      backgroundImageRef.current.style.backgroundPositionY =
        backgroundPositionY;
    }
  }, [backgroundPositionY]);

  useEffect(() => {
    setIsSearchModeRecommend(true)
  },[]);

  const changeSearchMode = () => {
    setIsSearchModeRecommend(!isSearchModeRecommend);
    console.log('after changing search mode in main page, search mode recommend is', isSearchModeRecommend)
  };

  useEffect(()=>{
    console.log('UseEffect says isSearchModeRecommend is', isSearchModeRecommend)
  },[isSearchModeRecommend])

  console.log('on main page, isSearchModeRecommend is', isSearchModeRecommend)
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
              isSearchModeRecommend={isSearchModeRecommend}
              isSearchExecuted={isSearchExecuted}
              setIsSearchExecuted={setIsSearchExecuted}
              ></SearchBar>
            <button onClick={changeSearchMode} className='btn-search-by-name'>
              {isSearchModeRecommend
                ? 'or search by restaurant name'
                : 'or search by recommendations'}
            </button>
          </div>
        </div>
      </section>
      <section className='main-page-rest-list-section'>
        <div className='main-page-rest-list-wrapper'>
          <RestList
            setTerm={setSearchTerm}
            term={searchTerm}
            rating={selectedRating}
            price={selectedPrice}
            isSearchExecuted={isSearchExecuted}
            setIsSearchExecuted={setIsSearchExecuted}
    
            limit={4}
          />
        </div>
      </section>
    </div>
  );
}

export default MainPage;
