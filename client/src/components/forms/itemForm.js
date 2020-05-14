import React from 'react'
import { Field, reduxForm } from 'redux-form'

class ItemForm extends React.Component{

    renderInputFields = ({input,label,type,meta}) => {
        return(
            <div className="input-field col s12">
                <input placeholder={label} type={type} {...input} autoComplete="off"/>
                <label htmlFor={label}/>
            </div>
        )
    }
    onSubmitForm = (formValues) => {
        this.props.onSubmit(formValues)
    }
    render(){

        return(
            <div>
                <form onSubmit={this.props.handleSubmit(this.onSubmitForm)}>
                    <Field name="itemName" type="text" component={this.renderInputFields} label="Item Name"/> 
                    <Field name="itemPrice" type="number" component={this.renderInputFields} label="Item Price"/> 
                    <Field name="itemDesc" type="text" component={this.renderInputFields} label="Item Description"/> 
                    <button className="waves-effect waves-light btn" type="submit">Submit</button>
                </form>
            </div>
        )
    }
}

export default reduxForm({
    form: 'itemForm'
})(ItemForm)