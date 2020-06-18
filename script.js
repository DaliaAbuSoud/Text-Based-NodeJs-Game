const readline = require("readline");
const chalk = require("chalk");
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
});

console.log("Welcome to the Body Mass Index (BMI) calculating tool.");
console.log(
    "This tool will help you caluclate you current BMI and compare it to the ideal BMI for your body."
);

const greetingQuestions = {
    q: "Please type 'next' to proceed or type 'quit' to terminate.",
    answer: {
        next: "Now please give us some information about you",
        quit: "GoodBye!",
    },
};

function greeting(responses) {
    rl.question(chalk.magenta(responses.q), (answer) => {
        if (answer == "quit") {
            console.log(chalk.cyan(greetingQuestions.answer.quit));
            rl.close();
            return;
        } else if (answer == "next") {
            console.log(chalk.cyan(greetingQuestions.answer.next));
            askQuestions(personalData);
        }
    });
}

greeting(greetingQuestions);

const personalData = {
    nameQ: "What is your first name?",
    ageQ: "How old are you?",
    heightQ: "What is your height in Meters?",
    weightQ: "What is your weight in KGs?",
    submit:
        " Thanks for entering you data. Please type submit if you wisht to know your BMI!",
};

function askQuestions(answer) {
    rl.question(chalk.green(personalData.nameQ), (answer) => {
        if (answer) {
            console.log(`Hello ${answer}`);
            rl.question(chalk.green(personalData.ageQ), (answer) => {
                if (answer == "quit") {
                    console.log(chalk.yellow("GoodBye"));
                    rl.close();
                } else if (answer === NaN || answer == "") {
                    console.log(
                        chalk.red(
                            "Please Enter a Valid Answer or Type 'Quite to Terminate"
                        )
                    );
                } else if (answer) {
                    rl.question(chalk.green(personalData.heightQ), (answer) => {
                        if (answer == "quit") {
                            console.log(chalk.yellow("GoodBye"));
                            rl.close();
                        } else if (Number.isNaN(answer) || answer == "") {
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
                                    if (answer == "quit") {
                                        console.log(chalk.yellow("GoodBye"));
                                        rl.close();
                                    } else if (answer === NaN || answer == "") {
                                        console.log(
                                            chalk.red(
                                                "Please Enter a Valid Answer or Type 'Quite to Terminate"
                                            )
                                        );
                                    } else if (answer) {
                                        var weightAnswer = answer;
                                        rl.question(
                                            chalk.green(personalData.submit),
                                            (answer) => {
                                                if (answer == "quit") {
                                                    console.log(
                                                        chalk.yellow("GoodBye")
                                                    );
                                                    rl.close();
                                                } else if (answer == "submit")
                                                    console.log(
                                                        "The BMI indictaes the following weight status: "
                                                    );
                                                console.log(
                                                    "- Underweight: BMI Below 18.5"
                                                );
                                                console.log(
                                                    "- Normal: BMI between 18.5 ~ 24.9"
                                                );
                                                console.log(
                                                    "- Overweight: BMI between 25. ~ 29.9"
                                                );
                                                console.log(
                                                    "- Obese: BMI 30 and above"
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
    console.log("Your BMI is: ", BMI.toFixed(2));
}
