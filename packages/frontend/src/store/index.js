import Vue from "vue";
import Vuex from "vuex";
import { worker } from "@capstone-flowchart/capstone-engine"

Vue.use(Vuex);

export const store = new Vuex.Store({
    state: {
        archs: null,
        modes: null
    },

    mutations: {
        options(state, { archs, modes }) {
            state.archs = archs;
            state.modes = modes;
        }
    }
});

worker.port.addEventListener("message", (event) => {
    const { type, data } = event.data;

    store.commit(type, data);
});

worker.port.start();
