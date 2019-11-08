// 暴露一个高阶组件（高阶函数）的方法

//实现路由拦截 (存在登录信息才能访问的页面路由组件)

// 私有的 AuthRoute 组件

import React from "react";
import { Route, Redirect } from "react-router-dom";

const AuthRoute = ({ component: Component, ...reset }) => {
  return (
    <Route
      {...reset}
      render={routerProps => {
        let userInfo = window.localStorage.getItem("userInfo");
        if (userInfo) {
          // 存在，就渲染 要去的页面
          return <Component {...routerProps}></Component>;
        } else {
          // 不存在，重定向到登录页面
          return (
            <Redirect
              to={{
                pathname: "/login",
                search: `?redirect=${routerProps.location.pathname +
                  routerProps.location.search}`
              }}
            ></Redirect>
          );
        }
      }}
    ></Route>
  );
};

export default AuthRoute;
