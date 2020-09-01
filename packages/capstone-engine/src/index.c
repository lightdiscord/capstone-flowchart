#include <emscripten.h>
#include <capstone/capstone.h>

EMSCRIPTEN_KEEPALIVE
int test_if_it_works() {
    return 42;
}
