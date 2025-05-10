import React from 'react'
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const File = ({fileName,fileId}) => {
// console.log(file?.fileName);


  const navigate = useNavigate();

  // Function to open the file in the editor
  const openFile = async () => {
    try {
      const response = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/api/v1/file/${fileId}`);
      if (response.status === 200) {
        navigate("/editor", { state: response.data });
      }
    } catch (err) {
      console.error("Error opening file:", err.message);
      alert("Failed to open file");
    }
  };

  return (
    <>
    <div className="fileBg">
   <div className="lanIcon">
   <i class="ri-javascript-fill"></i>
   {fileName}
   </div>
   <button className='btn' onClick={openFile}>open in editor</button>
    </div>
    </>
  )
}

export default File
