<template>
    <div class="field">
        <label class="label" for="mode">Hardware mode</label>
        <div class="control">
            <div class="select" :class="{ 'is-danger': !isValid }">
                <select v-model="value" id="mode" :disabled="modes.length == 0">
                    <option v-for="[key, value] in modes" :value="value" :key="key">{{ key }}</option>
                </select>
            </div>
        </div>
        <p class="help is-danger" v-if="!isValid">
            Please choose an hardware mode to use with capstone.
        </p>
    </div>
</template>

<script>
import { validityWatcher, modelWatcher, required } from "../utils.js";

export default {
    props: {
        modes: required(Array)
    },
    data: () => ({
        value: null
    }),
    computed: {
        isValid() {
            return this.value !== null;
        }
    },
    watch: {
        ...validityWatcher,
        ...modelWatcher
    }
}
</script>
