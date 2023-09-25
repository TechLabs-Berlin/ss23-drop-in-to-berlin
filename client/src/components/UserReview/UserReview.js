
import './UserReview.css'
import Button from '../Button/Button'
import UserStarRating from '../StarRating/UserStarRating'
import axios from 'axios'
import { useState } from 'react'

function UserReview (reference) {

  const [userRating, setUserRating] = useState(0)
  const [authorName, setAuthorName] = useState('')
  const [reviewText, setReviewText] = useState('')

  const handleFormSubmit = async (e) => {
    e.preventDefault()

    const newReview = {
      authorName,
      reviewText,
      userRating,
      reference,
    };

    try {
      const response = await axios.post('http://localhost:3001/api/reviews', newReview);
  
      if (response.status === 201) {
        // Review successfully posted, you can handle success here
        console.log('Review posted successfully');
        // Optionally, reset form fields
        setAuthorName('');
        setReviewText('');
        setUserRating(0);
      } else {
        // Handle error cases here
        console.error('Error posting review');
      }
    } catch (error) {
      console.error('Error posting review:', error);
    }
  };

  

  return(
    <div>
      <form onSubmit={handleFormSubmit} className='user-rating-form' >
        <input value={authorName} placeholder='Your name' onChange={(e) => setAuthorName(e.target.value)}></input>
        <textarea value={reviewText} onChange={(e) => setReviewText(e.target.value)} className="user-review-text-input" name="user-review-text" placeholder="How was your experience?" ></textarea>
        <div className='user-review-submit-section'>
          <UserStarRating setUserRating={setUserRating}/>
          <Button primary rounded>Submit</Button>
        </div>
      </form>
    </div>
  )
}

export default UserReview