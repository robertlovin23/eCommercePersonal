import React from 'react'
import M from 'materialize-css';
import React from 'react'
import { Link } from 'react-router-dom'
import {connect} from 'react-redux'
import {fetchUser,fetchCart} from '../../actions'

class Header extends React.Component{
    constructor(){
        super()
        this.state={
            open: false
        }
    }
    componentDidMount(){
        this.props.fetchUser();
    }

    openMenu = (anchor) => {
        this.setState({
            open: true
        })

    }

    closeMenu = () => {
        this.setState({
            open: !true
        })
        console.log(this.state.open)
    }
    
    renderLogin = () => {
      const {auth,cart} = this.props

      switch(auth){
        case null:
            return;
        case false:
            return(
                <li><a href="/auth/twitter">Login with Twitter</a></li>
            )
        default:
            return(
            <React.Fragment>
                <img src={auth.profilePic} style={{height:"25px",width:"25px",marginTop:"18px",float:"left"}}/>
                <li><Link to={`/profile/${auth.twitterId}`}>My Profile</Link></li>
                <li><Link to={`/cart/${auth._id}`}><i className="material-icons">shopping_cart</i></Link></li>
                <li><a href="/api/logout">Logout</a></li>
            </React.Fragment>
            )
      }

    }

    render(){
        return(
        <React.Fragment>
          <nav>
            <div className="nav-wrapper">
            <a href="#" data-target="mobile-demo" className="sidenav-trigger button-collapse" onClick={this.state.open === false ? () => this.openMenu() : () => this.closeMenu()}>
                <i class="material-icons">menu</i>
            </a>
              <Link to="/" className="brand-logo">WishBuyer</Link>
                <ul id="nav-mobile" className="right hide-on-med-and-down">
                    {this.renderLogin()}              
                </ul>
            </div>
          </nav>

            <ul className="sidenav" id="mobile-demo" ref={this.openMenu}>
                <Link to="/" className="brand-logo">WishBuyer</Link>
                <ul id="nav-mobile" className="right hide-on-med-and-down">
                    {this.renderLogin()}              
                </ul>
            </ul>
        </React.Fragment>
                
        )
    }
}
const mapStateToProps = (state) => {
    return{
        auth: state.auth,
        cart: state.cart
    }
}
export default connect(mapStateToProps,{
    fetchUser,
    fetchCart
})(Header)