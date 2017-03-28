import React, { Component, PropTypes } from 'react'
import ReactDOM                 from 'react-dom'
import classnames               from 'classnames'

import classes                  from './button.less'

const Button = ({label, style, onToggle, active}) => {
    const allCls = classnames({
        [classes.bar_item] : true,
        [classes.bar_item_active] : active
    })
    return (
        <span
         onMouseDown={(e) => {e.preventDefault();onToggle(style)}}
         className={allCls}>
            {label}
         </span>
    )
}

export default Button
