const mongoose = require('mongoose')

const postSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
        trim: true, 
    },
    body: {
        type: String,
        required: true,
        maxLength: 400,
        trim: true,
    },
    postType: {
        type: String,
        default: 'aww',
        enum: ['aww', 'thankful', 'blessing', 'heartbroken', 'remorseful', 'cranky', 'free', 'fortunate', 'humbled'],  
      },
      heart: {
        type: Number,
        default: 0,
    },
    heartBreak: {
        type: Number,
        default: 0,
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
      },
    comments: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Comment',
    }],
    createdAt: {
        type: Date,
        default: Date.now,
      },
})


module.exports = mongoose.model('Post', postSchema)
