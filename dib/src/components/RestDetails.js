import { useContext } from 'react';
import { useParams } from 'react-router-dom';
import RestContext from "../context/RestContext"

function RestDetails() {
    const { id } = useParams();
    const { restaurants } = useContext(RestContext);

    if (restaurants.length === 0) {
        return <div>Loading...</div>;
    }

    const restaurant = restaurants.find(rest => rest.reference === id);

    if (!restaurant) {
        return <div>Restaurant not found.</div>;
    }
    
    console.log('rest details before return')

    return (
        <div className="restaurant-details p-4">
            <img src={restaurant.imageURL} alt={restaurant.name} className="w-full h-48 object-cover rounded" />
            <h2 className="text-xl font-semibold mt-2">{restaurant.name}</h2>
            <p className="text-gray-600">{restaurant.description}</p>
        </div>
    );
}

export default RestDetails;