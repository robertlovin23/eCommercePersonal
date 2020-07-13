import React from 'react'
import {connect} from 'react-redux'
import {createItem} from '../../actions'
import {Button,Typography,Input,InputLabel,FormControl} from '@material-ui/core'
import { Field, reduxForm } from 'redux-form'
import Dropzone from 'react-dropzone'

class ItemForm extends React.Component{

    renderInputFields = ({input,label,type,meta}) => {
        return(
            <FormControl fullWidth>
                <InputLabel htmlFor={label}/>
                <Input
                    {...input} 
                    type={type}
                    autoComplete="off"
                />
            </FormControl>
            )
    }


    renderFiles = ({type,meta,label,name}) => {
        return(
        <div>
            <Dropzone onDrop={acceptedFiles => this.props.onFileDrop(acceptedFiles)}>
            {({getRootProps, getInputProps}) => (
                <section>
                <div {...getRootProps()}>
                    <Input {...getInputProps()} type={type}/>
                    <Typography variant="body1">{label}</Typography>
                </div>
                </section>
            )}
            </Dropzone>
        </div>
        )
    }

    onSubmitForm = (formValues,event,data) => {
        this.props.onSubmit(formValues)
        console.log(formValues)
    }

    render(){
        console.log(this.props)
        return(
            <div>
                <form onSubmit={this.props.handleSubmit(this.onSubmitForm)} method="post" encType="multipart/form-data">
                    <Field name="itemName" type="text" component={this.renderInputFields} label="Item Name"/> 
                    <Field name="itemPrice" type="number" component={this.renderInputFields} label="Item Price"/> 
                    <Field name="itemDesc" type="text" component={this.renderInputFields} label="Item Description"/> 
                    <Field name="itemQty" type="text" component={this.renderInputFields} label="Item Quantity"/> 
                    <Field name="itemImg" type="file" component={this.renderFiles} label="Item Image"/> 
                    <Button variant="contained" color="primary" type="submit">Submit</Button>
                </form>
            </div>
        )
    }
}

export default reduxForm({
    form: 'itemForm'
})(connect(null, { createItem })(ItemForm))