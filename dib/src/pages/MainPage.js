import './MainPage.css'
import SearchBarPage from "./SearchBarPage"
import RestList from "../components/RestList"

function MainPage () {
  console.log('main page before jsx')
  return (
    <div>
      <h1 className="project-name">Drop into Berlin</h1>

     <SearchBarPage/>
     
     <RestList/>
    </div>
  )
}

export default MainPage