import { Block } from '../constants/constants.js'

export default (setEditorState, getEditorState) => (contentBlock) => {
    const type = contentBlock.getType()
    
    switch(type){
        // case Block.BLOCKQUOTE_CAPTION: 
        //     return {
        //       component: QuoteCaptionBlock,
        //     }
        // case Block.CAPTION: 
        //     return {
        //       component: CaptionBlock,
        //     }
        default:
            return null
    }
}
