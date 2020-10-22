import * as state from "./state.js";

export const createSession = (port) => ({
    port,
    blocs: new Set(),
    state: state.waiting()
});
