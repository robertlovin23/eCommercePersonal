import React from 'react'
import ReactDOM from 'react-dom'
import clxs from 'clsx'
import { Drawer, Button,List,ListItem, AppBar,Typography,Toolbar }  from '@material-ui/core'
import SideNav from '../layout/sidenav'
import { Link } from 'react-router-dom'

class SideNav extends React.Component{
    constructor(){
        super()
        this.state={
            open: false
        }
    }

    openSideMenu = () => {
        this.setState({
            open: true
        })
    }  

    closeSideMenu = () => {
        this.setState({
            open: false
        })
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
                        <IconButton onClick={this.closeSideMenu} style={{marginLeft:"-12",marginRight:"20"}} >
                            <ChevronLeftIcon />
                        </IconButton>
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

export default SideNav