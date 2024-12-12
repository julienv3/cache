export { onRenderHtml };

import { escapeInject } from "vike/server";
import type { OnRenderHtmlAsync } from "vike/types";

const onRenderHtml: OnRenderHtmlAsync = async (
  pageContext
): ReturnType<OnRenderHtmlAsync> => {
  const { pageHtml } = pageContext;

  return escapeInject`<!doctype html>
	<html>
		<body>
			<div id="react-root">${pageHtml}</div>
		</body>
	</html>`;
};
