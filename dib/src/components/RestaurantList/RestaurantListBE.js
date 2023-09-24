import { useState, useEffect } from "react"
import axios from "axios"
import RestCard from "../RestaurantCard/RestaurantCard"
import "./RestaurantList.css"

function RestList(rating, price, limit) {
  
  const [displayedRestaurants, setDisplayedRestaurants] = useState([])
  

//pick random restaurants from all the fetched restaurants and add them to displayedRestaurants. 
//
  const fetchRestaurants = async (rat, pr, lim ) => {
    try {
      const response = await axios.get(`/restaurants?rating=${rat}&price=${pr}&limit=${lim}`);
      setDisplayedRestaurants(response.data);
    } catch (error) {
      console.error(error);
    }
  };
  
  useEffect(()=>{
    fetchRestaurants(rating, price, limit)
  },[])
  



  if (displayedRestaurants.length > 0) {
  const renderedList = displayedRestaurants.map ((rest) => {
    if (rest.photos && rest.photos.length > 0) {
      console.log(rest.photos[0].html_attributions);
  }    return <RestCard key = {rest.reference} restaurant = {rest}/>
  })
  console.log('restlist before jsx')
  return (
    <div className="rest-list">
      {renderedList.length > 0 ? renderedList : "Loading..."}
    </div>
  )}

  }
export default RestList;