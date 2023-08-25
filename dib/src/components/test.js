import { useContext } from "react"
import RestContext from "../context/RestContext"
import RestCard from "./RestCard"

function Test() {

  const {restaurants} = useContext(RestContext)

  return (
    <div>
      {restaurants.length > 0 ? restaurants[5].name : 'Loading Rest!'}
      {restaurants.length > 0 ? <RestCard rest={restaurants[1]}/> : 'Loading RestCard!' }

    </div>
  )

}

export default Test