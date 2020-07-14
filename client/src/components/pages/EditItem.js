import React from 'react'
import ItemForm from '../forms/itemForm'
import _ from 'lodash'
import {Typography} from '@material-ui/core'
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
        const values = this.state.images
        console.log(values, formValues)
        this.props.editItem(this.props.match.params.id, formValues, values);
    }

    render(){
        console.log(this.props.item.item)
        return(
            <div>
                <Typography variant="h3" style={{marginBottom:"10px", marginTop:"10px"}}>Edit Item</Typography>
                <ItemForm onSubmit={this.onSubmit} onFileDrop={this.onFileDrop} initialValues={_.pick(this.props.item.item, 'itemName','itemDesc','itemPrice','quantity')}/>
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