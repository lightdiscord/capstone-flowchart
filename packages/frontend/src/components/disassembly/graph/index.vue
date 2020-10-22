<template>
    <div class="card">
        <header class="card-header">
            <p class="card-header-title">
                0x{{ offset.toString(16) }}
            </p>
        </header>
        <div class="card-content">
            <csf-graph-svg :offset="offset" />
        </div>
    </div>
</template>

<script>
import { required } from "@/components/configuration/form/utils.js";
import { loading } from "@/components/loading";

export default {
    props: {
        offset: required(Number)
    },
    components: {
        'csf-graph-svg': () => loading(import("./svg.vue"))
    }
}
</script>
