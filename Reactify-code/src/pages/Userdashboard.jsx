import React, { useEffect, useState } from "react";
import File from "../components/File";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Userdashboard = () => {
  const navigate = useNavigate();

  const [fileName, setFileName] = useState("");
  const [language1, setLanguage1] = useState("");
  const [lanVer, setlanVer] = useState("");
  const [files, setFiles] = useState([]);
  const [showCreateFile, setShowCreateFile] = useState(false); // Toggle createFile section

  useEffect(() => {
    const { runtime, version } = getLanguageDetails(fileName);
    setLanguage1(runtime);
    setlanVer(version);
  }, [fileName]);

  useEffect(() => {
    const fetchFiles = async () => {
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_BACKEND_URL}/api/v1/user/user-files`
        );
        console.log("Fetched files:", response.data);
        setFiles(response.data.files);
      } catch (err) {
        console.error("Error fetching files:", err.message);
      }
    };
    fetchFiles();
  }, []);

  const createFile = async () => {
    navigate("/editor", {
      state: {
        version: lanVer,
        fileName: fileName,
        language: language1,
        content: "//hii",
      },
    });
  };

  return (
    <div className="dasMain">
      {showCreateFile && (
        <div className="createFile">
           <div className="close"><button  onClick={() => setShowCreateFile(false)}>
              <i class="ri-close-fill"></i>
            </button></div>
          <div
            className="Ctitle">
            <h4>Create File</h4>
           
          </div>
          <div className="Cinput">
            <input
              className="field"
              type="text"
              placeholder="Filename"
              value={fileName}
              onChange={(e) => setFileName(e.target.value)}
            />
            <button className="btn" onClick={createFile}>
              Create File
            </button>
          </div>
        </div>
      )}

      <div className="dasNav">
        <h4>ReactifyCode</h4>
        <div className="toggles">
          <button className="btn">
            <i className="ri-logout-box-line"></i> Logout
          </button>
        </div>
      </div>

      <div className="fileManager">
        <div className="part1">
          <h1>File Manager</h1>
          <button
            className="btn"
            onClick={() => setShowCreateFile((prev) => !prev)}
          >
            <i className="ri-add-large-line"></i> Add File
          </button>
        </div>
        <div className="folder">
          {files.map((file) => (
            <File key={file._id} fileName={file.fileName} fileId={file._id} />
          ))}
        </div>
      </div>
    </div>
  );
};

export const languageMap = {
  js: { runtime: "javascript", version: "18.15.0" },
  ts: { runtime: "typescript", version: "5.0.3" },
  py: { runtime: "python", version: "3.10.0" },
  java: { runtime: "java", version: "15.0.2" },
  cs: { runtime: "csharp", version: "6.12.0" },
  php: { runtime: "php", version: "8.2.3" },
  cpp: { runtime: "cpp", version: "10.2.0" },
  c: { runtime: "c", version: "10.2.0" },
  rb: { runtime: "ruby", version: "3.0.0" },
  go: { runtime: "go", version: "1.16.0" },
  rs: { runtime: "rust", version: "1.52.1" },
  kt: { runtime: "kotlin", version: "1.5.0" },
  swift: { runtime: "swift", version: "5.3.3" },
  dart: { runtime: "dart", version: "2.13.4" },
  html: { runtime: "html", version: "n/a" },
  css: { runtime: "css", version: "n/a" },
  scss: { runtime: "scss", version: "n/a" },
  json: { runtime: "json", version: "n/a" },
  xml: { runtime: "xml", version: "n/a" },
  yaml: { runtime: "yaml", version: "n/a" },
  md: { runtime: "markdown", version: "n/a" },
  sql: { runtime: "sql", version: "n/a" },
  r: { runtime: "r", version: "n/a" },
  sh: { runtime: "bash", version: "5.1.0" },
  pl: { runtime: "perl", version: "5.32.1" },
  lua: { runtime: "lua", version: "5.4.3" },
  tex: { runtime: "latex", version: "n/a" },
  hs: { runtime: "haskell", version: "8.10.4" },
  scala: { runtime: "scala", version: "2.13.6" },
  jsx: { runtime: "javascript", version: "18.15.0" },
  tsx: { runtime: "typescript", version: "5.0.3" },
  vue: { runtime: "javascript", version: "18.15.0" },
  ipynb: { runtime: "python", version: "3.10.0" },
  bat: { runtime: "bat", version: "n/a" },
  cmd: { runtime: "cmd", version: "n/a" },
  ps1: { runtime: "powershell", version: "n/a" },
  vb: { runtime: "vb", version: "n/a" },
  asm: { runtime: "assembly", version: "n/a" },
  ada: { runtime: "ada", version: "n/a" },
  pas: { runtime: "pascal", version: "n/a" },
  m: { runtime: "objective-c", version: "n/a" },
};

export const getLanguageDetails = (fileName) => {
  const ext = fileName.split(".").pop().toLowerCase();
  return languageMap[ext] || { runtime: "unknown", version: "n/a" };
};

export default Userdashboard;
