import { useEffect, useState } from "react";

export const Page = () => {
  const [query, setQuery] = useState({});
  const [cache, setCache] = useState({});
  const [large, setLarge] = useState({});
  const [largePlusOne, setLargePlusOne] = useState({});
  const [largeNoCache, setLargeNoCache] = useState({});
  const [largeNoCachePlusOne, setLargeNoCachePlusOne] = useState({});

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
    }
  }, []);

  useEffect(() => {
    // hit /query
    fetch(new URL("/query", location.origin).toString(), {
      method: "POST",
    })
      .then((r) => r.json())
      .then(setQuery);
    // hit /cache
    fetch(new URL("/cache", location.origin).toString(), {
      method: "POST",
    }).then((r) =>
      r.json().then((json) =>
        setCache({
          ...json,
          Age: r.headers.get("Age"),
          "X-Vercel-Cache": r.headers.get("x-vercel-cache"),
        })
      )
    );
    // hit /large
    fetch(new URL("/large", location.origin).toString(), {
      method: "POST",
    }).then((r) =>
      r.text().then((text) =>
        setLarge({
          Length: text.length,
          Age: r.headers.get("Age"),
          "X-Vercel-Cache": r.headers.get("x-vercel-cache"),
        })
      )
    );
    // hit /largeplusone
    fetch(new URL("/largeplusone", location.origin).toString(), {
      method: "POST",
    }).then((r) =>
      r.text().then((text) =>
        setLargePlusOne({
          Length: text.length,
          Age: r.headers.get("Age"),
          "X-Vercel-Cache": r.headers.get("x-vercel-cache"),
        })
      )
    );
    // hit /largenocache
    fetch(new URL("/largenocache", location.origin).toString(), {
      method: "POST",
    }).then((r) =>
      r.text().then((text) =>
        setLargeNoCache({
          Length: text.length,
          Age: r.headers.get("Age"),
          "X-Vercel-Cache": r.headers.get("x-vercel-cache"),
        })
      )
    );
    // hit /largenocacheplusone
    fetch(new URL("/largenocacheplusone", location.origin).toString(), {
      method: "POST",
    }).then((r) =>
      r.text().then((text) =>
        setLargeNoCachePlusOne({
          Length: text.length,
          Age: r.headers.get("Age"),
          "X-Vercel-Cache": r.headers.get("x-vercel-cache"),
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
      <h2>Large:</h2>
      <pre>{JSON.stringify({ ...large }, null, 2)}</pre>
      <h2>Large plus one:</h2>
      <pre>{JSON.stringify({ ...largePlusOne }, null, 2)}</pre>
      <h2>Large no cache:</h2>
      <pre>{JSON.stringify({ ...largeNoCache }, null, 2)}</pre>
      <h2>Large no cache plus one:</h2>
      <pre>{JSON.stringify({ ...largeNoCachePlusOne }, null, 2)}</pre>
    </>
  );
};
