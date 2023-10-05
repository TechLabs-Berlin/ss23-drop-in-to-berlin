import { useState, useEffect, useContext } from "react"
import RestaurantContext from "../../context/RestaurantContext"
import axios from "axios"
import RestCard from "../RestaurantCard/RestaurantCard"
import "./RestaurantList.css"
import Button from "../Button/Button"

function RestList({rating, price, limit, term, setTerm, isSearchExecuted, setIsSearchExecuted}) {
  
  const { isSearchModeRecommend, setIsSearchModeRecommend } = useContext(RestaurantContext)
  const [displayedRestaurants, setDisplayedRestaurants] = useState([])
  const [lastSearchTerm, setLastSearchTerm] = useState('')
  const [restListHeadline, setRestListHeadline] = useState ('Some great restaurants from around the city')



// request random restaurants from db optional input: min rating, max price, max result amount
  const fetchRestaurants = async (rat, pr, lim, ter ) => {
    try {
      console.log(`the parameters to send are: rating:${rat}, price:${pr}, limit:${lim}, term${ter}` )
      const response = await axios.get(`https://berlin-bites-backend.onrender.com/restaurants?&rating=${rat}&price=${pr}&limit=${lim}&term=${ter}`);
      setDisplayedRestaurants(response.data);
      setIsSearchExecuted(false)
      setLastSearchTerm(term)
      lastSearchTerm ? setRestListHeadline(`Some restaurants featuring "${lastSearchTerm}"`) : setRestListHeadline(`Here are some great restaurants`) ;
      console.log(`the parameters to send are: rating:${rat}, price:${pr}, limit:${lim}, term${ter}` )
      setTerm('')
      console.log('after request, IsSearchExecuted is: ', isSearchExecuted)
    } catch (error) {
      console.error('RestList error:',error);
    }
  };
  
  // added to exisitng list
  const fetchMoreRestaurants = async (rat, pr, lim, ter ) => {
    try {
      console.log('before fetching more restaurants, last search term is:', ter)
      const response = await axios.get(`https://berlin-bites-backend.onrender.com/restaurants?&rating=${rat}&price=${pr}&limit=${lim}&term=${ter}`);
      setDisplayedRestaurants([...displayedRestaurants, ...response.data]);
      console.log('fetching more restaurants with last search term:', ter)
      setIsSearchExecuted(false)
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
    
    const formData = createFormData(rating, price, term);
    try {
      const recommenderResponse = await axios.post(`https://phylanx.pythonanywhere.com/predict`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data', // Use an object for headers
        },
      });

      const restaurantReferences = recommenderResponse.data.recommendations;

      const databaseResponse = await axios.get(`https://berlin-bites-backend.onrender.com/restaurants/recommendations`, {restaurantReferences});

      setDisplayedRestaurants([...displayedRestaurants, ...databaseResponse.data]);
      setIsSearchExecuted(false)
      setLastSearchTerm(term)
      setRestListHeadline(`You like ${term}? Then we recommend you:`);
      setTerm('')
    } catch (error) {
      console.error('Could not get recommendations', error);
    }
  }



  useEffect(()=>{
    setIsSearchModeRecommend(false)
  },[])

useEffect(() => {
  console.log('in rest list, is searchModeRecommend is:', isSearchModeRecommend);
  
  if (isSearchModeRecommend && isSearchExecuted) {
    fetchRecommendations(rating, price, lastSearchTerm);
    
  } else {
    fetchRestaurants(rating, price, limit, lastSearchTerm);
      
  }
  console.log('after search is executed, last search term is:', lastSearchTerm)
}, [isSearchExecuted]);





  if (displayedRestaurants.length > 0) {
    const renderedList = displayedRestaurants.map ((rest) => {
      return <RestCard key = {`${rest.reference}-rest-card`} rest = {rest} />
  })
  console.log('restlist before jsx')
  return (
    <div>
      <h2 className="rest-list-headline">{restListHeadline}</h2>
    <div className="rest-list-wrapper">
      
    <div className="rest-list">
      {renderedList.length > 0 ? renderedList : "Loading..."}
      
    </div>
    <Button secondary onClick={() => fetchMoreRestaurants(rating, price, limit, lastSearchTerm)} className={"show-more-restaurants"}>Show more Restaurants</Button>
    
    </div>
    </div>
  )}

  }
export default RestList;