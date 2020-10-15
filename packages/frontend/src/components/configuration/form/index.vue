<template>
    <form @submit.prevent="onSubmit">
        <csf-form-select-arch v-model="arch" :archs="archs" @validity="onValidity('arch', $event)" />
        <csf-form-select-mode v-model="mode" :modes="modes" @validity="onValidity('mode', $event)" />
        <csf-form-input-offset v-model="offset" @validity="onValidity('offset', $event)" />
        <csf-form-bytes ref="bytes" @validity="onValidity('bytes', $event)" />

        <div class="field">
            <div class="control">
                <button class="button is-link" :disabled="!isValid">Submit</button>
            </div>
        </div>
    </form>
</template>

<script>
import SelectArch from "./arch/index.vue";
import SelectMode from "./mode/index.vue";
import InputOffset from "./offset/index.vue";
import Bytes from "./bytes/index.vue";
import { required } from "./utils.js";

export default {
    props: {
        archs: required(Array),
        modes: required(Array)
    },
    computed: {
        isValid() {
            return Object.values(this.validity).every(validity => validity);
        }
    },
    data: () => ({
        arch: null,
        mode: null,
        offset: null,
        validity: {
            arch: false,
            mode: false,
            offset: false,
            bytes: false
        }
    }),
    methods: {
        onValidity(key, validity) {
            this.$set(this.validity, key, validity);
        },
        async onSubmit() {
            const { arch, mode, offset } = this;
            const bytes = await this.$refs.bytes.fetchBytes();

            this.$emit("submit", { arch, mode, offset, bytes });
        }
    },
    components: {
        'csf-form-select-arch': SelectArch,
        'csf-form-select-mode': SelectMode,
        'csf-form-input-offset': InputOffset,
        'csf-form-bytes': Bytes
    }
}
</script>
