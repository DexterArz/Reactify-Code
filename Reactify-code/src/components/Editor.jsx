import React, { useEffect, useState } from "react";
import EditorTab, { useMonaco } from "@monaco-editor/react";
import axios from "axios";
import { useLocation, useNavigate } from "react-router-dom";


const Editor = () => {

  const navigate = useNavigate();
  const monaco = useMonaco();
  const { state } = useLocation();
  const [theme, setTheme] = useState("catppuccin-dark");
  const [currentLanguage, setCurrentLanguage] = useState("");
  const [output, setOutput] = useState("");
  const [value, setValue] = useState("// start writing your code");
const [currentVersion, setcurrentVersion] = useState('')

  console.log(currentLanguage);
  

  // Load file content if passed via state
  useEffect(() => {
    if (state) {
      setcurrentVersion(state.version)
      setValue(state.content);
      setCurrentLanguage(state.language);

    }
  }, [state]);

  const Api = axios.create({
  baseURL: "https://emkc.org/api/v2/piston",
  withCredentials: false,  // Explicitly disable credentials
});


  // Run code using the Piston API
  const runCode = async () => {
    try {
      const resp = await Api.post("/execute", {
        language: currentLanguage,
        version: currentVersion,
        files: [{ 
          content: value }],
      });
      setOutput(resp.data.run.output);
    } catch (err) {
      setOutput(`Error: ${err.response?.data?.message || err.message}`);
    }
  };





  const saveFile = async () => {
    try {
      const fileData = {
        fileName: state?.fileName || "Untitled",
        content: value,
        language: currentLanguage,
      };

    const response = await axios.post(`${import.meta.env.VITE_BACKEND_URL}/api/v1/file/upload`, fileData,{
  withCredentials: true,   // Ensures cookies are sent with the request
});

console.log(response);


      if (response.status === 201) {
        alert("File saved successfully!");
      } else {
        alert("Error saving file: " + response.data.error);
      }
      navigate("/userdashboard");
      
    } catch (err) {
      alert("Failed to save file: " + (err.response?.data?.message || err.message));
    }
  };

  useEffect(() => {
    if (!monaco) return;

    monaco.editor.defineTheme("catppuccin-dark", {
      base: "vs-dark",
      inherit: true,
      rules: [
        { token: "comment", foreground: "9399b2", fontStyle: "italic" },
        { token: "keyword", foreground: "f38ba8" },
        { token: "string", foreground: "a6e3a1" },
        { token: "variable", foreground: "cba6f7" },
        { token: "number", foreground: "fab387" },
      ],
      colors: {
        "editor.foreground": "#cdd6f4",
        "editor.background": "#1e1e2e",
        "editor.selectionBackground": "#585b70AA",
        "editor.lineHighlightBackground": "#313244",
        "editorCursor.foreground": "#f5e0dc",
        "editorWhitespace.foreground": "#6c7086",
      },
    });

    monaco.editor.defineTheme("catppuccin-light", {
      base: "vs",
      inherit: true,
      rules: [
        { token: "comment", foreground: "7c7f93", fontStyle: "italic" },
        { token: "keyword", foreground: "d20f39" },
        { token: "string", foreground: "40a02b" },
        { token: "variable", foreground: "8839ef" },
        { token: "number", foreground: "fe640b" },
      ],
      colors: {
        "editor.foreground": "#4c4f69",
        "editor.background": "#eff1f5",
        "editor.selectionBackground": "#dce0e8",
        "editor.lineHighlightBackground": "#e6e9ef",
        "editorCursor.foreground": "#dc8a78",
        "editorWhitespace.foreground": "#acb0be",
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
    <div className={`editor ${theme === "catppuccin-dark" ? "dark-theme" : "light-theme"}`}>
      <div className="editorNav">
        <h4>{state?.fileName || "Untitled"}</h4>
        <div className="btnContainer">
          <button className="btn" onClick={runCode}>
            <i className="ri-play-large-fill"></i> Run
          </button>
          <button className="btn" onClick={saveFile}>
            <i class="ri-save-3-fill"></i>
          </button>

          <button className="btn" onClick={toggleTheme}>
            {theme === "catppuccin-dark" ? (
              <i className="ri-sun-line"></i>
            ) : (
              <i className="ri-moon-line"></i>
            )}
          </button>
        </div>
      </div>

      <div className="editorWindow">
        <EditorTab
          height="75vh"
          language={currentLanguage}
          value={value}
          theme={theme}
          options={{
            fontFamily: "JetBrains Mono",
            fontSize: 14,
            minimap: { enabled: false },
          }}
          onChange={(val) => setValue(val || "")}
        />
      </div>

      <div className="outputWindow">
        <div className="terminaltitle">
          <h1>
            <i className="ri-terminal-line"></i> Output
          </h1>
        </div>
        <div className="outPut">
          {output.split("\n").map((line, index) => (
            <div key={index} className="output-line">
              <i className="ri-arrow-right-double-fill"></i>
              <span style={{ whiteSpace: "pre" }}>{line}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Editor;
