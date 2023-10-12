import { IoStarOutline, IoStar } from 'react-icons/io5';
import './ReviewStarRating.css'

const StarRating = ({ rating }) => {

  return (
    <div className="star-rating">
      {Array.from({ length: 5 }, (_, i) => (
        <span key={i} className="star">
          {i < rating ? <IoStar className="star-existing-rating"/> : <IoStarOutline className="star-existing-rating"/>}
        </span>
      ))}
    </div>
  );
};

export default StarRating;
