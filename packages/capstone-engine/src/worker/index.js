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
        const arch = this.CSArch.X86;
        const mode = this.CSMode['32'];

        const disassembler = new this.Disassembler(arch, mode);
        const code = Uint8Array.from([0x55, 0x48, 0x8b, 0x05, 0xb8, 0x13, 0x00, 0x00]);
        const instructions = disassembler.disassemble(code, 0x1000)

        for (let i = 0; i < instructions.count; i++) {
            const instruction = instructions.get(i);
            console.log("Instruction", instruction.address, instruction.mnemonic, instruction.opString);
            instruction.delete();
        }
        instructions.delete();
        disassembler.delete();
    }
});

console.log("Hello from worker!");
