export const message = (type) => (data) => (port) => {
    port.postMessage({ type, data });
};
