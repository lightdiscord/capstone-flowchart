<template>
    <div>
        <section class="hero">
            <div class="hero-body">
                <div class="container">
                    <h1 class="title">Capstone flowchart</h1>
                    <p class="subtitle">Use capstone to disassemble some bytes and follow the assembly flow.</p>
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
        <div class="section" v-else>
            <div class="container">
                <div class="tabs is-boxed is-toggle">
                    <ul>
                        <li class="is-active" v-for="offset in views">
                            <a><span>0x{{ offset.toString(16) }}</span></a>
                        </li>
                    </ul>
                </div>
                <csf-graph v-for="offset in views" :offset="offset" :key="offset" />
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
import Graph from "./components/graph/index.vue";

export default {
    components: {
        'csf-setup-status': Status,
        'csf-options': Options,
        'csf-graph': Graph
    },
    computed: {
        ...mapState(["ready", "errors", "sections", "views"])
    },
    methods: {
        ...mapMutations(["removeError"])
    }
};
</script>
