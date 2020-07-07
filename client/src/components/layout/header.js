import React from 'react'
import { Link } from 'react-router-dom'
import {connect} from 'react-redux'
import MenuIcon from '@material-ui/icons/Menu'
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft'
import { Drawer, Button,List,ListItem,ListItemText,AppBar,Typography,Toolbar,IconButton }  from '@material-ui/core'
import {fetchUser,fetchCart} from '../../actions'
import Responsive from 'react-responsive-decorator'

class Header extends React.Component{
    constructor(){
        super()
        this.state={
            open: false,
            width:350
        }
    }
    componentDidMount(){
        this.props.fetchUser();
        this.props.media({ minWidth: 768 }, () => {
            this.setState({
              width: 350
            });
          });
        this.props.media({ maxWidth: 768 }, () => {
            this.setState({
              width: 150
            });
          });
        }

    openSideMenu = () => {
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
                <React.Fragment>
                        <ListItem><a href="/auth/twitter">Login with Twitter</a></ListItem>
                </React.Fragment>
            )
        default:
            return(
                <React.Fragment>
                        <ListItem>
                            <img src={auth.profilePic} style={{height:"25px",width:"25px",float:"left", marginRight: '10px'}}/>
                            <Link style={{textDecoration: 'none'}} to={`/profile/${auth.twitterId}`}>
                                <ListItemText primary="Profile"/>
                            </Link>
                        </ListItem>
                        <ListItem>
                            <Link style={{textDecoration: 'none', display:"inline-block"}} to={`/cart/${auth._id}`}>
                                <i className="material-icons">shopping_cart</i>
                                <ListItemText primary="Cart"/>
                            </Link>

                        </ListItem>
                        <ListItem>
                            <a style={{textDecoration: 'none'}} href="/api/logout">
                                <ListItemText primary="Logout"/>
                            </a>
                        </ListItem>
                </React.Fragment>
            )
      }

    }

    render(){
        return(
            <div>
                <AppBar position="static" style={{backgroundColor:"green"}}>
                        <Toolbar>
                            <IconButton color="inherit" aria-label="Menu" onClick={this.openSideMenu} style={{color:"white"}}>
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
                    variant="temporary"
                    open={this.state.open}
                    width={this.state.width}

                >
                <div style={{backgroundColor:"green", height:"100%"}}>
                    <div style={{marginLeft:"70px",marginRight:"50px"}}>
                            <IconButton onClick={this.closeSideMenu} style={{float:"right",marginRight:"-40px"}} >
                                <ChevronLeftIcon />
                            </IconButton>
                            <nav style={{width:"0%",lineHeight:'0px',paddingTop:"50px"}}>
                                <List>
                                    <ListItem>
                                        <Link style={{textDecoration: 'none'}} to="/">
                                            <ListItemText primary="Home"/>
                                        </Link>
                                    </ListItem>
                                    {this.renderLogin()}
                                </List>
                            </nav>
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
})(Responsive(Header))