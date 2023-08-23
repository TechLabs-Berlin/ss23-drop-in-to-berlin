import { useContext, useEffect } from "react"
import RestContext from "../context/RestContext"
import RestCard from "./RestCard"

function RestList () {

  const {restaurants, fetchRandomRestaurants} =useContext(RestContext)

  useEffect(() => {
    fetchRandomRestaurants(4);
  }, [fetchRandomRestaurants]);
//is it better to call fetchBooks in app, or in context?
  
  const renderedList = restaurants.map ((rest) => {
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