import React, { Component } from 'react';
import { Input, InputNumber, Modal, Form } from 'antd';
import * as PropTypes from 'prop-types';

class AddBannedModal extends Component {
    render() {
        const {
            visible, handleCancel, handleOk, form
        } = this.props;
        const { getFieldDecorator } = form;

        const formItemLayout = {
            labelCol: {
                xs: { span: 24 },
                sm: { span: 8 }
            }
        };
        return (
            <Modal
                title={'新增策略'}
                visible={visible}
                onOk={handleOk}
                onCancel={handleCancel}
            >
                <div>
                    <Form layout="inline" style={{ lineHeight: '60px' }}>
                        <Form.Item label={'封禁IP'} style={{ display: 'block' }} {...formItemLayout}>
                            {getFieldDecorator('ip', {
                                rules: [{
                                    required: true, message: '请填写IP'
                                }]
                            })(
                                <Input style={{ width: '260px', margin: '0 5px' }} placeholder="" />
                            )}
                        </Form.Item>
                        <Form.Item label={'域名'} style={{ display: 'block' }} {...formItemLayout}>
                            {getFieldDecorator('host', {})(
                                <Input style={{ width: '260px', margin: '0 5px' }} placeholder="非必填" />
                            )}
                        </Form.Item>
                        <Form.Item label={'过期时间'} style={{ display: 'block' }} {...formItemLayout}>
                            {getFieldDecorator('time_value', {})(
                                    <InputNumber style={{
                                        width: '260px',
                                        margin: '0 5px'
                                    }} placeholder="留空表示永不过期" addonAfter={'小时'} />
                            )}
                            <span>小时</span>
                        </Form.Item>
                    </Form>

                </div>
            </Modal>
        );
    }
}

AddBannedModal.propTypes = {
    visible: PropTypes.bool.isRequired,
    handleOk: PropTypes.func.isRequired,
    handleCancel: PropTypes.func.isRequired
};
export default Form.create()(AddBannedModal);
