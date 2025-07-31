const apiKey = "AIzaSyC4htJkfh3LwZiV5MQGHToevz7wzUfsWUs"; // fixed variable name

import {
  GoogleGenerativeAI,
  HarmCategory,
} from "@google/generative-ai";

const genAI = new GoogleGenerativeAI(apiKey); // use correct variable

const model = genAI.getGenerativeModel({
  model: "gemini-1.5-flash",
});

const generationConfig = {
  temperature: 1,
  topP: 0.95,
  topK: 40,
  maxOutputTokens: 20,
  responseMimeType: "text/plain",
};

async function run(prompt) {
  const chatSession = model.startChat({
    generationConfig,
    history: [],
  });

  const result = await chatSession.sendMessage(prompt);
  return result.response.text();
}

export default run;
