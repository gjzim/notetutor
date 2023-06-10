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
