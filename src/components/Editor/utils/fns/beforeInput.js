import { Block, BLOCK_QUOTES, HANDLED, NOT_HANDLED} from '../constants/constants.js'
import { getCurrentBlock, resetBlockWithType } from '../utils.js'
import modifyBlockType from '../../modifiers/modifyBlockType'
import modifyInlineStyle from '../../modifiers/modifyInlineStyle'

const beforeInput = (editorState, inputString, onChange, mapping = BLOCK_QUOTES) => {
  // const selection = editorState.getSelection()
  // const block = getCurrentBlock(editorState)
  // const blockType = block.getType()

  // if (blockType.indexOf(Block.ATOMIC) === 0) {
  //   return NOT_HANDLED
  // }

  // const blockLength = block.getLength()
  // if (selection.getAnchorOffset() > 1 || blockLength > 1) {
  //   return NOT_HANDLED
  // }

  // const blockTo = mapping[block.getText()[0] + inputString]
  // if (!blockTo) {
  //   return NOT_HANDLED
  // }

  // const finalType = blockTo.split(':')
  // if (finalType.length < 1 || finalType.length > 3) {
  //   return NOT_HANDLED
  // }

  // let fType = finalType[0]
  // if (finalType.length === 1) {
  //   if (blockType === finalType[0]) {
  //     return NOT_HANDLED
  //   }
  // } else if (finalType.length === 2) {
  //   if (blockType === finalType[1]) {
  //     return NOT_HANDLED
  //   }
  //   if (blockType === finalType[0]) {
  //     fType = finalType[1]
  //   }
  // } else if (finalType.length === 3) {
  //   if (blockType === finalType[2]) {
  //     return NOT_HANDLED
  //   }
  //   if (blockType === finalType[0]) {
  //     fType = finalType[1]
  //   } else {
  //     fType = finalType[2]
  //   }
  // }

  // onChange(resetBlockWithType(editorState, fType, {
  //   text: '',
  // }))
  //
  // return HANDLED
    
    if(inputString !== ' '){
        return NOT_HANDLED
    }

    let newEditorState = modifyBlockType(editorState, inputString)

    if(newEditorState === editorState){
        newEditorState = modifyInlineStyle(editorState, inputString)
    }

    if(newEditorState !== editorState){
        onChange(newEditorState)
        return HANDLED
    }
        
    return NOT_HANDLED
}


export default beforeInput
