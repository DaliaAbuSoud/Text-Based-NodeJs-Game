const readline = require("readline");
const chalk = require("chalk");
const chalkAnimation = require("chalk-animation");
const chalkPipe = require("chalk-pipe");

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
});

const greetingQuestions = {
    q: " Please press 'enter' to proceed or press 'esc' anytime to terminate.",
    answer: {
        next: "\nNow please give us some information about you\n",
        quit: "\nGoodBye!",
    },
};

// const stdin = process.openStdin();
// require("tty").setRawMode(true);

// stdin.on("keypress", function (chunk, key) {
//     // process.stdout.write("Get Chunk: " + chunk + "\n");
//     if (key === 27) process.exit();
// });

function greeting(responses) {
    rl.question(chalkPipe("magenta.bold")(responses.q), (answer) => {
        if (answer == "quit") {
            console.log(chalk.cyan(greetingQuestions.answer.quit));
            rl.close();
            return;
        } else if (answer == "next") {
            console.log(chalk.black.bgCyan(greetingQuestions.answer.next));
            askQuestions(personalData);
        }
    });
}

chalkAnimation.rainbow(
    "\nWelcome to the Body Mass Index (BMI) calculator!\n",
    0.2
);
setTimeout(() => {
    // Stop the greeting animation, then write on a new line.

    chalkAnimation.rainbow(
        "This tool will caluclate your current BMI and compare it to the ideal BMI for your body.\n",
        0.2
    );
    setTimeout(() => {
        greeting(greetingQuestions);
    }, 3000);
}, 3000);

const personalData = {
    nameQ: "What is your first name?\n",
    ageQ: "How old are you?\n",
    heightQ: "What is your height in Meters? (e.g: 1.75)\n",
    weightQ: "What is your weight in KGs? (e.g: 65.5)\n",
    submit:
        "\nThanks for entering your data. Now please press enter to see your BMI!\n",
};

function askQuestions(answer) {
    rl.question(chalk.green(personalData.nameQ), (answer) => {
        if (answer) {
            console.log(chalk.yellow.italic.bold(`\nHello ${answer}\n`));
            rl.question(chalk.green(personalData.ageQ), (answer) => {
                if (answer === NaN || answer == "") {
                    console.log(
                        chalk.red(
                            "Please Enter a Valid Answer or Type 'Quite to Terminate"
                        )
                    );
                } else if (answer) {
                    rl.question(chalk.green(personalData.heightQ), (answer) => {
                        if (Number.isNaN(answer) || answer == "") {
                            console.log(
                                chalk.red(
                                    "Please Enter a Valid Answer or Type 'Quite to Terminate"
                                )
                            );
                        } else if (answer) {
                            var heightAnswer = answer;
                            rl.question(
                                chalk.green(personalData.weightQ),
                                (answer) => {
                                    if (answer === NaN || answer == "") {
                                        console.log(
                                            chalk.red(
                                                "Please Enter a Valid Answer or Type 'Quite to Terminate"
                                            )
                                        );
                                    } else if (answer) {
                                        var weightAnswer = answer;
                                        rl.question(
                                            chalk.magenta.bold(
                                                personalData.submit
                                            ),
                                            (answer) => {
                                                if (answer == "submit")
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

    chalkAnimation.pulse(`*** Your BMI is: ${BMI.toFixed(2)} ***`);
}
