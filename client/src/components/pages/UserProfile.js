import React from 'react'
import {Link, Typography} from 'react-router-dom'
import {Button} from '@material-ui/icon'
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
                <Typography variant="h3" style={{textAlign: "center"}}>My Profile</Typography>
                <div>
                    <img src={this.props.auth.profilePic} style={{width:"100px", height: "100px",borderRadius:"10%"}}/>
                    <div>
                        <Typography variant="h5">{this.props.auth.displayName}</Typography>
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