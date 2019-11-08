import React from 'react'
import './global.css'
import Detail from './page/detail/index.jsx'
import City from './page/city/index.jsx'
import Searc from './page/searc/index'
import Login from './page/login/index.jsx'
import Register from './page/register/index.jsx'
import Home from './page/home/index.jsx'

//引入路由拦截组件
import AuthRoute from './component/AuthRouter.jsx'

import { HashRouter, Switch, Route, Redirect } from 'react-router-dom'

class App extends React.Component {
    render () {
        return (
            <HashRouter>
                <Switch>
                    <Route path='/home' component={Home}></Route>
                    <AuthRoute path='/detail/:id' component={Detail}></AuthRoute>
                    <Route path='/city' component={City}></Route>
                    <Route path='/searc' component={Searc}></Route>
                    <Route path='/login' component={Login}></Route>
                    <Route path='/register' component={Register}></Route>
                    <Redirect to='/home'></Redirect>
                </Switch>
            </HashRouter>
        )
    }
}

export default App