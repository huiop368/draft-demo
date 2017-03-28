import React, { Component, PropTypes } from 'react'
import ReactDOM                 from 'react-dom'
import classnames               from 'classnames'
import Blockbar                 from './block'
import Inlinebar                from './inline'

import classes                  from './toolbar.less'

export default class Toolbar extends Component {
    
    static propTypes = {
        editorState : PropTypes.object.isRequired,
        toggleBlockType : PropTypes.func,
        toggleInlineStyle : PropTypes.func
    }

    render (){
        const { toggleInlineStyle, toggleBlockType, editorState } = this.props

        return (
            <div className={classes.toolbar_wrap}>
                <Blockbar onToggle={toggleBlockType} editorState={editorState} />                
                <Inlinebar onToggle={toggleInlineStyle} editorState={editorState} />
            </div>        
        )
    }
}
