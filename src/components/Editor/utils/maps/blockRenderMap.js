import { Map } from 'immutable'
import { DefaultDraftBlockRenderMap } from 'draft-js'
import { Block } from '../constants/constants.js'

const blockRenderMap = Map({
    [Block.CAPTION]: {
        element: 'cite',
    },
    [Block.BLOCKQUOTE_CAPTION]: {
        element: 'blockquote',
    },
    [Block.TODO]: {
        element: 'div',
    },
    [Block.IMAGE]: {
        element: 'figure',
    },
    [Block.BREAK]: {
        element: 'div',
    }    
}).merge(DefaultDraftBlockRenderMap)

export default blockRenderMap
