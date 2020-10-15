import Vue from "vue";
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'

import { library } from '@fortawesome/fontawesome-svg-core'
import { faUpload, faFile, faPencilAlt } from '@fortawesome/free-solid-svg-icons'

library.add(faUpload);
library.add(faPencilAlt);
library.add(faFile);

Vue.component('font-awesome-icon', FontAwesomeIcon);
