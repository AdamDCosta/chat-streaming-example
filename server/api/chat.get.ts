import chatCompletion from "../helpers/chat-completion";

export default defineEventHandler(async (event) => {
  // Enable SSE endpoint
  setHeader(event, "cache-control", "no-cache");
  setHeader(event, "connection", "keep-alive");
  setHeader(event, "content-type", "text/event-stream");
  setResponseStatus(event, 200);

  try {
    for await (const chunk of chatCompletion()) {
      const chunkSingleLine = chunk.replace(/\n/g, "\\n");
      if (!event.node.res.writableEnded) {
        event.node.res.write(`data: ${chunkSingleLine}\n\n`);
      } else {
        break;
      }
    }
  } catch (error) {
    console.error("Error occurred:", error);
    if (!event.node.res.writableEnded) {
      event.node.res.write(
        `event: error\ndata: ${(error as Error).message}\n\n`
      );
      event.node.res.end();
    }
  } finally {
    if (!event.node.res.writableEnded) {
      event.node.res.end();
    }
  }
});
