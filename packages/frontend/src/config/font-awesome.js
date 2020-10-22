import Vue from "vue";
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'

import { library } from '@fortawesome/fontawesome-svg-core'
import { faUpload, faFile, faPencilAlt, faSearch } from '@fortawesome/free-solid-svg-icons'

library.add(faUpload);
library.add(faPencilAlt);
library.add(faFile);
library.add(faSearch);

Vue.component('font-awesome-icon', FontAwesomeIcon);
