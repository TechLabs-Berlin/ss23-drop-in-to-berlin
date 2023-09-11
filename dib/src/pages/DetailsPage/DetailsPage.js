import './DetailsPage.css'
import RestDetails from "../../components/RestaurantDetails/RestaurantDetails"
import NavBar from "../../components/NavBar/NavBar"
import RestList from "../../components/RestaurantList/RestaurantList"
function DetailsPage() {

return(
  <div>
    <NavBar/>
    <RestDetails className="rendererd-details-on-details-page"/>
    <RestList className="rest-list-details-page" />
  </div>
)
}

export default DetailsPage