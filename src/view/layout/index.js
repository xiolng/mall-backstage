import React, {Component} from 'react'
import {Layout, Icon, Row, Col, Tooltip, Breadcrumb, Badge} from 'antd';
import Menus from '_components/layouts/menus'
import "./style.scss"
import {setBreads} from "@/store/action";
import {connect} from "react-redux";
import Users from '_components/layouts/users' // 用户
import FullScreen from "_components/layouts/FullScreen" // 全屏

const {Header, Sider, Content} = Layout;

class LayoutModule extends Component {
  state = {
    collapsed: false, // 菜单栏是否展开
  }
  // 菜单栏 、展开切换
  toggle = () => {
    this.setState({
      collapsed: !this.state.collapsed,
    })
  }

  componentDidMount() {

  }

  componentDidUpdate() {
  }

  render() {
    return (
      <Layout>
        {/*logo || 项目名称*/}
        <Sider trigger={null} collapsible collapsed={this.state.collapsed}>
          <div className={this.state.collapsed ? 'logo logo-trigger' : 'logo'}>
            后台管理
          </div>
          <Menus/>
        </Sider>
        <Layout>
          {/*头部导航*/}
          <Header style={{background: '#fff', padding: 0}}>
            <Row type={'flex'} align={'middle'} justify={'space-between'}>
              <Col>
                <Icon
                  className="trigger"
                  type={this.state.collapsed ? 'menu-unfold' : 'menu-fold'}
                  onClick={this.toggle}
                />
                {/*面包屑*/}
                <Breadcrumb style={{display: "inline-block"}}>
                  <Breadcrumb.Item href="/">
                    <Icon type="home"/>
                  </Breadcrumb.Item>
                  <Breadcrumb.Item href={`/${this.props.breadcrumb.parent}`}>
                    <Icon type="user"/>
                    <span>{this.props.breadcrumb.parent}</span>
                  </Breadcrumb.Item>
                  <Breadcrumb.Item>{this.props.breadcrumb.name}</Breadcrumb.Item>
                </Breadcrumb>
              </Col>
              <Col>
                <div className="user-box">
                  {/*全屏*/}
                  <FullScreen/>
                  {/*消息*/}
                  <div className="message-box">
                    <Tooltip placement={'top'} title={'消息'}>
                      <Badge dot>
                        <Icon style={{color: '#333', fontSize: "20px"}} type={'bell'}/>
                      </Badge>
                    </Tooltip>
                  </div>
                  {/*用户*/}
                  <Users/>
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
              boxShadow: '0 0 12px #dacfcf',
              borderRadius: 10
            }}
          >
            <div className="content-box">
              {/*内容部分,路由切换*/}
              {this.props.children}
            </div>
          </Content>
        </Layout>
      </Layout>
    );
  }
}

const mapStateToProps = (state, OwnProps) => ({
  breadcrumb: state.mainConfig.breadcrumb
})

const mapDispatchToProps = {
  setBreads
}

export default connect(mapStateToProps, mapDispatchToProps)(LayoutModule)
