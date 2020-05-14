import React from 'react'
import { Link } from 'react-router-dom'
import {connect} from 'react-redux'
import {fetchUser} from '../../actions'

class Header extends React.Component{
    componentDidMount(){
        this.props.fetchUser();
    }
    
    renderLogin = () => {
      const {auth} = this.props

      switch(auth){
        case null:
            return;
        case false:
            return(
                <li><a href="http://localhost:5000/auth/twitter">Login with Twitter</a></li>
            )
        default:
            return(
            <React.Fragment>
                <img src={auth.profilePic} style={{height:"25px",width:"25px",marginTop:"18px",float:"left"}}/>
                <li><Link to={`/profile/${auth.twitterId}`}>My Profile</Link></li>
                <li><Link to={'/cart'}><i className="material-icons">shopping_cart</i> </Link></li>
                <li><a href="/api/logout">Logout</a></li>
            </React.Fragment>
            )
      }

    }

    render(){
        return(
            <nav>
            <div className="nav-wrapper">
              <Link to="/" className="brand-logo">Buy and Sell</Link>
              <ul id="nav-mobile" className="right hide-on-med-and-down">
                {this.renderLogin()}              
            </ul>
            </div>
          </nav>
                
        )
    }
}
const mapStateToProps = (state) => {
    return{
        auth: state.auth
    }
}
export default connect(mapStateToProps,{
    fetchUser
})(Header)