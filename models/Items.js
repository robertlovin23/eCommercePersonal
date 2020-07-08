const mongoose = require('mongoose');
const { Schema } = mongoose;

const itemSchema = new Schema({
    itemName: {type:String, required: true},
    itemPrice: {type:Number, required: true},
    itemQty: {type:Number, required: true},
    itemDesc: {type:String, required: true},
    itemImg: {type:Buffer, contentType: String},
    twitterId: {type:String, required: true},
    likesAdded: {type: Number, default: 0},   
    usersLiked: [
        {type: Schema.Types.ObjectId, ref: 'users', sparse: true, unique: false, default: null}
    ],
    comments: [{
        userId: {type: Schema.Types.ObjectId, ref: 'users'},
        commentBody: String,
        timePosted: {type:Date, default: Date.now},
        commentLikesAdded: {type: Number, default: 0},
    }],
    numberOfComments: {type: Number, default: 0},
})

mongoose.model('items',itemSchema);