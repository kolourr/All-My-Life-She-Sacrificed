const mongoose = require('mongoose')

const wallSchema = new mongoose.Schema({
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

    wallComments: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'WallComments',
    }],  
    createdAt: {  
        type: Date,
        default: Date.now,
      },
})


module.exports = mongoose.model('Wall', wallSchema)
