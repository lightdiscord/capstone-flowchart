<template>
    <div>
        <div class="file has-name">
            <label class="file-label">
                <input class="file-input" type="file" id="bytes" ref="bytes" @change="onFileChange">
                <span class="file-cta">
                    <span class="file-icon">
                        <font-awesome-icon icon="upload" />
                    </span>
                    <span class="file-label">
                        Choose a file…
                    </span>
                </span>
                <span class="file-name">
                    <template v-if="files.length == 0">No file selected</template>
                    <template v-else-if="files.length == 1">{{ files[0].name }}</template>
                    <template v-else>Too many files</template>
                </span>
            </label>
        </div>
        <p class="help">It must be the bytes of the part you want to disassemble, not an executable directly.</p>
    </div>
</template>

<script>
import { validityWatcher } from "../utils.js";

export default {
    data: () => ({
        files: []
    }),
    computed: {
        isValid() {
            return this.files.length == 1;
        }
    },
    methods: {
        onFileChange() {
            this.files = [...this.$refs.bytes.files];
        },
        async fetchBytes() {
            return new Uint8Array(await this.files[0].arrayBuffer());
        }
    },
    watch: validityWatcher
}
</script>
