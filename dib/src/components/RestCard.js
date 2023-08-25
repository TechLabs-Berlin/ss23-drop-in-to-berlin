import "./RestCard.css"
import { IoStar, IoEyeOff } from "react-icons/io5";


function RestCard ({rest}) {

  let name = rest.name
  if (name.length > 25) {
    const shortName = name.substring(0,25)
    name = `${shortName}...`
  }

  let descr = rest.editorial_summary
  if (descr.length > 100) {
    const shortDescr = descr.substring(0,100)
    descr = `${shortDescr}...`
  }
  console.log('rest card before return')
  return (
    <div className="card">
        <img src={`https://picsum.photos/seed/${rest.reference}/200/300`} alt="not loaded image" className="card-img"/>
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
  )
}

export default RestCard