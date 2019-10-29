import React from 'react';
import {Form, Input, Modal} from 'antd';

class AddPop extends React.Component {


  render() {
    const {form, saveAdd, cancelAdd, showAdd} = this.props;
    const {getFieldDecorator} = form;
    return (
      <div>
        <Modal
          title="新增会员"
          visible={showAdd}
          onOk={saveAdd}
          onCancel={cancelAdd}
          destroyOnClose
        >
          <Form layout="inline">
            <Form.Item label="会员名">
              {getFieldDecorator('username', {
                rules: [{required: true, message: '请输入会员名!'}],
              })(<Input placeholder={'请输入会员名'}/>)}
            </Form.Item>
          </Form>
        </Modal>
      </div>
    );
  }
}

export default Form.create({})(AddPop);