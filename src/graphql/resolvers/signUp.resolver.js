require('dotenv').config();
const { GraphQLError } = require('graphql');
const jwt = require('jsonwebtoken');
const moment = require('moment');
const { JWT_EXPIRATION_DAYS } = require('./../../utils/constants');
const secret = process.env.JWT_SECRET;

const signUp = async (_, { email, password }, { models: { User } }) => {
  const isEmailTaken = await User.isEmailTaken(email);
  if (isEmailTaken) throw new GraphQLError("Email is already taken");

  const user = await User.create({ email, password });

  const tokenExpirationTime = moment().add(JWT_EXPIRATION_DAYS, 'day');
  const accessToken = jwt.sign({ sub: { _id: user._id, role: user.role }, iat: moment().unix(), exp: tokenExpirationTime.unix() }, secret);

  return {
    accessToken,
    user
  }
};

module.exports = signUp;