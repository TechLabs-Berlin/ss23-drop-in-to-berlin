import './RestaurantDetails.css';
import { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { IoStar, IoLocation, IoCall, IoLogoEuro } from 'react-icons/io5';
import CityMap from '../CityMap/CityMap';
import ReviewList from '../ReviewsList/ReviewsList';
import Accordion from '../Accordion/Accordion.js';

function RestDetails() {
  const { _id } = useParams();
  const [selectedRestaurant, setSelectedRestaurant] = useState({});
  const [selectedImage, setSelectedImage] = useState(null);

  const getSelectedRestaurant = async (selectedId) => {
    try {
      console.log('Fetching new restaurant data with id:', selectedId);
      const response = await axios.get(
        `https://berlin-bites-backend.onrender.com/restaurants/${selectedId}`
      );
      setSelectedRestaurant(response.data);
    } catch (error) {
      console.error('Das ist der error:', error);
    }
  };

  useEffect(() => {
    getSelectedRestaurant(_id);
    setSelectedImage(null);
  }, [_id]);

  const onReviewsUpdatedHandler = () => {
    console.log('reviews updated handler executed');
    getSelectedRestaurant(_id);
  };

  if (!selectedRestaurant) {
    return <div>Loading...</div>;
  }

  const rest = selectedRestaurant;

  const mainImageUrl =
    selectedImage ||
    (rest.photos && rest.photos.length > 0 ? rest.photos[0].imageURL : null);

    const openingHoursSections = rest && rest.opening_hours ? [
      {
        label: 'Opening Hours',
        content: rest.opening_hours
      }
    ] : [];

  let detailsPrice = '?';
  if (rest.price_level === 1) {
    detailsPrice = 'affordable prices';
  } else if (rest.price_level === 2) {
    detailsPrice = 'medium prices';
  } else if (rest.price_level === 3) {
    detailsPrice = 'higher prices';
  } else if (rest.price_level > 3) {
    detailsPrice = 'expensive';
  }

  return (
    <div className='rest-details'>
      <div className='left-section'>
        {mainImageUrl ? (
          <img
            src={mainImageUrl}
            alt={rest.name}
            className='details-main-img'
          />
        ) : null}
        <div className='details-small-imgs'>
          {rest.photos && rest.photos.length > 1
            ? rest.photos
                .slice(1, 5)
                .map((photo, index) => (
                  <img
                    key={index}
                    src={photo.imageURL}
                    alt={rest.name}
                    className='details-small-img'
                    onClick={() => setSelectedImage(photo.imageURL)}
                  />
                ))
            : null}
        </div>
        <div className='map-wrapper'>
          {rest.geometry ? (
            <CityMap
              lat={rest.geometry.location.lat}
              lng={rest.geometry.location.lng}
            />
          ) : null}
        </div>
      </div>
      <div className='right-section'>
      <div className='name-and-rating-block'>
        <h1 className='details-name'>{rest.name}</h1>
        <div className='existing-rating'>
          <IoStar className='details-existing-rating-icon' size='1.3rem' />
              {rest.rating} <span className='total-user-ratings'> ({rest.user_ratings_total})</span>
        </div>
       </div>
      <section className='info-section'>
          <div className='loc-contact-price'>
            <div className='details-lcp'>
              <IoLocation className='phone-price-icons' />
              {rest.formatted_address}
            </div>
            <div className='details-lcp'>
              <IoLogoEuro className='phone-price-icons' />
              {detailsPrice}
            </div>
            {rest.opening_hours ? (
              <Accordion sections={openingHoursSections} className="details-accordion" />
            ) : (
              <div className='details-lcp'>
                Opening Hours: Not Available
              </div>
            )}
          </div>
        </section>
        <section className='reviews'>
          <ReviewList
            key={`${rest.reference}-review`}
            reviews={rest.reviews}
            onReviewAdded={onReviewsUpdatedHandler}
            _id={rest._id}
          />
        </section>
      </div>
    </div>
  );
}

export default RestDetails;