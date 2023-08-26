import "./RestCard.css"
import { IoStar, IoEyeOff } from "react-icons/io5";
import { Link } from "react-router-dom";


function RestCard ({rest}) {

  // shorten names longer than 25 characters
  let name = rest.name
  if (name.length > 25) {
    const shortName = name.substring(0,25)
    name = `${shortName}...`
  }

  
  //shorten summary longer than 100 chars
  let descr = rest.editorial_summary
  if (descr.length > 100) {
    const shortDescr = descr.substring(0,100)
    descr = `${shortDescr}...`
  }

  const handleCardClick = () => {

  }

  console.log('rest card before return')



  return (
    <Link to= {`/rest/${rest.reference}`}>
      <div className="card">
          <img src={`https://picsum.photos/seed/${rest.reference}/200/300`} alt="not loaded image" className="card-img"/>
          {/* if restaurant is hidden, render the Eye Icon */}
        {rest.hidden === 'Yes' ? <IoEyeOff size= "2rem" color = "white" className="card-hidden-ico"/> : null }
        <div className="card-content">
          <div className="card-header">
            <h2 className="card-name">{name}</h2>
            <div className="card-rating">
              <IoStar/>
              {rest.rating}
            </div>
          </div>
          
          <div>
            <p className="card-descr">{descr}</p> 
          </div>
        </div>  
      </div>
    </Link>
  )
}

export default RestCard;