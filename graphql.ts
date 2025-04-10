import {
  getDefaultPageContextInit,
  getDefaultResponseHandler,
} from "@vite-plugin-vercel/vike/helpers";

export default async function handler(
  request: Parameters<typeof getDefaultPageContextInit>[0],
  response: Parameters<typeof getDefaultResponseHandler>[0]
) {
  console.info(`Serverless function ${request.url} was invoked`);

  const crash = request.url.includes("crash");
  response.statusCode = crash ? 500 : 200;
  response.setHeader("x-serverless-function", request.url as string);
  response.setHeader("content-type", "application/json");
  return response.json({
    message: crash ? "I crashed :(" : `Hello World from ${request.url}`,
  });
}
