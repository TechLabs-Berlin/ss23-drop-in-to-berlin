/* eslint-disable jsx-a11y/img-redundant-alt */
import "./RestaurantCard.css"
import { IoStar, IoEyeOff } from "react-icons/io5";
import { Link } from "react-router-dom";

function RestCard({ restaurant, key }) {
  const imageUrl = restaurant.photos && restaurant.photos.length > 0 && restaurant.photos[0].imageURL;


  // Shorten names longer than 25 characters
  let name = restaurant.name;
  if (name.length > 18) {
      const shortName = name.substring(0, 18);
      name = `${shortName}...`;
  }

  





  
  console.log('rest card before return')



  return (
    <Link to={`/rest/${restaurant.reference}`}>
        <div className="card" key={key}>
            {/* display image from the provided URL*/}
            {imageUrl && <img src={imageUrl} alt="Restaurant Image" className="card-img" />}
            {/* if restaurant is hidden, render the Eye Icon */}
            {restaurant.hidden === 'Yes' ? <IoEyeOff size="2rem" color="white" className="card-hidden-ico" /> : null}
            <div className="card-content">
                <div className="card-header">
                    <h2 className="card-name">{name}</h2>
                    <div className="card-rating">
                        <IoStar />
                        {restaurant.rating}
                    </div>
                </div>
            </div>
        </div>
    </Link>
);
}

export default RestCard;