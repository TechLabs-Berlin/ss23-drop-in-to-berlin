import { useState, useContext, useEffect } from "react"
import RestContext from "../context/RestContext"
import RestCard from "./RestCard"
import GetRandomIndexes from "../util/GetRandomIndexes"

function RestList () {

  console.log('rest list loaded')
  const {restaurants, dataFetched } = useContext(RestContext)
  
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
      console.error('Error fetching restaurants:', error);
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
    console.log(rest.photos[0].html_attributions)
    return <RestCard key = {rest.reference} rest = {rest}/>
  })
  console.log('restlist before jsx')
  return (
    <div className="flex flex-wrap justify-center">
      {renderedList.length > 0 ? renderedList : "Loading..."}
    </div>
  )}
}

export default RestList;