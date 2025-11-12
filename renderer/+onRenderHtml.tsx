export { onRenderHtml };

import { renderToString } from "react-dom/server";
import { dangerouslySkipEscape, escapeInject } from "vike/server";
import type { OnRenderHtmlAsync } from "vike/types";

const onRenderHtml: OnRenderHtmlAsync = async (
  pageContext
): ReturnType<OnRenderHtmlAsync> => {
  const { pageHtml, errorWhileRendering, Page } = pageContext;

  if (errorWhileRendering) {
    // Render error page if there's a problem
    return dangerouslySkipEscape(
      renderToString(<Page error={errorWhileRendering} />)
    );
  }

  return escapeInject`<!doctype html>
	<html>
		<body>
			<div id="react-root">${pageHtml}</div>
		</body>
	</html>`;
};
