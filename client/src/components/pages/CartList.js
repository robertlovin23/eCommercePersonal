import React from 'react'
import StripeCheckout from 'react-stripe-checkout';
import {Elements,CardElement,ElementsConsumer} from '@stripe/react-stripe-js';
import {loadStripe} from '@stripe/stripe-js';
import {connect} from 'react-redux'
import CheckoutForm from '../forms/checkoutForm'
import {userPay, fetchCart, fetchItems,fetchUser,deleteFromCart,addToCart, makeCart, addPayment} from '../../actions'


class CartList extends React.Component{

    componentDidMount(){
        this.props.fetchCart(this.props.match.params.id)
        this.props.fetchItems();
        if(this.props.match.params.id !== undefined){
            this.props.userPay();
        }

    }

    renderCartRow(){
        if(this.props.auth === null){
            return;
        } else if (!this.props.cart){
            return(
                <div>Loading</div>
            )
        } else if(this.props.cart.customerId === this.props.auth._id ){
            return this.props.cart.cartContents.map(cartItems => {
                for(var i = 0; i < this.props.item.length; i++){      
                    console.log(cartItems.itemCount)
                        if(cartItems.itemIds === this.props.item[i]._id && cartItems.itemCount > 0){
                            return(
                                <tr key={this.props.item[i]._id}>
                                    <td>{this.props.item[i].itemName}</td>
                                    <td>{this.props.item[i].itemPrice}</td>
                                    <td>{cartItems.itemCount}</td>
                                    <td><button className="waves-effect waves-light btn" onClick={() => this.props.addToCart(this.props.item[i]._id)}>Add More</button></td>
                                    <td><button className="waves-effect waves-light btn" onClick={() => this.props.deleteFromCart(this.props.item[i]._id)}>Delete</button></td> 
                                </tr>
                            )

                    }              

                }
            })
        }
    }

    findTotal = () => {
        if(this.props.cart.cartContents === undefined){
            return(
                <div style={{display:'inline'}}>0</div>
            )
        } else {
            var prices = 0;
            var totalArr = [];
            this.props.cart.cartContents.map(cartItems => {
                for(var i = 0; i < this.props.item.length; i++){    
                    if(this.props.item[i]._id === cartItems.itemIds){
                        prices = this.props.item[i].itemPrice * cartItems.itemCount
                        console.log(prices)
                    }
                }
                totalArr.push(prices)
                return totalArr

   
            })
            const totalPrice = totalArr.reduce((a,b) => a + b, 0)
            console.log(totalPrice)
            return totalPrice
        }
    }


    renderTotal(){
        console.log(this.findTotal())
        return (
            <div style={{display:'inline'}}>{this.findTotal()}</div>
        )
    }


    render(){
        console.log(this.props)
        return(
            <div>
                <h4>Shopping Cart</h4>
                <table>
                    <thead>
                        <tr>
                            <th>Name</th>
                            <th>Price</th>
                            <th>Quantity</th>
                            <th>Add More</th>
                            <th>Delete</th>
                        </tr>
                    </thead>

                    <tbody>
                        {this.renderCartRow()}
                    </tbody>
                </table>
                <br/>
                <div style={{marginBottom: '10px'}}>
                    <b style={{display:'inline'}}>Total: $ {this.renderTotal()}</b>
                </div>
                {this.props.cart.totalCount} Items
                <br/>
                    {/* <StripeCheckout name="WishBuyer" amount={this.findTotal() * 100} >
                        Checkout
                    </StripeCheckout> */}
                        <ElementsConsumer>
                            {({stripe, elements}) => (
                            <CheckoutForm  stripe={stripe} elements={elements} client_secret={this.props.payment.client_secret}/>
                            )}
                        </ElementsConsumer>
                        {/* <form onClick={(event) => this.handleSubmit(event)}>
                            <button className="waves-effect waves-light btn" type="submit">
                                Checkout
                            </button>
                        </form> */}
   
                </div>
            )        
    }
}

const mapStateToProps = (state,ownProps) => {
    return{
        cart: state.cart,
        item: state.item,
        auth: state.auth,
        payment: state.payment
    }
}

export default connect(mapStateToProps,{
    fetchItems,
    fetchCart,
    fetchUser,
    deleteFromCart,
    addToCart,
    makeCart,
    userPay,
    addPayment
})(CartList)