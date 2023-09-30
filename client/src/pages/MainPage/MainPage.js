import NavBar from '../../components/NavBar/NavBar';
import SearchBar from '../../components/SearchBar/SearchBar';
import RestList from '../../components/RestaurantList/RestaurantListBE';
import Filter from '../../components/Filter/Filter';
import Button from '../../components/Button/Button';
import { IoStar, IoSearch } from 'react-icons/io5';
import './MainPage.css';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function MainPage() {

  const navigate = useNavigate();

  // state initialized for storing the user's search term, previously managed within SearchBar component
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedRating, setSelectedRating] = useState(1)
  const [selectedPrice, setSelectedPrice] = useState(4)

  const handleClick = () => {
    // use the searchTerm directly to navigate to the SearchResultsPage
    navigate(`/search/?term=${searchTerm}&rating=${selectedRating}&price=${selectedPrice}`);
  };

  const priceMappings = {
    '€' : 1,
    '€€' : 2,
    '€€€' : 3,
    '€€€€' : 4,
  }

  const handlePriceSelect = (selectedPrice) => {
    if(selectedPrice in priceMappings){
      setSelectedPrice(priceMappings[selectedPrice])
      console.log("Selected price:", selectedPrice);
    } else {
      setSelectedPrice(4)}
      console.log("Selected price not found, used default vaulue of 4");
    
  };

  const handleRatingSelect = (selectedRating) => {
    setSelectedRating(selectedRating)
    console.log("Selected rating:", selectedRating);
  };

  

  const renderStars = (num) => {
    let stars = [];
    for (let i = 0; i < num; i++) {
      stars.push(<IoStar key={i} />);
    }
    return <div className="star-wrapper">{stars}</div>;
  };

  return (
    <div>
      <NavBar />
      <h1 className="project-name">Drop into Berlin</h1>
      <div className="search-container">
        {/* 3. Passing searchTerm and setSearchTerm as props to SearchBar */}
        <SearchBar searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
        <Button secondary outline rounded onClick={handleClick}>
          <IoSearch />
        </Button>
        <div className="filter-wrapper">
        <Filter
          className= "filter-price"
          initialLabel="Price"
          options={['€', '€€', '€€€','€€€€']}
          onSelect={handlePriceSelect}
        />
        <Filter
          className= "filter-rating"
          initialLabel={<><span>Rating</span><span className="iconSpacing"></span></>}
          options={[1, 2, 3, 4, 5]}
          renderOption={renderStars}
          onSelect={handleRatingSelect}
        />
      </div>
      </div>
      
      <h2 className="rest-list-header">Some great Restaurants from around the city</h2>
      <RestList rating={selectedRating} price={selectedPrice} />
      
    </div>
  );
}

export default MainPage;