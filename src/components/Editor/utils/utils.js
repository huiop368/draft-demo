import { Map, List } from 'immutable'

import { EditorState, ContentBlock, genKey } from 'draft-js'
import { Block } from './constants/constants.js'


export const getDefaultBlockData = (blockType, initialData = {}) => {
  switch (blockType) {
    case Block.TODO: return { checked: false }
    default: return initialData
  }
}


export const getCurrentBlock = (editorState) => {
  const selectionState = editorState.getSelection()
  const contentState = editorState.getCurrentContent()
  const block = contentState.getBlockForKey(selectionState.getStartKey())
  return block
}


export const resetBlockWithType = (editorState, newType = Block.UNSTYLED, overrides = {}) => {
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
      anchorOffset: 0,
      focusOffset: 0,
    }),
  })

  return EditorState.push(editorState, newContentState, 'change-block-type')
}
