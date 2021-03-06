import React from 'react'
import StripeCheckout from 'react-stripe-checkout';
import {Elements,CardElement,ElementsConsumer} from '@stripe/react-stripe-js';
import {loadStripe} from '@stripe/stripe-js';
import {Button,TableCell,TableRow,TableHead,Table,TableContainer, TableBody, Typography} from '@material-ui/core'
import {connect} from 'react-redux'
import CheckoutForm from '../forms/checkoutForm'
import {userPay, fetchCart, fetchItems,fetchUser,deleteFromCart,addToCart, makeCart, addPayment} from '../../actions'


class CartList extends React.Component{

    componentDidMount(){
        // this.props.fetchItems();
        if(!this.props.cart){
            this.props.makeCart()
        }else {
            this.props.fetchCart(this.props.match.params.id)
        }

        // if(this.props.match.params.id){
        //     this.props.fetchCart(this.props.match.params.id)
        // }
         
        if(this.props.cart !== undefined){
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
                        if(cartItems.itemIds && cartItems.itemCount > 0){
                            return(
                                <TableRow key={cartItems.itemIds} wrap="nowrap" direction="row" alignItems="center">
                                    <TableCell style={{padding:'3px'}}>{cartItems.itemName}</TableCell>
                                    <TableCell style={{padding:'3px'}}>{cartItems.itemPrice}</TableCell>
                                    <TableCell style={{padding:'3px'}}>{cartItems.itemCount}</TableCell>
                                    <TableCell style={{padding:'2px'}}><Button variant="contained" color="primary" onClick={() => this.props.addToCart(cartItems.itemIds)}>Add</Button></TableCell>
                                    <TableCell style={{padding:'2px'}}><Button variant="contained" color="secondary" onClick={() => this.props.deleteFromCart(cartItems.itemIds)}>Delete</Button></TableCell> 
                                </TableRow>
                            )

                    }              
            })
        }
    }

    // findTotal = () => {
    //     if(this.props.cart.cartContents === undefined){
    //         return(
    //             <div style={{display:'inline'}}>0</div>
    //         )
    //     } else {
    //         var prices = 0;
    //         var totalArr = [];
    //         this.props.cart.cartContents.map(cartItems => {
    //             for(var i = 0; i < this.props.item.length; i++){    
    //                 if(this.props.item[i]._id === cartItems.itemIds){
    //                     prices = this.props.item[i].itemPrice * cartItems.itemCount
    //                     console.log(prices)
    //                 }
    //             }
    //             totalArr.push(prices)
    //             return totalArr

   
    //         })
    //         const totalPrice = totalArr.reduce((a,b) => a + b, 0)
    //         console.log(totalPrice)
    //         return totalPrice
    //     }
    // }


    renderTotal(){
        console.log(this.findTotal())
        return (
            <div style={{display:'inline'}}>{this.findTotal()}</div>
        )
    }


    render(){
        console.log(this.props.payment.client_secret)

        return(
            <div>
                <Typography variant="h3" style={{marginTop:"10px",marginBottom:"10px"}}>Your Cart</Typography>

                <Table wrap="nowrap" direction="row" alignItems="center">
                    <TableHead>
                        <TableRow>
                            <TableCell style={{padding:'3px'}}>Name</TableCell>
                            <TableCell style={{padding:'3px'}}>Price</TableCell>
                            <TableCell style={{padding:'3px'}}>Quantity</TableCell>
                            <TableCell style={{padding:'3px'}}>Add</TableCell>
                            <TableCell style={{padding:'3px'}} >Delete</TableCell>
                        </TableRow>
                    </TableHead>

                    <TableBody >
                        {this.renderCartRow()}
                    </TableBody>
                </Table>
                <br/>
                <div style={{marginBottom: '10px'}}>
                    <Typography variant="body1" style={{display:'inline'}}>Total: $ {this.props.cart.totalPrice}</Typography>
                </div>
                    <Typography variant="body1">{this.props.cart.totalCount} Items</Typography>
                <br/>
                    {/* <StripeCheckout name="WishBuyer" amount={this.findTotal() * 100} >
                        Checkout
                    </StripeCheckout> */}
                        <ElementsConsumer>
                            {({stripe,elements}) => (
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
        auth: state.auth,
        payment: state.payment
    }
}

export default connect(mapStateToProps,{
    fetchCart,
    fetchUser,
    deleteFromCart,
    addToCart,
    makeCart,
    userPay,
    addPayment
})(CartList)