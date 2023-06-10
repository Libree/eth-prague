import { OpenAI } from "langchain/llms/openai";

export const runCommand = async (values) => {
    const model = new OpenAI({ openAIApiKey: process.env.OPENAI_API_KEY, temperature: 0.9 });

    const res = await model.call(
        `Given this array where the first element is the timestamp of a day and the second 
        the cummulative amount of sales, give me a projection of the following 15 values.
        Return only a json object to parse it, with the values even if timestamps are not accurated to a model.
        Return the json object with the previous values and the projected values
        
        Current values ${values}

        The output should be an array with an array per occurence

        similar than this

        {
            response: [[timestamp, amount], [timestamp, amount]]
        }
        `
    );

    const objectReponse = res.substring(res.indexOf("{"), res.indexOf("}")+1) 

    console.log({objectReponse})

    const parsed = JSON.parse(objectReponse)

    return parsed.response

};