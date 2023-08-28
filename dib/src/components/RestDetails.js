import './RestDetails.css'
import { useContext } from 'react';
import { useParams } from 'react-router-dom';
import RestContext from '../context/RestContext';
import {IoStar,IoStarOutline,IoLocation, IoCall, IoLogoEuro} from 'react-icons/io5'

function RestDetails() {
  const { id } = useParams();
  const { restaurants } = useContext(RestContext);

  if (restaurants.length === 0) {
    return <div>Loading...</div>;
  }

  const rest = restaurants.find((rest) => rest.reference === id);

  if (!rest) {
    return <div>Restaurant not found.</div>;
  }

  let detailsPrice = '?'
  if (rest.price_level === 1) { 
    detailsPrice ='affordable prices'
  } else if (rest.price_level === 2) {
    detailsPrice ='medium prices'
  } else if (rest.price_level === 3) {
    detailsPrice ='higher prices'
  } else if (rest.price_level > 3) {
    detailsPrice ='expensive'
  }

  console.log('restsurant details before return');

  return (
    <div className='rest-details'>
      <section className='info-section'>
        <h1 className='details-name'>{rest.name}</h1>
        {/* <p className='details-descr'>{rest.editorial_summary}</p> */}
          <section className='info'>
            <div className='tags-and-rating'>
              <ul className='tags'>
                <li className='tag'>Vegetarian</li>
                <li className='tag'>Pet friendly</li>
              </ul>
              <div className="rating-block">
                <div className='existing-rating'>
                  <IoStar size="1.3rem"/>
                  {rest.rating}
                </div>
                <div className='rating-stars'>
                  <IoStarOutline className='rating-star'/>
                  <IoStarOutline className='rating-star'/>
                  <IoStarOutline className='rating-star'/>
                  <IoStarOutline className='rating-star'/>
                  <IoStarOutline className='rating-star'/>
                </div>

              </div> 
            </div> 
            <div className='loc-contact-price'>
              <div className='details-lcp'>
                <IoLocation size="1.3rem"/>
                {rest.formatted_address}
              </div>
              <div className='details-lcp'>
                <IoCall size="1.3rem"/>
                {rest.international_phone_number}
              </div>
              <div className='details-lcp'>
                <IoLogoEuro size="1.3rem"/>
                {detailsPrice}
              </div>

            </div>
          </section>
      </section>
      <section className='img-section'>
        <img
          src={`https://picsum.photos/seed/${rest.reference}/800/400`} alt="not loaded image"
          alt={rest.name}
          className='details-main-img'
        />
        <div className='details-small-imgs'>
          <img
            src={`https://picsum.photos/seed/${rest.reference}baz/200/300`} alt="not loaded image"
            alt={rest.name}
            className='details-small-img'
          />
          <img
            src={`https://picsum.photos/seed/${rest.reference}mal/200/300`} alt="not loaded image"
            alt={rest.name}
            className='details-small-img'
          />
          <img
            src={`https://picsum.photos/seed/${rest.reference}pil/200/300`} alt="not loaded image"
            alt={rest.name}
            className='details-small-img'
          />
          <img
            src={`https://picsum.photos/seed/${rest.reference}teb/200/300`} alt="not loaded image"
            alt={rest.name}
            className='details-small-img'
          />
        </div>
      </section>
    </div>
  );
}

export default RestDetails;
