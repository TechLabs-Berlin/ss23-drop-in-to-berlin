function generateRandomUserImageURL() {
  const gender = Math.random() < 0.5 ? "men" : "women";
  const randomNum = Math.floor(Math.random() * 70) + 1;

  const imageURL = `https://randomuser.me/api/portraits/${gender}/${randomNum}.jpg`;

  return imageURL;
}

module.exports = generateRandomUserImageURL
