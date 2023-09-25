import './RestaurantDetails.css';
import { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import {
  IoStar,
  IoLocation,
  IoCall,
  IoLogoEuro,
} from 'react-icons/io5';
import StarRating from '../StarRating/UserStarRating';
import CityMap from '../CityMap/CityMap';
import ReviewList from '../ReviewsList/ReviewsList';

function RestDetails() {
  const { id } = useParams();
  const [selectedRestaurant, setSelectedRestaurant] = useState({})


  const getSelectedRestaurant = async (selectedId ) => {
    try {
      const response = await axios.get(`http://localhost:3001/restaurants/${selectedId}`);
      setSelectedRestaurant(response.data);
    } catch (error) {

      console.error("das ist der error:", error);
    }
  };
  
  useEffect(()=>{
    getSelectedRestaurant(id)
  },[id])


  if (!selectedRestaurant) {
    return <div>Loading...</div>;
  }

    const rest = selectedRestaurant
    console.log("das ist das restaurant", rest)


    const mainImageUrl =
      rest.photos && rest.photos.length > 0 ? rest.photos[0].imageURL : null;

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

    console.log('restaurant details before return, the rest reference is:', rest.reference);

    return (
      <div className='rest-details'>
        <div className='details-line-container'>
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
                <div className='rating-stars'>{/* <StarRating /> */}</div>
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
          <section className='img-section'>
            {mainImageUrl ? (
              <img
                src={mainImageUrl}
                alt={rest.name}
                className='details-main-img'
              />
            ) : null}
            <div className='details-small-imgs'>
              {/*  mapping over the photos array, if it exists */}
              {rest.photos && rest.photos.length > 1
                ? rest.photos
                    .slice(1, 5)
                    .map((photo, index) => (
                      <img
                        key={index}
                        src={photo.imageURL}
                        alt={rest.name}
                        className='details-small-img'
                      />
                    ))
                : null}
            </div>
          </section>
        </div>
        {/* { <CityMap
          lat={rest.geometry.location.lat}
          lng={rest.geometry.location.lng}
        /> } */}
        <section className='reviews-section'>
          <ReviewList key={`${rest.reference}-review`} reviews={rest.reviews} reference={rest.reference}/>
        </section>
      </div>
    );
  }

export default RestDetails;
