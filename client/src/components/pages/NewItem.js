import React from 'react'
import ItemForm from '../forms/itemForm'

import {connect} from 'react-redux'
import {createItem} from '../../actions'

class NewItem extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            images: []
        }
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
        const values = this.state.images
        console.log(this.props,formValues,values)
        this.props.createItem(formValues,values);
    }
    render(){
        return(
            <div>
                <h3>Create Item</h3>
                <ItemForm onSubmit={this.onSubmit} onFileDrop={this.onFileDrop}/>
            </div>
        )
    }
}

export default connect(null,{
    createItem
})(NewItem)