import Vue from "vue";
import * as capstone from "@capstone-flowchart/capstone-engine";
import "bulma/bulma.sass"

import Index from "./index.vue";

console.log("Hello, world!");

export const vue = new Vue({
    el: "#app",
    render: h => h(Index)
});
