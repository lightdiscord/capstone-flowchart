import Loading from "./loading.vue";
import Error from "./error.vue";

export const loading = (component) => ({
    component,
    loading: Loading,
    error: Error,
    delay: 0
});
