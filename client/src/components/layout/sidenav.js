import React from 'react'
import ReactDOM from 'react-dom'
import { Link } from 'react-router-dom'

class SideNav extends React.Component{
    componentDidMount() {
        var elem = document.querySelector("#sidenav");
        var instance = M.Sidenav.init(elem, {
            edge: "left",
            inDuration: 250
        });
    }

    render(){
        return(
            <ul class="sidenav" id="mobile-demo" >
                <Link to="/" className="brand-logo">WishBuyer</Link>
                <ul id="nav-mobile" className="right hide-on-med-and-down">
                    {/* {this.renderLogin()}               */}
                </ul>
            </ul>
        )        
    }
}

export default SideNav