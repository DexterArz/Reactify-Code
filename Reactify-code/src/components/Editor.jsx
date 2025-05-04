import React, { useEffect, useState, useRef } from "react";
import EditorTab, { useMonaco } from "@monaco-editor/react";
import axios from "axios";
const Editor = () => {
  const monaco = useMonaco();
  const [theme, setTheme] = useState("catppuccin-dark"); // default theme
  const [currentLanguage, setcurrentLanguage] = useState("javascript");
  const [output, setOutput] = useState("");

  const [value, setValue] = useState("// start writing your code");

  const Api = axios.create({
    baseURL: "https://emkc.org/api/v2/piston",
  });

  const runCode = async () => {
    try {
      const resp = await Api.post("/execute", {
        language: "javascript", // or 'node'

        version: "18.15.0",

        files: [
          {
            name: "main.js",

            content: value, // value is your code string
          },
        ],
      });

      setOutput(resp.data.run.output); // this gives you stdout
    } catch (err) {
      setOutput(`Error: ${err.response?.data?.message || err.message}`);
    }
  };

  // Define themes when Monaco is ready
  useEffect(() => {
    if (!monaco) return;

    // Dark theme (Mocha)
    monaco.editor.defineTheme("catppuccin-dark", {
      base: "vs-dark",
      inherit: true,
      rules: [
        { token: "comment", foreground: "a6accd", fontStyle: "italic" },
        { token: "keyword", foreground: "f38ba8" },
        { token: "variable", foreground: "f8c0fc" },
      ],
      colors: {
        "editor.foreground": "#D9E0EE",
        "editor.background": "#1E1E2E",
        "editor.selectionBackground": "#D9E0EE44",
        "editor.lineHighlightBackground": "#2A2A3A",
        "editorCursor.foreground": "#F8F8F2",
        "editorWhitespace.foreground": "#D9E0EE50",
      },
    });

    // Light theme (Latte)
    monaco.editor.defineTheme("catppuccin-light", {
      base: "vs",
      inherit: true,
      rules: [
        { token: "comment", foreground: "7287FD", fontStyle: "italic" },
        { token: "keyword", foreground: "D20F39" },
        { token: "variable", foreground: "8839EF" },
      ],
      colors: {
        "editor.foreground": "#4C4F69",
        "editor.background": "#EFF1F5",
        "editor.selectionBackground": "#DCE0E8",
        "editor.lineHighlightBackground": "#E6E9EF",
        "editorCursor.foreground": "#DC8A78",
        "editorWhitespace.foreground": "#BCC0CC",
      },
    });

    monaco.editor.setTheme(theme);
  }, [monaco, theme]);

  const toggleTheme = () => {
    setTheme((prev) =>
      prev === "catppuccin-dark" ? "catppuccin-light" : "catppuccin-dark"
    );
  };

  return (
    <div
      className={`editor ${
        theme === "catppuccin-dark" ? "dark-theme" : "light-theme"
      }`}
    >
      <div className="outputWindow">
        <div className="terminaltitle">
          <h1>
            {" "}
            <i class="ri-terminal-line"></i> output{" "}
          </h1>
        </div>

        <div className="outPut">
          {output.split("\n").map((line, index) => (
            <div key={index} className="output-line">
              <i className="ri-arrow-right-double-fill"></i> <span>{line}</span>
            </div>
          ))}
        </div>
      </div>
      <div className="editorNav">
        <h4>{currentLanguage}</h4>
        <div className="btnContainer">
          <button className="btn" onClick={runCode}>
            <i class="ri-play-large-fill"></i>
          </button>
          <button className="btn" onClick={toggleTheme}>
            {theme === "catppuccin-dark" ? (
              <i class="ri-sun-line"></i>
            ) : (
              <i class="ri-moon-line"></i>
            )}
          </button>
        </div>
      </div>
      <div className="editorWindow">
        <EditorTab
          height="90vh"
          defaultLanguage={currentLanguage}
          defaultValue="// some comment"
          theme={theme}
          options={{
            fontSize: 14.5,
            minimap: { enabled: false }, // <-- Change text size here
          }}
          onChange={(value) => setValue(value)}
        />
      </div>
    </div>
  );
};

export default Editor;
