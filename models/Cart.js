const mongoose = require('mongoose');
const { Schema } = mongoose;

const cartSchema = new Schema({
    customerId: {
        type: Schema.Types.ObjectId, ref: 'users', require: true, unique: true
    },
    cartContents: [
        {type: Schema.Types.ObjectId, ref: 'item', unique: true}
    ],
    itemCount: {type: Number, default: 0},
    date: {
        type: Date,
        default: Date.now
    }
})

mongoose.model('cart',cartSchema)