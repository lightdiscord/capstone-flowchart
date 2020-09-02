import Worker from "worker-loader!./worker";

const worker = new Worker();

worker.addEventListener("message", (event) => {
    console.log("Receive message", event);
});

//
// import module from "../capstone.mjs";
// import wasm from "../capstone.wasm";
// 
// const capstone = module({
//     instantiateWasm(importObject, successCallback) {
//         return WebAssembly.instantiateStreaming(fetch(wasm), importObject)
//             .then(({ instance }) => instance)
//             .then(successCallback)
//     },
//     onRuntimeInitialized() {
//         console.log("lol")
//         resolve(this)
//     }
// });
