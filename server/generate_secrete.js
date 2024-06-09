const crypto = require('crypto');

const generateSecret = () => {
  return crypto.randomBytes(64).toString('hex');
};

const jwtSecret = generateSecret();
console.log(jwtSecret);
