import React from "react";

import { Button, Form, Input, Icon, message } from "antd";

import { Link } from 'react-router-dom'

//引入register页面css样式
import "./index.scss";
import axios from "axios";

class Register extends React.Component {
  state = {
    loadingFlag: false,
    randNum: ""
  };

  getRandNum = () => {
    const num = Math.random()
      .toString()
      .slice(-4);
    this.setState({
      randNum: num
    });
  };

  handleRegister = e => {
    //取消默认点击事件
    e.preventDefault();
    //开启loading状态
    this.props.form.validateFields((err, values) => {
      //信息填写无误，并且验证码正确
      this.setState({
        loadingFlag: true
      });
      if (!err && values.yzm === this.state.randNum) {
        axios
          .get("http://localhost:9090/user", {
            params: {
              user: values.username
            }
          })
          .then(response => {
            const result = response.data;
            if (result.length > 0) {
              message.error("账号已被注册！");
            } else
              axios
                .post("http://localhost:9090/user", {
                  user: values.username,
                  password: values.password
                })
                .then(success => {
                  message.success("注册成功~");
                });
            //关闭loading状态
            this.setState({
              loadingFlag: false
            });
            //刷新验证码
            this.getRandNum()
          });
      } else {
        message.error("请正确填写表单信息！");
        setTimeout(() => {
            this.setState({
                loadingFlag:false
            })
        }, 1500);
      }
    });
  };

  componentDidMount() {
    this.getRandNum();
  }
  render() {
    const { getFieldDecorator } = this.props.form;
    return (
      <div className="page-register">
        <img
          src="https://assets.mgzf.com/h5-static/images/logo@2x.png"
          alt="logo"
          id="logo"
        />
        <Form className="register-form" onSubmit={this.handleRegister}>
          <Form.Item>
            {getFieldDecorator("username", {
              rules: [{ required: true, message: "用户名不能为空!" },{
                  min:2,max:6,message:'用户名长度为2-6字符之间'
              }]
            })(
              <Input
                size="large"
                prefix={
                  <Icon type="user" style={{ color: "rgba(0,0,0,.25)" }} />
                }
                placeholder="请输入用户名"
              />
            )}
          </Form.Item>

          <Form.Item>
            {getFieldDecorator("password", {
              rules: [{ required: true, message: "密码不能为空!" }]
            })(
              <Input
                size="large"
                prefix={
                  <Icon type="lock" style={{ color: "rgba(0,0,0,.25)" }} />
                }
                placeholder="请输入密码"
                type="password"
              />
            )}
          </Form.Item>

          <Form.Item>
            {getFieldDecorator("yzm", {
              rules: [
                {
                  required: true,
                  message: "请输入验证码!"
                },
                {
                  max: 4,
                  min: 4,
                  message: "验证码为4位数字"
                }
              ]
            })(
              <Input
                id="yzm"
                style={{ borderRadius: 0 }}
                size="large"
                placeholder="请输入验证码"
                type="text"
              />
            )}

            <Button onClick={this.getRandNum}>{this.state.randNum}</Button>
          </Form.Item>

          <Form.Item>
            <Button
              shape="round"
              size="large"
              htmlType="submit"
              type="primary"
              block
              loading={this.state.loadingFlag}
            >
              注册
            </Button>
          </Form.Item>
        </Form>
        <p id="login">
          已有账号?去<Link to="/login">登录</Link>~
        </p>
      </div>
    );
  }
}

export default Form.create()(Register);
