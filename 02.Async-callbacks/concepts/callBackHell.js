
function step1(callback) {
  setTimeout(() => {
    console.log("Step 1 completed");
    callback(null, "Data from Step 1");
  }, 1000);
}

function step2(dataFromStep1, callback) {
  setTimeout(() => {
    console.log("Step 2 completed using:", dataFromStep1);
    callback(null, "Data from Step 2");
  }, 1000);
}

function step3(dataFromStep2, callback) {
  setTimeout(() => {
    console.log("Step 3 completed using:", dataFromStep2);
    callback(null, "Data from Step 3");
  }, 1000);
}

function step4(dataFromStep3, callback) {
  setTimeout(() => {
    console.log("Step 4 completed using:", dataFromStep3);
    callback(null, "All steps done!");
  }, 1000);
}

// Nested (Callback Hell)
function runProcess() {
  step1((err, result1) => {
    if (err) return console.error(err);

    step2(result1, (err, result2) => {
      if (err) return console.error(err);

      step3(result2, (err, result3) => {
        if (err) return console.error(err);

        step4(result3, (err, finalResult) => {
          if (err) return console.error(err);

          console.log(finalResult);
        });
      });
    });
  });
}

module.exports = runProcess;
