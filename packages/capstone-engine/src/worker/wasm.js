import emscripten from "../../capstone.mjs";

const url = new URL("../../capstone.wasm", import.meta.url);

export const capstone = emscripten({
    instantiateWasm(importObject, successCallback) {
        return WebAssembly.instantiateStreaming(fetch(url), importObject)
            .then(({ instance }) => instance)
            .then(successCallback)
    }
});
