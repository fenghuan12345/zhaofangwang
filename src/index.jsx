import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'

import App from './app.jsx'

//引入仓库数据
import Store from './store/index'

ReactDOM.render(<Provider store={Store}><App/></Provider>, document.getElementById('root'))