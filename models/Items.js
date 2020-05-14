const mongoose = require('mongoose');
const { Schema } = mongoose;

const itemSchema = new Schema({
    itemName: String,
    itemPrice: Number,
    itemDesc: String,
    twitterId: String,
    likesAdded: {type: Number, default: 0},   
    usersLiked: [
        {type: Schema.Types.ObjectId, ref: 'users'}
    ]

})

mongoose.model('items',itemSchema);