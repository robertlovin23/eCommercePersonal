import React from 'react'
import {Button,FormControl} from '@material-ui/core'
import {connect} from 'react-redux'
import {addComment, deleteComment} from '../../actions'
import { Field, reduxForm } from 'redux-form'

class CommentForm extends React.Component{

    renderInputFields = ({input,label,type,meta}) => {
        return(
                <FormControl fullWidth className={classes.margin}>
                    <InputLabel htmlFor={label}/>
                    <Input
                        {...input} 
                        type={type}
                        autoComplete="pff"
                    />
                </FormControl>
        )
    }
    onSubmitForm = (formValues) => {
        const { itemId } = this.props
        this.props.addComment(itemId, formValues)
    }

    render(){
        return(
            <div>
                <form onSubmit={this.props.handleSubmit(this.onSubmitForm)}>
                    <Field name="commentBody" type="text" component={this.renderInputFields} label="Comment..."/> 
                    <Button variant="contained" color="primary" type="submit">Submit</Button>
                </form>
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return{
        state: state.item
    }
}

export default reduxForm({
    form: 'commentForm'
})(connect(mapStateToProps, { addComment,deleteComment })(CommentForm))