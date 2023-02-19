
//helper functions
function isMessageValid(message) {
  if (message.length === 0) return false;
  if (message.trim().length == 0) return false;
  return true;
}

function getRandomArbitrary(min, max) {
  return Math.round(Math.random() * (max - min) + min);
}

export {isMessageValid, getRandomArbitrary}