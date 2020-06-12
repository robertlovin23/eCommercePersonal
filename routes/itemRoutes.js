const mongoose = require('mongoose')
const requireLogin = require('../middleware/requireLogin')
const User = mongoose.model('users')
const Item = mongoose.model('items')
const multer  = require('multer')
const upload = multer({dest: 'uploads/items/'});




module.exports = app => {


    app.post('/api/createItem', upload.single('itemImg'), requireLogin, (req,res) => {
        console.log(req.body.files[0])
        const item = new Item({
            itemName: req.body.itemName,
            itemPrice: req.body.itemPrice,
            itemDesc: req.body.itemDesc,
            twitterId: req.body.twitterId,
            likesAdded: req.body.likesAdded,
            usersLiked: req.body.usersLiked,
            itemImg: new Buffer(req.body.files[0],'base64'),
            itemQty: req.body.itemQty,
            comments: req.body.comments,
            numberOfComments: req.body.numberOfComments
        }).save();

        res.json(item)
    });

    app.patch('/api/comments/:id', requireLogin, async (req,res) => {
        var itemBody = req.body.commentBody
        var id = req.params.id
        console.log(itemBody,id)
            await Item.update(
                {_id: id},
                {
                    $inc: { numberOfComments: 1},
                    $push: { comments: { commentBody: req.body.commentBody, userId: req.user._id } }
                }
            )
    })

    app.patch('/api/comments/:id/delete', requireLogin, async (req,res) => {
        var id = req.params.id
            await Item.update(
                {_id: id},
                {
                    $inc: { numberOfComments: -1},
                    $pull: {  comments: { commentBody: req.body.commentBody, userId: req.user._id }}
                }
            )
    })
    
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
                res.send( itemList)
            }
        })
    })

    app.get(`/api/items/:id`, async (req,res) => {
        var id = req.params.id
            await Item.findOne({
               _id: id
            },(err,item) => {
                if(err,!item){
                    console.log("Could not load new document", err)
                } else {
                    res.send({item, itemImgBase64: Buffer.from(item.itemImg).toString('base64')})
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