const mongoose = require('mongoose');
const requireLogin = require('../middleware/requireLogin')
const Cart = mongoose.model('cart');
const Item = mongoose.model('items');


module.exports = app => {

    app.post('/api/cart/add', requireLogin, (req,res) =>{
        const userId = req.user._id

        const cart = new Cart({
            customerId: userId,
            cartContents: req.body.cartContents,
            totalCount: req.body.totalCount,
            totalPrice: req.body.totalPrice,
            date: req.body.date
        }).save();
        res.json(cart)
    })

    app.patch('/api/cart/add/:id', requireLogin, async (req,res) =>{
        var id = req.params.id
        console.log(req.body)

        const item = await Item.find({_id: req.params.id}, (err,item) => {
            if(err){
                return err;
            } else {
                return item
            }
        })
        const cart = await Cart.find({customerId: req.user._id}, (err,cart) => {
            if(err){
                return err;
            } else {
                return cart
            }
        })
        // const cartCount = cart[0].cartContents.map(items => {
        //     return items.itemCount
        // })

        // const itemPricing = item[0].itemPrice
            await Cart.update({customerId: req.user._id, 'cartContents.itemIds': {$ne: id}},{
                    $addToSet: { cartContents: { itemIds: id, itemName: item[0].itemName, itemPrice: item[0].itemPrice }}
                }
            )
            if(item[0].itemQty > 0){
                await Item.update({_id: req.params.id},{
                    $inc: { itemQty: -1}
                })
                await Cart.update({'cartContents.itemIds': id},{
                    $inc: { 'cartContents.$.itemCount': 1, totalCount: 1, totalPrice: item[0].itemPrice }                
                })            
            }
    })

    app.patch('/api/cart/delete/:id', requireLogin, async (req,res) =>{
        var id = req.params.id
        
        const item = await Item.find({_id: req.params.id}, (err,item) => {
            if(err){
                return err;
            } else {
                return item
            }
        })
        const cart = await Cart.find({customerId: req.user._id}, (err,cart) => {
            if(err){
                return err;
            } else {
                return cart
            }
        })
        const cartCount = cart[0].cartContents.map(items => {
            return items.itemCount
        })
        console.log(cartCount[0], item[0].itemQty)
            await Cart.update({'cartContents.itemIds': id},{
                $inc: { 'cartContents.$.itemCount': -1,  totalCount: -1, totalPrice: -item[0].itemPrice}
            })
            await Item.update({_id: req.params.id},{
                $inc: { itemQty: 1}
            })
            await Cart.update({customerId: req.user._id},{
                $pull: { cartContents: { itemCount: 0, itemIds: id} },
                multi: true
            })
        
    })

    app.get('/api/cart/:id', requireLogin, async(req,res) => {
        await Cart.findOne({customerId: req.user._id}, (err,cart) => {
            if(err){
                return;
            } else {
                res.send(cart)
            }
        })
    })

    app.delete('/api/cart/:id', requireLogin, async(req,res) => {
        var id = req.params.id
            await Cart.remove({
               customerId: req.user._id
            },(err,cart) => {
                if(err || req.body === null){
                    console.log("Error deleting", err)
                } else {
                    res.send(cart)
                }

            }
        )
    })
}
