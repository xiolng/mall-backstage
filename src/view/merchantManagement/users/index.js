import React from 'react';
import {Table, Divider, Button, Tooltip, Row, Col, Input, message, Form} from 'antd';
import AddPop from "_view/merchantManagement/users/AddPop";
import DeletePop from "_view/merchantManagement/users/DeletePop";

const {Search} = Input

class MerchantUser extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      list: [],
      showAdd: false,
      showDel: false
    }

    this.saveFormRef = this.saveFormRef.bind(this)
    this.saveAdd = this.saveAdd.bind(this)
    this.cancelAdd = this.cancelAdd.bind(this)
    this.saveDel = this.saveDel.bind(this)
  }

  componentDidMount() {
    this.getData()
  }

  // 获取列表
  getData() {
    const data = []
    for (let i = 1; i < 20; i++) {
      data.push({
        key: `'${i}'`,
        name: `John Brown${i}`,
        address: `New York No. 1 Lake Park${i}`,
        integral: `55${i}`,
        platformMoney: `66${i}`
      })
    }
    this.setState({
      list: data
    })
  }

  /**
   * 搜索列表
   * @param value
   */
  searchName(value) {
    console.log(value)
  }

  /**
   * 链接 新建modal的表单
   * @param formRef
   */
  saveFormRef = (formRef) => {
    this.formRef = formRef
  }

  // 添加弹窗
  openAdd() {
    this.setState({
      showAdd: true
    })
  }

  /**
   * 保存 添加 会员
   * @param e 确定
   */
  saveAdd(e) {
    e.preventDefault()
    const {form} = this.formRef.props
    form.validateFields((err, data) => {
      if (!err) {
        message.info('新建成功')
        this.getData()
        form.resetFields()
        this.setState({
          showAdd: false
        })
        return false
      }
      this.setState({
        showAdd: true
      })
    })
  }

  // 取消弹窗
  cancelAdd() {
    this.setState({
      showAdd: false,
      showDel: false
    })
  }

  // 打开删除弹窗
  openDel() {
    this.setState({
      showDel: true
    })
  }

  // 删除弹窗
  saveDel() {
    this.setState({
      showDel: false
    })
  }

  render() {
    const columns = [
      {
        title: '会员名',
        dataIndex: 'name',
        key: 'name',
        render: text => <a>{text}</a>
      },
      {
        title: '地址',
        dataIndex: 'address',
        ellipsis: true,
        key: 'address'
      },
      {
        title: '积分',
        dataIndex: 'integral',
        key: 'integral'
      },
      {
        title: '平台币',
        key: 'platformMoney',
        dataIndex: 'platformMoney'
      },
      {
        title: '操作',
        // fixed: 'right',
        key: 'action',
        render: (text, record) => (
          <span>
            <Tooltip title={'编辑'}>
              <Button type={'primary'} size={'small'} icon={'edit'} onClick={() => this.openDel()}/>
            </Tooltip>
            <Divider type="vertical"/>
            <Tooltip title={'删除'}>
              <Button type={'danger'} size={'small'} icon={'delete'} onClick={() => this.saveDel()}/>
            </Tooltip>
          </span>
        )
      }
    ];

    return (
      <div>
        <Row
          type={'flex'}
          justify={'space-between'}
          style={{marginBottom: 20}}
        >
          <Col>
            <Search
              placeholder="请输入会员名"
              enterButton="搜索"
              onSearch={value => this.searchName(value)}
            />
          </Col>
          <Col>
            <Button type={'primary'} icon={'plus'} onClick={() => this.openAdd()}>
              新增
            </Button>
          </Col>
        </Row>
        <Table columns={columns} dataSource={this.state.list}/>

        {/* 添加 */}
        <AddPop
          wrappedComponentRef={this.saveFormRef}
          showAdd={this.state.showAdd}
          saveAdd={this.saveAdd}
          cancelAdd={this.cancelAdd}
        />
        {/* 删除 */}
        <DeletePop
          showDel={this.state.showDel}
          saveDel={this.saveDel}
          cancelAdd={this.cancelAdd}
        />
      </div>
    );
  }
}

export default MerchantUser;
