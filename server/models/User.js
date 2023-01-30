const { Schema, model } = require('mongoose');
const bcrypt = require('bcrypt');

const userSchema = new Schema(
  {
    username: {
      type: String,
      required: true,
      unique: true,
      trim: true
    },
    email: {
      type: String,
      required: true,
      unique: true,
      match: [/.+@.+\..+/, 'Must use a valid email address'],
    },
    password: {
      type: String,
      required: true,
    },
    // Reference any friends that this user might have.
    friends: [{
            type: Schema.Types.ObjectId,
            ref: 'User',
        }],
    // Sets savedTasks as an array of Tasks.
    savedTasks: [{
        type: Schema.Types.ObjectId,
        ref: 'Task',
    }],
  },
  // set this to use virtual below
  {
    toJSON: {
      virtuals: true,
    },
  }
);

// hash user password
userSchema.pre('save', async function (next) {
  if (this.isNew || this.isModified('password')) {
    const saltRounds = 10;
    this.password = await bcrypt.hash(this.password, saltRounds);
  }

  next();
});

// custom method to compare and validate password for logging in
userSchema.methods.isCorrectPassword = async function (password) {
  return bcrypt.compare(password, this.password);
};

//Retrieves the length of the user's friends array field on query.
userSchema.virtual('friendCount').get(function() {
    return this.friends.length;
})

//Retrieves the length of the user's friends array field on query.
userSchema.virtual('taskCount').get(function() {
    return this.savedTasks.length;
})

const User = model('User', userSchema);

module.exports = User;
