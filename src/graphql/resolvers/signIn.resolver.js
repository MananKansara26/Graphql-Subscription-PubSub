require('dotenv').config();
const { GraphQLError } = require('graphql');
const jwt = require('jsonwebtoken');
const moment = require('moment');
const { JWT_EXPIRATION_DAYS } = require('./../../utils/constants');
const secret = process.env.JWT_SECRET;

const signIn = async (_, { email, password }, { models: { User } }) => {
  const user = await User.findOne({ email });
  if (!user) throw new GraphQLError("User does not exists");

  if (!(await user.isPasswordMatch(password))) throw new GraphQLError("Password does not match");

  const tokenExpirationTime = moment().add(JWT_EXPIRATION_DAYS, 'day');
  const accessToken = jwt.sign({ sub: { _id: user._id, role: user.role }, iat: moment().unix(), exp: tokenExpirationTime.unix() }, secret);

  return {
    accessToken,
    user
  }
};

module.exports = signIn;