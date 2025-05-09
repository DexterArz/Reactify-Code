import React from "react";
import File from "../components/File";

const Userdashboard = () => {
  return (
    <>
      <div className="dasMain">
        <div className="createFile">
          <div className="Ctitle">
            <h4>create-file</h4>
          </div>
          <div className="Cinput">
            <input className="field" type="text" placeholder="filename" />
            <button className="btn">create-file</button>
          </div>
        </div>
        <div className="dasNav">
          <h4>ReactifyCode</h4>
          <div className="toggles">
            <button className="btn">
              <i class="ri-logout-box-line"></i>
            </button>
          </div>
        </div>
        <div className="fileManager">
          <div className="part1">
            <h1>File-Manager</h1>
            <button className="btn">
              <i class="ri-add-large-line"></i> Add File
            </button>
          </div>
          <div className="folder">
            {[...Array(2)].map((_, index) => (
              <File key={index} />
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default Userdashboard;
