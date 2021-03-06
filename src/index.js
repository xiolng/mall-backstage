import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import { BrowserRouter as Router } from 'react-router-dom';
import rootReducer from './store';
import { routeList } from './router'; // 路由
import './index.scss';
import * as serviceWorker from './serviceWorker';
import zhCN from 'antd/lib/locale-provider/zh_CN';
import App from '@/App';
import { ConfigProvider } from 'antd'; // 国际化

const store = createStore(rootReducer);

ReactDOM.render(
  <Provider store={store}>
    <Router>
      <ConfigProvider locale={zhCN}>
        <App>{routeList()}</App>
      </ConfigProvider>
    </Router>
  </Provider>
  ,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
