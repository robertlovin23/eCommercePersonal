import React from 'react'
import CommentForm from '../forms/commentForm'
import _ from 'lodash'
import {connect} from 'react-redux'
import {fetchItem,addToCart,makeCart,fetchUsers} from '../../actions'


class ItemDetail extends React.Component{
    componentDidMount(){
        this.props.fetchItem(this.props.match.params.id);
        this.props.fetchUsers();
    }

    renderComments = () => {
        if(this.props.item.item.comments === undefined || _.isEmpty(this.props.user)){
            return <div>Loading...</div>
        } else {
            var response = this.props.user.map(user => {
                return this.props.item.item.comments.map(comment => {
                    console.log(comment,user)
                    if(user._id === comment.userId){
                        return(
                            <div className="collection-item">
                                <img src={user.profilePic}/> 
                                <b style={{display:"block"}}>{user.displayName}</b>       
                                <p>{comment.commentBody}</p>
                            </div>
                        )
                    }
                })
            })
            return(
                <div className="collection"> 
                    {response}
                </div>
            )
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
                                <li style={{marginTop:"20px"}}>
                                    <img src={user.profilePic} style={{marginBottom:"-20px", marginRight: "10px", borderRadius: "50%"}}/>        
                                    {user.displayName}
                                </li>

                            )
                        }
                    })       
                })                    
                return(
                    <div>
                        Liked By:<ul> {response}</ul>
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
                        <div className="row">
                            <div className="col m9">
                                <img src={`data:image/jpeg;base64,${image}`} style={{marginTop:"40px"}}></img>
                            </div>

                            <div className="col m3">
                                <div>
                                    <h3>{itemName}</h3>
                                    <h4>${itemPrice}</h4>
                                    <p>{itemDesc}</p>
                                </div>

                                {this.showWhoLiked()}

                                <br/>
                                <button className="waves-effect waves-light btn" onClick={this.fetchItem}>
                                    Add to Cart
                                </button>
                            </div>
                        </div>
                        <div>
                            <h4 style={{textAlign: 'center'}}>Comments</h4>
                            {this.renderComments()}
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
        cart: state.cart,
        user: Object.values(state.user)
    }
}

export default connect(mapStateToProps,{
    fetchItem,
    addToCart,
    makeCart,
    fetchUsers
})(ItemDetail)