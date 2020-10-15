<template>
    <div class="section">
        <div class="container">
            <h2 class="title is-4">Configuration</h2>
            <p class="subtitle is-6">Choose an arch, a mode, an offset and specify the program bytes.</p>

            <p v-if="isLoading">
                The capstone engine is currently loading, please wait to see available modes and archs.
            </p>

            <csf-form v-else :archs="archs" :modes="modes" @submit="onSubmit" />
        </div>
    </div>
</template>

<script>
import Form from "./form/index.vue";

import { mapState } from "vuex";

export default {
    computed: {
        ...mapState(["archs", "modes", "isLoading"]),
    },
    methods: {
        onSubmit({ arch, mode, offset, bytes }) {
            this.$store.dispatch("startDisassembler", { arch, mode, offset, bytes });
        }
    },
    components: {
        'csf-form': Form
    }
}
</script>
