import React from 'react'
import ReactDOM from 'react-dom'


const Modals = (props) => {
    console.log(props)
    return ReactDOM.createPortal(
        <div className="modal-overlay">
            <div className="modal" id="deleteModal">
                <div className="modal-content">
                    <h4>{props.title}</h4>
                    <p>{props.description}</p>
                    <div className="modal-footer">
                        {props.actions}
                    </div>
                </div>
            </div>
        </div>,document.querySelector("#modal")
    )
}

export default Modals