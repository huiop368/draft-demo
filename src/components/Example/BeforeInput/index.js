import React, { Component, Children } from 'react'
import ReactDOM from 'react-dom'
import { Editor, EditorState } from 'draft-js'

import classes from './BeforeInput.less'

export default class BeforeInput extends Component {
    
    constructor(props) {
        super(props)

        this.state = {
            editorState: EditorState.createEmpty()
        }
    }

    handleChange = (editorState) => {
         let editorSta = editorState
        // const block = getCurrentBlock(editorState)
        // const blockType = block.getType()
        // const text = block.getText()
        // const selection = editorState.getSelection()

        // if(blockType === Block.H1 && editorState.getLastChangeType() === 'backspace-character'){
        //     //console.log(selection.getStartOffset(), selection.getEndOffset())
        //     if(text === ''){
        //         editorSta = resetBlockWithType(editorState, 'unstyled', {
        //             text: '#',
        //         },1)
        //     }
        // }

        this.setState({editorState : editorSta})
    }

    handleFocus = () => {
        this.editor.focus()
    }

    handleBeforeInput = (str) => {
        let editorState = this.state.editorState
        
        const selection = editorState.getSelection()
        const block = getCurrentBlock(editorState)
        const blockType = block.getType()

        if (blockType.indexOf(Block.ATOMIC) === 0) {
            return NOT_HANDLED
        }

        const blockLength = block.getLength()
        if (selection.getAnchorOffset() > 1 || blockLength > 1) {
            return NOT_HANDLED
        }

        const blockTo = StringToTypeMap[block.getText()[0] + str]
        if (!blockTo) {
            return NOT_HANDLED
        }
        const finalType = blockTo.split(':')
        if (finalType.length < 1 || finalType.length > 3) {
            return NOT_HANDLED
        }
        let fType = finalType[0]

        console.log(finalType, blockType, str, block.getText())
        if (finalType.length === 1) {
            if (blockType === finalType[0]) {
                return NOT_HANDLED;
            }
        }

        this.handleChange(resetBlockWithType(editorState, fType, {
            text: '',
        }))

        return HANDLED
    }

    render() {
        return (
            <div className={classes.area}>
                <div className={classes.editor_wrap} onClick={this.handleFocus}>
                    <Editor
                     placeholder="Enter some txt..."
                     ref={node => this.editor = node}
                     editorState={this.state.editorState}
                     handleBeforeInput={this.handleBeforeInput}
                     onChange={this.handleChange} />
                </div>
            </div>
        )
    }
}

//--------------------------Helps---------------------------

const HANDLED = 'handled'
const NOT_HANDLED = 'not_handled'

const Block = {
  UNSTYLED: 'unstyled',
  PARAGRAPH: 'unstyled',
  OL: 'ordered-list-item',
  UL: 'unordered-list-item',
  H1: 'header-one',
  H2: 'header-two',
  H3: 'header-three',
  H4: 'header-four',
  H5: 'header-five',
  H6: 'header-six',
  CODE: 'code-block',
  BLOCKQUOTE: 'blockquote',
  PULLQUOTE: 'pullquote',
  ATOMIC: 'atomic',
  BLOCKQUOTE_CAPTION: 'block-quote-caption',
  CAPTION: 'caption',
  TODO: 'todo',
  IMAGE: 'atomic:image',
  BREAK: 'atomic:break',
}

const StringToTypeMap = {
  '--': `${Block.BLOCKQUOTE}:${Block.BLOCKQUOTE_CAPTION}:${Block.CAPTION}`,
  '> ': Block.BLOCKQUOTE,
  '*.': Block.UL,
  '* ': Block.UL,
  '- ': Block.UL,
  '1.': Block.OL,
  '# ': Block.H1,
  '##': Block.H2,
  '==': Block.UNSTYLED,
  '[]': Block.TODO,
}

const getCurrentBlock = (editorState) => {
  const selectionState = editorState.getSelection()
  const contentState = editorState.getCurrentContent()
  const block = contentState.getBlockForKey(selectionState.getStartKey())
  return block
}

const getDefaultBlockData = (blockType, initialData = {}) => {
  switch (blockType) {
    case Block.TODO: return { checked: false }
    default: return initialData
  }
}

const resetBlockWithType = (editorState, newType = Block.UNSTYLED, overrides = {}, offset = 0) => {
  const contentState = editorState.getCurrentContent()
  const selectionState = editorState.getSelection()
  const key = selectionState.getStartKey()
  const blockMap = contentState.getBlockMap()
  const block = blockMap.get(key)
  const newBlock = block.mergeDeep(overrides, {
    type: newType,
    data: getDefaultBlockData(newType),
  })
  const newContentState = contentState.merge({
    blockMap: blockMap.set(key, newBlock),
    selectionAfter: selectionState.merge({
      anchorOffset: offset,
      focusOffset: offset,
    }),
  })
  return EditorState.push(editorState, newContentState, 'change-block-type')
}
