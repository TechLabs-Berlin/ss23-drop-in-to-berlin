import './MainPage.css'
import SearchBar from '../components/SearchBar'
import RestList from "../components/RestList"

function MainPage () {
  console.log('main page before jsx')
  return (
    <div>
      <h1 className="project-name">Drop into Berlin</h1>

     <SearchBar/>
     
     <RestList/>
    </div>
  )
}

export default MainPage;