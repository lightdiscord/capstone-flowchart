#include <capstone.h>
#include <emscripten/bind.h>
#include <stdlib.h>

class Instruction {
    private:
        cs_insn *insn;

    public:
        Instruction(cs_insn *insn)
            : insn(insn)
            { }

        size_t getAddress() const {
            return insn->address;
        }

        uint16_t getSize() const {
            return insn->size;
        }

        std::string getMnemonic() const {
            return std::string(insn->mnemonic);
        }

        std::string getOpString() const {
            return std::string(insn->op_str);
        }
};

class Instructions {
    private:
        cs_insn *insns;
        size_t count;
    public:
        Instructions(cs_insn *insns, size_t count)
            : insns(insns), count(count)
            { }

        ~Instructions() {
            cs_free(insns, count);
        }

        Instruction get(size_t index) {
            return Instruction(&insns[index]);
        }

        size_t length() const {
            return count;
        }
};

#include <iostream>

class Disassembler {
    private:
        csh handle;
        cs_err result;
    public:
        Disassembler(cs_arch arch, cs_mode mode)
        {
            printf("wasm: cs_open: %u %u\n", arch, mode);
            result = cs_open(arch, mode, &handle);
        }

        ~Disassembler()
        {
            cs_close(&handle);
        }

        Instructions disassemble(std::string code, size_t address)
        {
            printf("wasm: disassemble: %zx %zu %hhx %hhx\n", address, code.length(), *(const uint8_t*)code.data(), ((const uint8_t*)code.data())[1]);
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

        cs_err getResult() const {
            return result;
        }
};

EMSCRIPTEN_BINDINGS(capstone) {
    emscripten::class_<Instruction>("Instruction")
        .property("size", &Instruction::getSize)
        .property("address", &Instruction::getAddress)
        .property("mnemonic", &Instruction::getMnemonic)
        .property("opString", &Instruction::getOpString);

    emscripten::class_<Instructions>("Instructions")
        .function("get", &Instructions::get)
        .property("count", &Instructions::length);

    emscripten::class_<Disassembler>("Disassembler")
        .constructor<cs_arch, cs_mode>()
        .property("result", &Disassembler::getResult)
        .function("disassemble", &Disassembler::disassemble);

    emscripten::enum_<cs_arch>("CSArch")
        .value("ARM", CS_ARCH_ARM)
        .value("ARM64", CS_ARCH_ARM64)
        .value("MIPS", CS_ARCH_MIPS)
        .value("X86", CS_ARCH_X86)
        .value("PPC", CS_ARCH_PPC)
        .value("SPARC", CS_ARCH_SPARC)
        .value("SYSZ", CS_ARCH_SYSZ)
        .value("XCORE", CS_ARCH_XCORE)
        .value("M68K", CS_ARCH_M68K)
        .value("TMS320C64X", CS_ARCH_TMS320C64X)
        .value("M680X", CS_ARCH_M680X)
        .value("EVM", CS_ARCH_EVM)
        .value("MAX", CS_ARCH_MAX)
        .value("ALL", CS_ARCH_ALL);

    emscripten::enum_<cs_mode>("CSMode")
        .value("LITTLE_ENDIAN", CS_MODE_LITTLE_ENDIAN)
        .value("ARM", CS_MODE_ARM)
        .value("16", CS_MODE_16)
        .value("32", CS_MODE_32)
        .value("64", CS_MODE_64)
        .value("THUMB", CS_MODE_THUMB)
        .value("MCLASS", CS_MODE_MCLASS)
        .value("V8", CS_MODE_V8)
        .value("MICRO", CS_MODE_MICRO)
        .value("MIPS3", CS_MODE_MIPS3)
        .value("MIPS32R6", CS_MODE_MIPS32R6)
        .value("MIPS2", CS_MODE_MIPS2)
        .value("V9", CS_MODE_V9)
        .value("QPX", CS_MODE_QPX)
        .value("M68K_000", CS_MODE_M68K_000)
        .value("M68K_010", CS_MODE_M68K_010)
        .value("M68K_020", CS_MODE_M68K_020)
        .value("M68K_030", CS_MODE_M68K_030)
        .value("M68K_040", CS_MODE_M68K_040)
        .value("M68K_060", CS_MODE_M68K_060)
        .value("BIG_ENDIAN", CS_MODE_BIG_ENDIAN)
        .value("MIPS32", CS_MODE_MIPS32)
        .value("MIPS64", CS_MODE_MIPS64)
        .value("M680X_6301", CS_MODE_M680X_6301)
        .value("M680X_6309", CS_MODE_M680X_6309)
        .value("M680X_6800", CS_MODE_M680X_6800)
        .value("M680X_6801", CS_MODE_M680X_6801)
        .value("M680X_6805", CS_MODE_M680X_6805)
        .value("M680X_6808", CS_MODE_M680X_6808)
        .value("M680X_6809", CS_MODE_M680X_6809)
        .value("M680X_6811", CS_MODE_M680X_6811)
        .value("M680X_CPU12", CS_MODE_M680X_CPU12)
        .value("M680X_HCS08", CS_MODE_M680X_HCS08);

    emscripten::enum_<cs_err>("CSError")
        .value("OK", CS_ERR_OK)
        .value("ERR_MEM", CS_ERR_MEM)
        .value("ERR_ARCH", CS_ERR_ARCH)
        .value("ERR_HANDLE", CS_ERR_HANDLE)
        .value("ERR_CSH", CS_ERR_CSH)
        .value("ERR_MODE", CS_ERR_MODE)
        .value("ERR_OPTION", CS_ERR_OPTION)
        .value("ERR_DETAIL", CS_ERR_DETAIL)
        .value("ERR_MEMSETUP", CS_ERR_MEMSETUP)
        .value("ERR_VERSION", CS_ERR_VERSION)
        .value("ERR_DIET", CS_ERR_DIET)
        .value("ERR_SKIPDATA", CS_ERR_SKIPDATA)
        .value("ERR_X86_ATT", CS_ERR_X86_ATT)
        .value("ERR_X86_INTEL", CS_ERR_X86_INTEL)
        .value("ERR_X86_MASM", CS_ERR_X86_MASM);
}
