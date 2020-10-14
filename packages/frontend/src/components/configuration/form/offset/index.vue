<template>
    <div class="field">
        <label class="label" for="offset">Base offset</label>
        <div class="control">
            <input class="input" :class="{ 'is-danger': !isValid }" id="offset" type="text" v-model="offsetText"></input>
        </div>
        <p v-if="isValid" class="help">The current base offset 0x{{ value.toString(16) }} is valid.</p>
        <p v-else class="help is-danger">The current base offset is not valid, it must be a non-negative integer.</p>
    </div>
</template>

<script>
import { validityWatcher, modelWatcher } from "../utils.js";

export default {
    data: () => ({
        offsetText: "0x0"
    }),
    computed: {
        value() {
            return parseInt(this.offsetText);
        },
        isValid() {
            return !Number.isNaN(this.value) && this.value >= 0;
        }
    },
    watch: {
        ...validityWatcher,
        ...modelWatcher
    }
}
</script>
