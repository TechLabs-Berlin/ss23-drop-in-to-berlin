import './DetailsPage.css'
import RestDetails from "../../components/RestaurantDetails/RestaurantDetails"
import NavBar from "../../components/NavBar/NavBar"
import RestList from "../../components/RestaurantList/RestaurantListBE"
function DetailsPage() {

return(
  <div>
    <NavBar/>
    <div className="rendered-details-on-details-page">
        <RestDetails />
      </div>
      {/* <div className="rest-list-details-page">
        <RestList />
      </div> */}
    </div>
  )
}

export default DetailsPage;