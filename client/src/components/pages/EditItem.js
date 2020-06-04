import React from 'react'
import ItemForm from '../forms/itemForm'
import _ from 'lodash'

import {connect} from 'react-redux'
import {editItem,fetchItem} from '../../actions'

class EditItem extends React.Component{
    componentDidMount(){
        this.props.fetchItem(this.props.match.params.id)
    }

    onSubmit = (formValues) => {
        this.props.editItem(this.props.match.params.id, formValues);
    }

    render(){
        console.log(this.props.item)
        return(
            <div>
                <h3>Edit Item</h3>
                <ItemForm onSubmit={this.onSubmit} initialValues={_.pick(this.props.item, 'itemName','itemDesc','itemPrice','quantity')}/>
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return{
        item: state.item
    }
}

export default connect(mapStateToProps,{
    editItem,
    fetchItem
})(EditItem)