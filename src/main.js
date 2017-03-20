import React, { Component } from 'react'
import ReactDOM from 'react-dom'
import { Button, WingBlank, WhiteSpace, List } from '@ali/cn-tui'

import './styles/core.css'
import '@ali/cn-tui/dist/tui.css'

const Item = List.Item
const Brief = List.Brief

class App extends Component {
    
    render (){
        return (
            <div className="container">
                <h2 style={{textAlign:'center'}}>Welcome to TitanUI</h2>

                <List header="header" footer="footer">
                    <Item data-seed="logId">标题文字点击无反馈，文字超长则隐藏，文字超长则隐藏</Item>
                    <Item wrap>文字超长折行文字超长折行文字超长折行文字超长折行文字超长折行文字超长折行</Item>
                    <Item extra="箭头向右" arrow="horizontal" onClick={() => {}}>标题文字</Item>
                    <Item extra="箭头向下" arrow="down" onClick={() => {}}>标题文字</Item>
                    <Item extra="箭头向上" arrow="up" onClick={() => {}}>标题文字</Item>
                    <Item extra="内容内容" multipleLine align="top" wrap>
                      多行标题文字，文字可能比较长、文字可能比较长、直接折行
                    </Item>

                    <Item extra="内容内容" multipleLine>
                      垂直居中对齐 <Brief>辅助文字内容</Brief>
                    </Item>
                    <Item extra="没有箭头" arrow="empty" className="spe" wrap>
                      极个别情况下，单行标题文字可能比较长，文字可能比较长、文字可能比较长、靠近右边会折行
                    </Item>

                    <Item>
                      <select defaultValue="1">
                        <option value="1">这是原生 html select</option>
                        <option value="2" disabled>不可选</option>
                        <option value="3">选项3</option>
                      </select>
                    </Item>
                </List>

                <WhiteSpace />

                <WingBlank>
                    <Button type="primary">Primary</Button>
                </WingBlank>
            </div>        
        )
    }
}

ReactDOM.render(<App />, document.getElementById('root'))
