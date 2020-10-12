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

const disassembleAt = (registry, disassembler, options, offset, port) => {
    if (registry.has(offset)) return;
    registry.add(offset);

    const bytes = options.bytes.slice(offset - options.offset);
    console.log(offset, bytes);
    const instructions = disassembler.disassemble(bytes, offset);
    const values = [];

    for (let i = 0; i < instructions.count; i += 1) {
        const instruction = instructions.get(i);
        const { address, mnemonic, opString } = instruction;
        console.log(address, mnemonic, opString);
        values.push({ type: "instruction", data: { address, mnemonic, opString } });
        console.log("worker: disassembleAt: instruction.delete");
        instruction.delete();
        if (mnemonic == "jmp" || mnemonic == "call") {
            disassembleAt(registry, disassembler, options, parseInt(opString, 16), port);
            break;
        }
        if (mnemonic == "ret") {
            break;
        }
    }

    console.log("worker: disassembleAt: instructions.delete");

    instructions.delete();
    port.postMessage({ type: "new_section", data: { offset, values } });
}

self.addEventListener("connect", (event) => {
    const [port] = event.ports;
    let disassemblerOptions = null;
    let disassembler = null;
    const registry = new Set();

    console.log("worker connect");

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
                    console.log("worker: start_disassembler", message.data);
                    const arch = capstone.CSArch.values[message.data.arch];
                    const mode = capstone.CSMode.values[message.data.mode];

                    disassembler = new capstone.Disassembler(arch, mode);
                    port.postMessage({ type: "ready", data: true });
                    disassembleAt(registry, disassembler, disassemblerOptions, message.data.offset, port);
                    port.postMessage({ type: "finished_for", data: { offset: message.data.offset } });
                    break;
            }
        });
    });
    port.start();

    capstone.then(commitOptions(port));
})
