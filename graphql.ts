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
  response.setHeader("x-serverless-function", request.url as string);
  response.setHeader("content-type", "application/json");

  if (crash) {
    response.statusCode = 500;
    response.setHeader("Cache-Control", "no-store, no-cache, must-revalidate");
    return response.json({
      message: "I crashed :(",
    });
  } else {
    response.statusCode = 200;
    return response.json({
      message: `Hello World from ${request.url}`,
    });
  }
}
