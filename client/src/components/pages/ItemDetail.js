import React from 'react'
import {connect} from 'react-redux'
import {fetchItem,addToCart,makeCart} from '../../actions'

// const stripePromise = loadStripe(process.env.REACT_APP_STRIPE_PUBLISHABLE_KEY);

class ItemDetail extends React.Component{
    componentDidMount(){
        this.props.fetchItem(this.props.match.params.id);
    }

    onToken = async (token) => {
        const response = await fetch('/save-stripe-token',{
            method: 'POST',
            body: JSON.stringify(token)
        })

        const data = await response.json()
        alert(`We are in business, ${data.email}`)
    }


    fetchItem = () => {
        this.props.makeCart();
        this.props.addToCart(this.props.match.params.id);
    }

    render(){
        if(!this.props.item){
            return(
                <div>Loading...</div>
            )
        }

        const { itemName, itemPrice, itemDesc, _id } = this.props.item
        // return(
        //     <div>{item.itemName}</div>
        return(
            <div>
                <h3>{itemName}</h3>
                <div>
                    <b>${itemPrice}</b>
                    <p>{itemDesc}</p>
                </div>
                {/* <StripeCheckout
                    name={itemName}
                    description={itemDesc}
                    amount={itemPrice * 100}
                    token={(token) => this.userPay(token)}
                    stripeKey = {process.env.REACT_APP_STRIPE_PUBLISHABLE_KEY}
                >
                    <button className="waves-effect waves-light btn">
                        Pay with Card
                    </button>
                </StripeCheckout> */}
                <button className="waves-effect waves-light btn" onClick={this.fetchItem}>
                    Add to Cart
                </button>
            </div>
        )
    }
}

const mapStateToProps = (state,ownProps) => {
    return{
        item: state.item
    }
}

export default connect(mapStateToProps,{
    fetchItem,
    addToCart,
    makeCart,
})(ItemDetail)