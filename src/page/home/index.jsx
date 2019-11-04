import React from 'react'
import {Switch,Route } from 'react-router-dom'

const Home = (props) => {
    return(
        <div>

        <Switch>
            {/* <Route path='/home'></Route> */}
        </Switch>

        <h1>home页面</h1>
        <h2>name :  {props.name}</h2>
        </div>

    )
}

export default Home