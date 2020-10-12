export const worker = new SharedWorker(new URL("./worker", import.meta.url));

console.log(worker);
