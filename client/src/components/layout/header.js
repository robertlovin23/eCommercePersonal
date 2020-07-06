import React from 'react'
import M from 'materialize-css';
import React from 'react'
import { Link } from 'react-router-dom'
import {connect} from 'react-redux'
import { Drawer, Button,List,ListItem, AppBar,Typography,Toolbar,IconButton }  from '@material-ui/core'
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

    openSideMenu = (anchor) => {
        this.setState({
            open: true
        })

    }

    closeSideMenu = () => {
        this.setState({
            open: !true
        })
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
            <div>
                <AppBar position="static" style={{backgroundColor:"green"}}>
                        <Toolbar>
                            <IconButton color="inherit" aria-label="Menu" onClick={this.openSideMenu} style={{color:"black"}}>
                                <MenuIcon/>
                            </IconButton>
                            <Typography variant="h6" color="inherit">
                                <Link to="/">
                                    KnapSack
                                </Link>
                            </Typography>
                        </Toolbar>
                </AppBar>
                <Drawer
                    variant="persistent"
                    open={this.state.open}
                    style={{width:"300px"}}
                >
                <div style={{backgroundColor:"pink", height:"100%"}}>
                    <div>
                    </div>
                    <div style={{marginLeft:"70px",marginRight:"50px"}}>
                            <Typography variant="h6">
                                    <Link to={`/`} style={{textDecoration:"none", color:'black'}}>
                                        Home
                                    </Link>
                            </Typography>
                        {
                            links.map((link,i) => {

                                return(
                                <Typography variant="h6" >
                                    <Link style={{textDecoration:"none",color:'black'}} key={i} to={`/${link.name}`} children={<CategoryTemplate/>}>
                                        {link.linkName}
                                    </Link>
                                </Typography>
                                )
                            })
                        }
                    </div>
                    </div>
                </Drawer>
            </div>
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