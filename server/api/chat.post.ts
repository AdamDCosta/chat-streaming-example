import type { ChatCompletionMessageParam } from "openai/resources/index.mjs";
import { addMessage } from "../helpers/chat-completion";

export default defineEventHandler(async (event) => {
  const body = (await readBody(event)) as ChatCompletionMessageParam;
  console.log(body);

  if (!body.content?.length) {
    throw createError({
      statusCode: 400,
      statusMessage: "No message content provided",
    });
  }

  addMessage(body);

  event.res.statusCode = 200;
  return { message: "Message added" };
});
