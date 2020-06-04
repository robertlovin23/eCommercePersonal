const mongoose = require('mongoose')
const {Schema} = mongoose;

const paymentSchema = new Schema({
    customerId: {type: Schema.Types.ObjectId, ref: 'users', require: true},
    itemsBought: [{
        itemId: {type: Schema.Types.ObjectId, ref: 'cart'},
        // itemCount: {type: Schema.Types.ObjectId, default: 0}
    }],
    totalCount: {type: Number, default: 0, ref: 'cart'},
    totalAmount: {type: Number, default: 0, ref: 'cart'},
    date: {
        type: Date,
        default: Date.now,
    }
})

mongoose.model('payments', paymentSchema);