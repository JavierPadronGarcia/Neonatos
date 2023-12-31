var jwt = require('jsonwebtoken');

function generateToken(user) {
  if (!user) return null;

  var u = {
    id: user.id,
    username: user.username,
    password: user.password,
    role: user.role
  }

  return jwt.sign(u, process.env.JWT_SECRET, {
    expiresIn: 60 * 60 * 24  //expires in 24 hours
  })
}

function getCleanUser(user) {
  if (!user) return null;

  return {
    id: user.id,
    username: user.username,
    password: user.password,
    role: user.role
  }
}

function decodeToken(token) {
  token = token.replace('Bearer ', '');
  //decode token bearer
  let decoded = jwt.verify(token, process.env.JWT_SECRET);
  return decoded;
}

module.exports = {
  generateToken,
  getCleanUser,
  decodeToken
}