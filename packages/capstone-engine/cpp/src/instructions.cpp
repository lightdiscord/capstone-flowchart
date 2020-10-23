#include <capstone-engine.h>

Instructions::Instructions(cs_insn *insns, size_t count)
    : insns(insns), count(count)
{

}

void Instructions::operator delete(void* ptr) {
    Instructions *insns = static_cast<Instructions*>(ptr);

    if (insns) {
        cs_free(insns->insns, insns->count);
    }

    ::operator delete(ptr);
}

Instruction Instructions::get(size_t index) {
    return Instruction(&insns[index]);
}

size_t Instructions::length() const {
    return count;
}
