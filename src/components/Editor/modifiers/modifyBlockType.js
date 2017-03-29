import { RichUtils } from 'draft-js'
import resetBlockType from './resetBlockType'

const sharps = (len) => {
  let ret = ''
  while (ret.length < len) {
    ret += '#'
  }
  return ret
}

const blockTypes = [
  null,
  'header-one',
  'header-two',
  'header-three',
  'header-four',
  'header-five',
  'header-six'
]

const modifyBlockType = (editorState, character) => {
  const currentSelection = editorState.getSelection()
  const key = currentSelection.getStartKey()
  const text = editorState.getCurrentContent().getBlockForKey(key).getText()
  const position = currentSelection.getAnchorOffset()
  const line = [text.slice(0, position), character, text.slice(position)].join('')
  const blockType = RichUtils.getCurrentBlockType(editorState)

  for (let i = 1; i <= 6; i += 1) {
    if (line.indexOf(`${sharps(i)} `) === 0) {
      return resetBlockType(editorState, blockTypes[i], line.replace(/^#+\s/, ''))
    }
  }

  let matchArr = line.match(/^[*-] (.*)$/)
  if (matchArr) {
    return resetBlockType(editorState, 'unordered-list-item', matchArr[1])
  }

  matchArr = line.match(/^[\d]\. (.*)$/)
  if (matchArr) {
    return resetBlockType(editorState, 'ordered-list-item', matchArr[1])
  }

  matchArr = line.match(/^> (.*)$/)
  if (matchArr) {
    return resetBlockType(editorState, 'blockquote', matchArr[1])
  }
  
  return editorState
}

export default modifyBlockType