import mongoose from 'mongoose'

const GameSchema = new mongoose.Schema({
    type: {
        type: String,
        enum: ['CS', 'TTT', '2048']
    },
    duration: {
        type: Number
    },
    updated: Date,
    created: {
        type: Date,
        default: Date.now
    },
    user: {type:mongoose.Schema.Types.ObjectId, ref:'User'}
       
})

export default mongoose.model('Game', GameSchema)