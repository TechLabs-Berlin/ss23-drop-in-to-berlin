const axios = require('axios');

async function fetchRestaurantDetails(restaurantId, apiKey) {
  const fields = 'name,formatted_address,rating,user_ratings_total,price_level,opening_hours,photos,reviews,geometry,types,website,international_phone_number,vicinity,url,business_status';
  const placeDetailsURL = `https://maps.googleapis.com/maps/api/place/details/json?place_id=${restaurantId}&fields=${fields}&key=${apiKey}`;

  try {
    const response = await axios.get(placeDetailsURL);
    const result = response.data.result;
    
    if (!result) {
      console.error("No result found for restaurantId:", restaurantId);
      return null;
    }

    const details = {
      name: result.name,
      formatted_address: result.formatted_address,
      rating: result.rating,
      user_ratings_total: result.user_ratings_total,
      price_level: result.price_level,
      opening_hours: result.opening_hours ? result.opening_hours.weekday_text : null,
      photos: result.photos ? result.photos.map(photo => ({
        height: photo.height,
        html_attributions: photo.html_attributions,
        photo_reference: photo.photo_reference,
        width: photo.width,
        imageURL: `https://maps.googleapis.com/maps/api/place/photo?maxwidth=${photo.width}&maxheight=${photo.height}&photoreference=${photo.photo_reference}&key=${apiKey}`
      })) : [],
      reviews: result.reviews ? result.reviews : [],
      geometry: result.geometry,
      types: result.types,
      website: result.website,
      international_phone_number: result.international_phone_number,
      vicinity: result.vicinity,
      url: result.url,
      business_status: result.business_status,
    };

    return details;
  } catch (error) {
    console.error("Error fetching details for restaurantId:", restaurantId, error);
    return null;
  }
}

module.exports = fetchRestaurantDetails;