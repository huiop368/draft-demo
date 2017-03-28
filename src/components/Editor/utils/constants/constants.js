export const Block = {
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

export const Inline = {
    
}

export const HYPERLINK = 'hyperlink'
export const HANDLED = 'handled'
export const NOT_HANDLED = 'not_handled'

export const BLOCK_TYPES = [
    {label: 'H1', style: 'header-one'},
    {label: 'H2', style: 'header-two'},
    {label: 'H3', style: 'header-three'},
    {label: 'H4', style: 'header-four'},
    {label: 'H5', style: 'header-five'},
    {label: 'Blockquote', style: 'blockquote'},
    // @TODO just test
    //{label: 'Qcaption', style: 'block-quote-caption'},
    {label: 'UL', style: 'unordered-list-item'},
    {label: 'OL', style: 'ordered-list-item'},
    {label: 'Code Block', style: 'code-block'},
]

export const INLINE_STYLES = [
    {label: 'Bold', style: 'BOLD'},
    {label: 'Italic', style: 'ITALIC'},
    {label: 'Underline', style: 'UNDERLINE'},
    {label: 'Monospace', style: 'CODE'},
]

export const BLOCK_QUOTES = {
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
