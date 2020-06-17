const readline = require("readline");
const chalk = require("chalk");

// console.log(chalk.magenta('hi msg! :)'));

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
});

const conversation = {
    q: "Is it Friday yet????? ",
    answers: {
        yes: {
            q: "Great! What are your weekend plans?",
        },
        no: "Too bad... bye!",
    },
};

// console.log(conversation.q);
// console.log(conversation.answers['no']);

function askQuestion(story) {
    rl.question(chalk.cyan(story.q), (answer) => {
        // console.log('check answer: ', story.answers[answer]);
        if (answer === "yes") {
            console.log(chalk.green(conversation.answers["yes"].q));
        } else if (answer === "no") {
            console.log(chalk.green(conversation.answers["no"]));
        } else {
            console.log(
                chalk.red("that's not the right answer ... try again!")
            );
            rl.close();
            // askQuestion(story);
        }
    });
}

askQuestion(conversation);
