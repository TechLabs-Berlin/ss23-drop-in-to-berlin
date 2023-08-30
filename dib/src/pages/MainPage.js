import NavBar from '../components/NavBar'
import './MainPage.css'
import SearchBar from '../components/SearchBar'
import RestList from "../components/RestList"
import Filter from "../components/Filter";
import { FindButton } from '../components/Button';

function MainPage () {
  const handleClick = () => {
    console.log("Button clicked");
  };

  return (
    <div>
      <NavBar/>
      <h1 className="project-name">Drop into Berlin</h1>
      <div className="search-container">
        <SearchBar />
        <FindButton onClick={handleClick} /> 
      </div>
      <Filter/>
      <h2 className='rest-list-header'>Some great Restaurants from around the city</h2>
      <RestList/>
    </div>
  )
}

export default MainPage;