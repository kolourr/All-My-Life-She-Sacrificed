const mongoose = require('mongoose')

const wallStorySchema = new mongoose.Schema({
    image: {
        type: String,
    },
    caption: {
        type: String,
        required: true,
        maxLength: 400,
        trim: true,
    },
    loginID: {
        type: String,
        required: true,
    },
      heart: [],

      heartBreak: [],

    wallStoryComments: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'WallStoryComments',
    }],  
    createdAt: {  
        type: Date,
        default: Date.now,
      },
})


module.exports = mongoose.model('WallStory', wallStorySchema)
