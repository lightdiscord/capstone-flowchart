<template>
    <div>
        <section class="hero">
            <div class="hero-body">
                <div class="container">
                    <h1 class="title is-1">Capstone Flowchart</h1>
                    <p class="subtitle is-3">Source code available on <a href="">GitHub</a>.</p>
                </div>
            </div>
        </section>

        <section class="section" v-if="errors.length > 0">
            <div class="container">
                <div v-for="(error, index) in errors" class="notification is-danger is-light">
                  <button class="delete" @click="removeError(index)"></button>
                  {{ error }}
                </div>
            </div>
        </section>

        <csf-options v-if="!ready" />
        <div v-else>
            <div v-for="[offset, items] in Object.entries(sections)">
                <p>Section: {{ offset }}</p>
                <ul>
                    <li v-for="{ type, data } in items">{{ type }}: {{ data }}</li>
                </ul>
            </div>
        </div>
    </div>
</template>

<script>
import { RESPONSES } from "@capstone-flowchart/capstone-engine/src/messages.js";
import Status from "./components/setup/status/index.vue";
import Options from "./components/options/index.vue";
import * as capstone from "@capstone-flowchart/capstone-engine/src/index.js";
import { mapState, mapMutations } from "vuex";

export default {
    components: {
        'csf-setup-status': Status,
        'csf-options': Options
    },
    computed: {
        ...mapState(["ready", "errors", "sections"])
    },
    methods: {
        ...mapMutations(["removeError"])
    }
};
</script>
