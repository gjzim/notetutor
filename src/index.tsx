import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import { setupStore } from "./store";
import { Provider } from "react-redux";

const store = setupStore();

ReactDOM.render(
    <React.StrictMode>
        <Provider store={store}>
            <App />
        </Provider>
    </React.StrictMode>,
    document.getElementById("app")
);
