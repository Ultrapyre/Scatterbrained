const { User , Task } = require('../models')
const { signToken } = require('../utils/auth')
const { AuthenticationError } = require('apollo-server-express')

const resolvers = {
  Query:{
    me: async (parent, args, context) => {
        return await User.findById(context.user._id);
    },
    task: async (parent, {taskId}, context) => {
      if (context.user) {
        return await Task.findById(taskId).populate('participants');
      }
      throw new AuthenticationError('You need to be logged in!');
    },
    tasks: async(parent, {username}, context) => {
      if (context.user) {
        //if a username is provided, pull from their tasks, otherwise pull from the user's.
        const params = username? {username} : context.user.username
        return await Task.find({username: params}).sort({ createdAt: -1 })
      }
      throw new AuthenticationError('You need to be logged in!');
    }
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
    addTask: async(parent, args, context) => {
        if(context.user){
          const task = await Task.create(args.task)
          await Task.findByIdAndUpdate(
            {_id: task._id},
            {$push: {participants: context.user._id}},
            { new: true, runValidators: true}
          )
          await User.findByIdAndUpdate(
            {_id: context.user._id},
            {$push: {savedTasks: [task]}},
            { new: true, runValidators: true}
          )
          return task
        }
        throw new AuthenticationError('You need to be logged in!');
    },
    updateTask: async(parent, args, context) => {
        if(context.user){
          const task = await Task.findByIdAndUpdate(
            {_id: args.taskId},
            {title: args.task.title, taskText: args.task.taskText},
            { new: true, runValidators: true}
          )
          if(task){
            return task
          }
          throw new Error('No such task with that ID found!') 
        }
        throw new AuthenticationError('You need to be logged in!');
    },
    removeTask: async(parent, {taskId}, context) => {
        if(context.user){
          const task = await Task.findByIdAndRemove({_id: taskId})
          if(task){
            await User.findByIdAndUpdate(
              {_id: context.user._id},
              {$pull: {savedTasks: task._id}}
            )
            return task
          }
          throw new Error('No such task with that ID found!')
        }
        throw new AuthenticationError('You need to be logged in!');
    }
  }
}

module.exports = resolvers