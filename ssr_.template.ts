import {
  getDefaultEmptyResponseHandler,
  getDefaultPageContextInit,
  getDefaultResponseHandler,
} from "@vite-plugin-vercel/vike/helpers";
import { renderPage } from "vike/server";

export default async function handler(
  request: Parameters<typeof getDefaultPageContextInit>[0],
  response: Parameters<typeof getDefaultResponseHandler>[0]
) {
  const pageContextInit = getDefaultPageContextInit(request);
  const userAgent = request.headers["user-agent"]!;

  const pageContext = await renderPage({
    ...pageContextInit,
    userAgent,
    host: request.headers.host!,
  });

  const { httpResponse } = pageContext;

  if (!httpResponse) {
    return getDefaultEmptyResponseHandler(response);
  }

  const { statusCode, contentType } = httpResponse;
  response.statusCode = statusCode;
  response.setHeader("content-type", contentType);
  response.setHeader("x-serverless-function", request.url + "");
  return httpResponse.pipe(response);
}
