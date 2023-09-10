import './ReviewCard.css'

function ReviewCard(review) {

  console.log('review card before return')
  console.log(review)
  const reviewNew = review.review

  return (
      <div className='review'>
        <div className='review-author'>
          <img
            src={reviewNew.profile_photo_url}
            alt={reviewNew.author_name}
            className='review-avatar'
          />
          <h3>{reviewNew.author_name}</h3>
        </div>
        <p>{reviewNew.text}</p>
      </div>
  );
}

export default ReviewCard;
