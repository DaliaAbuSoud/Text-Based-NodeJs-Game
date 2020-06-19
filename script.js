const readline = require("readline");
const chalk = require("chalk");
const chalkAnimation = require("chalk-animation");
const chalkPipe = require("chalk-pipe");
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
});

//WELCOME//
(function welcome() {
    chalkAnimation.rainbow(
        "\nWelcome to the Body Mass Index (BMI) calculator!\nThis tool will caluclate your current BMI and compare it to the ideal BMI for your body.\n",
        0.2
    );
    setTimeout(() => {
        greeting(greetingQuestions);
    }, 3000);
})();

//GREETING//
const greetingQuestions = {
    question:
        "Please type 'p' followed by enter to proceed or type 't' followed by enter to terminate at anytime. \n",
    answer: {
        proceed: "\nNow please give us some information about you\n",
        terminate: "\nGoodBye!",
    },
};

function greeting(responses) {
    rl.question(chalkPipe("magenta.bold")(responses.question), (answer) => {
        if (answer == "t") {
            console.log(chalk.cyan(greetingQuestions.answer.terminate));
            rl.close();
            return;
        } else if (answer == "p") {
            console.log(chalk.black.bgCyan(greetingQuestions.answer.proceed));
            askQuestions(personalData);
        } else if (answer !== "p" || answer !== "t") {
            rl.question(
                chalkPipe("magenta.bold")(responses.question),
                (answer) => {
                    if (answer == "t") {
                        console.log(
                            chalk.cyan(greetingQuestions.answer.terminate)
                        );
                        rl.close();
                        return;
                    } else if (answer == "p") {
                        console.log(
                            chalk.black.bgCyan(greetingQuestions.answer.proceed)
                        );
                        askQuestions(personalData);
                    }
                }
            );
        }
    });
}

//PERSONAL QUESTIONS//
const personalData = {
    nameQ: "What is your first name?\n",
    ageQ: "How old are you?\n",
    heightQ: "What is your height in Meters? (e.g: 1.75)\n",
    weightQ: "What is your weight in KGs? (e.g: 65.5)\n",
    submit:
        "\nThanks for entering your data. Now please type 's' to see your BMI results!\n",
};

function askQuestions(answer) {
    rl.question(chalk.green(personalData.nameQ), (answer) => {
        if (answer == "t") {
            console.log("GoodBye!");
            rl.close();
        } else if (answer) {
            console.log(chalk.yellow.italic.bold(`\nHello ${answer}\n`));
            rl.question(chalk.green(personalData.ageQ), (answer) => {
                let parsedAnswer = isNaN(parseInt(answer));

                if (answer == "t") {
                    console.log("GoodBye!");
                    rl.close();
                } else if (parsedAnswer === true || answer === "") {
                    console.log(
                        chalk.red(
                            "Please Enter a Valid Answer or Type 't' to terminate"
                        )
                    );
                } else if (parsedAnswer === false) {
                    rl.question(chalk.green(personalData.heightQ), (answer) => {
                        let parsedAnswer = isNaN(parseInt(answer));

                        if (answer == "t") {
                            console.log("GoodBye!");
                            rl.close();
                        } else if (parsedAnswer === true || answer === "") {
                            console.log(
                                chalk.red(
                                    "Please Enter a Valid Answer or Type 't' to terminate"
                                )
                            );
                        } else if (parsedAnswer === false) {
                            let heightAnswer = answer;
                            rl.question(
                                chalk.green(personalData.weightQ),
                                (answer) => {
                                    let parsedAnswer = isNaN(parseInt(answer));

                                    if (answer == "t") {
                                        console.log("GoodBye!");
                                        rl.close();
                                    } else if (
                                        parsedAnswer === true ||
                                        answer === ""
                                    ) {
                                        console.log(
                                            chalk.red(
                                                "Please Enter a Valid Answer or Type 't' to terminate"
                                            )
                                        );
                                    } else if (parsedAnswer === false) {
                                        let weightAnswer = answer;
                                        rl.question(
                                            chalk.magenta.bold(
                                                personalData.submit
                                            ),
                                            (answer) => {
                                                if (answer == "t") {
                                                    console.log("GoodBye!");
                                                    rl.close();
                                                } else if (answer === "s") {
                                                    console.log(
                                                        chalk.black.bgBlue(
                                                            "\nThe BMI indictaes the following weight status: \n"
                                                        )
                                                    );
                                                    console.log(
                                                        chalk.yellow(
                                                            "- Underweight: BMI Below 18.5"
                                                        )
                                                    );
                                                    console.log(
                                                        chalk.greenBright(
                                                            "- Normal: BMI between 18.5 ~ 24.9"
                                                        )
                                                    );
                                                    console.log(
                                                        chalk.blue(
                                                            "- Overweight: BMI between 25. ~ 29.9"
                                                        )
                                                    );
                                                    console.log(
                                                        chalk.red(
                                                            "- Obese: BMI 30 and above\n"
                                                        )
                                                    );

                                                    BMIcalculator(
                                                        weightAnswer,
                                                        heightAnswer
                                                    );
                                                } else {
                                                    console.log(
                                                        chalk.magenta.bold(
                                                            "Please type 's' to see your BMI results or type 't' to terminate"
                                                        )
                                                    );
                                                }
                                            }
                                        );
                                    }
                                }
                            );
                        }
                    });
                }
            });
        }
    });
}

function BMIcalculator(weight, height) {
    let BMI = weight / (height * height);
    let maxNormalBMIWeight = 24.9 * (height * height);
    let minNormalBMIWeight = 18.5 * (height * height);
    let weightToBeLost = weight - maxNormalBMIWeight;
    let weightToBeGained = minNormalBMIWeight - weight;

    if (BMI > 24.9) {
        console.log(
            chalk.black.bgCyan("You are in the BMI's 'OverWeight' range.\n")
        );

        console.log(
            chalk.blue(
                `You need to loose ${weightToBeLost.toFixed(
                    2
                )} Kgs to reach the 'Normal-Range-BMI' weight (${maxNormalBMIWeight.toFixed(
                    2
                )}).       `
            )
        );
        chalkAnimation.pulse(
            ` \n*** Your Current BMI is: ${BMI.toFixed(2)} ***`
        );
    } else if (BMI < 18.5) {
        console.log(
            chalk.black.bgCyan("You are in the BMI's 'UnderWeight' range.\n")
        );

        console.log(
            chalk.blue(
                `You need to gain ${weightToBeGained.toFixed(
                    2
                )} Kgs to reach the 'Normal-Range-BMI' weight (${minNormalBMIWeight.toFixed(
                    2
                )}).`
            )
        );
        chalkAnimation.pulse(
            ` \n*** Your Current BMI is: ${BMI.toFixed(2)} ***`
        );
    } else {
        console.log(
            chalk.black.bgGreen(
                " Great!!! You are in the BMI's 'Normal' range! "
            )
        );
        chalkAnimation.pulse(
            ` \n*** Your Current BMI is: ${BMI.toFixed(2)} ***`
        );
    }
}
