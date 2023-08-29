import NavBar from '../components/NavBar'
import './MainPage.css'
import SearchBar from '../components/SearchBar'
import RestList from "../components/RestList"

function MainPage () {
  console.log('main page before jsx')
  return (
    <div>
      <NavBar/>
      <h1 className="project-name">Drop into Berlin</h1>
     <SearchBar/>
     <h2 className='rest-list-header'>Some great Restaurants from around the city</h2>
     <RestList/>
    </div>
  )
}

export default MainPage;