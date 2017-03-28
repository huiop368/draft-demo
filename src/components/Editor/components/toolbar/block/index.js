import React, { Component, PropTypes } from 'react'
import ReactDOM                 from 'react-dom'
import classnames               from 'classnames'
import {BLOCK_TYPES}            from '../../../utils/constants/constants.js'
import Stylebtn                 from '../button'
import classes                  from './block.less'

const Blockbar = ({editorState, onToggle}) => {
    const selection = editorState.getSelection()
    const blockType = editorState
      .getCurrentContent()
      .getBlockForKey(selection.getStartKey())
      .getType()

    return (
        <div className={classes.bar_wrap}>
            {
                BLOCK_TYPES.map((item, i) =>
                    <Stylebtn
                     key={i}
                     active={item.style === blockType}
                     label={item.label}
                     style={item.style}
                     onToggle={onToggle}
                    />
                )
            }
        </div>        
    )
}

export default Blockbar
