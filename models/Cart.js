const mongoose = require('mongoose');
const { Schema } = mongoose;

const cartSchema = new Schema({
    customerId: {
        type: Schema.Types.ObjectId, ref: 'users', require: true, unique: true
    },
    cartContents: [{
        itemIds: {type: Schema.Types.ObjectId, ref: 'item'},
        itemName: String,
        itemPrice: {type: Number, default: 0},
        itemCount: {type: Number, default: 0},
    }],
    totalCount: {type: Number, default: 0},
    totalPrice: {type: Number, default: 0},
    date: {
        type: Date,
        default: Date.now,
        expires: 3600
    }
})

mongoose.model('cart',cartSchema)