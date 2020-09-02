import Worker from "worker-loader!./worker";

const worker = new Worker();

worker.addEventListener("message", (event) => {
    console.log("Receive message", event);
});

