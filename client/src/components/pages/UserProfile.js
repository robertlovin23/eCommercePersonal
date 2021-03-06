import React from 'react'
import {Link} from 'react-router-dom'
import {Button, Typography} from '@material-ui/core'
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
                <Typography variant="h3" style={{textAlign: "center", marginTop:"20px",marginBottom:"20px"}}>My Profile</Typography>
                <div>
                    <img src={this.props.auth.profilePic} style={{width:"100px", height: "100px",borderRadius:"10%"}}/>
                    <div>
                        <Typography variant="h5" style={{marginTop:"10px",marginBottom:"10px"}}>{this.props.auth.displayName}</Typography>
                    </div>
                    <div>
                        <Button variant="contained" color="primary" component={Link} to={"/items/new"}>List New Item</Button>
                    </div>
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