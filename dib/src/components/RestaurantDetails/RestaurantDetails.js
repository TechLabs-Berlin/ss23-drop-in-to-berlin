import './RestaurantDetails.css';
import { useState, useEffect, useContext } from 'react';
import { useParams } from 'react-router-dom';
import RestaurantContext from '../../context/RestaurantContext';
import {
  IoStar,
  IoStarOutline,
  IoLocation,
  IoCall,
  IoLogoEuro,
} from 'react-icons/io5';
import StarRating from '../StarRating/UserStarRating';
import CityMap from '../CityMap/CityMap';
import ReviewList from '../ReviewsList/ReviewsList';

function RestDetails() {
  const { id } = useParams();
  const { restaurants } = useContext(RestaurantContext);
  const [selectedImage, setSelectedImage] = useState(null);

  useEffect(() => {
    // reset the selectedImage when the restaurant ID changes
    setSelectedImage(null);
  }, [id]);

  if (restaurants.length === 0) {
    return <div>Loading...</div>;
  }

  //find the restaurant that matches the id from the request params
  const rest = restaurants.find((r) => r.reference === id);

  if (!rest) {
    return <div>Restaurant not found.</div>;
  }

  const mainImageUrl = selectedImage || (rest.photos && rest.photos.length > 0 ? rest.photos[0].imageURL : null);

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

  console.log('restaurant details before return');

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
       <div className="map-wrapper">
        <CityMap
          lat={rest.geometry.location.lat}
          lng={rest.geometry.location.lng}
        />
      </div>
      </div>
      <div className='right-section'>
      <h1 className='details-name'>{rest.name}</h1>
        <section className='info-section'>
          <div className='tags-and-rating'>
            <ul className='tags'>
              <li className='tag'>Vegetarian</li>
              <li className='tag'>Pet friendly</li>
            </ul>
            <div className='rating-block'>
              <div className='existing-rating'>
                <IoStar size='1.3rem' />
                {rest.rating}
              </div>
            </div>
          </div>
          <div className='loc-contact-price'>
            <div className='details-lcp'>
              <IoLocation size='1.3rem' />
              {rest.formatted_address}
            </div>
            <div className='details-lcp'>
              <IoCall size='1.3rem' />
              {rest.international_phone_number}
            </div>
            <div className='details-lcp'>
              <IoLogoEuro size='1.3rem' />
              {detailsPrice}
            </div>
          </div>
        </section>
        <div className='reviews'>
          <ReviewList key={`${rest.reference}-review`} reviews={rest.reviews} />
        </div>
      </div>
    </div>
  );
}

export default RestDetails;
