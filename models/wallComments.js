const mongoose = require('mongoose');

const wallCommentSchema = new mongoose.Schema({
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
    wall: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Wall',
    },
    heart: [],

    heartBreak: [],
    
    createdAt: {
        type: Date,
        default: Date.now,
    },
 })

 module.exports = mongoose.model('WallComments', wallCommentSchema)
