import React, { Component, PropTypes } from 'react'
import ReactDOM                 from 'react-dom'
import classnames               from 'classnames'
import {INLINE_STYLES}            from '../../../utils/constants/constants.js'
import Stylebtn                 from '../button'
import classes                  from './inline.less'

const Inlinebar = ({editorState, onToggle}) => {
    const currentStyle = editorState.getCurrentInlineStyle()

    return (
            <div className={classes.bar_wrap}>
                {INLINE_STYLES.map((item, i) =>
                    <Stylebtn
                     key={i}
                     active={currentStyle.has(item.style)}
                     label={item.label}
                     style={item.style}
                     onToggle={onToggle}
                    />
                )}
            </div>        
        )
}

export default Inlinebar
