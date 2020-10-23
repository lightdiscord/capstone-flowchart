import * as state from "./state.js";

export const create = (port) => ({
    port,
    blocs: new Set(),
    state: state.waiting()
});
