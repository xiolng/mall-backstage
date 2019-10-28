import React from 'react';
import { Route, Switch } from 'react-router-dom';
import Login from '@/view/login'; // 登录页
import Index from '@/view'; // 首页，暂时不用跳转到其他页面
import NotFound from '@/view/404/index'; // 404 找不到的跳到此页面
import LayoutModule from '@/view/layout'; // 布局框架
import banned from '@/view/banned';

/**
 * @path 路由名称
 * @name 菜单名称
 * @hideMenu 是否显示在左侧菜单
 * @exact 绝对地址
 * @parent 父路由
 * @routes 子路由
 * @type {*[]}
 */

export const routeConfig = [
  {
    path: '/login',
    name: 'login',
    hideMenu: true,
    component: Login,
    exact: true
  },
  {
    name: 'Home',
    icon: 'user',
    routes: [
      {
        path: '/',
        name: 'index',
        icon: 'user',
        parent: 'Home',
        component: Index,
        hideMenu: true,
        exact: true
      },
      {
        path: '/merchant',
        name: '商户管理',
        icon: 'setting',
        parent: 'Home',
        hideMenu: false,
        children: [
          {
            path: '/',
            name: '菜单管理',
            icon: 'menu',
            parent: 'system',
            component: () => (<div>2222</div>),
            hideMenu: true
          }
        ]
      },
      {
        path: '/system',
        name: '系统设置',
        icon: 'setting',
        parent: 'Home',
        component: banned,
        hideMenu: false,
        children: [
          {
            path: '/',
            name: '菜单管理',
            icon: 'menu',
            parent: 'system',
            component: () => (<div>2222</div>),
            hideMenu: true
          }
        ]
      },
      {
        path: '/baseManage',
        name: '基础数据',
        icon: 'bar-chart',
        parent: 'Home',
        component: banned,
        hideMenu: false,
        exact: true
      },
      {
        path: '/*',
        name: 'notFound',
        icon: 'user',
        parent: 'Home',
        hideMenu: true,
        component: NotFound,
        exact: false
      }
    ]
  },
  {
    path: '/*',
    name: 'notFound',
    hideMenu: true,
    component: NotFound,
    exact: false
  }
];

export const routeList = () => (
  <Switch>
    {
      routeConfig.map((item, index) => {
        if (!item.routes) {
          return (<Route exact={item.exact} path={item.path} component={item.component} key={index}/>);
        }
        if (item.name === 'Home') {
          return (
            <LayoutModule key={index}>
              <Switch>
                {
                  item.routes.map((v, i) => {
                    return v.children ? (
                      <Route path={v.path} key={i}>
                        {v.children.map((c) => (<Route path={`${v.path}${c.path}`} component={c.component} key={c.path} />))}
                      </Route>
                    ) : (
                      <Route exact={v.exact} path={v.path} component={v.component} key={i}/>
                    );
                  })
                }
              </Switch>
            </LayoutModule>
          );
        }
        return true;
      })
    }
  </Switch>
);
