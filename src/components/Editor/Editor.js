import React, { Component, PropTypes } from 'react'
import ReactDOM                 from 'react-dom'
import classnames               from 'classnames'
import { Editor, RichUtils }    from 'draft-js'

import { keyBindingFn, customStyleMap } from './utils'

console.log(keyBindingFn, customStyleMap)

import classes from './index.less'

export default class MyEditor extends Component {

    static propTypes = {
        placeholder : PropTypes.string,
        spellCheck  : PropTypes.bool,
        readOnly    : PropTypes.bool,

        editorState : PropTypes.object.isRequired,
        onChange    : PropTypes.func.isRequired,
        handleKeyCommand : PropTypes.func,
        keyBindingFn : PropTypes.func,
    };

    static defaultProps = {
        placeholder : 'Tell your story...',
        spellCheck  : true,
        readOnly    : false,
        keyBindingFn : keyBindingFn,

        //onChange    : () => {},
        //editorState : ,
        //keyBindingFn : () => {}
    };
    
    constructor(props) {
        super(props)

    }

    focus = () => {
        this.editor.focus()
    }

    handleChange = (editorState) => {
        this.props.onChange(editorState)
    }

    handleTab = (e) => {
        const { editorState } = this.props
        const newEditorState = RichUtils.onTab(e, editorState, 2)

        if (newEditorState !== editorState) {
          this.handleChange(newEditorState)
        }
    }

    handleKeyCommand = (command) => {
        if(this.props.handleKeyCommand){
            const behavior = this.props.handleKeyCommand(command)
            if(behavior === 'handled' || behavior === true){
                return 'handled'
            }
        }

        /**
         *@ custom command
         *@ set custom command string in keyBindingFn
         */
        if(command === ''){
             
        }

        // finallt set state to editorState
        const newState = RichUtils.handleKeyCommand(this.props.editorState, command)

        if (newState) {
          this.handleChange(newState)
          return 'handled'
        }

        return 'not-handled'
    }

    render() {
        const { placeholder, spellCheck, readOnly, editorState, keyBindingFn } = this.props

        return (
            <div className={classes.editor_root}>
                <div className={classes.editor_wrap}>
                    <Editor
                     placeholder={placeholder}
                     spellCheck={!readOnly && spellCheck}
                     readOnly={readOnly}
                     ref={node => this.editor = node}
                     editorState={editorState}
                     keyBindingFn={keyBindingFn}
                     onTab={this.handleTab}
                     handleKeyCommand={this.handleKeyCommand}
                     onChange={this.handleChange} />
                </div>
                
            </div>
        )
    }
}
