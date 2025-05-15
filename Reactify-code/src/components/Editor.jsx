import React, { useEffect, useState } from "react";
import EditorTab, { useMonaco } from "@monaco-editor/react";
import { useLocation, useNavigate } from "react-router-dom";
import api from '../config/axios';
import axios from "axios";

const Editor = () => {
  const navigate = useNavigate();
  const monaco = useMonaco();
  const { state } = useLocation();
  const [theme, setTheme] = useState("catppuccin-dark");
  const [currentLanguage, setCurrentLanguage] = useState("");
  const [output, setOutput] = useState("");
  const [value, setValue] = useState("// start writing your code");
  const [currentVersion, setCurrentVersion] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  console.log(currentLanguage);
  

  // Load file content if passed via state
  useEffect(() => {
    if (state) {
      setCurrentVersion(state.version);
      setValue(state.content);
      setCurrentLanguage(state.language);
    }
  }, [state]);

  const pistonApi = axios.create({
    baseURL: "https://emkc.org/api/v2/piston",
    headers: {
      'Content-Type': 'application/json',
    }
  });

  // Run code using the Piston API
  const runCode = async () => {
    setIsLoading(true);
    setError('');
    setOutput('');

    try {
      const response = await pistonApi.post("/execute", {
        language: currentLanguage,
        version: currentVersion,
        files: [{ content: value }],
      });
      setOutput(response.data.run.output);
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to execute code');
      setOutput('');
    } finally {
      setIsLoading(false);
    }
  };

  const saveFile = async () => {
    setIsLoading(true);
    setError('');

    try {
      const fileData = {
        fileName: state?.fileName || "Untitled",
        content: value,
        language: currentLanguage,
        version: currentVersion
      };

      const response = await api.post('/api/v1/file/upload', fileData);

      if (response.data.success) {
        navigate('/userdashboard');
      }
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to save file');
    } finally {
      setIsLoading(false);
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
    <div className="editor-container">
      <div className="editor-header">
        <select
          value={currentLanguage}
          onChange={(e) => setCurrentLanguage(e.target.value)}
          className="language-select"
        >
          <option value="">Select Language</option>
          <option value="javascript">JavaScript</option>
          <option value="python">Python</option>
          <option value="java">Java</option>
          {/* Add more language options as needed */}
        </select>
        
        <button 
          onClick={runCode}
          disabled={isLoading || !currentLanguage}
          className="run-button"
        >
          {isLoading ? 'Running...' : 'Run Code'}
        </button>
        
        <button 
          onClick={saveFile}
          disabled={isLoading}
          className="save-button"
        >
          {isLoading ? 'Saving...' : 'Save'}
        </button>
      </div>

      <EditorTab
        height="70vh"
        theme={theme}
        language={currentLanguage}
        value={value}
        onChange={setValue}
        options={{
          minimap: { enabled: false },
          fontSize: 16,
          wordWrap: 'on',
          automaticLayout: true,
        }}
      />

      {error && (
        <div className="error-message">
          {error}
        </div>
      )}

      {output && (
        <div className="output-container">
          <h3>Output:</h3>
          <pre>{output}</pre>
        </div>
      )}
    </div>
  );
};

export default Editor;
