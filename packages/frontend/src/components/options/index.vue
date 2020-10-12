<template>
    <div class="section">
        <div class="container">
            <h2 class="title">Configuration</h2>
            <p class="subtitle">Choose an arch, a mode, an offset and specify the program bytes to generate a flowchart</p>
            <p>The capstone engine is currently loading, please wait to see available modes and archs.</p>
            <form @submit.prevent="onSubmit">
                <div class="field">
                    <label class="label" for="arch">Arch</label>
                    <div class="control">
                        <div class="select" :class="{ 'is-loading': loading }">
                            <select v-model="arch" id="arch" :disabled="loading">
                                <option v-for="[key, value] in archs" :value="value" :key="key">{{ key }}</option>
                            </select>
                        </div>
                    </div>
                </div>

                <div class="field">
                    <label class="label" for="mode">Mode</label>
                    <div class="control">
                        <div class="select" :class="{ 'is-loading': loading }">
                            <select v-model="mode" id="mode" :disabled="loading">
                                <option v-for="[key, value] in modes" :value="value" :key="key">{{ key }}</option>
                            </select>
                        </div>
                    </div>
                </div>

                <div class="field">
                    <label class="label" for="offset">Offset</label>
                    <div class="control">
                        <input class="input" :class="{ 'is-danger': !isOffsetValid }" id="offset" type="text" v-model="offsetText"></input>
                    </div>
                    <p v-if="isOffsetValid" class="help">The offset 0x{{ offset.toString(16) }} is valid.</p>
                    <p v-else class="help is-danger">This offset is not valid, it must be a positive integer.</p>
                </div>

                <div class="field">
                    <label class="label" for="bytes">Bytes</label>
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

                <div class="field">
                    <div class="control">
                        <button class="button is-link" :disabled="!isValid">Submit</button>
                    </div>
                </div>
            </form>
        </div>
    </div>
</template>

<script>
import { mapState } from "vuex";

export default {
    computed: {
        ...mapState(["archs", "modes"]),
        offset() {
            return parseInt(this.offsetText);
        },
        isOffsetValid() {
            return !Number.isNaN(this.offset) && this.offset >= 0;
        },
        loading() {
            return this.archs === null || this.modes === null;
        },
        isValid() {
            return !this.loading && this.arch != null && this.mode != null && this.isOffsetValid && this.files.length == 1;
        }
    },
    data: () => ({
        arch: null,
        mode: null,
        offsetText: "0",
        files: []
    }),
    methods: {
        onFileChange() {
            this.files = [...this.$refs.bytes.files];
        },
        async onSubmit() {
            const { arch, mode, offset } = this;
            const bytes = new Uint8Array(await this.files[0].arrayBuffer());

            this.$store.dispatch("startDisassembler", { arch, mode, offset, bytes });
        }
    }
}
</script>
