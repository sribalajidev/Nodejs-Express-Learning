function step1() {
  return new Promise((resolve) => {
    setTimeout(() => {
      console.log("Step 1 completed");
      resolve("Data from Step 1");
    }, 1000);
  });
}

function step2(dataFromStep1) {
  return new Promise((resolve) => {
    setTimeout(() => {
      console.log("Step 2 completed using:", dataFromStep1);
      resolve("Data from Step 2");
    }, 1000);
  });
}

function step3(dataFromStep2) {
  return new Promise((resolve) => {
    setTimeout(() => {
      console.log("Step 3 completed using:", dataFromStep2);
      resolve("Data from Step 3");
    }, 1000);
  });
}

function step4(dataFromStep3) {
  return new Promise((resolve) => {
    setTimeout(() => {
      console.log("Step 4 completed using:", dataFromStep3);
      resolve("All steps done with Async/Await!");
    }, 1000);
  });
}

// Async/Await version
async function runAsyncAwaitProcess() {
  try {
    const result1 = await step1();
    const result2 = await step2(result1);
    const result3 = await step3(result2);
    const finalResult = await step4(result3);

    console.log(finalResult);
  } catch (err) {
    console.error("Error occurred:", err);
  }
}

module.exports = runAsyncAwaitProcess;