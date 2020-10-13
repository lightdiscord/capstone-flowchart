import Vue from "vue";
import Vuex from "vuex";
import { worker } from "@capstone-flowchart/capstone-engine"

Vue.use(Vuex);

export const store = new Vuex.Store({
    state: {
        archs: null,
        modes: null,
        ready: false,
        errors: [],
        sections: {}
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
        },

        finished_for(state, data) {
            console.log("finished_for", data);
        },

        new_section(state, data) {
            Vue.set(state.sections, data.offset, data)
        }
    },

    actions: {
        startDisassembler(context, { arch, mode, offset, bytes }) {
            console.log("Starting disassembler", arch, mode);
            worker.port.postMessage({ type: "start_disassembler", data: { arch, mode, offset, bytes } });
        }
    }
});

worker.port.addEventListener("message", (event) => {
    const { type, data } = event.data;

    store.commit(type, data);
});

worker.addEventListener("error", (event) => {
    console.error("Worker error happened", event);
});

worker.port.start();
