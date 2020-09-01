<template>
    <div>
        <section class="hero">
            <div class="hero-body">
                <div class="container">
                    <h1 class="title is-1">Capstone Flowchart</h1>
                </div>
            </div>
        </section>

        <csf-options></csf-options>

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
import Options from "./components/options/index.vue"

export default {
    components: {
        'csf-options': Options
    }
};
</script>
