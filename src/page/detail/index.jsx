import React from "react";

//引入swiper 轮播图组件
import Swiper from "swiper/js/swiper";
import "swiper/css/swiper.css";

import axios from "axios";

//引入react-redux 中的 connect方法
import { connect } from "react-redux";

import "./index.scss";

class Detail extends React.Component {
  state = {
    modal1Visible: true,
    //弹出提示框
    isShow: false,
    //房源描述 展开更多
    fyIsShow: true,
    //房源配置 展开更多
    fypzIsShow: true
  };

  static getDerivedStateFromProps(props, state) {
    //轮播图列表
    let pictures = [];
    pictures =
      props.detail[1] &&
      props.detail[1].content.basicInfo.pictureGroupList[0].pictures;

    //同小区房源列表
    let sameList = [];
    sameList =
      props.detail[0] && props.detail[0].content.sameCommunityRooms.list;

    //相似房源列表
    let similarList = [];
    similarList = props.detail[0] && props.detail[0].content.similarRooms.list;

    //roomInfo
    let basicInfo = {};
    basicInfo = props.detail[1] && props.detail[1].content.basicInfo;
    return {
      pictures,
      sameList,
      similarList,
      basicInfo
    };
  }

  componentDidMount() {
    //实例化swiper轮播图
    this.mySwiper = new Swiper(".swiper-container", {
      pagination: {
        el: ".swiper-pagination",
        type: "fraction"
      },
      navigation: {
        nextEl: ".swiper-button-next",
        prevEl: ".swiper-button-prev"
      }
    });

    //根据路由参数 获取 商品id  发送axios请求
    this.props.getDetail(11);
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevState.pictures !== this.state.pictures) {
      this.mySwiper.update();
    }
  }

  detail = [];
  render() {
    console.log(this.state.sameList);
    console.log(this.state.similarList);
    console.log(this.state.basicInfo);
    return (
      <div className="page-detail">
        {/* 遮罩层 */}
        <div
          className="mask"
          style={{
            display: this.state.isShow ? "block" : "none"
          }}
        ></div>
        {/* 轮播图 */}
        <div className="swiper-container">
          <div className="swiper-wrapper">
            {this.state.pictures &&
              this.state.pictures.map(pic => {
                return (
                  <div className="swiper-slide" key={pic.path}>
                    <img src={pic.path} alt="房屋图片" />
                  </div>
                );
              })}
          </div>
          {/* <!-- 如果需要分页器 --> */}
          <div className="swiper-pagination"></div>

          {/* <!-- 如果需要导航按钮 --> */}
          <div className="swiper-button-prev"></div>
          <div className="swiper-button-next"></div>
        </div>
        <div className="main">
          <p id="title">
            {this.state.basicInfo &&
              this.state.basicInfo.roomIntroAttrDTO.mainTitle}
          </p>
          <div className="detailInfo">
            <div
              onClick={() => {
                this.setState({
                  isShow: true
                });
              }}
            >
              <p className="top">1300/月起</p>
              <p className="bottom">
                付一 <span>明细</span>
              </p>
            </div>
            <div>
              <p className="top">1300/月起</p>
              <p className="bottom">户型 </p>
            </div>
            <div>
              <p className="top">1300/月起</p>
              <p className="bottom">面积 </p>
            </div>

            <div
              className="tips"
              style={{
                display: this.state.isShow ? "block" : "none"
              }}
            >
              <button
                onClick={() => {
                  this.setState({
                    isShow: false
                  });
                }}
              >
                X
              </button>
              <h1>明细</h1>
              <p>付一:hahahahaha</p>
              <p>付一:hahahahaha</p>
            </div>
          </div>
          {/* 基本信息 */}
          <div className="roomdetail">
            <ul className="ul1">
              {this.state.basicInfo &&
                this.state.basicInfo.roomLabels.map((item, index) => {
                  return <li key={index}>{item}</li>;
                })}
            </ul>
            <ul className="ul2">
              <li>
                楼层: <span>7/18</span>层
              </li>
              <li>
                电梯: <span>有</span>
              </li>
              <li>
                编号： <span>K0101226713C</span>
              </li>
            </ul>
          </div>

          {/* 地理位置 */}
          <div className="map">
            <h1>地理位置</h1>
            <img
              src="https://restapi.amap.com/v3/staticmap?location=121.677121,31.291145&zoom=13&size=670*200&markers=mid,,:121.677121,31.291145&key=8b49545a40c08530a322f4d7723c9e1b"
              alt="map"
            />
            <p>
              <i className="iconfont">icon</i>
              <span>某某路389</span>
            </p>
            <p>
              <i className="iconfont">icon</i>
              <span>位于曹路附近</span>
            </p>
          </div>

          {/* 房源配置 */}
          <div className="roomconfig">
            <ul
              className="list"
              style={{
                height: this.state.fypzIsShow ? "150px" : "auto"
              }}
            >
              <li>
                <img
                  src="https://assets.mgzf.com/appimg/47ef3894f544a7c35a5e39882dbae4bf.png"
                  alt=""
                />
                空调
              </li>
              <li>
                <img
                  src="https://assets.mgzf.com/appimg/dd17edaf51477789ea384b4803f56a14.png"
                  alt=""
                />
                床
              </li>
              <li>
                <img
                  src="https://assets.mgzf.com/appimg/4aedd513b471f916713b73e59e272372.png"
                  alt=""
                />
                书桌
              </li>
              <li>
                <img
                  src="https://assets.mgzf.com/appimg/954e093ec94fbb852a7a0b05cdc2f349.png"
                  alt=""
                />
                衣柜
              </li>
              <li>
                <img
                  src="https://assets.mgzf.com/appimg/21d29135731415831a09b6214c36037e.png"
                  alt=""
                />
                wifi
              </li>
              <li>
                <img
                  src="https://assets.mgzf.com/appimg/e2f739c0f0c4d513d7bcc81ff00ef686.png"
                  alt=""
                />
                热水器
              </li>
              <li>
                <img
                  src="https://assets.mgzf.com/appimg/bb6a9d2c78f97f13c5a0ddeab8a14072.png"
                  alt=""
                />
                洗衣机
              </li>
              <li>
                <img
                  src="https://assets.mgzf.com/appimg/9aa2d816ce6885a78b668a0b9e6fc139.png"
                  alt=""
                />
                冰箱
              </li>
              <li>
                <img
                  src="https://assets.mgzf.com/appimg/5a150d8b4e4299221763ec1d18589db3.png"
                  alt=""
                />
                微波炉
              </li>
              <li>
                <img
                  src="https://assets.mgzf.com/appimg/d35976000ba5e132d1b3e2f481633d2e.png"
                  alt=""
                />
                油烟机
              </li>
              <li>
                <img
                  src="https://assets.mgzf.com/appimg/7f4026117fb799182a38537a3c7b9bb5.png"
                  alt=""
                />
                阳台
              </li>
              <li>
                <img
                  src="https://assets.mgzf.com/appimg/9b8934192c73831cf5e2163bfdca6b72.png"
                  alt=""
                />
                卫生间
              </li>
              <li>
                <img
                  src="https://assets.mgzf.com/appimg/48c97292cc4d617cfccbd9fb40a42e48.png"
                  alt=""
                />
                电视
              </li>
              <li>
                <img
                  src="https://assets.mgzf.com/appimg/2e8fd37917fab83cd16ad56a75cc7ee8.png"
                  alt=""
                />
                燃气灶
              </li>
              <li>
                <img
                  src="https://assets.mgzf.com/appimg/fe3327c811fb3a82519ab82027e7f52f.png"
                  alt=""
                />
                电磁炉
              </li>
              <li>
                <img
                  src="https://assets.mgzf.com/appimg/2a2c090a35605d726ffdb84b9f5c6971.png"
                  alt=""
                />
                沙发
              </li>
            </ul>
            <p
              onClick={() => {
                this.setState({
                  fypzIsShow: !this.state.fypzIsShow
                });
              }}
            >
              {this.state.fypzIsShow ? "更多" : "收起"}
            </p>
          </div>

          {/* 房源描述 */}
          <div className="roomfy">
            <h1>房源描述</h1>
            <li
              style={{
                height: this.state.fyIsShow ? "125px" : "auto"
              }}
            >
              {this.state.basicInfo && this.state.basicInfo.roomIntroAttrDTO.roomDesc}
            </li>
            <p
              className="more"
              onClick={() => {
                this.setState({
                  fyIsShow: !this.state.fyIsShow
                });
              }}
            >
              {this.state.fyIsShow ? "更多" : "收起"}
            </p>
          </div>

          {/* 室友信息 */}
          <div className="roommate">
            <h1>室友信息</h1>
            <ul>
              <li>当前房源</li>
              <li>当前房源</li>
              <li>当前房源</li>
              <li>当前房源</li>
              <li>当前房源</li>
              <li>当前房源</li>
              <li>当前房源</li>
              <li>当前房源</li>
            </ul>
          </div>

          <div className="qingke">
            <div className="top">
              <div className="left">
                <img
                  src="https://image.mgzf.com/mogoroom/2018-08/mogoBrand/3/0/2002293/2002293_1535513770065.jpg"
                  alt="青客"
                />
                <span>青客公寓</span>
              </div>
              <div className="tel">立即联系</div>
            </div>
            <div className="middle">
              <p>
                <span>品牌星级:</span>
                <i className="iconfont">❤</i>
                <i className="iconfont">❤</i>
                <i className="iconfont">❤</i>
                <i className="iconfont">❤</i>
                <i className="iconfont">❤</i>
              </p>
            </div>
          </div>

          <div className="same">
            <h1>同小区房源</h1>
            <ul>
              {this.state.sameList &&
                this.state.sameList.map(item => {
                  return (
                    <li key={item.roomId}>
                      <img src={item.pictureUrl} alt="" />
                      <h2>{item.title}</h2>
                      <h3>{item.subTitle}</h3>
                      <h4>{item.showPrice}元/月</h4>
                    </li>
                  );
                })}
            </ul>
          </div>

          <div className="like">
            <h1>相似房源</h1>
            <ul>
              {this.state.similarList &&
                this.state.similarList.map(item => {
                  return (
                    <li key={item.roomId}>
                      <img src={item.pictureUrl} alt="" />
                      <h2>{item.title}</h2>
                      <h3>{item.subTitle}</h3>
                      <h4>{item.showPrice}元/月</h4>
                    </li>
                  );
                })}
            </ul>
          </div>
        </div>
        {/* 底部 */}
        <div className="footer">
          <p>
            <i className="iconfont">icon</i>
            <span>店铺</span>
          </p>
          <div className="order">预约看房</div>
          <div className="tel">立即联系</div>
        </div>
      </div>
    );
  }
}

export default connect(
  state => {
    return {
      detail: state.detail
    };
  },
  dispatch => {
    return {
      getDetail(value) {
        axios.get("http://localhost:9090/server").then(response => {
          const result = response.data;
          dispatch({
            type: "GETDETAIL",
            value: result
          });
        });
      }
    };
  }
)(Detail);
