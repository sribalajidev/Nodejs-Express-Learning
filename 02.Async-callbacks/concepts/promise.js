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
      resolve("All steps done with Promises!");
    }, 1000);
  });
}

// Promise Chain - solution for calback hell
function runPromiseProcess() {
  step1()
    .then(result1 => step2(result1))
    .then(result2 => step3(result2))
    .then(result3 => step4(result3))
    .then(finalResult => console.log(finalResult))
    .catch(err => console.error("Error occurred:", err));
}

module.exports = runPromiseProcess;
