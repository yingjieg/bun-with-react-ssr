import { useState } from "react";
import { renderToReadableStream } from "react-dom/server";
import Layout from "./Layout";

function Hello() {
  const [count, setCount] = useState(0);

  return (
    <Layout>
      <div>
        <p>hello, page</p>
        <span>Count: {count}</span>
        <br />
        <button
          onClick={() => {
            setCount((i) => i + 1);
          }}
        >
          Click Me
        </button>
      </div>
    </Layout>
  );
}

export const getStream = async () => {
  return renderToReadableStream(<Hello />, {
    bootstrapScripts: ["/build/hydrate.js"],
  });
};

export default Hello;
