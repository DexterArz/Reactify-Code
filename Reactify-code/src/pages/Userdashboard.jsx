import React, { useEffect, useState } from "react";
import File from "../components/File";
import axios from "axios";

const Userdashboard = () => {

  const [fileName, setFileName] = useState("");
  const [files, setFiles] = useState([]);

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
    try {
      await axios.post("/api/files", { fileName });
      setFileName("");
      // Refresh file list
      const response = await axios.get("/api/files");
      setFiles(response.data);
    } catch (err) {
      console.error("Error creating file:", err.message);
    }
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
            <File key={file._id} fileName={file.fileName} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Userdashboard;
