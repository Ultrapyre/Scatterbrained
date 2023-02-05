const { Schema, model } = require('mongoose')

const taskSchema = new Schema(
    {
        title:{
            type: String,
            required: true,
        },
        username:{
            type: String,
            required: true,
        },
        taskText:{
            type: String,
            required: true,
        },
        createdAt: {
            type: Date,
            default: Date.now(),
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

taskSchema.virtual('participantCount').get(function () {
    return this.participants.length;
});  

const Task = model('task', taskSchema)

module.exports = Task;