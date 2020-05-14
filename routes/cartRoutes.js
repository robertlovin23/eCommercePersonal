const mongoose = require('mongoose');
const requireLogin = require('../middleware/requireLogin')
const Cart = mongoose.model('cart');
const Item = mongoose.model('items');

module.exports = app => {

    app.post('/api/cart/add', requireLogin, async (req,res) =>{
        const userId = req.user._id

        await new Cart({
            customerId: userId,
            cartContents: req.body.cartContents,
            itemCount: req.body.itemCount
        }).save();

        res.json(req.body)
    })

    app.patch('/api/cart/add/:id', requireLogin, async (req,res) =>{
        var id = req.params.id
        console.log(req,req.user._id)
        await Cart.update({customerId: req.user._id},{
            $inc: {itemCount: 1},
            $addToSet: { cartContents: id }
        })

    })
}
