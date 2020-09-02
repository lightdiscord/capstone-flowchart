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
        const cs_open = this.cwrap("wrapper_cs_open", "number", ["number", "number", "number"]);
        const cs_disasm = this.cwrap("wrapper_cs_disasm", "number", ["number", "array", "number", "number", "number"]);

        const arch = 3;
        const mode = 1 << 2;
        const handle_ptr = this.stackAlloc(4);

        console.log(cs_open(arch, mode, handle_ptr));

        console.log(this, this.HEAP8.slice(handle_ptr))
        console.log(handle_ptr, this.getValue(handle_ptr, '*'))
        const handle = this.getValue(handle_ptr, '*');
        const code = Uint8Array.from([0x55, 0x48, 0x8b, 0x05, 0xb8, 0x13, 0x00, 0x00]);
        const code_size = code.byteLength - 1;
        const address = 0x1000;
        const count = 0;
        const insn_ptr = this.stackAlloc(4);

        const instructions_count = cs_disasm(handle, code, code_size, address, count, insn_ptr);
        console.log(instructions_count);
    }
});

console.log("Hello from worker!");
