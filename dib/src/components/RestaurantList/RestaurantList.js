import { useState, useContext, useEffect } from "react"
import RestaurantContext from "../../context/RestaurantContext"
import RestCard from "../RestaurantCard/RestaurantCard"
import "./RestaurantList.css"
import GetRandomIndexes from "../../util/GetRandomIndexes"

function RestList () {

  console.log('rest list loaded')
  const {restaurants, dataFetched } = useContext(RestaurantContext)
  
  const [displayedRestaurants, setDisplayedRestaurants] = useState([])
  

//pick random restaurants from all the fetched restaurants and add them to displayedRestaurants. 
//
  const chooseRandomRestaurants = amount => {
    try{
      const restaurantCount = restaurants.length;
      const randomIndexes = GetRandomIndexes(restaurantCount, amount);
      const randomRestaurants = randomIndexes.map(index => restaurants[index]);
      
      setDisplayedRestaurants(randomRestaurants);
      console.log('choose random restaurants created')
    } 
    catch (error) {
      console.error('Error choosing random restaurants:', error);
      return
  }}

  useEffect(() => {
    if(dataFetched === true) {
        chooseRandomRestaurants(8)
        console.log("choose restaurants executed")
  }else{
    console.error('Error fetching restaurants ')
  }},[dataFetched])



  if (restaurants.length > 0) {
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