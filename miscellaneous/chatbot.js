//In ai.js
const {OpenAI } = require ('openai');
const openai = new OpenAI({
    apiKey: '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',
}); 



async function ask(prompt) {
    const chatCompletion = await openai.chat.completions.create({
        model: "gpt-3.5-turbo",
        messages: [{"role": "user", "content": "Hello!"}],
      });
    console.log(chatCompletion.choices[0].message);
    const answer = response.data.choices[0].text;
    return answer;
}
//Export the "ask" function
module.exports = {
    ask,
};

//new


