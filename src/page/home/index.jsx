//home主页面
import React from 'react'
import { TabBar } from 'antd-mobile'
import './index.scss'
import Center from './center/index.jsx'
import FoundHouse from './foundhouse/index.jsx'
import Trip from './trip/index.jsx'
import {Switch,Route,Redirect} from 'react-router-dom'
class Home extends React.Component {
    state = {
        curItem: this.props.location.pathname.substr(1).split('/')[1],
    }

    static getDerivedStateFromProps(props,state){
        return {
            curItem: props.location.pathname.substr(1).split('/')[1],
        }
    }

    TabItem = [{title:'找房', icon:'mogu',select:'foundhouse'},{title:'行程', icon:'hanglixiang',select:'trip'},{title:'我的', icon:'wode1',select:'center'}]

    render () {
        // console.log(this.props)
        return(
            <div className='home-page'>
                
                <div className='page-content'>
                    <Switch>
                        <Route path='/home/center' component={Center}></Route>
                        <Route path='/home/foundhouse' component={FoundHouse}></Route>
                        <Route path='/home/trip' component={Trip}></Route>
                        <Redirect to='/home/foundhouse'></Redirect>
                    </Switch>
                </div>

                <TabBar
                    unselectedTintColor="#888"
                    tintColor="#f65000"
                    barTintColor="white"
                    >
                        {this.TabItem.map((item) => {
                            return (
                                <TabBar.Item
                                    title={item.title}
                                    key={item.title}
                                    icon={<i className={`iconfont icon-${item.icon}`}></i>}
                                    selectedIcon={<i className={`iconfont icon-${item.icon}`}></i>}
                                    selected={this.state.curItem === item.select}
                                    onPress={() => {
                                        this.setState({
                                            curItem:item.select
                                        })
                                        this.props.history.push(`/home/${item.select}`)
                                    }}
                                >
                                </TabBar.Item>
                            )
                        })}
                </TabBar>
                
            </div>
        )
    }
}

export default Home