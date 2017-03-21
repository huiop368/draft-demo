import React, { Component } from 'react'
import ReactDOM from 'react-dom'
import classnames from 'classnames'
import {Editor, EditorState, RichUtils} from 'draft-js'

import classes from './RichStyle.less'

export default class RichStyle extends Component {
    
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

    handleKeyCommand = (command) => {
        const newState = RichUtils.handleKeyCommand(this.state.editorState, command)

        if (newState) {
          this.handleChange(newState)
          return 'handled'
        }

        return 'not-handled'
    }

    toggleBlockType = (blockType) => {
       this.handleChange(
        RichUtils.toggleBlockType(
          this.state.editorState,
          blockType
        )
      )
    }

    toggleInlineStyle = (inlineStyle) => {
        this.handleChange(
            RichUtils.toggleInlineStyle(
              this.state.editorState,
              inlineStyle
            )
          )
    }

    render() {
        const { editorState } = this.state

        return (
            <div className={classes.area}>
                <BlockStyleControls
                editorState={editorState}
                onToggle={this.toggleBlockType}
                />
                <InlineStyleControls
                editorState={editorState}
                onToggle={this.toggleInlineStyle}
                />
                <div className={classes.editor_wrap} onClick={this.handleFocus}>
                    <Editor
                     placeholder="Tell a story..."
                     ref={node => this.editor = node}
                     customStyleMap={styleMap}
                     blockStyleFn={getBlockStyle}
                     editorState={this.state.editorState}
                     handleKeyCommand={this.handleKeyCommand}
                     onChange={this.handleChange} />
                </div>
            </div>
        )
    }
}


//----------------------------------Helps--------------------------------------------
const styleMap = {
    CODE: {
      backgroundColor: 'rgba(0, 0, 0, 0.05)',
      fontFamily: '"Inconsolata", "Menlo", "Consolas", monospace',
      fontSize: 16,
      padding: 2,
    }
}

const getBlockStyle = (block) => {
    switch (block.getType()) {
      case 'blockquote': return classes.rich_blockquote
      default: return null
    }
}

const BLOCK_TYPES = [
    {label: 'H1', style: 'header-one'},
    {label: 'H2', style: 'header-two'},
    {label: 'H3', style: 'header-three'},
    {label: 'H4', style: 'header-four'},
    {label: 'H5', style: 'header-five'},
    {label: 'H6', style: 'header-six'},
    {label: 'Blockquote', style: 'blockquote'},
    {label: 'UL', style: 'unordered-list-item'},
    {label: 'OL', style: 'ordered-list-item'},
    {label: 'Code Block', style: 'code-block'},
]

const INLINE_STYLES = [
    {label: 'Bold', style: 'BOLD'},
    {label: 'Italic', style: 'ITALIC'},
    {label: 'Underline', style: 'UNDERLINE'},
    {label: 'Monospace', style: 'CODE'},
]


const StyleButton = (props) => {
    const allCls = classnames({
        [classes.style_btn] : true,
        [classes.style_btn_active] : props.active
    })
    
    return (
        <span className={allCls} onMouseDown={(e) => {e.preventDefault;props.onToggle(props.style)}}>
          {props.label}
        </span>       
    )
}

const BlockStyleControls = (props) => {
    const {editorState} = props
    const selection = editorState.getSelection()
    const blockType = editorState
      .getCurrentContent()
      .getBlockForKey(selection.getStartKey())
      .getType()

    return (
      <div className={classes.rich_controls}>
        {BLOCK_TYPES.map((type) =>
          <StyleButton
            key={type.label}
            active={type.style === blockType}
            label={type.label}
            onToggle={props.onToggle}
            style={type.style}
          />
        )}
      </div>
    )
}

const InlineStyleControls = (props) => {
    const currentStyle = props.editorState.getCurrentInlineStyle()
    
    return (
      <div className={classes.rich_controls}>
        {INLINE_STYLES.map(type =>
          <StyleButton
            key={type.label}
            active={currentStyle.has(type.style)}
            label={type.label}
            onToggle={props.onToggle}
            style={type.style}
          />
        )}
      </div>
    )
}
