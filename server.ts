import { getStream } from "./pages/Hello";

await Bun.build({
  entrypoints: ["./pages/hydrate.tsx"],
  outdir: "./build",
  target: 'browser',
  splitting: true,
});

Bun.serve({
  port: 3000,
  fetch: async (req) => {
    const url = new URL(req.url);
    if (url.pathname === "/welcome") {
      return new Response("Bun!");
    }

    if (url.pathname === "/build/hydrate.js") {
      const file = Bun.file(`.${url.pathname}`);
      return new Response(file);
    }

    if (url.pathname === "/ssr-hello") {
      return new Response(await getStream(), {
        headers: { "Content-Type": "text/html" },
      });
    }

    return new Response("404!");
  },
});
