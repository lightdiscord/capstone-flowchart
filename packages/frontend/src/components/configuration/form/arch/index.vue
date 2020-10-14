<template>
    <div class="field">
        <label class="label" for="arch">Architecture type</label>
        <div class="control">
            <div class="select" :class="{ 'is-danger': !isValid }">
                <select v-model="value" id="arch" :disabled="archs.length == 0">
                    <option v-for="[key, value] in archs" :key="key" :value="value">{{ key }}</option>
                </select>
            </div>
        </div>
        <p class="help is-danger" v-if="!isValid">
            Please choose an architecture type to use with capstone.
        </p>
    </div>
</template>

<script>
import { validityWatcher, modelWatcher, required } from "../utils.js";

export default {
    props: {
        archs: required(Array)
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
