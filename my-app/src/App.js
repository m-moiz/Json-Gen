import React, { useEffect, useState } from "react";
import { jsonCreator } from "./lib/jsonGenerator";
import JsonComponent from "./jsonComponent";
import { schema } from "./inputSchema";
import { outOfBounds, generateFileUrl } from "./lib/utils";
import {
  MAX_ALLOWED_NUMBER_OF_OBJECTS,
  MIN_ALLOWED_NUMBER_OF_OBJECTS,
  OUTPUT_PREVIEW_LENGTH,
} from "./config";
import Loader from "./loader";
import "./App.css";

function App() {
  const [inputSchema, setInputSchema] = useState(schema);
  const [jsonOutput, setJsonOutput] = useState(null);
  const [numberOfObjects, setNumberOfObjects] = useState(1);
  const [isGenerating, setIsGenerating] = useState(false);
  const [generateEnabled, setGenerateEnabled] = useState(false);
  const [downloadEnabled, setDownloadEnabled] = useState(false);
  const [showMessage, setShowMessage] = useState(false);

  const jsonGenerator = async () => {
    return jsonCreator(inputSchema, numberOfObjects);
  };

  const setJson = async () => {
    setJsonOutput(await jsonGenerator());
    setDownloadEnabled(true);
  };

  useEffect(() => {
    if (isGenerating === true) {
      setTimeout(() => {
        setIsGenerating(false);
      }, 500);
    }
  }, [isGenerating]);

  const createLinkElement = (url) => {
    const link = document.createElement("a");
    link.download = "data.json";
    link.href = url;
    link.click();
    setDownloadEnabled(false);
  };

  let placeholder = jsonOutput
    ? jsonOutput.slice(0, OUTPUT_PREVIEW_LENGTH)
    : [];

  return (
    <div className="App">
      <header className="App-header">
        <h1>Json Generator</h1>
      </header>
      <div className="json-generator">
        <section className="json-editor">
          <JsonComponent
            id="1"
            schema={inputSchema}
            isViewOnly={false}
            onChange={(e) => {
              setInputSchema(e.jsObject);
            }}
          />
        </section>
        <section className="json-viewer">
          <JsonComponent id="2" isViewOnly={true} schema={placeholder} />
        </section>
      </div>
      <div className="input-container">
        <input
          placeholder="Number of Objects"
          className="input"
          onChange={(e) => {
            if (outOfBounds(e)) {
              setShowMessage(true);
              setDownloadEnabled(false);
              setGenerateEnabled(false);
            } else {
              setShowMessage(false);
              setGenerateEnabled(true);
            }
            setNumberOfObjects(e.target.value);
          }}
        />
        <button
          className="button"
          onClick={() => {
            setIsGenerating(true);
            setDownloadEnabled(false);
            setJson();
          }}
          disabled={!generateEnabled}
        >
          Generate
        </button>
        {isGenerating ? (
          <Loader />
        ) : (
          <button
            disabled={!downloadEnabled}
            className="button dwnld-button"
            onClick={() => {
              const url = generateFileUrl(jsonOutput);
              createLinkElement(url);
            }}
          >
            Download
          </button>
        )}
      </div>
      {showMessage ? (
        <p
          style={{
            color: "white",
            display: "flex",
            justifyContent: "center",
            margin: "0",
          }}
        >
          Value must be a number between {MIN_ALLOWED_NUMBER_OF_OBJECTS} and{" "}
          {MAX_ALLOWED_NUMBER_OF_OBJECTS}
        </p>
      ) : null}
    </div>
  );
}

export default App;
