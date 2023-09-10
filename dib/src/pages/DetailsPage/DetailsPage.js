import './DetailsPage.css'
import RestDetails from "../../components/RestaurantDetails/RestaurantDetails"
import NavBar from "../../components/NavBar/NavBar"
import RestList from "../../components/RestaurantList/RestaurantList"

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