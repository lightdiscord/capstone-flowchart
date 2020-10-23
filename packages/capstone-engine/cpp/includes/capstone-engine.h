#include <capstone.h>
#include <emscripten/bind.h>
#include <stdlib.h>

class Instruction {
    private:
        cs_insn *insn;

    public:
        Instruction(cs_insn *insn);

        size_t getAddress() const;
        uint16_t getSize() const;
        std::string getMnemonic() const;
        std::string getOpString() const;
};

class Instructions {
    private:
        cs_insn *insns;
        size_t count;

    public:
        Instructions(cs_insn *insns, size_t count);

        static void operator delete(void* ptr);

        size_t length() const;

        Instruction get(size_t index);
};

class Disassembler {
    private:
        csh handle;
        cs_err result;

    public:
        Disassembler(cs_arch arch, cs_mode mode);

        static void operator delete(void* ptr);

        cs_err getResult() const;

        Instructions disassemble(std::string code, size_t address);
};
