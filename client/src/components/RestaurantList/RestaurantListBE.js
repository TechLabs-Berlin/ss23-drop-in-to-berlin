import { useState, useEffect, useContext } from "react"
import RestaurantContext from "../../context/RestaurantContext"
import axios from "axios"
import RestCard from "../RestaurantCard/RestaurantCard"
import "./RestaurantList.css"
import Button from "../Button/Button"

function RestList({rating, price, limit, term, isSearchModeRecommend}) {
  
  const { setSelectedRestaurant } = useContext(RestaurantContext)
  const [displayedRestaurants, setDisplayedRestaurants] = useState([])



// request random restaurants from db optional input: min rating, max price, max result amount
  const fetchRestaurants = async (rat, pr, lim, ter ) => {
    try {
      const response = await axios.get(`http://localhost:3001/restaurants?&rating=${rat}&price=${pr}&limit=${lim}&term=${ter}`);
      setDisplayedRestaurants([...displayedRestaurants, ...response.data]);
    } catch (error) {
      console.error('RestList error:',error);
    }
  };
  





  const createFormData = (rat, pr, ter) => {
  const formData = new FormData()
  formData.append('star_rating', rat)
  formData.append('price', pr)
  formData.append('user_input_str', ter)
  console.log('The Form data for the post request to recommender', formData)
  }


  const fetchRecommendations = async (rating, price, term) => { // Fixed parameter names
    console.log('try fetching recommendations, the mrest list state of search term is:', term)
    const formData = createFormData(rating, price, term);
    try {
      const recommenderResponse = await axios.post(`https://phylanx.pythonanywhere.com/predict`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data', // Use an object for headers
        },
      });

      const restaurantReferences = recommenderResponse.data.recommendations;

      const databaseResponse = await axios.get(`http://localhost:3001/restaurants/recommendations`, {restaurantReferences});

      setDisplayedRestaurants([...displayedRestaurants, ...databaseResponse.data]);
    } catch (error) {
      console.error('Could not get recommendations', error);
    }
  }


  

  useEffect(()=>{
    isSearchModeRecommend === true ?
    fetchRecommendations(rating, price, term)
    : fetchRestaurants(rating, price, limit, term)
  },[])



  if (displayedRestaurants.length > 0) {
    const renderedList = displayedRestaurants.map ((rest) => {
      return <RestCard key = {`${rest.reference}-rest-card`} rest = {rest} onClick= {()=>{setSelectedRestaurant(rest); console.log('setter clicked')}}/>
  })
  console.log('restlist before jsx')
  return (
    <div className="rest-list-wrapper">
    <div className="rest-list">
      {renderedList.length > 0 ? renderedList : "Loading..."}
      
    </div>
    {isSearchModeRecommend === false ?
    <Button secondary onClick={() => fetchRestaurants(rating, price, limit, term)} className={"show-more-restaurants"}>Show more Restaurants</Button> : null
    }
    </div>
  )}

  }
export default RestList;