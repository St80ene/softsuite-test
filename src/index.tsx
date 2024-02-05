import React, { StrictMode, Suspense } from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import { store } from './redux/store';
import { ConfigProvider, App as AntApp } from 'antd';
import { IoProvider } from 'socket.io-react-hook';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <StrictMode>
    <BrowserRouter>
      {/* <Suspense fallback={<Loader />}> */}
      <Provider store={store}>
        <AntApp>
          <IoProvider>
            <App />
          </IoProvider>
        </AntApp>
      </Provider>
      {/* </Suspense> */}
    </BrowserRouter>
  </StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
