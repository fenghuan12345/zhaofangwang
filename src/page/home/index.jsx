//home主页面
import React from 'react'
// import { TabBar } from 'antd-mobile'
import './index.scss'
import Center from './center/index.jsx'
import FoundHouse from './foundhouse/index.jsx'
import Trip from './trip/index.jsx'

import {Switch,Route } from 'react-router-dom'

class Home extends React.Component {
    render () {
        return(
            <div className='home-page'>
    
                <Switch>
                    <Route path='/center' component={Center}></Route>
                    <Route path='/foundhouse' component={FoundHouse}></Route>
                    <Route path='/trip' component={Trip}></Route>
                </Switch>

            </div>
        )
    }
}

export default Home