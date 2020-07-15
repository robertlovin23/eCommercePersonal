import React from 'react'
import {Link} from 'react-router-dom'
import Modals from '../layout/Modal'
import { Dialog, Button, DialogTitle, DialogContent, DialogContentText, DialogActions} from '@material-ui/core'

import {connect} from 'react-redux'
import {fetchItem,deleteItem} from '../../actions'

class DeleteItem extends React.Component{
    
    // componentDidMount(){
    //     this.props.fetchItem(this.props.match.params.id);
    // }
    render(){
        return(
            <div></div>
        )
    }
}
const mapStateToProps = (state,ownProps) => {
    return {
        item: state.item
    }
}

export default connect(mapStateToProps,{
    deleteItem,
    fetchItem
})(DeleteItem)