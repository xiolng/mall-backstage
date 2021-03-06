import React, { Component } from 'react';
import { Avatar, Dropdown, Menu } from 'antd';
import { clearStorage, Logout } from '@/utils/config';
import { setTokens, setUsers } from '@/store/action';
import { connect } from 'react-redux';
import './style.scss';

class Users extends Component {
    constructor() {
        super();
        this.state = {
            isToken: true
        };
    }

    componentDidMount() {
        this.isToken();
        const userList = this.props.userList;
        // if (!userList && this.props.token) {
        //     window.axios.get("/api/v1.0/current_user").then(res => {
        //         this.props.setUsers(res.data)
        //     })
        // }
    }

    logout() {
        clearStorage();
        Logout();
        this.isToken();
    }

    isToken() {
        if (!this.props.token) {
            this.setState({
                isToken: this.props.token
            });
        }
    }

    render() {
        const menu = (
            <Menu>
                <Menu.Item onClick={() => this.logout()}>
                    <span>退出</span>
                </Menu.Item>
            </Menu>
        );
        // const userList = this.props.userList
        const userList = { username: 'xiolng' };
        return this.state.isToken ? (
            <Dropdown overlay={menu}>
                <div style={{ cursor: 'pointer' }}>
                    <Avatar style={{ backgroundColor: '#87d068' }} icon="user" />
                    <span className={'userName'}>
                        {(userList && userList.username) || ''}
                    </span>
                </div>
            </Dropdown>
        ) : null;
    }
}

const mapStateToProps = (state, OwnProps) => ({
    token: state.mainConfig.token,
    userList: state.mainConfig.userList
});

const mapDispatchToProps = {
    setTokens,
    setUsers
};

export default connect(mapStateToProps, mapDispatchToProps)(Users);
