#include <capstone-engine.h>

Instruction::Instruction(cs_insn *insn)
    : insn(insn)
{

}

size_t Instruction::getAddress() const {
    return insn->address;
}

uint16_t Instruction::getSize() const {
    return insn->size;
}

std::string Instruction::getMnemonic() const {
    return std::string(insn->mnemonic);
}

std::string Instruction::getOpString() const {
    return std::string(insn->op_str);
}
