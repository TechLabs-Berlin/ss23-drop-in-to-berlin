import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { IoStar, IoSearch } from 'react-icons/io5';
import Filter from '../../components/Filter/Filter';
import Button from '../../components/Button/Button';
import SearchInput from '../../components/SearchInput/SearchInput';
import './SearchBar.css';

function SearchBar({
  searchTerm,
  setSearchTerm,
  selectedPrice,
  setSelectedPrice,
  selectedRating,
  setSelectedRating,
  isSearchModeRecommend,
}) {
  // state initialized for storing the user's search term, previously managed within SearchBar component

  const navigate = useNavigate();

  const [placeholder, setPlaceholder] = useState('Describe what you love...');

  if (!isSearchModeRecommend && !searchTerm && placeholder === 'Describe what you love...') {
    setPlaceholder('Enter a restaurant name...');
  } else if (
    isSearchModeRecommend && !searchTerm &&
    placeholder === 'Enter a restaurant name...'
  ) {
    setPlaceholder('Describe what you love...');
  }

  const handleSearchClick = () => {
    // use the searchTerm directly to navigate to the SearchResultsPage
    if (searchTerm) {
      navigate(`/search/${searchTerm}/${selectedRating}/${selectedPrice}`);
    } else {
      setPlaceholder('Please enter something to search for...');
    }
  };

  const priceMappings = {
    '€': 1,
    '€€': 2,
    '€€€': 3,
    '€€€€': 4,
  };

  const handlePriceSelect = (selectedPrice) => {
    if (selectedPrice in priceMappings) {
      setSelectedPrice(priceMappings[selectedPrice]);
      console.log('Selected price:', selectedPrice);
    } else {
      setSelectedPrice(4);
    }
    console.log('Selected price not found, used default vaulue of 4');
  };

  const handleRatingSelect = (selectedRating) => {
    setSelectedRating(selectedRating);
    console.log('Selected rating:', selectedRating);
  };

  const renderStars = (num) => {
    let stars = [];
    for (let i = 0; i < num; i++) {
      stars.push(<IoStar key={i} />);
    }
    return <div className='star-wrapper'>{stars}</div>;
  };


  console.log('the search bar state of search term is:', searchTerm)

  return (
    <div>
      <section className='search-container-wrapper'>
        <div className='search-container'>
          <div className='filter-wrapper'>
            <Filter
              className='filter-price'
              initialLabel='Price'
              options={['€', '€€', '€€€', '€€€€']}
              onSelect={handlePriceSelect}
            />
            <Filter
              className='filter-rating'
              initialLabel={
                <>
                  <span>Rating</span>
                  <span className='iconSpacing'></span>
                </>
              }
              options={[1, 2, 3, 4]}
              renderOption={renderStars}
              onSelect={handleRatingSelect}
            />
          </div>
          {/* 3. Passing searchTerm and setSearchTerm as props to SearchInput */}
          <SearchInput
            searchTerm={searchTerm}
            setSearchTerm={setSearchTerm}
            placeholder={placeholder}
          />

          <Button
            primary
            rounded
            onClick={handleSearchClick}
            className={'search-button'}>
            <IoSearch size={25} />
          </Button>
        </div>
      </section>
    </div>
  );
}

export default SearchBar;
