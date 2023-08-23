import { createContext, useState, useCallback } from 'react';
import axios from 'axios';
import GetRandomIndexes from '../util/GetRandomIndexes';

const RestContext = createContext();

function Provider({ children }) {

  const [restaurants, setRestaurants] = useState([]);

  const fetchRandomRestaurants = useCallback(async (amount) => {
    try{
    const res = await axios.get ('http://localhost:3001/restaurants')
    console.log(res)
    const restaurantCount = res.data.length;
    const randomIndexes = GetRandomIndexes(restaurantCount, amount);
    const randomRestaurants = randomIndexes.map(index => res.data[index]);
    setRestaurants(randomRestaurants);
    } catch (error) {
      console.error('Error fetching restaurants:', error);
  }},[])

  //usecallback stellt sicher, dass die funktion nicht mit jedem rerender neu zugeordnet wird.



  const valuesToShare = {
    restaurants,
    fetchRandomRestaurants,
  }

  return (
    <RestContext.Provider value={valuesToShare}>
      {children}
    </RestContext.Provider>
  );
}

export { Provider };
export default RestContext;

