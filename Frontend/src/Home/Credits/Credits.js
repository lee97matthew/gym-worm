import React, { Component } from 'react';
import { Card } from 'antd';
import { SmileOutlined, FrownOutlined } from '@ant-design/icons';
import 'antd/dist/antd.css';
import './Credits.css';

var num = 90;

class Credits extends Component {
    state = { perfect: true } 

    handleClick = () => {
        this.setState({ perfect: !this.state.clicked })
    }

    render() {
        return(
            <div>
                 <Card className='creditsStyle'>
                    <p className='amountCredits'>{num}%</p>
                    <p className='penaltiesText'>
                        { num < 90 ? 'Penalties Given' : "No Penalties Given" }
                    </p>
                    <p className='penaltiesText'>
                        { num < 90 ? <FrownOutlined style={{fontSize: 200}}/> : <SmileOutlined style={{fontSize: 200}}/> }
                    </p>
                </Card>
            </div>
        )
    }
}

export default Credits;