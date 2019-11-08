import React from 'react'
import './index.scss'
import { SearchBar } from 'antd-mobile'
import BScroll from 'better-scroll'
import { connect } from 'react-redux'
import axios from 'axios'
class City extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
          Bscroll: '',
          cityInfo:JSON.parse(window.localStorage.getItem('cityInfo'))
        }
    }

    componentDidMount() {
        const cityMenu = document.querySelector('.cityMenu')

        const scroll = new BScroll(cityMenu, {
          scrollX: true,
          click: true,
          scrollY: true,
          probeType:3
        })

        this.setState({
          Bscroll: scroll,
        })

        this.props.getCityList()  

        this.props.getLocalCity()

    }

    // componentDidUpdate () {
    //     this.getCityHeightList()
    // }

    // index = 0

    // getCityHeightList () {
    //     let cityHeightlist = Array.from(document.getElementsByClassName("initialLetter"))
    //     let cityOffsetlist = []

    //     cityHeightlist.forEach (item => {
    //         cityOffsetlist.push(item.offsetTop)
    //     })
    //     //console.log(cityOffsetlist)
    //     // [154, 240, 436, 522, 608, 749, 890, 976, 1117, 1203, 1399, 1485, 1571, 1712]
    //     this.state.Bscroll.on('scroll', (scrollHeight) => {
    //            let scrollHeightY = Math.abs(scrollHeight.y)
    //            let index = cityOffsetlist.findIndex(item => {
    //                return item > scrollHeightY
    //            })
    //            this.index = index
    //            console.log(this.index)
    //     })
    // }

    static getDerivedStateFromProps(props,state){
            let res = []
            props.cityList.forEach(city => {
                let py = city.shortSpell.charAt(0).toUpperCase()
                let index = res.findIndex(item => item.py === py)
                if(index > -1) {
                    res[index].list.push(city)
                } else {
                    let obj = {
                        py: py,
                        list : [city]
                    }
                    res.push(obj)
                }
            })
            
            let newArr =  res.sort((a,b) => {
                return a.py.charCodeAt() - b.py.charCodeAt()
            })
            let cityCode = newArr.map( item => {
                return item.py
            })

        return {
            cityList:newArr,
            cityCode:cityCode,
        }
    }


    CityClick (cityInfo) {
        window.localStorage.setItem('cityInfo',JSON.stringify(cityInfo))
        this.props.history.push('/home/foundhouse')
    }

    render () {
        const { cityList,cityCode,cityInfo } = this.state

        return (
            <div className='cityMenu' ref='cityMenu'>
                
                <div className='main'>
                    <div className='searchBox'>
                        <SearchBar placeholder="搜索城市" />
                    </div>
                    <div className='currentCity'>
                        <p>所在城市</p>
                        <div>{cityInfo.cityName}</div>
                    </div>
                    <div className='cityList'>
                        <ul className='city'>
                            {
                                cityList.map(city => {
                                    return (
                                        <li className='initialLetter' key={city.py} ref='initialLetter'>
                                            {
                                                <p className='cityWord'>{city.py}</p>
                                            }
                                            <ul>
                                                {
                                                    city.list.map(item => {
                                                        return (
                                                            <li className='cityName' key={item.cityId} onClick={() => {
                                                                this.CityClick({
                                                                    cityId:item.cityId,
                                                                    cityName:item.cityName
                                                                })
                                                            }}>{item.cityName}</li>
                                                        )
                                                    })
                                                }
                                            </ul>
                                        </li>
                                    )
                                })
                            }
                        </ul>
                    </div> 
                </div>
                
                <div className='sideInit'>
                   {
                       cityCode.map((code,indexCode) => {
                           return <div key={indexCode}>{code}</div>
                       })
                   }
                </div>

            </div>
        )
    }
}

export default connect(
    state => {
        return {
            cityList:state.cityList,
            localCity:state.localCity
        }
    },

    dispath => {
        return {     
            getCityList() {
                axios.get('/room-find-web/find/filterCityList').then(response => {
                    let result = response.data
                    let cityList = result.content.cityList
                    dispath({
                        type:'getCityList',
                        value: cityList
                    })
                })
            },
            getLocalCity() {
                axios.post('/room-find-web/home/getCityByIP').then(response => {
                    let result = response.data
                    let localCity = result.content.cityName
                    // console.log(localCity)
                    dispath({
                        type:'getLocalCity',
                        value:localCity
                    })
                })
            }  
        }
    }

)(City)