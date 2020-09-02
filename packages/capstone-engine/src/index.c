#include <capstone/capstone.h>
#include <emscripten.h>
#include <stdlib.h>

EMSCRIPTEN_KEEPALIVE
int test_if_it_works(void) {
    return 42;
}

EMSCRIPTEN_KEEPALIVE
cs_err wrapper_cs_open(cs_arch arch, cs_mode mode, csh *handle) {
    return cs_open(arch, mode, handle);
}

EMSCRIPTEN_KEEPALIVE
size_t wrapper_cs_disasm(csh handle, const uint8_t *code, size_t code_size, uint64_t address, size_t count, cs_insn **insn) {
    return cs_disasm(handle, code, code_size, address, count, insn);
}

EMSCRIPTEN_KEEPALIVE
void wrapper_cs_free(cs_insn *insn, size_t count) {
    return cs_free(insn, count);
}

EMSCRIPTEN_KEEPALIVE
cs_err wrapper_cs_close(csh *handle) {
    return cs_close(handle);
}
