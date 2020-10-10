import Worker from "worker-loader?worker=SharedWorker!./worker";

export const worker = new Worker();

console.log(worker);
