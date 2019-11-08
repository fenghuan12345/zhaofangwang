import React from 'react'
import { Icon } from 'antd'
import { Input } from 'antd'
import  './index.css'
import axios from 'axios'


const { Search } = Input;

class Searc extends React.Component {

 state={
     list:[],
     inputValue:"",
     keywords:[],
     history:[]



 }
    componentDidMount(){
        axios.get('https://api.mgzf.com/mogoroom-find/v2/find/getHotBusinessArea',{params:{cityId:289,Channel: 9}}).then(response => {
            const result = response.data
            console.log(result)
            this.setState({
                list:result.content.list

            })
            // console.log(this.state.list)
        })
        //  this.goDetail()

    }
    changeValue=(e)=>{
        let value=e.target.value

          this.setState(
            {
                inputValue: value
            }, () =>
        axios.get('https://api.mgzf.com/mogoroom-find/v2/find/fuzzy',{params:{Channel: 9,cityId: 289,searchWord:this.state.inputValue}}).then(response=>{
        const result=response.data
        this.setState(
    {
        keywords:result.content.keywords
         }
          )
                })
            )
    }

    goDetail=(index)=>{
        // let obj=[];
        let luxian = window.localStorage.getItem('wapSearchHistory') ? JSON.parse(window.localStorage.getItem('wapSearchHistory')) :[]

            let obj = {
                "title":this.state.keywords[index].name,
                "colortitle":this.state.keywords[index].name
            }
            let flg = luxian.find((item)=>{
                return item.title.indexOf(obj.title) > -1
            })

            if(!flg){
                luxian.push(
                    obj
                 )

            }
            this.setState(
                {
                    history:luxian
                },()=>{
                    window.localStorage.setItem("wapSearchHistory",JSON.stringify(luxian));
                    console.log(this.state.history[index])
                }
            )
    }
    delete=()=>{
        window.localStorage.clear("wapSearchHistory");
        console.log(this.state.history);
        this.setState(
            {
                history:[]
            }
        )

    }
    tohome=()=>{
        this.props.history.push('./home')
    }

    render(){

        return(
            <div className="all">
                <div className="top">
                <div className="home" onClick={this.tohome}><Icon type="home" /></div>
             <div className="found">
                 <form>
                 <span className="top-l"><Icon type="search" onClick={this.foundValue} /></span>
                 <input className="top-f" placeholder="小区、商圈、地铁站" value={this.state.inputValue} onChange={this.changeValue}>
                 </input>
                 <span className="close" ><Icon type="close-circle" theme="filled"/></span>
                 </form>

             </div>
                </div>
                  {/* 头部结束 */}
             <div className="old" style={this.state.inputValue? {display:'none'}:{display:'block'}}>
             <div className="nav">
                    <span>热门标签</span>
                    <div>
                        <ul>
                            {
                                this.state.list.map((item,index)=>{
                                    return(
                                    <li key={index}>{item.paraName}</li>
                                    )
                                })
                            }
                        </ul>

                    </div>


                </div>
                  {/* 导航结束 */}

                <div className="sear-record" style={window.localStorage.getItem('wapSearchHistory')? {display:'none'}:{display:'block'}}>无搜索历史记录</div>
             </div>
                <div className="sear-history" style={this.state.inputValue? {display:'none'}:{display:'block'}}>
                    <div className="garbage" style={window.localStorage.getItem('wapSearchHistory')? {display:'block'}:{display:'none'}} >
                    <span className="garbage1">历史记录</span>
                    <span  className="garbage2" onClick={() => this.delete()}><Icon type="delete" theme="filled" /></span>
                    </div>

                     <ul>
                         {

                           window.localStorage.getItem('wapSearchHistory') && JSON.parse(window.localStorage.getItem("wapSearchHistory")).map((item,index)=>{
                                 return(
                                 <li key={index}>{item.title}</li>
                                 )
                             }
                             )
                         }
                     </ul>
                </div>
               <div className="adress">
                   <ul>
                   {
                        this.state.keywords.map((item,index)=>{
                            return(
                            <li key={index} onClick={() => this.goDetail(index)} id={index}><Icon type="environment" theme="filled" />{item.name}</li>
                            )
                        })
                    }
                   </ul>
               </div>


                </div>
            )
    }

}

export default Searc