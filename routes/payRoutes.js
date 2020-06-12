const keys = require('../config/dev');
const mongoose = require('mongoose');
const stripe = require('stripe')(keys.stripeSecretKey);

const Cart = mongoose.model('cart');
const Payment = mongoose.model('payments');

module.exports = app => {
    app.get('/api/secret', async (req,res) => {
        console.log(req.user._id)
        const payment = await Cart.find({customerId: req.user._id}, (err,cart) => {
            if(err){
                return;
            } else {
                return cart
            }
        })
        console.log(payment)
        if(payment){


            const intent = await stripe.paymentIntents.create({
                amount: payment[0].totalPrice * 100,
                currency: 'usd',
                metadata: {integration_check: 'accept_a_payment'},
            })
        
            res.json({client_secret: intent.client_secret});
            console.log(intent)
        } else {
            alert("Payment not successful")
        }
    })

    app.post('/api/record-payment', async (req,res) => {
        const userId = req.user._id
        const payment = await Cart.find({customerId: userId}, (err,cart) => {
            if(err){
                return;
            } else {
                return cart
            }
        })
        const itemArr = payment[0].cartContents.map(item => {
            return item.itemIds
        })
            console.log(payment,itemArr)
            for(var i = 0; i < itemArr.length; i++){
                const newPayment = new Payment({
                    customerId: userId,
                    itemsBought: itemArr,
                    totalCount: payment[0].totalCount,
                    totalAmount: payment[0].totalPrice,
                    date: req.body.date
                }).save();

                return newPayment;
            }
        res.json(newPayment)


    })
}