import React, { Component, Children } from 'react'
import ReactDOM from 'react-dom'
import {Editor, EditorState, CompositeDecorator} from 'draft-js'

import classes from './Decorator.less'

export default class Decorator extends Component {
    
    constructor(props) {
        super(props)

        const compositeDecorator = new CompositeDecorator([
            {
              strategy: handleStrategy,
              component: HandleSpan,
            },
            // {
            //   strategy: hashtagStrategy,
            //   component: HashtagSpan,
            // },
            {
              strategy: titleStrategy,
              component: TitleSpan, 
            }
        ])

        this.state = {
            editorState: EditorState.createEmpty(compositeDecorator)
        }
    }

    handleChange = (editorState) => {
        this.setState({editorState})
    }

    handleFocus = () => {
        this.editor.focus()
    }

    render() {
        return (
            <div className={classes.area}>
                <div className={classes.editor_wrap} onClick={this.handleFocus}>
                    <Editor
                     placeholder="Enter some txt..."
                     ref={node => this.editor = node}
                     editorState={this.state.editorState}
                     onChange={this.handleChange} />
                </div>
            </div>
        )
    }
}


//---------------------------Helps-------------------------------
const HANDLE_REGEX = /\@[\w]+/g
const HASHTAG_REGEX = /\#[\w\u0590-\u05ff]+/g
//const HEADER_REGEX = /^\#{1,3}\s[\s\w\u0590-\u05ff]*/g
const HEADER_REGEX = /^\#{1,3}\s.*/g

function handleStrategy(contentBlock, callback, contentState) {
    findWithRegex(HANDLE_REGEX, contentBlock, callback)
}

function hashtagStrategy(contentBlock, callback, contentState) {
    findWithRegex(HASHTAG_REGEX, contentBlock, callback)
}

function titleStrategy(contentBlock, callback, contentState){
    findWithRegex(HEADER_REGEX, contentBlock, callback)
}

function findWithRegex(regex, contentBlock, callback) {
    const text = contentBlock.getText()
    let matchArr
    let start
    while ((matchArr = regex.exec(text)) !== null) {
      start = matchArr.index
      callback(start, start + matchArr[0].length)
    }
}

const HandleSpan = (props) => {
    return (
      <span
        style={styles.handle}
        data-offset-key={props.offsetKey}
      >
        {props.children}
      </span>
    )
}

const HashtagSpan = (props) => {
    return (
      <span
        style={styles.hashtag}
        data-offset-key={props.offsetKey}
      >
        {props.children}
      </span>
    )
}

const TitleSpan = (props) => {
    let ret = []
    const el = Children.map(props.children, (child, i) => {
        const text = child.props.text.replace(/^\#+\s/, '')
        // return React.cloneElement(child, {
        //     text : child.props.text.replace(/^\#+\s/, '')
        // })
        ret.push(<span key={i}>{text}</span>)
    })
    return (
      <div
        data-offset-key={props.offsetKey}
      >
        <span>h1</span>
        <h1>{ret}</h1>
      </div>
    )
}

const styles = {
    root: {
      fontFamily: '\'Helvetica\', sans-serif',
      padding: 20,
      width: 600,
    },
    editor: {
      border: '1px solid #ddd',
      cursor: 'text',
      fontSize: 16,
      minHeight: 40,
      padding: 10,
    },
    button: {
      marginTop: 10,
      textAlign: 'center',
    },
    handle: {
      color: 'rgba(98, 177, 254, 1.0)',
      direction: 'ltr',
      unicodeBidi: 'bidi-override',
    },
    hashtag: {
      color: 'rgba(95, 184, 138, 1.0)',
    },
  }
