import React, {Component} from "react"
import {Icon, Menu} from "antd"
import {Link} from "react-router-dom"
import {routeConfig} from "@/router"
import {setBreads} from '@/store/action'
import {connect} from "react-redux"

const {SubMenu} = Menu

class Menus extends Component {

  constructor() {
    super();
    this.state = {
      keys: 'router'
    }
    this.handleClick = this.handleClick.bind(this)
  }

  componentDidMount() {
    routeConfig[1].routes.map(item => {
      if (item.path === this.props.location) {
        this.setBreadcrumb(item)
      }
      return item
    })
  }

  handleClick(e) {
    console.log(e)
    this.setState({
      keys: e.key
    })
    if (e.keyPath.length >= 2){
      this.setBreadcrumb({
        parent: e.keyPath[1],
        name: e.keyPath[0]
      })
      return false
    }
    this.setBreadcrumb({
      parent: 'index',
      name: e.keyPath[0]
    })
  }

  setBreadcrumb(item) {
    this.props.setBreads({
      parent: item.parent,
      name: item.name
    })
  }

  getNavList() {
    return routeConfig[1].routes.map(item =>
      item.hideMenu ? (
        ""
      ) : (
        item.children ? (
          <SubMenu
            key={item.name}
            title={
              <span>
                <Icon type="mail"/>
                <span>{item.name}</span>
              </span>
            }
          >
            {
              item.children.map(c => (
                <Menu.Item key={c.name}>
                  <Link
                    to={`${item.path}${c.path}`}
                  >
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
              {item.name}
            </Link>
          </Menu.Item>
        )
      )
    )
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
    )
  }
}

const mapStateToProps = (state, OwnProps) => ({
  breadcrumb: state.mainConfig.breadcrumb
})

const mapDispatchToProps = {
  setBreads
}

export default connect(mapStateToProps, mapDispatchToProps)(Menus)