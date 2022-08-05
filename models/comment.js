const mongoose = require('mongoose');

const commentSchema = new mongoose.Schema({
    body: {
        type: String,
        trim: true,
        maxLength: 280,
        required: true
    },
    loginID: {
        type: String,
        required: true,
    },
    post: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Post',
    },
    heart: {
        type: Number,
        default: 0,
        required: true,
    },
    heartBreak: {
        type: Number,
        default: 0,
        required: true,
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
 })

 module.exports = mongoose.model('Comment', commentSchema)
