import React, { Component } from 'react';
import { message } from 'antd';
import './index.scss';
import { openUrl, goLogout } from '@/utils/config';
import { setBreads, setTokens, setUsers } from '@/store/action';
import { connect } from 'react-redux';

class Index extends Component {
    constructor({ route, props }) {
        super(props);
    }

    componentDidMount() {
        this.props.history.push('/system');
    }

    render() {
        return <div/>;
    }
}

const mapStateToProps = (state, OwnProps) => ({
    token: state.mainConfig.token
});

const mapDispatchToProps = {
    setTokens,
    setUsers,
    setBreads
};
export default connect(mapStateToProps, mapDispatchToProps)(Index);
