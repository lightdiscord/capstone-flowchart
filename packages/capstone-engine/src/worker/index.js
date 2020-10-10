import module from "../../capstone.mjs";
import wasm from "../../capstone.wasm";

const capstone = module({
    instantiateWasm(importObject, successCallback) {
        return WebAssembly.instantiateStreaming(fetch(wasm), importObject)
            .then(({ instance }) => instance)
            .then(successCallback)
    }
});

const commitOptions = port => capstone => {
    const format = option => Object.entries(option)
        .map(([key, { value }]) => ([key, value]))
        .filter(([_, value]) => value !== undefined);

    const modes = format(capstone.CSMode);
    const archs = format(capstone.CSArch);

    port.postMessage({ type: "options", data: { archs, modes } });
};

self.addEventListener("connect", (event) => {
    const [port] = event.ports;

    port.start();
    capstone.then(commitOptions(port));
})
