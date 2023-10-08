import { useState, useEffect, useContext } from 'react';
import RestaurantContext from '../../context/RestaurantContext';
import axios from 'axios';
import RestCard from '../RestaurantCard/RestaurantCard';
import './RestaurantList.css';

function RestList({
  rating,
  price,
  limit,
  term,
  setTerm,
  isSearchExecuted,
  setIsSearchExecuted,
}) {
  const { isSearchModeRecommend, setIsSearchModeRecommend } =
    useContext(RestaurantContext);
  const [displayedRestaurants, setDisplayedRestaurants] = useState([]);
  const [lastSearchTerm, setLastSearchTerm] = useState('');
  const [restListHeadline, setRestListHeadline] = useState(
    'Some great restaurants from around the city'
  );

  // request random restaurants from db optional input: min rating, max price, max result amount
  const fetchRestaurants = async (rat, pr, lim, ter) => {
    try {
      console.log(
        `the parameters to send are: rating:${rat}, price:${pr}, limit:${lim}, term${ter}`
      );
      const response = await axios.get(
        `https://berlin-bites-backend.onrender.com/restaurants?&rating=${rat}&price=${pr}&limit=${lim}&term=${ter}`
      );
      await setDisplayedRestaurants(response.data);
      console.log(
        'new displayed restaurants are:',
        displayedRestaurants, 'search term was:', term)
      await setIsSearchExecuted(false);
      await setLastSearchTerm(term);
      lastSearchTerm
        ? setRestListHeadline(`Some restaurants featuring "${lastSearchTerm}":`)
        : setRestListHeadline(`Some great restaurants from around the city:`);
      console.log(
        `the parameters to send are: rating:${rat}, price:${pr}, limit:${lim}, term${ter}`
      );
      await setTerm('');
      console.log('after request, IsSearchExecuted is: ', isSearchExecuted);
    } catch (error) {
      console.error('RestList error:', error);
    }
  };

  // added to exisitng list
  const fetchMoreRestaurants = async (rat, pr, lim, ter) => {
    try {
      console.log(
        'before fetching more restaurants, last search term is:',
        ter
      );
      const response = await axios.get(
        `https://berlin-bites-backend.onrender.com/restaurants?&rating=${rat}&price=${pr}&limit=${lim}&term=${ter}`
      );
      setDisplayedRestaurants([...displayedRestaurants, ...response.data]);
      console.log('fetching more restaurants with last search term:', ter);
      setIsSearchExecuted(false);
    } catch (error) {
      console.error('RestList error:', error);
    }
  };

  const createFormData = (rat, pr, ter) => {
    const formData = new FormData();
    formData.append('star_rating', rat);
    formData.append('price', pr);
    formData.append('user_input_str', ter);
    console.log('The Form data for the post request to recommender', formData);
    return formData;
  };

  const fetchRecommendations = async (rating, price, term) => {
    // Fixed parameter names

    const formData = createFormData(rating, price, term);
    try {
      if (formData) {
        const recommenderResponse = await axios.post(
          `https://phylanx.pythonanywhere.com/predict`,
          formData,
          {
            headers: {
              'Content-Type': 'multipart/form-data', // Use an object for headers
            },
          }
        );
        const restaurantReferences = recommenderResponse.data.recommendations;
        console.log('Recommender response data is', restaurantReferences);

          //only start fetching from databae, when first request is done

        if (restaurantReferences && restaurantReferences.length > 0) {
          const databaseResponse = await axios.post(
            `https://berlin-bites-backend.onrender.com/restaurants/recommendations`,
            { data: { restaurantReferences } }
          );
          console.log(
            'database response.data, to recommender request is:',
            databaseResponse.data
          );
          console.log(
            'old displayed restaurants are:',
            displayedRestaurants)
            await setDisplayedRestaurants(databaseResponse.data, () => {
              console.log('new displayed restaurants are:', displayedRestaurants, 'search term was:', term);
            });
          
          await setIsSearchExecuted(false);
          await setLastSearchTerm(term);
          await setRestListHeadline(`You like ${term} ? Then we recommend you:`);
          await setTerm('');
        } else {
          console.error(
            'the request to the database, to catch the corresponding restaurants to the referernces failed!'
          );
        }
      }
    } catch (error) {
      console.error(
        'Could not get recommendations! The form data was: ',
        formData,
        'The inputted rating, price and term are: ',
        rating,
        price,
        term,
        'the error was: ',
        error
      );
    }
  };

  useEffect(() => {
    fetchRestaurants(
      rating,
      price,
      limit,
      lastSearchTerm ? lastSearchTerm : term
    );
  }, []);

  useEffect(() => {
    console.log(
      'Rest List, use effect is triggered, to fetch restaurants / recommendations. isSearchModeRecommend: ',
      isSearchModeRecommend, 'isSearchExecuted: ', isSearchExecuted
    );

    if (isSearchModeRecommend && isSearchExecuted) {
      fetchRecommendations(
        rating,
        price,
        term ? term : lastSearchTerm
      );
    } else if (!isSearchModeRecommend && isSearchExecuted) {
      fetchRestaurants(
        rating,
        price,
        limit,
        term ? term : lastSearchTerm
      );
    }
    console.log(
      'Rest List, after search is executed, lastSearchTerm:',
      lastSearchTerm
    );
  }, [isSearchExecuted]);


  if (displayedRestaurants.length > 0) {
    const renderedList = displayedRestaurants.map((rest) => {
      return <RestCard key={`${rest.reference}-rest-card`} rest={rest} />;
    });


    
    return (
      <div>
        <h2 className='rest-list-headline'>{restListHeadline}</h2>
        <div className='rest-list-wrapper'>
          <div className='rest-list'>
            {renderedList.length > 0 ? renderedList : 'Loading...'}
          </div>
          <button
            onClick={() =>
              fetchMoreRestaurants(rating, price, limit, term? term :lastSearchTerm)
            }
            className={'show-more-restaurants'}>
            Show more Restaurants
          </button>
        </div>
      </div>
    );
  }
}
export default RestList;
