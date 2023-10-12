function getCurrentTime () {

    const currentTime = new Date();
    const hours = String(currentTime.getHours()).padStart(2, '0'); // Ensure two digits
    const minutes = String(currentTime.getMinutes()).padStart(2, '0');
    const seconds = String(currentTime.getSeconds()).padStart(2, '0');
    const milliseconds = String(currentTime.getMilliseconds()).padStart(3, '0');
  
    return `${hours}:${minutes}:${seconds}:${milliseconds}`;
}

module.exports = getCurrentTime