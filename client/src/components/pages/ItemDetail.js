import React from 'react'
import _ from 'lodash'
import {connect} from 'react-redux'
import {fetchItem,addToCart,makeCart,fetchUsers} from '../../actions'

// const stripePromise = loadStripe(process.env.REACT_APP_STRIPE_PUBLISHABLE_KEY);

class ItemDetail extends React.Component{
    componentDidMount(){
        this.props.fetchItem(this.props.match.params.id);
        this.props.fetchUsers();
    }

    showWhoLiked = () =>{
        if(this.props.item.usersLiked === undefined || _.isEmpty(this.props.user)){
            return <div>Loading...</div>
        } else {

            var response = this.props.user.map(use => {
                    return this.props.item.usersLiked.map(like => {
                        console.log(use.profilePic,this.props.user)
                        if(use._id === like){
                            console.log(use.profilePic)
                            return (
                                <li style={{marginTop:"20px"}}>
                                    <img src={use.profilePic} style={{marginBottom:"-20px", marginRight: "10px", borderRadius: "50%"}}/>        
                                    {use.displayName}
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
        if(!this.props.item){
            return(
                <div>Loading...</div>
            )
        }

        const { itemName, itemPrice, itemDesc, _id, usersLiked } = this.props.item
        return(
            <div>
                <h3>{itemName}</h3>
                <div>
                    <b>${itemPrice}</b>
                    <p>{itemDesc}</p>
                </div>
                <div>
                    {this.showWhoLiked()}
                </div>
                <br/>
                <button className="waves-effect waves-light btn" onClick={this.fetchItem}>
                    Add to Cart
                </button>
            </div>
        )
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