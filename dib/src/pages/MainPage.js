import NavBar from '../components/NavBar';
import SearchBar from '../components/SearchBar';
import RestList from '../components/RestList';
import Filter from '../components/Filter';
import Button from '../components/Button';
import { IoStar } from 'react-icons/io5';
import { GoSearch } from 'react-icons/go';
import './MainPage.css';

function MainPage() {

  const handleClick = () => {};

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
        <SearchBar />
        <Button secondary outline rounded onClick={handleClick}>
          <GoSearch />
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