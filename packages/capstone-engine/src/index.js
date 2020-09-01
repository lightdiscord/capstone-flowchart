import module from "../capstone.mjs";

import("../capstone.wasm").then((wasm) => {
    const capstone = module({
        instantiateWasm: () => wasm
    });

    const test_if_it_works = capstone.cwrap("test_if_it_works", "number", []);

    console.log(test_if_it_works());
});
