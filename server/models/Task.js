const { Schema, model } = require('mongoose')

const taskSchema = new Schema(
    {
        title:{
            type: String,
            required: true,
        },
        createdBy:{
            type: String,
            required: true,
        },
        taskText:{
            type: String,
            required: true,
        },
        scheduledAt: {
            type: Date,
            //Modifies the date format into a more readable format when queried.
            get: (function(value){return value.toLocaleString()})
        },
        participants: [{
            type: Schema.Types.ObjectId,
            ref: 'User',
        }],
    },
    {
        toJSON: {
            getters: true,
        },
        id: false
    }
)

const Task = model('task', taskSchema)

module.exports = Task;