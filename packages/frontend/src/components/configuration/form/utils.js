const immediateWatcher = (event) => ({
    immediate: true,
    handler(value) {
        this.$emit(event, value);
    }
});

export const validityWatcher = {
    isValid: immediateWatcher("validity")
}

export const modelWatcher = {
    value: immediateWatcher("input")
}

export const required = (type) => ({
    type,
    required: true
})
