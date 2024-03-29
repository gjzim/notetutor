import React from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App";
import { setupStore } from "./store";
import { Provider } from "react-redux";

const container = document.getElementById("app");
const root = createRoot(container!);
const store = setupStore();

root.render(
    <React.StrictMode>
        <Provider store={store}>
            <App />
        </Provider>
    </React.StrictMode>
);

interface CypressWithStore extends Cypress.Cypress {
    store?: typeof store;
}

declare global {
    interface Window {
        Cypress?: CypressWithStore;
    }
}

if (typeof window !== "undefined" && window.Cypress) {
    window.Cypress.store = store;
}
