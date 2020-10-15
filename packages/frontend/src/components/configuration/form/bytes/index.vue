<template>
    <div class="field">
        <label class="label" for="bytes">Bytes to disassemble</label>

        <div class="tabs">
            <ul>
                <li v-for="tab in tabs" :class="{ 'is-active': tab.component === component }">
                    <a @click="view(tab.component)">
                        <span class="icon is-small">
                            <font-awesome-icon :icon="tab.icon" />
                        </span>
                        <span>{{ tab.name }}</span>
                    </a>
                </li>
            </ul>
        </div>

        <component :is="component" ref="component" @validity="onValidity" />
    </div>
</template>

<script>
import BytesFile from "./file.vue";
import HexdumpFile from "./hexdump.vue";
import { validityWatcher } from "../utils.js";

export default {
    data: () => ({
        component: 'csf-form-bytes-file',
        tabs: [
            {
                name: 'File',
                icon: 'file',
                component: 'csf-form-bytes-file'
            },
            {
                name: 'Hexdump',
                icon: 'pencil-alt',
                component: 'csf-form-bytes-hexdump'
            }
        ],
        isValid: false
    }),
    methods: {
        view(component) {
            this.component = component;
        },
        onValidity(validity) {
            this.isValid = validity;
        },
        fetchBytes() {
            return this.$refs.component.fetchBytes();
        }
    },
    components: {
        'csf-form-bytes-file': BytesFile,
        'csf-form-bytes-hexdump': HexdumpFile,
    },
    watch: validityWatcher
}
</script>
