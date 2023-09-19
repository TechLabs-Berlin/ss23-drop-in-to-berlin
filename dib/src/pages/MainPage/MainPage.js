import NavBar from '../../components/NavBar/NavBar';
import SearchBar from '../../components/SearchBar/SearchBar';
import RestList from '../../components/RestaurantList/RestaurantList';
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

  const handleClick = () => {
    // use the searchTerm directly to navigate to the SearchResultsPage
    navigate(`/search/${searchTerm}`);
  };

  const handlePriceSelect = (selectedPrice) => {
    console.log("Selected price:", selectedPrice);
  };

  const handleRatingSelect = (selectedRating) => {
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
        {/* passing searchTerm and setSearchTerm as props to SearchBar */}
        <SearchBar searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
        <Button secondary outline rounded onClick={handleClick}>
          <IoSearch />
          Find
        </Button>
      </div>
      <div className="filter-wrapper">
        <Filter
          initialLabel="Price"
          options={['Affordable', 'Medium', 'High']}
          onSelect={handlePriceSelect}
        />
        <Filter
          initialLabel={<><span>Rating</span><span className="iconSpacing"></span></>}
          options={[1, 2, 3, 4, 5]}
          renderOption={renderStars}
          onSelect={handleRatingSelect}
        />
      </div>
      <h2 className="rest-list-header">Some great Restaurants from around the city</h2>
      <RestList />
    </div>
  );
}

export default MainPage;