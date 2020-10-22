<template>
    <div class="section">
        <div class="container">
            <h2 class="title is-4">Flowchart</h2>
            <p class="subtitle is-6">Inspect the chart using your mouse and create view from a given address.</p>

            <form class="field" @submit.prevent="onSubmit">
                <div class="field has-addons">
                    <div class="control">
                        <input class="input" type="text" v-model="offsetText" placeholder="Start from a given address">
                    </div>
                    <div class="control">
                        <button type="submit" class="button is-info">
                            <span class="icon">
                                <font-awesome-icon icon="search" />
                            </span>
                            <span>Analyze</span>
                        </button>
                    </div>
                </div>
                <p class="help">The offset is equals to 0x{{parseInt(offsetText).toString(16)}}</p>
            </form>

            <div class="tabs">
                <ul>
                    <li 
                 :class="{'is-active': offset === view || (view === null && i === 0)}"
                 v-for="(offset, i) in views">
                        <a @click="setView(offset)">0x{{ offset.toString(16) }}</a>
                    </li>
                </ul>
            </div>

            <csf-graph v-for="offset in views" :offset="offset" :key="offset" />
        </div>
    </div>
</template>

<script>
import { mapState } from "vuex";
import Graph from "./graph/index.vue";

export default {
    components: {
        'csf-graph': Graph
    },
    data: () => ({
        view: null,
        offsetText: ""
    }),
    methods: {
        setView(offset) {
            this.view = offset;
        },
        onSubmit() {
            const offset = parseInt(this.offsetText);
            this.$store.dispatch('disassemble', { offset });
        }
    },
    computed: {
        ...mapState(["views"])
    }
}
</script>
