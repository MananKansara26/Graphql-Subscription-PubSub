const jwt = require('jsonwebtoken');
require('dotenv').config();
const secret = process.env.JWT_SECRET;

const getUserFromToken = (token) => {
  token = token && token.split(' ')[1];
  if (!token) throw new Error('Forbidden');

  return new Promise((resolve, reject) => {
    jwt.verify(token, secret, (err, user) => {
      if (err) {
        reject(new Error('Forbidden'));
      } else {
        resolve(user.sub);
      }
    });
  });
};

module.exports = getUserFromToken