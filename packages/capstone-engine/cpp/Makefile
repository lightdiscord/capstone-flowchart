CXX = em++
CXXFLAGS = -O3 --bind -s WASM=1 -s ENVIRONMENT=worker -std=c++17

CXXFLAGS += $(shell pkg-config --cflags capstone)
CXXFLAGS += -Iincludes
LDFLAGS += $(shell pkg-config --libs capstone)

SOURCES = src/index.cpp src/disassembler.cpp src/instruction.cpp src/instructions.cpp

OBJECTS = $(SOURCES:.cpp=.o)

.PHONY: all clean fclean re

all: capstone.mjs capstone.wasm

capstone.mjs: $(OBJECTS)
	$(CXX) $(CXXFLAGS) $^ $(LDFLAGS) -o $@

capstone.wasm: capstone.mjs

clean:
	$(RM) $(OBJECTS)

fclean: clean
	$(RM) capstone.mjs capstone.wasm

re: fclean all
