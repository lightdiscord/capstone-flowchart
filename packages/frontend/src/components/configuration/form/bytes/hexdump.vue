<template>
    <div>
        <textarea class="textarea" v-model="textarea"></textarea>
        <p class="help">It can contains any character but only hexadecimal characters will be used. If the number of hexadecimal character is odd the last one will be ignored.</p>
    </div>
</template>

<script>
export default {
    data: () => ({
        textarea: ""
    }),
    mounted() {
        this.$emit("validity", true);
    },
    methods: {
        fetchBytes() {
            const chars = this.textarea.replace(/[^0-9a-f]/gi, "");
            const bytes = (chars.match(/../g) || []).map((chars) => parseInt(chars, 16));

            return Uint8Array.from(bytes);
        }
    }
}
</script>
