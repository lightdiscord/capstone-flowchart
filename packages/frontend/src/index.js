import Vue from "vue";
import { store } from "./store/index.js";

import "bulma/bulma.sass"
import "./config/bulma.js";
import "./config/font-awesome.js";

import Index from "./index.vue";

export const vue = new Vue({
    el: "#app",
    render: h => h(Index),
    store
});
