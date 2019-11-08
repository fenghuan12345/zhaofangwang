//找房页面
import React from 'react'
import './index.scss'
import { Carousel } from 'antd-mobile';
import axios from 'axios'
import zhengzu from '../../../asset/ff8d7cd78853a03e03dc839c22771051.png'
import hezu from '../../../asset/987736acb9c60d3665d0868693363c40.png'
import gongyu from '../../../asset/999cf3e6361fb9a337113bc79e90e6d7.png'
import ditu from '../../../asset/c1962bc1bca730178bd083b60257ca3e.png'
import zhongjie from '../../../asset/eda3bd14d04d03da9749261ea58842e5.png'
import jiaotong from '../../../asset/101c197ce899ac3883b8912787ff826f.png'
import zufang from '../../../asset/1b4210a0610bedceff7103bcb0dae3b5.png'

const PAGESIZE = 14
class FoundHouse extends React.Component {
    state = {
        bannerData: [],
        brandData: [],
        houseInfoData: [],
        pageInfo: {},
        loading: false,
        showHeader: true,
        cityInfo: JSON.parse(window.localStorage.getItem('cityInfo'))
    }

    pageNum = 1
    pageSize = PAGESIZE

    render() {
        const { bannerData, brandData, houseInfoData, loading, pageInfo, showHeader,cityInfo } = this.state
        let banner
        if (bannerData) {
            banner = (
                <Carousel autoplay={true} infinite dotActiveStyle={{ color: '#ff7000' }}>
                    {bannerData.map(banner => {
                        return <img key={banner.coverImage} src={banner.coverImage} alt="" />
                    })}
                </Carousel>
            )
        }

        let loadingEL = (
            <div className="loading">
                <span>加载更多...</span>
            </div>
        )

        if (this.pageNum === pageInfo.totalPage && !loading) {
            loadingEL = (
                <div className="loading">
                    <span>别拉...</span>
                </div>
            )
        }

        let brand
        if (brandData.length > 0) {
            brand = (
                <div className='widget-part'>
                    <h3 className='widget-title'>
                        品牌公寓
                                <i className='iconfont icon-arrow-right-copy-copy-copy'></i>
                    </h3>
                    <div className='hidden-scroll'>
                        <div className='horizontal-list'>
                            {
                                brandData.map(brand => {
                                    return (
                                        <div className='ka-list-item' key={brand.id}>
                                            <img src={brand.bgImage} alt="" />
                                            <div>
                                                <img src={brand.brandLogo} alt="" />
                                                <h2>{brand.name}</h2>
                                                <h3>{brand.roomCount}套房源</h3>
                                            </div>
                                        </div>
                                    )
                                })
                            }
                        </div>
                    </div>
                </div>
            )
        }

        return (
            <div className='home-page-foundhouse' onScroll={this.onScroll}>
                     
                        <header className='header' style={showHeader? null : {display:"none"}}>
                            <div className='search-box'>
                                <span className='choose-city' onClick={() => {
                                    this.props.history.push('/city')
                                }}>
                                    {cityInfo.cityName}
                                <i className='iconfont icon-xia'></i>
                                </span>
                                <div onClick={() =>{
                                    this.props.history.push('/search')
                                }}>
                                    <i className='iconfont icon-magnifier'></i>
                                    <span>小区、商圈、地铁站</span>
                                </div>
                                <i className='iconfont icon-kefu'></i>
                            </div>
                        </header>

                <div className='homeBody-content'>

                    <div className='btnEntries'>
                        <div className='btnEntries-item'>
                            <div className='btnEntries-item-imgBox'>
                                <img src={zhengzu} alt="" />
                            </div>
                            <p>找整租</p>
                        </div>
                        <div className='btnEntries-item'>
                            <div className='btnEntries-item-imgBox'>
                                <img src={hezu} alt="" />
                            </div>
                            <p>找合租</p>
                        </div>
                        <div className='btnEntries-item'>
                            <div className='btnEntries-item-imgBox'>
                                <img src={gongyu} alt="" />
                            </div>
                            <p>找公寓</p>
                        </div>
                        <div className='btnEntries-item'>
                            <div className='btnEntries-item-imgBox'>
                                <img src={ditu} alt="" />
                            </div>
                            <p>找地图</p>
                        </div>
                        <div className='btnEntries-item'>
                            <div className='btnEntries-item-imgBox'>
                                <img src={zhongjie} alt="" />
                            </div>
                            <p>找中介</p>
                        </div>
                    </div>

                    <div className='tabEntries'>

                        <div className='tabEntries-box'>
                            <div className='tabEntries-item-left'>
                                <p>交通好房</p>
                                <span>按路程 交通找房</span>
                            </div>
                            <div className='tabEntries-item-right'>
                                <img src={jiaotong} alt="" />
                            </div>
                        </div>

                        <div className='tabEntries-box'>
                            <div className='tabEntries-item-left'>
                                <p>一件租房</p>
                                <span>5s定制品质好房</span>
                            </div>
                            <div className='tabEntries-item-right'>
                                <img src={zufang} alt="" />
                            </div>
                        </div>

                    </div>

                    <div className='mogoSwiper-container'>
                        {banner}
                    </div>

                    <div>
                        {brand}
                    </div>

                </div>

                <div className='room-list-component home-room-list'>

                    <div className='room-filter-wrapper' style={showHeader ? null : { position: "sticky", top: 0 }}>
                        <ul className='filter-options' ref='filterOptions'>

                            <li className='flexbox'>
                                <span>区域</span>
                                <i className='iconfont icon-jiantou'></i>
                            </li>

                            <li className='flexbox'>
                                <span>租金</span>
                                <i className='iconfont icon-jiantou'></i>
                            </li>

                            <li className='flexbox'>
                                <span>方式户型</span>
                                <i className='iconfont icon-jiantou'></i>
                            </li>

                            <li className='flexbox'>
                                <span>筛选</span>
                                <i className='iconfont icon-jiantou'></i>
                            </li>

                            <li>
                                <span></span>
                                <i className='iconfont icon-jiantou_shangxiaqiehuan'></i>
                            </li>
                        </ul>
                    </div>

                    <div className='room-card-wrapper'>
                        {
                            houseInfoData.map((houseInfo, index) => {
                                return (
                                    <div className='room-cart' key={index} onClick={() => {
                                        this.props.history.push(`/detail/:${houseInfo.roomId}`)
                                    }}>
                                        <div className='room-card-flexbox'>
                                            <img src={houseInfo.pictureUrl} alt="" />
                                            <div className='flexbox-item'>
                                                <div className='room-card-title'>
                                                    {houseInfo.title}
                                                </div>
                                                <div className='room-card-info'>
                                                    {houseInfo.subTitle}
                                                </div>
                                                <div className='room-card-info'>
                                                    <i className='iconfont icon-dingwei'></i>
                                                    {houseInfo.location}
                                                </div>
                                                <div className='room-card-lable'>
                                                    {
                                                        houseInfo.labels.map((item, index) => {
                                                            return <img src={item.iconPicUrl} alt="" className='room-card-tag' key={index} />
                                                        })
                                                    }
                                                </div>
                                                <div className='room-card-price'>
                                                    <span className='room-card-price-number'>
                                                        {houseInfo.showPrice}
                                                    </span>
                                                    <span>&nbsp;元/月</span>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                )
                            })
                        }
                        {loadingEL}
                    </div>
                </div>
            </div>
        )
    }

