capstone.mjs: capstone/libcapstone.a src/index.c
	emcc -O3 -s WASM=1 -s EXTRA_EXPORTED_RUNTIME_METHODS='["cwrap"]' -I capstone/include $^ -o $@

capstone.wasm: capstone.mjs
