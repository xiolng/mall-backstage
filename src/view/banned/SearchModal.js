import React, { Component } from 'react';
import { Button, DatePicker, Select, Input } from 'antd';
import moment from 'moment';
import * as ReactDOM from 'react-dom';
import * as PropTypes from 'prop-types';

export default class SearchModal extends Component {
    constructor() {
        super();
        this.state = {
            key: 'ip',
            value: ''
        };

        this.searchValue = React.createRef();
    }

    render() {
        const selectChange = (e) => {
            this.setState({
                key: e
            });
        };
        const searchChange = (e) => {
            this.setState({
                value: e
            }, () => {
                this.props.callback(this.state);
            });
        };
        const dateChange = (value) => {
            if (value) {
                this.setState({
                    value: moment(value || new Date()).format('YYYY-MM-DD')
                }, () => {
                    this.props.callback(this.state);
                });
                return false;
            }
            this.setState({
                value: ''
            }, () => {
                this.props.callback(this.state);
            });
        };
        const placeholderList = {
            ip: '请输入IP',
            comment: '请输入域名',
            blocked_method: '请输入手动或者自动',
            op_time: '请输入时间',
            defaultValue: '请输入内容'
        };
        const clearSearch = () => {
            this.setState({
                key: '',
                value: ''
            }, () => {
                const input = ReactDOM.findDOMNode(this.searchValue.current);
                if (this.state.key !== 'op_time') {
                    input.querySelector('input').value = '';
                }

                this.props.callback(this.state);
            });
        };
        return (
            <div>
                <Select
                    defaultValue={'请选择'}
                    style={{ marginRight: '10px', width: '100px' }}
                    onChange={(e) => selectChange(e)}
                >
                    <Select.Option value={'ip'}>ip</Select.Option>
                    <Select.Option value={'comment'}>域名</Select.Option>
                    <Select.Option value={'blocked_method'}>封禁方式</Select.Option>
                    <Select.Option value={'op_time'}>操作时间</Select.Option>
                </Select>
                <div style={{ display: 'inline-block' }}>
                    {
                        this.state.key === 'op_time' ? <DatePicker onChange={(value) => dateChange(value)} />
                            : <Input.Search
                                placeholder={placeholderList[this.state.key] || placeholderList.defaultValue}
                                onSearch={(e) => searchChange(e)}
                                enterButton
                                style={{ width: '200px' }}
                                ref={this.searchValue}
                            />
                    }
                    {
                        this.state.value ? <Button
                            onClick={() => clearSearch()}
                            style={{ marginLeft: '20px' }}
                        >清空过滤</Button> : null
                    }
                </div>
            </div>
        );
    }
}

SearchModal.propTypes = {
    callback: PropTypes.func.isRequired
};
