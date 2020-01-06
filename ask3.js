const readline = require('readline');

const AskQuestion3 = (rl, question) => {
    return new Promise(resolve => {
        rl.question(question, (answer) => {
            resolve(answer);
        });
    });
}

const Ask3 = function(questions) {
    return new Promise(async resolve => {
        let rl = readline.createInterface({
            input: process.stdin,
            output: process.stdout
        });

        let results = [];
        for(let i=0;i < questions.length;i++) {
            const result = await AskQuestion3(rl, questions[i]);
            results.push(result);
        }
        rl.close();
        resolve(results);
    })
}

module.exports = {
    askQuestions3: Ask3 
}