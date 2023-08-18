const { Configuration, OpenAIApi } = require("openai");

const configuration = new Configuration({
  apiKey: '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',
});
const openai = new OpenAIApi(configuration);

async function completion(text){
openai.createCompletion({
  model: "text-davinci-003",
  prompt: text,
})
.then(res=>res.json())
.then(data=>console.log(data.data))
}

console.log(completion('test '));