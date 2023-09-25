/* eslint-disable jsx-a11y/img-redundant-alt */
import "./RestaurantCard.css"
import { IoStar} from "react-icons/io5";
import { Link } from "react-router-dom";

function RestCard({ rest }) {
  const imageUrl = rest.photos && rest.photos.length > 0 && rest.photos[0].imageURL;

    // Shorten names longer than 25 characters
    let name = rest.name;
    if (name.length > 25) {
        const shortName = name.substring(0, 25);
        name = `${shortName}...`;
    }

    console.log('rest card before return, the rest reference is:',rest.reference )

    return (
      <Link to={`/rest/${rest.reference}`}>
          <div className="card">
              {/* display image from the provided URL*/}
              {imageUrl && <img src={imageUrl} alt="Restaurant Image" className="card-img" />}
              <div className="card-content">
                  <div className="card-header">
                      <h2 className="card-name">{name}</h2>
                      <div className="card-rating">
                          <IoStar />
                          {rest.rating}
                      </div>
                  </div>
              </div>
          </div>
      </Link>
  );
}

export default RestCard;