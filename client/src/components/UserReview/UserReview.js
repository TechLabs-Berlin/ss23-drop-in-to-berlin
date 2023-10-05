
import './UserReview.css'
import Button from '../Button/Button'
import UserStarRating from '../StarRating/UserStarRating'
import axios from 'axios'
import { useState } from 'react'

function UserReview ({_id, isReviewSubmitted, setIsReviewSubmitted, onReviewAdded}) {

  const [userRating, setUserRating] = useState(3)
  const [authorName, setAuthorName] = useState('')
  const [reviewText, setReviewText] = useState('')
  

  const handleFormSubmit = async (e) => {
    e.preventDefault()

    const newReview = {
      authorName,
      reviewText,
      userRating,
      _id,
      added_review : true,
    };

    try {
      const response = await axios.post(`https://berlin-bites-backend.onrender.com/api/restaurants/${_id}/new-review`, newReview);
  
      if (response.status === 201) {
        // Review successfully posted, you can handle success here
        console.log('Review posted successfully');
        // Optionally, reset form fields
        setAuthorName('');
        setReviewText('');
        setUserRating(0);
        setIsReviewSubmitted(true)
        onReviewAdded()
      } else {
        // Handle error cases here
        console.error('Error posting review');
        console.log(newReview)
      }
    } catch (error) {
      console.error('Error posting review:', error);
    }
  };

  

  return(
    <div>
      { !isReviewSubmitted ? (
      <form onSubmit={handleFormSubmit} className='user-rating-form' >
        <input value={authorName} placeholder='Your name' onChange={(e) => setAuthorName(e.target.value)} required></input>
        <textarea value={reviewText} onChange={(e) => setReviewText(e.target.value)} className="user-review-text-input" name="user-review-text" placeholder="How was your experience?" required></textarea>
        <div className='user-review-submit-section'>
          <UserStarRating setUserRating={setUserRating}/>
          <Button primary rounded >Submit</Button>
        </div>
      </form>
      ) : null }
    </div>
  )
}

export default UserReview