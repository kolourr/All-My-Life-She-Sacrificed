const mongoose = require('mongoose');

const wallStoryCommentSchema = new mongoose.Schema({
    captionComment: {
        type: String,
        trim: true,
        maxLength: 280,
        required: true
    },
    loginID: {
        type: String,
        required: true,
    },
    wallStory: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'WallStory',
    },
    heart: [],

    heartBreak: [],
    
    createdAt: {
        type: Date,
        default: Date.now,
    },
 })

 module.exports = mongoose.model('WallStoryComments', wallStoryCommentSchema)
