import React from 'react'
import ItemForm from '../forms/itemForm'

import {connect} from 'react-redux'
import {createItem} from '../../actions'

class NewItem extends React.Component{

    onSubmit = (formValues) => {
        this.props.createItem(formValues);
    }
    render(){
        console.log(this.props)
        return(
            <div>
                <h3>Create Item</h3>
                <ItemForm onSubmit={this.onSubmit}/>
            </div>
        )
    }
}

export default connect(null,{
    createItem
})(NewItem)