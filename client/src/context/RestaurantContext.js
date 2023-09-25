import { createContext, useState } from 'react';

const RestaurantContext = createContext();

function RestProvider({ children }) {

  const [selectedRestaurant, setSelectedRestaurant] = useState([]);
  console.log(selectedRestaurant)



  const valuesToShare = {
    selectedRestaurant,
    setSelectedRestaurant
    
  }

  return (
    <RestaurantContext.Provider value={valuesToShare}>
      {children}
    </RestaurantContext.Provider>
  );
}

export { RestProvider };
export default RestaurantContext;

