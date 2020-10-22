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

        <csf-disassembly v-if="ready" />
        <csf-options v-else />
    </div>
</template>

<script>
import { mapState, mapMutations } from "vuex";

export default {
    components: {
        'csf-options': () => import("./components/configuration/index.vue"),
        'csf-disassembly': () => import("./components/disassembly/index.vue")
    },
    computed: {
        ...mapState(["ready", "errors"])
    },
    methods: {
        ...mapMutations(["removeError"])
    }
};
</script>
