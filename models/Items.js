const mongoose = require('mongoose');
const { Schema } = mongoose;

const itemSchema = new Schema({
    itemName: String,
    itemPrice: Number,
    itemQty: Number,
    itemDesc: String,
    twitterId: String,
    likesAdded: {type: Number, default: 0},   
    usersLiked: [
        {type: Schema.Types.ObjectId, ref: 'users', sparse: true, unique: false, default: null}
    ]
})

mongoose.model('items',itemSchema);