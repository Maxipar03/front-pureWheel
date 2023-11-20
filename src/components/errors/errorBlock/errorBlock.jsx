import React from 'react';

function errorBlock (props) {
    return props.errorStatus ? (
        <div className={props.divClassName}>
            <p className={props.iconClassName}>X</p>
            <h5 className={props.msgClassName}> {props.msg} </h5>
        </div>
    ) : null
}

export default errorBlock;