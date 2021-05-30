import React, { Component } from 'react';
import { Card } from 'antd';
import { SmileOutlined, FrownOutlined } from '@ant-design/icons';
import 'antd/dist/antd.css';
import './Credits.css';
import AuthService from "../../services/auth.service";

class Credits extends Component {
    state = { 
        perfect: true,
        currentUser: AuthService.getCurrentUser()
    } 

    handleClick = () => {
        this.setState({ perfect: !this.state.clicked })
    }

    render() {
        const { currentUser } = this.state;

        return(
            <div>
                 <Card className='creditsStyle'>
                    <p className='amountCredits'>{currentUser.creditScore}%</p>
                    <p className='penaltiesText'>
                        { currentUser.creditScore < 90 ? '2 Week Booking Ban from ' + new Date(currentUser.banStartDate) : "No Penalties Given" }
                    </p>
                    <p className='penaltiesText'>
                        { currentUser.creditScore < 90 ? <FrownOutlined style={{fontSize: 200}}/> : <SmileOutlined style={{fontSize: 200}}/> }
                    </p>
                </Card>
            </div>
        )
    }
}

export default Credits;