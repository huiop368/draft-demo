import React, { Component } from 'react'
import ReactDOM from 'react-dom'
import classnames from 'classnames'
import { Editor } from 'components/Editor'

// draft-js 所有的暴露 做到 Editor里面
import { EditorState, RichUtils } from 'draft-js'

import classes from './MyEditor.less'


export default class MyEditor extends Component {
    constructor(props) {
        super(props)

        this.state = {
            editorState: EditorState.createEmpty()
        }
    }

    // componentDidMount (){
    //     console.log(this.editorNode)
    // }

    handleWrapClick = () => {
        this.editorNode.focus()
    }

    handleChange = (editorState) => {
        this.setState({editorState})
    }
    
    render (){
        return (
            <div className={classes.wrap} onClick={this.handleWrapClick}>
                <Editor
                ref={el => this.editorNode = el}
                placeholder="Tell your lovely story..."
                editorState={this.state.editorState}
                onChange={this.handleChange}
                />
            </div>        
        ) 
    }

}
