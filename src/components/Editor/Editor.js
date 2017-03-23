import React, { Component, PropTypes } from 'react'
import ReactDOM                 from 'react-dom'
import classnames               from 'classnames'
import {Editor, EditorState}    from 'draft-js'

import classes from './Editor.css'

export default class MyEditor extends Component {

    static propTypes = {
        placeholder : PropTypes.string,
        spellCheck  : PropTypes.bool,
        readOnly    : PropTypes.bool,
    };

    static defaultProps = {
        placeholder : 'Tell your story...',
        spellCheck  : true,
        readOnly    : false,
    };
    
    constructor(props) {
        super(props)

        this.state = {
            editorState: EditorState.createEmpty()
        }
    }

    handleChange = (editorState) => {
        this.setState({editorState})
    }

    handleFocus = () => {
        this.editor.focus()
    }

    render() {
        const { placeholder, spellCheck, readOnly } = this.props

        return (
            <div className={classes.area}>
                <div className={classes.editor_wrap} onClick={this.handleFocus}>
                    <Editor
                     placeholder={placeholder}
                     spellCheck={!readOnly && spellCheck}
                     readOnly={readOnly}
                     ref={node => this.editor = node}
                     editorState={this.state.editorState}
                     onChange={this.handleChange} />
                </div>
                
            </div>
        )
    }
}
