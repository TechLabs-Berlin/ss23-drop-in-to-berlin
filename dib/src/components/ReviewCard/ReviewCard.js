import './ReviewCard.css'
import { useState } from 'react'

function ReviewCard(review) {

  const [fullReviewView, setFullReviewView] = useState(false)

  
  const reviewNew = review.review
  let text = reviewNew.text;

  if(!fullReviewView){
  if (text.length > 100) {
      const shortName = text.substring(0, 100);
      text = `${shortName}...`;
  }}

  const openCloseFullReview = () => {
    setFullReviewView(!fullReviewView)
  }


  return (
    <div className='review'>
      <div>
        <div className='review-author'>
          <img
            src={reviewNew.profile_photo_url}
            alt={reviewNew.author_name}
            className='review-avatar'
          />
          <h3>{reviewNew.author_name}</h3>
        </div>
        <p className='review-text'>{text}</p>
        
      </div>
      <button className='btn-full-review' onClick={openCloseFullReview}> {fullReviewView ? 'Show less' : 'show more'}</button> 
    </div>
  );
}

export default ReviewCard;
