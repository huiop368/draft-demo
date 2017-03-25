import React, { Component, PropTypes } from 'react'
import ReactDOM                 from 'react-dom'
import classnames               from 'classnames'
import { Editor, RichUtils }    from 'draft-js'

import {
    keyBindingFn, customStyleMap, blockRenderMap,
    blockRendererFn, blockStyleFn, constants
} from './utils'

console.log(constants)

import classes from './index.less'

export default class MyEditor extends Component {

    static propTypes = {
        placeholder : PropTypes.string,
        spellCheck  : PropTypes.bool,
        readOnly    : PropTypes.bool,

        editorState : PropTypes.object.isRequired,
        customStyleMap: PropTypes.object,
        blockRenderMap : PropTypes.object,
        onChange    : PropTypes.func.isRequired,
        handleKeyCommand : PropTypes.func,
        keyBindingFn : PropTypes.func,
        blockRendererFn : PropTypes.func,
        blockStyleFn : PropTypes.func
    };

    static defaultProps = {
        placeholder : 'Tell your story...',
        spellCheck  : true,
        readOnly    : false,
        keyBindingFn : keyBindingFn,
        customStyleMap : customStyleMap,
        blockRenderMap : blockRenderMap,
        blockRendererFn : blockRendererFn,
        blockStyleFn : blockStyleFn
            
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

    getEditorState = () => {
        return this.props.editorState
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
        const { placeholder, spellCheck, readOnly, editorState, keyBindingFn, customStyleMap,
                blockRenderMap, blockRendererFn, blockStyleFn
              } = this.props

        return (
            <div className={classes.editor_root}>
                <div className={classes.editor_wrap}>
                    <Editor
                     placeholder={placeholder}
                     spellCheck={!readOnly && spellCheck}
                     readOnly={readOnly}
                     ref={node => this.editor = node}
                     editorState={editorState}
                     /**
                      *@custom inline style 'BOLD' : font-weight 类似 
                      *@custom block style define className
                      */
                     customStyleMap={customStyleMap}
                     blockStyleFn={blockStyleFn}

                     /**
                      *@custom block render
                      *@renderMap自定义block key值
                      *@renderFn 根据key值渲染不同的component
                      */
                     blockRenderMap={blockRenderMap}
                     blockRendererFn={blockRendererFn(this.handleChange, this.getEditorState)}
                     /**
                      *@处理key command
                      *@keyBindingFn定义custom key 别名，handlekeyCommand处理custom别名
                      */
                     keyBindingFn={keyBindingFn}
                     handleKeyCommand={this.handleKeyCommand}

                     //@list 列表二级缩进
                     onTab={this.handleTab}
                     onChange={this.handleChange} />
                </div>
                
            </div>
        )
    }
}
