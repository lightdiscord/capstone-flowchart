#include <capstone-engine.h>

Disassembler::Disassembler(cs_arch arch, cs_mode mode) {
    result = cs_open(arch, mode, &handle);
}

void Disassembler::operator delete(void* ptr) {
    Disassembler *disasm = static_cast<Disassembler*>(ptr);

    if (disasm) {
        cs_close(&disasm->handle);
    }

    ::operator delete(ptr);
}

Instructions Disassembler::disassemble(std::string code, size_t address) {
    cs_insn *instructions;
    size_t count = cs_disasm(
            handle,
            (const uint8_t*)code.data(),
            code.length(),
            address,
            0,
            &instructions
    );
    result = count ? CS_ERR_OK : cs_errno(handle);
    return Instructions(instructions, count);

}

cs_err Disassembler::getResult() const {
    return result;
}
