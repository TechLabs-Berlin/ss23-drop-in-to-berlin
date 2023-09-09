import './RestDetails.css';
import { useContext, useEffect, useRef } from 'react';
import { useParams } from 'react-router-dom';
import RestContext from '../context/RestContext';
import { IoStar, IoStarOutline, IoLocation, IoCall, IoLogoEuro } from 'react-icons/io5';
import StarRating from './StarRating';
import L from 'leaflet';

function RestaurantMap({ lat, lng }) {
  const mapRef = useRef(null);

  useEffect(() => {
    const map = L.map(mapRef.current).setView([lat, lng], 15);

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png').addTo(map);
    L.marker([lat, lng]).addTo(map);

    return () => {
      map.remove();
    };
  }, [lat, lng]);

  return <div ref={mapRef} style={{ width: '100%', height: '400px' }}></div>;
}

function RestDetails() {
  const { id } = useParams();
  const { restaurants } = useContext(RestContext);

  if (restaurants.length === 0) {
    return <div>Loading...</div>;
  }

  const rest = restaurants.find((r) => r.reference === id);

  if (!rest) {
    return <div>Restaurant not found.</div>;
  }

  const mainImageUrl = rest.photos && rest.photos.length > 0 ? rest.photos[0].imageURL : null;

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

  const { reviews } = rest;

  console.log('restaurant details before return');

  return (
    <div className='rest-details'>
    <div className="details-line-container">
        <h1 className='details-name'>{rest.name}</h1>
            <section className='info-section'>
          <div className='tags-and-rating'>
            <ul className='tags'>
              <li className='tag'>Vegetarian</li>
              <li className='tag'>Pet friendly</li>
            </ul>
            <div className="rating-block">
              <div className='existing-rating'>
                <IoStar size="1.3rem" />
                {rest.rating}
              </div>
              <div className='rating-stars'>
                <StarRating />
              </div>
            </div>
          </div>
          <div className='loc-contact-price'>
            <div className='details-lcp'>
              <IoLocation size="1.3rem" />
              {rest.formatted_address}
            </div>
            <div className='details-lcp'>
              <IoCall size="1.3rem" />
              {rest.international_phone_number}
            </div>
            <div className='details-lcp'>
              <IoLogoEuro size="1.3rem" />
              {detailsPrice}
            </div>
          </div>
        </section>
      <section className='img-section'>
        {mainImageUrl ? 
          <img src={mainImageUrl} alt={rest.name} className='details-main-img' /> : 
          null
        }
        <div className='details-small-imgs'>
          {/*  mapping over the photos array, if it exists */}
          {rest.photos && rest.photos.length > 1 ? 
            rest.photos.slice(1, 5).map((photo, index) => (
              <img key={index} src={photo.imageURL} alt={rest.name} className='details-small-img' />
            )) : 
            null
          }
        </div>
      </section>
        <RestaurantMap lat={rest.geometry.location.lat} lng={rest.geometry.location.lng} />
        </div>
        <section className='reviews-section'>
            <h2>Reviews</h2>
            {rest.reviews.map((review, index) => (
                <div key={index} className='review'>
                    <div className='review-author'>
                        <img src={review.profile_photo_url} alt={review.author_name} className='review-avatar' />
                        <h3>{review.author_name}</h3>
                    </div>
                    <p>{review.text}</p>
                </div>
            ))}
        </section>
    </div>
);
}

export default RestDetails;