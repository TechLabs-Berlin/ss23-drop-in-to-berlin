
import './UserReview.css'
import Button from '../Button/Button'
import UserStarRating from '../StarRating/UserStarRating'
function UserReview () {


  return(
    <div>
      <form method='POST' className='user-rating-form' >
        <textarea className="user-review-text-input" name="user-review-text" placeholder="how was your experience?" ></textarea>
        <div className='user-review-submit-section'>
          <UserStarRating/>
          <Button primary rounded>Submit</Button>
        </div>
      </form>
    </div>
  )
}

export default UserReview