import React, { Component } from 'react'
import ReactDOM             from 'react-dom'
import classnames           from 'classnames'
import PlainText            from 'components/Example/PlainText'
import RichStyle            from 'components/Example/RichStyle'

import 'draft-js/dist/Draft.css'
import classes from './App.less'

export default class App extends Component {

    constructor (props){
        super(props)

        this.state = {
            index : 0
        }
    }

    handleClickBtn = (i) => {
        this.setState({
            index : i
        })
    }
    
    render (){
        const { index } = this.state
        const rets = [<PlainText />, <RichStyle />]
        const btns = ['PlainText', 'RichStyle']

        return (
            <div className="container">
                <h2 style={{textAlign:'center'}}>DraftJs Demo</h2>
                <p className={classes.btn_area}>
                    {
                        btns.map((txt, i) => {
                            return <span key={i} className={classnames({[classes.active] : i === index})}
                                    onClick={() => this.handleClickBtn(i)}>{txt}</span>
                        })
                    }
                </p>
                {rets[index]}
            </div>
        )
    }

}