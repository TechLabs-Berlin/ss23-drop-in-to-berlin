import { createContext, useState, useCallback, useEffect } from 'react';
import axios from 'axios';

const RestaurantContext = createContext();

function RestProvider({ children }) {

  const [restaurants, setRestaurants] = useState([]);
  const [dataFetched, setDataFetched] = useState(false);


  const fetchRestaurants = useCallback(async() => {
    try{
    const res = await axios.get ('http://localhost:3001/restaurants')
    console.log(res)
    setRestaurants(res.data);
    setDataFetched(true)
    } catch (error) {
      console.error('Error fetching restaurants:', error);
  }},[])

    
    useEffect(() => {
    fetchRestaurants();
  }, [fetchRestaurants]);


  //usecallback stellt sicher, dass die funktion nicht mit jedem rerender neu zugeordnet wird.


  const valuesToShare = {
    restaurants,
    dataFetched
  }

  return (
    <RestaurantContext.Provider value={valuesToShare}>
      {children}
    </RestaurantContext.Provider>
  );
}

export { RestProvider };
export default RestaurantContext;

