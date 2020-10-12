import module from "../../capstone.mjs";

const capstone = module({
    instantiateWasm(importObject, successCallback) {
        const wasm = new URL("../../capstone.wasm", import.meta.url);

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
    let disassemblerOptions = null;
    let disassembler = null;

    port.addEventListener("message", (event) => {
        const message = event.data;

        capstone.then((capstone) => {
            console.log("Worker received a message", message.type);
            switch (message.type) {
                case "start_disassembler":
                    if (disassemblerOptions !== null) {
                        port.postMessage({ type: "error", data: "The disassembler was already initialized" });
                        return;
                    }
                    disassemblerOptions = message.data;
                    disassembler = new capstone.Disassembler(message.data.arch, message.data.mode);
                    port.postMessage({ type: "ready", data: true });
                    break;
            }
        });
    });
    port.start();

    capstone.then(commitOptions(port));
})
