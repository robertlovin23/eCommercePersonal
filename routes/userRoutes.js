const mongoose = require('mongoose');

const User = mongoose.model('users')

module.exports = app => {

    app.get('/api/users', async (req,res) => {
        await User.find({}, (err,users) => {
            if(err){
                return
            } else {
                res.send(users)
            }
        })
    })
}