import React from 'react'
import CommentForm from '../forms/commentForm'
import CloseIcon from '@material-ui/icons/Close';
import {Button,Container,Grid,Typography, Divider, List, ListItem, ListItemAvatar, Avatar, ListItemText, IconButton} from '@material-ui/core'
import _ from 'lodash'
import {connect} from 'react-redux'
import KeyboardArrowDownIcon from '@material-ui/icons/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@material-ui/icons/KeyboardArrowUp';
import {fetchItem,addToCart,makeCart,fetchUsers,deleteComment,addCommentLike,deleteCommentLike} from '../../actions'


class ItemDetail extends React.Component{
    componentDidMount(){
        this.props.fetchItem(this.props.match.params.id);
        this.props.fetchUsers();
    }

    deleteComments = (id,commentId,itemId) => {
        console.log(id,commentId,itemId)
            if(this.props.auth === null){
                return null;
            } else if (this.props.item.item === undefined){
                return(
                    <div></div>
                )
            } else if(this.props.auth._id === id){
                    return(
                        <div>
                            <IconButton onClick={() => this.props.deleteComment(itemId,commentId)}>
                                <CloseIcon>close</CloseIcon>
                            </IconButton>
                        </div>
                    )
            }
    }

    renderComments = (id) => {
        if(this.props.item.item.comments === undefined || _.isEmpty(this.props.user)){
            return <div>Loading...</div>
        } else {
            var response = this.props.user.map(user => {
                return this.props.item.item.comments.map(comment => {
                    console.log(comment,user)
                    if(user._id === comment.userId){
                        return(
                            <ListItem key={comment._id}>
                                <div>
                                    {this.deleteComments(comment.userId,comment._id, id)}
                                    <div>
                                        {/* <KeyboardArrowUpIcon onClick={() => this.props.addCommentLike(comment._id, id)}></KeyboardArrowUpIcon>
                                        {comment.commentLikesAdded}
                                        <KeyboardArrowDownIcon onClick={() => this.props.deleteCommentLike(comment._id, id)}></KeyboardArrowDownIcon> */}
                                    </div>
                                    <ListItemAvatar>
                                        <Avatar src={user.profilePic} alt={user.displayName}/> 
                                    </ListItemAvatar>
                                    <b style={{display:"block"}}>{user.displayName}</b>       
                                    <Typography variant="body1">{comment.commentBody}</Typography>

                                </div>
                            </ListItem>
                        )
                    }
                })
            })
            if(this.props.item.item.comments.length === 0){
                return(
                    <div>
                    </div>
                )
            } else {
                return(
                    <List> 
                        {response}
                    </List>
                )
            }
        }
    }

    showWhoLiked = () =>{
        if(this.props.item.item.usersLiked === undefined || _.isEmpty(this.props.user)){
            return <div>Loading...</div>
        } else {

            var response = this.props.user.map(user => {
                    return this.props.item.item.usersLiked.map(like => {
                        console.log(user.profilePic,this.props.user)
                        if(user._id === like){
                            console.log(user.profilePic)
                            return (
                                <ListItem style={{marginTop:"20px"}}>
                                    <ListItemAvatar>
                                        <Avatar src={user.profilePic} style={{marginBottom:"-20px", marginRight: "10px", borderRadius: "50%"}}/> 
                                    </ListItemAvatar>     
                                    <ListItemText primary={user.displayName}/>
                                </ListItem>
                            )
                        }
                    })       
                })                    
                return(
                    <div>
                        Liked By:<List> {response}</List>
                    </div>
                )

            }
        } 



    fetchItem = () => {
        !this.props.cart ? this.props.makeCart() && this.props.addToCart(this.props.match.params.id) : this.props.addToCart(this.props.match.params.id);
    }

    render(){
        if(!this.props.item.item){
            return(
                <div>Loading...</div>
            )
        } else {
            
            const { itemName, itemPrice, itemDesc, _id, usersLiked } = this.props.item.item
            const image = this.props.item.itemImgBase64
            console.log(this.props.item)
            if(image){
                return(
                    <div>
                        <Grid container spacing="3">
                            <Grid item xs={9}>
                                <img src={`data:image/jpeg;base64,${image}`} style={{marginTop:"40px",width:"100%"}}></img>
                            </Grid>

                            <Grid item xs={3}>
                                <div>
                                    <Typography variant="h3">{itemName}</Typography>
                                    <Typography variant="h4">${itemPrice}</Typography>
                                    <Typography variant="body1">{itemDesc}</Typography>
                                </div>

                                {this.showWhoLiked()}

                                <br/>
                                <Button variant="contained" color="primary" onClick={() => this.fetchItem()}>
                                    Add to Cart
                                </Button>
                            </Grid>
                        </Grid>
                        <div>
                            <Typography variant="h3" style={{textAlign: 'center'}}>
                                Comments
                            </Typography>
                            {this.renderComments(_id)}
                            <CommentForm itemId={_id}></CommentForm>
                        </div>
                    </div>
                )
            }

        }        
    }
}

const mapStateToProps = (state,ownProps) => {
    return{
        item: state.item,
        auth: state.auth,
        cart: state.cart,
        user: Object.values(state.user)
    }
}

export default connect(mapStateToProps,{
    fetchItem,
    addToCart,
    makeCart,
    fetchUsers,
    deleteComment,
    addCommentLike,
    deleteCommentLike
})(ItemDetail)