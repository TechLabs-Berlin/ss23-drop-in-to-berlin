import { createContext, useState } from 'react';

const RestaurantContext = createContext();

function RestProvider({ children }) {

  const [isSearchModeRecommend, setIsSearchModeRecommend] = useState(true);
  const [alreadyFetchedRestaurants, setAlreadyFetchedRestaurants] = useState([])


  const valuesToShare = {
    isSearchModeRecommend,
    setIsSearchModeRecommend,

    
  }

  return (
    <RestaurantContext.Provider value={valuesToShare}>
      {children}
    </RestaurantContext.Provider>
  );
}

export { RestProvider };
export default RestaurantContext;

