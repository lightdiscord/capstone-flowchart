import Vue from "vue";
import { store } from "./store/index.js";
import { library } from '@fortawesome/fontawesome-svg-core'
import { faUpload, faFile, faPencilAlt } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'

import "bulma/bulma.sass"

import Index from "./index.vue";

library.add(faUpload);
library.add(faPencilAlt);
library.add(faFile);

Vue.component('font-awesome-icon', FontAwesomeIcon);

export const vue = new Vue({
    el: "#app",
    render: h => h(Index),
    store
});
