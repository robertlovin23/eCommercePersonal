import React from 'react'
import ItemForm from '../forms/itemForm'
import _ from 'lodash'

import {connect} from 'react-redux'
import {editItem,fetchItem} from '../../actions'

class EditItem extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            images: []
        }
    }

    componentDidMount(){
        this.props.fetchItem(this.props.match.params.id)
    }


    onFileDrop = (acceptedFiles) => {
        console.log(acceptedFiles)

        var images = this.state.images
        
        acceptedFiles.forEach((file) => {
            const reader = new FileReader();
            reader.onload = () => {
                const fileAsBase64 = reader.result.substr(reader.result.indexOf(",") + 1);
                images.push(fileAsBase64)
            }

            reader.onabort = () => console.log("file reading was aborted");
            reader.onerror = () => console.log("file reading has failed");
    
            reader.readAsDataURL(file);
            
        
        })
        this.setState(prevState =>({
            images: images
        }))
        console.log(images)
    }

    onSubmit = (formValues) => {
        this.props.editItem(this.props.match.params.id, formValues, this.state.images);
    }

    render(){
        console.log(this.props.item)
        return(
            <div>
                <h3>Edit Item</h3>
                <ItemForm onSubmit={this.onSubmit} onFileDrop={this.onFileDrop} initialValues={_.pick(this.props.item, 'itemName','itemDesc','itemPrice','quantity','itemImg')}/>
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