    onScroll = e => {
        //获取过滤栏距离顶部的高
        let filterHeight = this.refs.filterOptions.offsetTop
        // console.log(filterHeight)
        let target = e.target
        // 1. 滚动条滚动的距离
        let scrollTop = target.scrollTop
        // console.log(scrollTop)
        // 2. 滚动容器中内容的整体高度
        let scrollHeight = target.scrollHeight
        // 3. 滚动容器的高度
        let clientHeight = target.clientHeight
        let { pageInfo, loading } = this.state
        // 4. 判断滚动到了底部
        if (
            scrollTop + clientHeight >= scrollHeight - 100 &&
            !loading &&
            this.pageNum <= pageInfo.totalPage
        ) {
            // console.log(this.pageNum)
            // 重新发送请求
            this.gethouseInfoData()
        }

        //判断滚动到了过滤栏的位置
        if (scrollTop > filterHeight) {
            // console.log('滚动距离大于过滤条')
            // console.log(scrollTop)
            // console.log(filterHeight)
            this.setState({
                showHeader: false,
                // fixFilter: this.state.showHeader
            })
        } else {
            // console.log('滚动距离小于过滤条')
            // console.log(scrollTop)
            // console.log(filterHeight)
            this.setState({
                showHeader: true,
                // fixFilter: false
            })
        }
    }

    getbannerData() {
        const { cityInfo } = this.state

        axios.get(`/room-find-web/ali/v2/home?cityId=${cityInfo.cityId}`).then(response => {
            let result = response.data
            // console.log(result.content.banners)
            // console.log(result.content.brands)
            if (result.code === "10000") {
                this.setState({
                    bannerData: result.content.banners,
                    brandData: result.content.brands
                })
            }
        })

    }

    gethouseInfoData() {
        const { cityInfo } = this.state

        this.setState({
            loading: true
        })

        axios.post(`/room-find-web/find/list?cityId=${cityInfo.cityId}&currentPage=${this.pageNum}&serviceVersion=110&showCount=${this.pageSize}`)
            // axios.post('/room-find-web/find/list?',{
            //     params:{
            //         cityId:289,
            //         currentPage:this.pageNum,
            //         serviceVersion:110,
            //         showCount:this.pageSize
            //     }
            // })
            .then(response => {
                let result = response.data
                // console.log(result)
                if (result.code === "10000") {

                    let newhouseInfoData = [...this.state.houseInfoData]

                    newhouseInfoData = newhouseInfoData.concat(result.content.list)

                    console.log(newhouseInfoData)

                    this.setState({
                        houseInfoData: newhouseInfoData,
                        pageInfo: result.content.page,
                        loading: false
                    })

                    this.pageNum += 1
                }
            })
    }  

    componentDidMount() {
        this.getbannerData()
        this.gethouseInfoData()
    }
}

export default FoundHouse

