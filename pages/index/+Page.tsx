import { useEffect, useState } from "react";

export const Page = () => {
  const [query, setQuery] = useState({});
  const [cache, setCache] = useState({});
  const [crash, setCrash] = useState({});

  useEffect(() => {
    // Make sure we're not on "/", which seems to _always_ bypass cache
    if (location.pathname === "/") {
      location.pathname = "/home";
    }
    // Make it obvious it's not meant to work on localhost
    if (location.hostname === "localhost") {
      const msg =
        "This is not meant to work on localhost, this is testing serverless function caching";
      setQuery(msg);
      setCache(msg);
      setCrash(msg);
    }
  }, []);

  useEffect(() => {
    // hit /query
    fetch(new URL("/query", location.origin).toString(), {
      method: "POST",
    }).then((r) =>
      r.json().then((json) =>
        setQuery({
          ...json,
          Age: r.headers.get("Age"),
          status: r.status,
          "X-Vercel-Cache": r.headers.get("x-vercel-cache"),
        })
      )
    );
    // hit /cache
    fetch(new URL("/cache", location.origin).toString(), {
      method: "POST",
    }).then((r) =>
      r.json().then((json) =>
        setCache({
          ...json,
          Age: r.headers.get("Age"),
          status: r.status,
          "X-Vercel-Cache": r.headers.get("x-vercel-cache"),
        })
      )
    );
    // hit /crash
    fetch(new URL("/crash", location.origin).toString(), {
      method: "POST",
    }).then((r) =>
      r.json().then((json) =>
        setCrash({
          ...json,
          Age: r.headers.get("Age"),
          status: r.status,
          "X-Vercel-Cache": r.headers.get("x-vercel-cache"),
          // From experiementation, it looks like:
          // - MISS: 500 gets cached, next request will HIT
          // - STALE: 500 does not overwrite cache (Age does not reset)
        })
      )
    );
  }, []);

  return (
    <>
      <h1>Hello World</h1>
      <h2>Query:</h2>
      <pre>{JSON.stringify(query, null, 2)}</pre>
      <h2>Cache:</h2>
      <pre>{JSON.stringify(cache, null, 2)}</pre>
      <h2>Crash:</h2>
      <pre>{JSON.stringify(crash, null, 2)}</pre>
    </>
  );
};
