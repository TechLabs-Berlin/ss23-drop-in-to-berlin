import { createContext, useState, useCallback, useEffect } from 'react';
import axios from 'axios';


const RestContext = createContext();

function RestProvider({ children }) {

  const [restaurants, setRestaurants] = useState([]);
  const [dataFetched, setDataFetched] = useState(false);


  const fetchRestaurants = useCallback(async() => {
    try{
    const res = await axios.get ('http://localhost:3001/restaurants')
    await setDataFetched(true)
    console.log(res)
    setRestaurants(res.data);
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
    <RestContext.Provider value={valuesToShare}>
      {children}
    </RestContext.Provider>
  );
}

export { RestProvider };
export default RestContext;

