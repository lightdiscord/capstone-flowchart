CXX = em++
CXXFLAGS = -O3 --bind -s WASM=1 -s ENVIRONMENT=worker -std=c++17

CXXFLAGS += $(shell pkg-config --cflags capstone)
#LDFLAGS += $(shell pkg-config --libs capstone)
LDFLAGS += -L/run/user/1000/tmp.953BgBPE1j -lcapstone

OBJECTS = src/index.o

.PHONY: all clean

all: capstone.mjs capstone.wasm

capstone.mjs: $(OBJECTS)
	$(CXX) $(CXXFLAGS) $^ $(LDFLAGS) -o $@

capstone.wasm: capstone.mjs

clean:
	$(RM) $(OBJECTS) capstone.mjs capstone.wasm
