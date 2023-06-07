const { Worker } = require("worker_threads");

const compute = (arr) => {
  return new Promise((resolve, reject) => {
    const worker = new Worker("./worker.js", {
      workerData: {
        arr,
      },
    });

    worker.on("message", (msg) => {
      console.log(worker.threadId);
      resolve(msg);
    });
    worker.on("error", (err) => {
      reject(err);
    });
    worker.on("exit", () => {
      console.log("End work");
    });
  });
};

async function main() {
  try {
    performance.mark("start");
    const result = await Promise.all([
      compute([12, 14, 32, 22]),
      Promise.reject,
      compute([12, 14, 32, 22]),
      compute([12, 14, 32]),
      compute([12, 14, 32]),
    ]);

    console.log(result);

    performance.mark("end");

    performance.measure("main", "start", "end");
    console.log(performance.getEntriesByName("main").pop());
  } catch (error) {
    console.error(error.message);
  }
}

main();
