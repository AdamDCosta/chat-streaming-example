import OpenAI from "openai";
import type { ChatCompletionMessageParam } from "openai/resources/index.mjs";

const openai = new OpenAI({
  apiKey: process.env["OPENAI_API_KEY"],
});

export const inMemoryMessages: ChatCompletionMessageParam[] = [
  { role: "system", content: "You are a typescript expert." },
];

export default async function* chatCompletion() {
  const stream = await openai.chat.completions.create({
    model: "gpt-4-turbo",
    messages: inMemoryMessages as ChatCompletionMessageParam[],
    stream: true,
  });
  for await (const chunk of stream) {
    yield chunk.choices[0]?.delta?.content || "";
  }
}

export function addMessage(message: ChatCompletionMessageParam) {
  inMemoryMessages.push(message);
}
