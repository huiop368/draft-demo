import React, { Component } from 'react'
import ReactDOM from 'react-dom'
import {Editor, EditorState} from 'draft-js'

import classes from './PlainText.css'

export default class PlainText extends Component {
    
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

    handleLog = () => {
        console.log(this.state.editorState.toJS())
    }

    render() {
        return (
            <div className={classes.area}>
                <div className={classes.editor_wrap} onClick={this.handleFocus}>
                    <Editor
                     placeholder="Enter some txt..."
                     ref={node => this.editor = node}
                     editorState={this.state.editorState}
                     onChange={this.handleChange} />
                </div>

                <button onClick={this.handleLog}>Log State</button>
            </div>
        )
    }
}
