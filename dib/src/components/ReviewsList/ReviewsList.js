import './ReviewsList.css'
import ReviewCard from "../ReviewCard/ReviewCard";

function ReviewList({reviews}) {

  // const firstFiveEntries = Array.from(reviews.slice(0, 5))
  
  if (!reviews || reviews.length === 0) {
    return <div>No reviews available.</div>;
  }
  const renderedReviews =reviews.map((review, index) => (
        <ReviewCard review={review} key={index}></ReviewCard>
  ));
  console.log('review list before return')
  return (
    <div className="reviews-section">
      {renderedReviews}
    </div>
  );
}

export default ReviewList;
