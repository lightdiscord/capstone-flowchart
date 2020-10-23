import Vue from "vue";
import Vuex from "vuex";
import { worker } from "@capstone-flowchart/capstone-engine"
import * as send from "@capstone-flowchart/capstone-engine/src/messages/client/send";
import { match } from "@capstone-flowchart/capstone-engine/src/messages/server";

Vue.use(Vuex);

export const store = new Vuex.Store({
    state: {
        archs: null,
        modes: null,
        ready: false,
        errors: [],
        sections: {},
        views: [],
        isLoading: true
    },

    mutations: {
        options(state, { archs, modes }) {
            state.isLoading = false;
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

        finished_for(state, { offset }) {
            state.views.push(offset);
        },

        new_section(state, data) {
            Vue.set(state.sections, data.offset, data)
        }
    },

    actions: {
        startDisassembler(context, { arch, mode, offset, bytes }) {
            send.start({ arch, mode, offset, bytes })(worker.port);
        },
        disassemble(context, { offset }) {
            send.disassemble({ offset })(worker.port);
        }
    }
});

worker.port.addEventListener("message", ({ data: message }) => {
    match(message)({
        error(error) {
            store.commit("error", error);
        },
        options({ archs, modes }) {
            store.commit("options", { archs, modes });
        },
        ready() {
            store.commit("ready", true);
        },
        bloc({ offset, instructions, next }) {
            store.commit("new_section", { offset, instructions, next });
        },
        view(offset) {
            store.commit("finished_for", { offset });
        },
        default(_, type) {
            console.warn("Received an unhandled message of type %s from worker.", type);
        },
    });
});

worker.addEventListener("error", (event) => {
    console.error("An error occured inside the worker", event);
});

worker.port.start();
