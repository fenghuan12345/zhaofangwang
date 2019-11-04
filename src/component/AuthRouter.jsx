// 暴露一个高阶组件（高阶函数）的方法

// 私有的 AuthRoute 组件

import React from 'react'
import { Route, Redirect } from 'react-router-dom'

const AuthRoute = ({ component: Component, ...reset }) => {
  let userInfo = window.localStorage.getItem('userInfo')
  return (
    <Route
      {...reset}
      render={routerProps => {
        if (userInfo) {
          // 存在，就渲染 要去的页面
          return <Component {...routerProps}></Component>
        } else {
          // 不存在，重定向到登录页面
          return (
            <Redirect
              to={{
                pathname: '/login',
                search: `?redirect=${routerProps.location.pathname +
                  routerProps.location.search}`
              }}
            ></Redirect>
          )
        }
      }}
    ></Route>
  )
}

export default AuthRoute
