// Function to create data windows
function createWindows(data, windowSize) {
    const windows = [];
    for (let i = 0; i < data.length - windowSize; i++) {
        windows.push(data.slice(i, i + windowSize));
    }
    return windows;
}

// Function to normalize data
function normalizeData(data) {
    const min = Math.min(...data);
    const max = Math.max(...data);
    return data.map((value) => (value - min) / (max - min));
}

// Define function to create labels
function createLabels(data, windowSize, futureTime) {
    const labels = [];
    for (let i = 0; i < data.length - windowSize - futureTime + 1; i++) {
        const label = data[i + windowSize + futureTime - 1].price; // Assuming 'price' is the label
        labels.push(label);
    }
    return labels;
}
function calculateMSE(predictions, targets) {
    if (predictions.length !== targets.length) {
        throw new Error("Lengths of predictions and targets must match.");
    }

    const sumSquaredErrors = predictions.reduce((acc, prediction, index) => {
        const squaredError = Math.pow(prediction - targets[index], 2);
        return acc + squaredError;
    }, 0);

    const mse = sumSquaredErrors / predictions.length;
    return mse;
}
// Hàm tính R2
function rSquared(predictions, targets) {
    if (predictions.length !== targets.length) {
        throw new Error("Predictions and targets must have the same length");
    }

    const n = predictions.length;
    const meanTargets = targets.reduce((acc, val) => acc + val, 0) / n;
    const totalSumOfSquares = targets.reduce(
        (acc, val) => acc + (val - meanTargets) * (val - meanTargets),
        0
    );

    let residualSumOfSquares = 0;
    for (let i = 0; i < n; i++) {
        residualSumOfSquares +=
            (targets[i] - predictions[i]) * (targets[i] - predictions[i]);
    }

    return 1 - residualSumOfSquares / totalSumOfSquares;
}
function trainAI() {
    confirm(`${t("trading.stock.trainAI")}?`, t("titles.confirm")).then(
        (result) => {
            if (result) {
                store
                    .dispatch("tradingStock/getTrainData")
                    .then(async (data) => {
                        console.log("trainAI-start");
                        // Define future time for prediction
                        const futureTime = 1; // Predicting price 1 time step ahead

                        // Define window size
                        const windowSize = 5; // You can adjust the window size as needed

                        // Create data windows
                        const windows = createWindows(data, windowSize);
                        // console.log("windows", windows.length);

                        // Normalize data in each window
                        const normalizedWindows = windows.map((window) =>
                            window.map((obj) =>
                                Object.values(obj).map((value) =>
                                    Array.isArray(value)
                                        ? normalizeData(value)
                                        : value
                                )
                            )
                        );

                        // Define training size (adjust as needed)
                        const trainSize = Math.floor(
                            normalizedWindows.length * 0.8
                        ); // 80% for training

                        // Create labels for training and testing sets
                        const labels = createLabels(
                            data,
                            windowSize,
                            futureTime
                        );
                        const trainY = labels.slice(0, trainSize);
                        const testY = labels.slice(trainSize);

                        // Convert data to TensorFlow tensors
                        const trainX = tf.tensor(
                            normalizedWindows.slice(0, trainSize)
                        );
                        const testX = tf.tensor(
                            normalizedWindows.slice(trainSize)
                        );
                        // console.log("trainX", trainX.shape);
                        // console.log("testX", testX.shape);
                        // console.log("trainY", trainY);
                        // console.log("testY", testY);
                        // return false;
                        const trainLabels = tf.tensor(trainY);
                        const testLabels = tf.tensor(testY);
                        // Define the LSTM model
                        const model = tf.sequential();
                        model.add(
                            tf.layers.lstm({
                                units: 50, // Number of LSTM units
                                inputShape: [
                                    windowSize,
                                    Object.keys(data[0]).length,
                                ], // Shape of input data
                                returnSequences: false, // Return only the last output in the output sequence
                            })
                        );
                        model.add(
                            tf.layers.dense({
                                units: 1, // Output a single value
                            })
                        );

                        // Compile the model
                        model.compile({
                            optimizer: "adam", // Optimizer algorithm
                            loss: "meanSquaredError", // Loss function
                            metrics: ["mse"], // Metrics to monitor during training
                        });

                        // Train the model
                        const epochs = 50; // Number of training epochs
                        const batchSize = 32; // Batch size for training
                        const validationSplit = 0.2; // Percentage of training data to use for validation
                        state.currentEpoch = 0;
                        state.trainEnable = true;
                        for (let i = 0; i < state.totalEpochs; i++) {
                            state.currentEpoch++;
                            const history = await model.fit(
                                trainX,
                                trainLabels,
                                {
                                    epochs: 1,
                                    batchSize,
                                    validationSplit,
                                    shuffle: false, // Shuffle training data before each epoch
                                }
                            );
                        }
                        state.trainEnable = false;

                        // Dự đoán trên tập kiểm tra (testX)
                        const predictions = model.predict(testX);

                        const mse = calculateMSE(
                            predictions.arraySync(),
                            testLabels.arraySync()
                        );

                        const r2 = rSquared(
                            predictions.arraySync(),
                            testLabels.arraySync()
                        );

                        // console.log("predictions:", predictions.arraySync());
                        // console.log("testLabels:", testLabels.arraySync());
                        // console.log("testY:", testY);
                        console.log("Mean Squared Error (MSE):", mse);
                        console.log("R-squared:", r2);

                        // Evaluate the model
                        const evalResult = model.evaluate(testX, testLabels);
                        console.log(
                            "Evaluation result:",
                            evalResult[1].dataSync()
                        ); // Print mean squared error

                        // Optionally, you can save the model
                        // await model.save('localstorage://my-model');
                    });
            }
        }
    );
}
