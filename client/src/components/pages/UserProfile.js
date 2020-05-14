import React from 'react'
import {Link} from 'react-router-dom'
import {connect} from 'react-redux'
import {fetchUser} from '../../actions'

class UserProfile extends React.Component{

    componentDidMount(){
        this.props.fetchUser();
    }

    render(){
        console.log(this.props.auth)
        if(!this.props.auth){
            return(
                <div>Loading...</div>
            )
        }
        return(
            <div>
                <h3 style={{textAlign: "center"}}>My Profile</h3>
                <div>
                    <img src={this.props.auth.profilePic} style={{width:"100px", height: "100px",borderRadius:"10%"}}/>
                    <div>
                        <h5>{this.props.auth.displayName}</h5>
                    </div>
                    <Link to={"/items/new"} style={{marginTop:"10px"}} className="waves-effect waves-light btn">List New Item</Link>
                </div>
            </div>
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
})(UserProfile)