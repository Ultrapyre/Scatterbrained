const { User , Task } = require('../models')
const { signToken } = require('../utils/auth')
const { AuthenticationError } = require('apollo-server-express')

const resolvers = {
  Query:{
    me: async (parent, args, context) => {
      if (context.user) {
        return await User.findById(context.user._id );
      }
      throw new AuthenticationError('You need to be logged in!');
    },
  },
  Mutation: {
    // login, login(email: String!, password: String!): Auth
    login: async(parent, { email, password }) => {
      const user = await User.findOne({email})

      if(!user){
        throw new AuthenticationError('No user found with this email address!')
      }

      const correctPw = user.isCorrectPassword(password)

      if(!correctPw){
        throw new AuthenticationError('Wrong credientals!')
      }

      const token = signToken(user);
      return { token, user };
    },
    addUser: async(parent, {username, email, password}) => {
      const user = await User.create({username, email, password})
      const token = signToken(user)
      return { token, user }
    },
  }
}

module.exports = resolvers