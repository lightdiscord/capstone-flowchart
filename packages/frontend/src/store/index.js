import Vue from "vue";
import Vuex from "vuex";
import { worker } from "@capstone-flowchart/capstone-engine"

Vue.use(Vuex);

export const store = new Vuex.Store({
    state: {
        archs: null,
        modes: null,
        ready: false,
        errors: []
    },

    mutations: {
        options(state, { archs, modes }) {
            state.archs = archs;
            state.modes = modes;
        },

        ready(state, ready) {
            state.ready = ready;
        },

        error(state, error) {
            state.errors.push(error);
        },

        removeError(state, index) {
            state.errors.splice(index, 1);
        }
    },

    actions: {
        startDisassembler(context, { arch, mode, offset, bytes }) {
            console.log("Starting disassembler");
            worker.port.postMessage({ type: "start_disassembler", data: { arch, mode, offset, bytes } });
        }
    }
});

worker.port.addEventListener("message", (event) => {
    const { type, data } = event.data;

    store.commit(type, data);
});

worker.port.start();
