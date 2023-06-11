import { render, RenderOptions } from "@testing-library/react";
import { Provider } from "react-redux";
import { PropsWithChildren } from "react";
import { PreloadedState } from "@reduxjs/toolkit";
import { AppState, AppStore, setupStore } from "../store";

export function addRootAndOverlaysElementsInDom() {
    // Set up a DOM element as a render target
    const rootEl = document.createElement("div");
    rootEl.setAttribute("id", "root");
    const overlays = document.createElement("aside");
    overlays.setAttribute("id", "overlays");
    rootEl.appendChild(overlays);
    document.body.appendChild(rootEl);
}

export function removeRootElementFromDom() {
    // eslint-disable-next-line
    document.getElementById("root")!.remove();
}

interface ExtendedRenderOptions extends Omit<RenderOptions, "queries"> {
    preloadedState?: PreloadedState<AppState>;
    store?: AppStore;
}

export function renderWithProviders(
    ui: React.ReactElement,
    { preloadedState = {}, store = setupStore(preloadedState), ...renderOptions }: ExtendedRenderOptions = {}
) {
    function Wrapper({ children }: PropsWithChildren<{}>): JSX.Element {
        return <Provider store={store}>{children}</Provider>;
    }

    return { store, ...render(ui, { wrapper: Wrapper, ...renderOptions }) };
}
