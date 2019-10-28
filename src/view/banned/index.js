import React, { Component } from 'react';
import { Button, Col, Modal, Row, Table, message, Search } from 'antd';
import AddBanned from './AddBanned';
import './style.scss';
import SearchModal from './SearchModal';

/**
 * 封禁策略
 */

class banned extends Component {
    constructor() {
        super();
        this.state = {
            tableData: [],
            visible: false,
            visibleDelete: false,
            id: '',
            pagination: {
                current: 1,
                pageSize: 10,
                showSizeChanger: true
            },
            key: '',
            value: '',
            selectedRowKeys: [],
            visibleDeleteAll: false,
            footer: this.footerTemp
        };
        this.handleCancel = this.handleCancel.bind(this);
        this.handleOk = this.handleOk.bind(this);
        this.onSelectChange = this.onSelectChange.bind(this);
        this.footerTemp = this.footerTemp.bind(this);
    }

    componentDidMount() {
        this.getData();
        this.setState({
            footer: this.state.selectedRowKeys.length ? this.footerTemp : undefined
        });
    }

    footerTemp() {
        return <Button type={'danger'} onClick={() => this.setState({ visibleDeleteAll: true })}>批量删除</Button>;
    }

    getData(current, pageSize, key, value) {
        window.axios.get(`/api/v1.0/blocked_ips?page=${current || 1}&page_size=${pageSize || 10}&key=${key || ''}&value=${value || ''}`).then((res) => {
            this.setState((preState) => ({
                tableData: res.data.data,
                pagination: {
                    current: preState.pagination.current,
                    pageSize: preState.pagination.pageSize,
                    showSizeChanger: true,
                    total: res.data.total,
                    footer: undefined
                }
            }));
        });
    }

    showModal() {
        this.setState({
            visible: true
        });
    }

    tableChange(pagination, filters, sorter) {
        this.setState({
            pagination: {
                current: pagination.current,
                pageSize: pagination.pageSize,
                showSizeChanger: true
            }
        }, () => {
            this.getData(pagination.current, pagination.pageSize, this.state.key, this.state.value);
        });
    }

    handleOk(e) {
        e.preventDefault();
        const form = this.formRef.props.form;
        form.validateFields((err, data) => {
            if (!err) {
                window.axios.post('/api/v1.0/blocked_ips', {
                    data: {
                        ip: data.ip || '',
                        host: data.host || '',
                        time_value: +data.time_value || 0
                    }
                }).then((res) => {
                    message.info('新建成功');
                    this.getData();
                    this.setState({
                        visible: false
                    });
                    form.resetFields();
                });
                return false;
            }
            this.setState({
                visible: true
            });
        });
    }

    /**
     * 链接 新建modal的表单
     * @param formRef
     */
    saveFormRef = (formRef) => {
        this.formRef = formRef;
    }

    deleteBanned(item) {
        this.setState({
            id: item.id,
            visibleDelete: true
        });
    }

    deleteOk() {
        window.axios.delete(`/api/v1.0/blocked_ips/${this.state.id}`).then((res) => {
            this.setState({
                visibleDelete: false
            });
            this.getData();
        });
    }

    handleCancel() {
        this.setState({
            visible: false,
            visibleDelete: false
        });
    }

    deleteAll() {
        window.axios.delete(`/api/v1.0/blocked_ips?id=${this.state.selectedRowKeys}`).then((res) => {
            this.setState({
                visibleDeleteAll: false
            }, () => {
                this.getData();
            });
        });
    }

    onSelectChange(selectedRowKeys, selectedRows) {
        this.setState({
            selectedRowKeys,
            footer: selectedRowKeys.length ? this.footerTemp : undefined
        });
    }

    render() {
        const columns = [
            {
                title: 'IP',
                dataIndex: 'ip',
                width: 100
            },
            {
                title: '规则说明',
                dataIndex: 'comment',
                width: 360
            },
            {
                title: '操作功能',
                dataIndex: 'action',
                width: 180
            },
            {
                title: '封禁方式',
                dataIndex: 'blocked_method',
                width: 180
            },
            {
                title: '过期时间',
                dataIndex: 'expire_time',
                width: 180
            },
            {
                title: 'ACL规则ID',
                dataIndex: 'waf_acl_id',
                width: 180
            },
            {
                title: '操作时间',
                dataIndex: 'op_time',
                width: 180
            },
            {
                title: '更新时间',
                dataIndex: 'last_modify_time',
                width: 180
            },
            {
                title: '操作',
                key: 'operation',
                fixed: 'right',
                render: (text, record, index) =>
                    <Button size={'small'} onClick={() => this.deleteBanned(record, index)}>删除</Button>
            }
        ];
        const { selectedRowKeys } = this.state;
        const rowSelection = {
            selectedRowKeys,
            onChange: this.onSelectChange
        };
        const searchData = (value) => {
            this.setState({
                key: value.key,
                value: value.value
            }, () => {
                this.getData(this.state.pagination.current, this.state.pagination.pageSize, this.state.key, this.state.value);
            });
        };
        return (
            <div>
                <Row type={'flex'} justify={'end'} style={{ marginBottom: '20px' }}>
                    <Col span={18}>
                        <SearchModal callback={(value) => searchData(value)} />
                    </Col>
                    <Col span={6} style={{ textAlign: 'right' }}>
                        <Button type={'primary'} onClick={() => this.showModal()}>
                            新增策略
                        </Button>
                    </Col>
                </Row>
                <Table
                    rowSelection={rowSelection}
                    dataSource={this.state.tableData}
                    columns={columns}
                    onChange={(p, f, s) => this.tableChange(p, f, s)}
                    pagination={this.state.pagination}
                    rowKey={'id'}
                    scroll={{ x: 1000 }}
                    footer={this.state.footer}
                />

                <Modal
                    title="删除"
                    visible={this.state.visibleDelete}
                    onOk={() => this.deleteOk()}
                    onCancel={() => this.handleCancel()}
                >
                    <span>确定要删除吗？</span>
                </Modal>
                <Modal
                    title="批量删除"
                    visible={this.state.visibleDeleteAll}
                    onOk={() => this.deleteAll()}
                    onCancel={() => this.handleCancel()}
                >
                    <span>确定要批量删除吗？</span>
                </Modal>
                <AddBanned
                    wrappedComponentRef={this.saveFormRef}
                    visible={this.state.visible}
                    handleCancel={this.handleCancel}
                    handleOk={this.handleOk}
                />
                {
                    this.props.children
                }
            </div>
        );
    }
}

export default banned;
