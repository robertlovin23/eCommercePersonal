const mongoose = require('mongoose');
const { Schema } = mongoose;

const userSchema = new Schema({
    twitterId: String,
    profilePic: String,
    displayName: String
})

mongoose.model('users', userSchema);

