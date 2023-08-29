import './DetailsPage.css'
import RestDetails from "../components/RestDetails"
import NavBar from "../components/NavBar"
import RestList from "../components/RestList"

function DetailsPage() {

return(
  <div>
    <NavBar/>
    <RestDetails/>
    <RestList className="rest-list-details-page" />
  </div>
)
}

export default DetailsPage