import React from "react";
import { Button,Form,Input,Icon,message} from "antd";
import { Link } from 'react-router-dom'
//引入login页面css样式
import './index.scss'
import axios from 'axios'


class Login extends React.Component {
    state = {
        loadingFlag:false
    }

    handleLogin = (e) => {
        //阻止默认提交事件
        e.preventDefault()

        this.props.form.validateFields((err,values) => {

          //如果表单验证通过
          if(!err){
            const {username,password } = values
            console.log(username,password)
            //打开表单loading开关
            this.setState({
              loadingFlag:true
            })
            //发送axios请求后台数据  判断用户信息是否正确
            axios.get('http://localhost:9090/user',{
              params:{
                user:username,
                password:password
              }
            }).then(response => {
              const result = response.data
              console.log(result)
              //得到的result是个数组 要想获得当前用户信息  应该 用result[0]读取
             if(result.length !== 0 && result[0].password.toString() === password){
               console.log('登录成功')
               //登录成功    1.本地写入localStorage
              window.localStorage.setItem('userInfo',JSON.stringify({
                username:values.username
              }))

              //2.关闭loading状态
              this.setState({
                loadingFlag:false
              })

              //3.跳转到想去的页面(如果没有 则根据路由规则重定向到home页面)
              const search = this.props.location.search
              const path = search ? search.split('?')[1].split('=')[1] : '/home'
              console.log(path)
               this.props.history.replace(path)
             }else{
              message.error('用户名或者密码有误')
              setTimeout(() => {
                this.setState({
                  loadingFlag:false
                })
              }, 1500);
             }
            })
          }
        })

    }
    render() {
        const { getFieldDecorator } = this.props.form
        return (

          <div className='page-login'>
              <img src="https://assets.mgzf.com/h5-static/images/logo@2x.png" alt="logo" id='logo'/>
           <Form  className="login-form" onSubmit={this.handleLogin}>
              <Form.Item>
                {getFieldDecorator('username', {
                  rules: [{ required: true, message: '用户名不能为空!' }],
                })(
                  <Input
                  size='large'
                    prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />}
                    placeholder="请输入用户名"
                  />,
                )}
              </Form.Item>

              <Form.Item>
                {getFieldDecorator('password', {
                  rules: [{ required: true, message: '密码不能为空!' }],
                })(
                  <Input
                  size='large'
                    prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />}
                    placeholder="请输入密码"
                    type='password'
                  />,
                )}
              </Form.Item>

              <Form.Item>
               <Button shape='round' size='large' htmlType='submit' type='primary' block loading={this.state.loadingFlag}>登录</Button>
              </Form.Item>


            </Form>
            <p id='register'>还没有账号？快<Link to="/register">注册</Link>一个吧！</p>
          </div>
        );
    }
};

export default Form.create()(Login)
