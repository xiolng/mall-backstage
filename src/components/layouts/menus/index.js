import React, { Component } from 'react';
import { Icon, Menu } from 'antd';
import { Link } from 'react-router-dom';
import { routeConfig } from '@/router'; // 路由列表
import { setBreads } from '@/store/action'; // 设置面包屑
import { connect } from 'react-redux';

const { SubMenu } = Menu;

class Menus extends Component {
  constructor() {
    super();
    this.state = {
      keys: 'router'
    };
    this.handleClick = this.handleClick.bind(this);
  }

  componentDidMount() {
  }

  /**
   * 点击菜单-设置面包屑
   * @param e
   * @returns {boolean}
   */
  handleClick(e) {
    this.setState({
      keys: e.key
    });
    if (e.keyPath.length >= 2) {
      this.setBreadcrumb({
        parent: e.keyPath[1],
        name: e.keyPath[0]
      });
      return false;
    }
    this.setBreadcrumb({
      parent: e.keyPath[0],
      name: e.keyPath[0]
    });
  }

  /**
   * 设置面包屑
   * @param item {}
   */
  setBreadcrumb(item) {
    this.props.setBreads({
      parent: item.parent,
      name: item.name
    });
  }

  /**
   * 生成菜单
   * @returns {string[]}
   */
  getNavList() {
    return routeConfig[1].routes.map((item) => {
      let menuList = null;
        if (!item.hideMenu) {
          menuList = (
            item.children ? (
              <SubMenu
                key={item.name}
                title={
                  <span>
                <Icon type={item.icon}/>
                <span>{item.name}</span>
              </span>
                }
              >
                {
                  item.children.map((c) => (
                    <Menu.Item key={c.name}>
                      <Link
                        to={`${item.path}${c.path}`}
                      >
                        <Icon type={c.icon}/>
                        {c.name}
                      </Link>
                    </Menu.Item>
                  ))
                }
              </SubMenu>
            ) : (
              <Menu.Item key={item.name}>
                <Link
                  to={item.path}
                >
                  <Icon type={item.icon}/>
                  <span>{item.name}</span>
                </Link>
              </Menu.Item>
            )
          );
        }
        return menuList;
      }
    );
  }

  render() {
    return (
      <Menu
        defaultOpenKeys={[this.props.breadcrumb.parent]}
        selectedKeys={[this.props.breadcrumb.name]}
        onClick={this.handleClick}
        mode="inline"
        theme="dark"
      >
        {this.getNavList()}
      </Menu>
    );
  }
}

const mapStateToProps = (state, OwnProps) => ({
  breadcrumb: state.mainConfig.breadcrumb
});

const mapDispatchToProps = {
  setBreads
};

export default connect(mapStateToProps, mapDispatchToProps)(Menus);
