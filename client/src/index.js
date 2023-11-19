import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
// 리덕스 툴킷
import { Provider } from "react-redux";
import store from "./redux/store";
//리액트 쿼리
import { QueryClient, QueryClientProvider } from "react-query";
//리액트 라우터
import { BrowserRouter } from "react-router-dom";

const queryClient = new QueryClient();

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <QueryClientProvider client={queryClient}>
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </QueryClientProvider>
    </Provider>
  </React.StrictMode>
);
