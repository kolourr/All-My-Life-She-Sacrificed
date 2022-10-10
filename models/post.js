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
        default: 'Aww',
        enum: ["Aww", "Thankful", "Blessing", "Heartbroken",
        "Remorseful", "Cranky","Free", "Fortunate", "Humbled"],
      },
      heart: [],

      heartBreak: [],

    loginID: {
        type: String,
        required: true,
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
