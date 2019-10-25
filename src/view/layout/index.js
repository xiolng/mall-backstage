import React, {Component} from 'react'
import {Layout, Menu, Icon, Row, Col, Avatar, Tooltip, Breadcrumb} from 'antd';
import Menus from '@/components/menus'
import "./style.scss"

const {Header, Sider, Content} = Layout;

class LayoutModule extends Component {
  state = {
    collapsed: false,
  }

  toggle = () => {
    this.setState({
      collapsed: !this.state.collapsed,
    })
  }

  componentDidMount() {
    console.log(this.props)
  }

  componentDidUpdate() {
  }

  render() {
    return (
      <Layout>
        <Sider trigger={null} collapsible collapsed={this.state.collapsed}>
          <div className={this.state.collapsed ? 'logo logo-trigger':'logo'}>
            后台管理
          </div>
          <Menus />
        </Sider>
        <Layout>
          <Header style={{background: '#fff', padding: 0}}>
              <Row type={'flex'} align={'middle'} justify={'space-between'}>
                  <Col>
                      <Icon
                        className="trigger"
                        type={this.state.collapsed ? 'menu-unfold' : 'menu-fold'}
                        onClick={this.toggle}
                      />
                  </Col>
                  <Col>
                      <div className="user-box">
                        <Tooltip placement={'top'} title={'全屏'}>
                          <Icon style={{color: '#333', marginRight: '10px', fontSize:"18px"}} type={'fullscreen'} />
                        </Tooltip>

                        <Tooltip placement={'top'} title={'消息'}>
                          <Icon style={{color: '#333', marginRight: '10px', fontSize:"18px"}} type={'bell'} />
                        </Tooltip>
                        <Avatar src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png" />
                      </div>
                  </Col>
              </Row>

          </Header>
          <Content
            style={{
              margin: '24px 16px',
              padding: 24,
              background: '#fff',
              minHeight: 280,
              boxShadow: '3px 3px 3px #dacfcf',
              borderRadius: 10
            }}
          >
            <Breadcrumb>
              <Breadcrumb.Item href="">
                <Icon type="home" />
              </Breadcrumb.Item>
              <Breadcrumb.Item href="">
                <Icon type="user" />
                <span>Application List</span>
              </Breadcrumb.Item>
              <Breadcrumb.Item>Application</Breadcrumb.Item>
            </Breadcrumb>
            <div className="content-box">
              {this.props.children}
            </div>
          </Content>
        </Layout>
      </Layout>
    );
  }
}

export default LayoutModule
