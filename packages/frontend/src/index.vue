<template>
    <div>
        <section class="hero">
            <div class="hero-body">
                <div class="container">
                    <h1 class="title is-1">Capstone Flowchart</h1>
                </div>
            </div>
        </section>

        <csf-options />

        <footer class="footer">
            <div class="content has-text-centered">
                <p>
                <strong>Capstone Flowchart</strong> made by <a href="https://arnaud.sh">LightDiscord</a> and <a href="https://github.com/lightdiscord/capstone-flowchart">open-source</a>.
                </p>
            </div>
        </footer>
    </div>
</template>

<script>
import { RESPONSES } from "@capstone-flowchart/capstone-engine/src/messages.js";
import Status from "./components/setup/status/index.vue";
import Options from "./components/options/index.vue";
import * as capstone from "@capstone-flowchart/capstone-engine/src/index.js";
import { mapState } from "vuex";

export default {
    components: {
        'csf-setup-status': Status,
        'csf-options': Options
    },
    computed: {
        ...mapState(["archs", "modes"])
    }
};
</script>
