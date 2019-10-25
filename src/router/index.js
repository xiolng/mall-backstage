import React from "react"
import {Route, Switch} from "react-router-dom"
import Login from "@/view/login"
import Index from "@/view"
import NotFound from "@/view/404/index"
import LayoutModule from "@/view/layout"
import banned from "@/view/banned";

export const routeConfig = [
  {
    path: "/login",
    name: "login",
    hideMenu: true,
    component: Login,
    exact: true
  },
  {
    name: "Home",
    icon: "user",
    routes: [
      {
        path: "/",
        name: "index",
        icon: "user",
        parent: "Home",
        component: Index,
        hideMenu: true,
        exact: true
      },
      {
        path: "/system",
        name: "system",
        icon: "user",
        parent: "Home",
        component: banned,
        hideMenu: false,
        children: [
          {
            path: '/router',
            name: 'router',
            icon: 'user',
            parent: 'system',
            component: () => (<div>2222</div>),
            hideMenu: true
          },
          {
            path: '/routers',
            name: 'routers',
            icon: 'user',
            parent: 'system',
            component: () => (<div>3333</div>),
            hideMenu: true
          }
        ]
      },
      {
        path: "/systems",
        name: "systems",
        icon: "user",
        parent: "Home",
        component: banned,
        hideMenu: false,
        exact: true
      },
      {
        path: "/*",
        name: "notFound",
        icon: "user",
        parent: "Home",
        hideMenu: true,
        component: NotFound,
        exact: false
      }
    ]
  },
  {
    path: "/*",
    name: "notFound",
    hideMenu: true,
    component: NotFound,
    exact: false
  }
]

export const routeList = () => (
  <Switch>
    {
      routeConfig.map((item, index) => {
        if (!item.routes) {
          return (<Route exact={item.exact} path={item.path} component={item.component} key={index}/>)
        }
        if (item.name === 'Home') {
          return (
            <LayoutModule key={index}>
              <Switch>
                {
                  item.routes.map((v, i) => {
                    return v.children ? (
                      <Route path={v.path} key={i}>
                        {v.children.map(c => (<Route path={`${v.path}${c.path}`} component={c.component} key={c.path} />))}
                      </Route>
                    ) : (
                      <Route exact={v.exact} path={v.path} component={v.component} key={i}/>
                    )
                  })
                }
              </Switch>
            </LayoutModule>
          )
        }
        return true
      })
    }
  </Switch>
)