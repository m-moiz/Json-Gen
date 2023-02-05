import JSONInput from "react-json-editor-ajrm";
import React, { useState } from "react";
import locale from "react-json-editor-ajrm/locale/en";
import { jsonCreator } from "./jsonGenerator";
import "./App.css";

function App() {
  const schema = {
    name: "John Doe",
    age: 32,
    address: {
      street: "123 Main St",
      city: "Anytown",
      state: "CA",
      zip: "12345",
    },
    phone: [
      {
        type: "home",
        number: "123-456-7890",
      },
      {
        type: "cell",
        number: "123-456-7890",
      },
    ],
  };
  const [inputSchema, setInputSchema] = useState(schema);

  const [jsonOutput, setJsonOutput] = useState({});

  return (
    <div className="App">
      <h1>Json Generator</h1>
      <div className="json-generator">
        <section className="json-editor">
          <JSONInput
            id="a_unique_id"
            placeholder={inputSchema}
            colors={{
              string: "#DAA520", // overrides theme colors with whatever color value you want
            }}
            locale={locale}
            height="550px"
            width="100%"
            onChange={(e) => {
              setInputSchema(e.jsObject);
            }}
          />
        </section>
        <section className="json-viewer">
          <JSONInput
            id="a_unique_id"
            placeholder={jsonOutput}
            viewOnly={true}
            colors={{
              string: "#DAA520", // overrides theme colors with whatever color value you want
            }}
            locale={locale}
            height="550px"
            width="100%"
          />
        </section>
      </div>
      <button onClick={() => setJsonOutput(jsonCreator(inputSchema, 2))}>
        Generate
      </button>
    </div>
  );
}

export default App;
