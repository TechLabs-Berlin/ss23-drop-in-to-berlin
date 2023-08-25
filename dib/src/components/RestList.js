import { useState, useContext, useEffect } from "react"
import RestContext from "../context/RestContext"
import RestCard from "./RestCard"
import GetRandomIndexes from "../util/GetRandomIndexes"

function RestList () {

  const {restaurants, dataFetched } = useContext(RestContext)
  const [displayedRestaurants, setDisplayedRestaurants] = useState([])
  


  const chooseRandomRestaurants = amount => {
    try{
    const restaurantCount = restaurants.length;
    const randomIndexes = GetRandomIndexes(restaurantCount, amount);
    const randomRestaurants = randomIndexes.map(index => restaurants[index]);
    
    setDisplayedRestaurants(randomRestaurants);
    console.log('choose random restaurants created')
    } catch (error) {
      console.error('Error fetching restaurants:', error);
  }}

  useEffect(() => {
    chooseRandomRestaurants(4)
    console.log("choose restaurants executed")
  },[dataFetched])


  // useEffect(() => {
  //   chooseRandomRestaurants(4);
  // }, [chooseRandomRestaurants]);
//is it better to call fetchBooks in app, or in context?
  
  const renderedList = displayedRestaurants.map ((rest) => {
    console.log(rest.photos[0].html_attributions)
    return <RestCard key = {rest.reference} rest = {rest}/>
  })

  return (
    <div className="flex flex-wrap">
      {renderedList.length > 0 ? renderedList : "Loading..."}
    </div>
  )
}

export default RestList