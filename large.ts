import {
  getDefaultPageContextInit,
  getDefaultResponseHandler,
} from "@vite-plugin-vercel/vike/helpers";

export default async function handler(
  request: Parameters<typeof getDefaultPageContextInit>[0],
  response: Parameters<typeof getDefaultResponseHandler>[0]
) {
  console.info(`Serverless function ${request.url} was invoked`);

  response.statusCode = 200;
  response.setHeader("x-serverless-function", request.url as string);
  response.setHeader("Content-Type", "text/plain");
  return response.send(
    "a".repeat(10000000 + (request.url.includes("plusone") ? 1 : 0))
  );
}
