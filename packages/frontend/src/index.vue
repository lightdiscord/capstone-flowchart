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
                <h2 class="title is-4">Flowchart</h2>
                <p class="subtitle is-6">Inspect the chart using your mouse and create view from a given address.</p>
                <csf-graph v-for="offset in views" :offset="offset" :key="offset" />
            </div>
        </div>
    </div>
</template>

<script>
import { mapState, mapMutations } from "vuex";

export default {
    components: {
        'csf-options': () => import("./components/configuration/index.vue"),
        'csf-graph': () => import("./components/graph/index.vue")
    },
    computed: {
        ...mapState(["ready", "errors", "sections", "views"])
    },
    methods: {
        ...mapMutations(["removeError"])
    }
};
</script>
