import React from 'react'

const Alert = (props) => {
  let type = props.type === 'warning' ? 'error' : props.type;
  return (
    <div>
      <div className={`alert alert-${props.type} alert-dismissible fade show py-2`} role="alert" >
        {/* <button type="button" className="btn-close" data-bs-dismiss="alert" aria-label="Close" ></button> */}
        <strong>{type.charAt(0).toUpperCase()+type.substr(1)}!</strong> {props.message}
      </div>


    </div>
  )
}

export default Alert
