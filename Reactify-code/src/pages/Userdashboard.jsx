import React, { useEffect, useState } from "react";
import File from "../components/File";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Userdashboard = () => {

  const navigate = useNavigate();


  const [fileName, setFileName] = useState("");
  const [language1, setLanguage1] = useState("");
  const [files, setFiles] = useState([]);
  
  useEffect(()=>{
    setLanguage1(getLanguage(fileName));
    console.log("Language1:",language1);
    
  },[fileName])

  // Fetch all files on component mount
  useEffect(() => {
    const fetchFiles = async () => {
      try {
        const response = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/api/v1/user/user-files`);
        console.log("Fetched files:", response.data);
        
        setFiles(response.data.files);
      } catch (err) {
        console.error("Error fetching files:", err.message);
      }
    };
    fetchFiles();
  }, []);

  // Create a new file
  const createFile = async () => {
         navigate("/editor", {
        state: {
          fileName: fileName,
          language: language1,
          content: "//hii",
        },
      });
    
  };

   


  


  return (
    <div className="dasMain">
      <div className="createFile">
        <div className="Ctitle">
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
          <button className="btn">
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


const languageMap = {
  js: "JavaScript",
  ts: "TypeScript",
  py: "Python",
  rb: "Ruby",
  java: "Java",
  cpp: "C++",
  c: "C",
  cs: "C#",
  php: "PHP",
  go: "Go",
  rs: "Rust",
  kt: "Kotlin",
  swift: "Swift",
  dart: "Dart",
  html: "HTML",
  css: "CSS",
  scss: "SASS/SCSS",
  json: "JSON",
  xml: "XML",
  yaml: "YAML",
  md: "Markdown",
  sql: "SQL",
  r: "R",
  sh: "Shell Script",
  pl: "Perl",
  lua: "Lua",
  tex: "LaTeX",
  hs: "Haskell",
  scala: "Scala",
  jsx: "React (JavaScript)",
  tsx: "React (TypeScript)",
  vue: "Vue",
  pyc: "Python Compiled",
  pyo: "Python Optimized",
  ipynb: "Jupyter Notebook",
  bat: "Batch File",
  cmd: "Command Script",
  ps1: "PowerShell",
  vb: "Visual Basic",
  asm: "Assembly",
  ada: "Ada",
  pas: "Pascal",
  m: "MATLAB/Objective-C",
};


export const getLanguage = (fileName) => {
  // Extract the file extension
  const extension = fileName.split(".").pop().toLowerCase();

  // Find the full form from the language map
  return languageMap[extension] || "Unknown Language";
};

export default Userdashboard;
