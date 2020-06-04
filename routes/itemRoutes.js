const mongoose = require('mongoose')
const requireLogin = require('../middleware/requireLogin')
const Item = mongoose.model('items')
const User = mongoose.model('users')

module.exports = app => {

    app.post('/api/createItem', requireLogin, (req,res) => {
        const item = new Item({
            itemName: req.body.itemName,
            itemPrice: req.body.itemPrice,
            itemDesc: req.body.itemDesc,
            twitterId: req.body.twitterId,
            likesAdded: req.body.likesAdded,
            usersLiked: req.body.usersLiked,
            itemQty: req.body.itemQty
        }).save();
        console.log(req.body)

        res.json(item)
    });

    app.patch('/api/likes/:id', requireLogin, async (req,res) => {
        console.log(req.user)
        var id = req.params.id
                await Item.update(
                    {_id: id},
                        {
                            $inc: { likesAdded: 1 },
                            $addToSet: { usersLiked: req.user._id },
                            
                        }
                    )
            
    })

    app.patch('/api/likes/:id/delete', requireLogin, async (req,res) => {
        var id = req.params.id
            await Item.update(
                {_id: id },
                {
                    $inc: { likesAdded: -1 },
                    $pull: { usersLiked: req.user._id}
                }
            )
    })

    app.get('/api/items', async (req,res) => {
        console.log(Item)
        await Item.find({}, (err,itemList) => {
            if(err){
                console.log(err);
            }
            else {
                res.send(itemList)
            }
        })
    })

    app.get(`/api/items/:id`, async (req,res) => {
        var id = req.params.id
            await Item.findOne({
               _id: id
            },(err,item) => {
                if(err){
                    console.log("Could not load new document", err)
                } else {
                    res.send(item)
                }

            }
        )
    });

    app.patch(`/api/items/:id`,  requireLogin, async (req,res) => {
        var updateObjectBody = req.body
        console.log(req.body)
        var id = req.params.id
        await Item.update(
            {
                _id: id
            }, 
            {
                $set: updateObjectBody
            })
    });

    
    app.delete(`/api/items/:id`,  requireLogin, async (req,res) => {
        var id = req.params.id
            await Item.remove({
               _id: id
            },(err,item) => {
                if(err || req.body === null){
                    console.log("Error deleting", err)
                } else {
                    res.send(item)
                }

            }
        )

    });



}