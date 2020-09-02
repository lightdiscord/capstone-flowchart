CC = emcc
CFLAGS = -O3 -s WASM=1 -s ENVIRONMENT=worker -s EXTRA_EXPORTED_RUNTIME_METHODS='["cwrap", "getValue"]'

CFLAGS += $(shell pkg-config --cflags capstone)
LDFLAGS += $(shell pkg-config --libs capstone)

OBJECTS = src/index.o

.PHONY: all clean

all: capstone.mjs capstone.wasm

capstone.mjs: $(OBJECTS)
	$(CC) $(CFLAGS) $^ $(LDFLAGS) -o $@

capstone.wasm: capstone.mjs

clean:
	$(RM) $(OBJECTS) capstone.mjs capstone.wasm
