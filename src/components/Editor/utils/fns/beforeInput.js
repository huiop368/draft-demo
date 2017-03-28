import { Block, BLOCK_QUOTES, HANDLED, NOT_HANDLED} from '../constants/constants.js'

import { getCurrentBlock, resetBlockWithType } from '../utils.js'

const beforeInput = (editorState, inputString, onChange, mapping = BLOCK_QUOTES) => {
  const selection = editorState.getSelection()
  const block = getCurrentBlock(editorState)
  const blockType = block.getType()

  if (blockType.indexOf(Block.ATOMIC) === 0) {
    return NOT_HANDLED
  }

  const blockLength = block.getLength()
  //@TODO 如果要支持 ### 以上个数的话， 这里的1 需要增大

  if (selection.getAnchorOffset() > 1 || blockLength > 1) {
    return NOT_HANDLED
  }

  //console.log(block.getText(),'----', inputString)
  const blockTo = mapping[block.getText()[0] + inputString]
  if (!blockTo) {
    return NOT_HANDLED
  }


  const finalType = blockTo.split(':')
  if (finalType.length < 1 || finalType.length > 3) {
    return NOT_HANDLED
  }

  let fType = finalType[0]
  if (finalType.length === 1) {
    if (blockType === finalType[0]) {
      return NOT_HANDLED
    }
  } else if (finalType.length === 2) {
    if (blockType === finalType[1]) {
      return NOT_HANDLED
    }
    if (blockType === finalType[0]) {
      fType = finalType[1]
    }
  } else if (finalType.length === 3) {
    if (blockType === finalType[2]) {
      return NOT_HANDLED
    }
    if (blockType === finalType[0]) {
      fType = finalType[1]
    } else {
      fType = finalType[2]
    }
  }

  onChange(resetBlockWithType(editorState, fType, {
    text: '',
  }))

  return HANDLED
}


export default beforeInput
