const fs = require('fs');
const path = require('path');

function getRandomImage() {
  const profileImageDir = path.join(__dirname, '../assets/profile_imgs')
  const profileImageFiles = fs.readdirSync(profileImageDir);
  const randomIndex = Math.floor(Math.random() * profileImageFiles.length);
  const randomFileName = profileImageFiles[randomIndex];
  return path.join('/', profileImageDir, randomFileName);
}

module.exports = getRandomImage;