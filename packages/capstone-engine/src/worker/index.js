import module from "../../capstone.mjs";
import wasm from "../../capstone.wasm";
import { readyMessage } from "../messages.js";

const capstone = module({
    instantiateWasm(importObject, successCallback) {
        return WebAssembly.instantiateStreaming(fetch(wasm), importObject)
            .then(({ instance }) => instance)
            .then(successCallback)
    },
    onRuntimeInitialized() {
        self.postMessage(readyMessage())
    }
});

console.log("Hello from worker!");
