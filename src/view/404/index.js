import React, { Component } from 'react';
import { Icon } from 'antd';
import { Link } from 'react-router-dom';
import './style.scss';
import { setBreads } from '@/store/action';
import { connect } from 'react-redux';

class NotFound extends Component {
    constructor() {
        super();
        this.state = {
            times: 5 // 秒
        };
        this.getDate();
        this.pushLink = this.pushLink.bind(this);
    }

    /**
     * 倒计时，返回首页
     */
    getDate() {
        if (this.state.times >= 1) {
            setTimeout(() => {
                this.setState({
                    times: this.state.times - 1
                });
                this.getDate();
            }, 1000);
        } else {
            this.pushLink();
        }
    }

    /**
     * 返回默认页
     * @param e
     */
    pushLink(e) {
        e && e.preventDefault();
        e && e.stopPropagation();
        this.props.setBreads({
            parent: '系统设置',
            name: '菜单管理'
        });
        this.props.history.push('/');
    }

    render() {
        return (
            <div className={'notFound'}>
                <Icon className={'icon'} type="frown" theme="twoTone" />
                <div className={'txt'}>404</div>
                <div className="timePush">
                    <span>
            无此页面，<span className={'colorTxt'}>{this.state.times}</span>
            秒钟后返回
                    </span>
                    <Link to={'/'} onClick={(e) => this.pushLink(e)}>首页</Link>
                </div>
            </div>
        );
    }
}

const mapStateToProps = (state, OwnProps) => ({
    breadcrumb: state.mainConfig.breadcrumb
});

const mapDispatchToProps = {
    setBreads
};
export default connect(mapStateToProps, mapDispatchToProps)(NotFound);
