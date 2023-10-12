const readJSONFile = require('./readJSON');
const fetchRestaurantDetails = require('./fetchRestaurantDetails');
const writeJSONFile = require('./writeJSON');

async function main() {
  const existingFilePath = '../src/data/rest-db-large.json'; 
  const newFilePath = '../src/data/new_data.json'; 
  const apiKey = ''; 

  const existingData = await readJSONFile(existingFilePath);
  const testData = existingData.restaurants;
  const newData = []; 

  console.log(`Starting to fetch details for ${testData.length} restaurants...`);

  let count = 0;

  for (const row of testData) {
    count++;
    const restaurantId = row.reference; 
    console.log(`Fetching details for restaurant ${count}/${testData.length} (Reference: ${restaurantId})...`);

    const restaurantDetails = await fetchRestaurantDetails(restaurantId, apiKey);

    if (restaurantDetails) {
      restaurantDetails.reference = row.reference;
      restaurantDetails.editorial_summary = row.editorial_summary;
      
      newData.push(restaurantDetails);
    }
  }

  console.log("Writing data to the new JSON file...");
  await writeJSONFile(newFilePath, { restaurants: newData }); 
  console.log("Data writing completed!");
}

main();