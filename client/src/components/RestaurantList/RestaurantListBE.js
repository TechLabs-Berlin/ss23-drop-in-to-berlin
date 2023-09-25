import { useState, useEffect, useContext } from "react"
import RestaurantContext from "../../context/RestaurantContext"
import axios from "axios"
import RestCard from "../RestaurantCard/RestaurantCard"
import "./RestaurantList.css"

function RestList(rating, price, limit) {
  
  const { setSelectedRestaurant } = useContext(RestaurantContext)
  const [displayedRestaurants, setDisplayedRestaurants] = useState([])
  


// request random restaurants from db optional input: min rating, max price, max result amount
  const fetchRestaurants = async (rat, pr, lim ) => {
    try {
      const response = await axios.get(`http://localhost:3001/restaurants?rating=${rat}&price=${pr}&limit=${lim}`);
      setDisplayedRestaurants(response.data);
    } catch (error) {
      console.error('RestList error:',error);
    }
  };
  
  useEffect(()=>{
    fetchRestaurants(rating, price, limit)
  },[])
  



  if (displayedRestaurants.length > 0) {
    const renderedList = displayedRestaurants.map ((rest) => {
      return <RestCard key = {`${rest.reference}-rest-card`} rest = {rest} onClick= {()=>{setSelectedRestaurant(rest); console.log('setter clicked')}}/>
  })
  console.log('restlist before jsx')
  return (
    <div className="rest-list">
      {renderedList.length > 0 ? renderedList : "Loading..."}
    </div>
  )}

  }
export default RestList;