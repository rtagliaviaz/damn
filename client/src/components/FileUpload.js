import React, { Fragment, useState } from "react";
import Message from "./Message";
import Progress from "./Progress";
import axios from "axios";

const FileUpload = () => {
  // Hooks
  const [file, setFile] = useState("");
  const [filename, setFileName] = useState("Choose File");
  const [uploadedFile, setUploadedFile] = useState({});
  const [message, setMessage] = useState("");
  const [uploadPercentage, setUploadPercentage] = useState(0);


  const onChange = e => {
    setFile(e.target.files[0]);
    setFileName(e.target.files[0].name);    
  };

  const onSubmit = async e => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("file", file);

    try {
      const res = await axios.post("upload", formData, {
        headers: {
          "Content-Type": "multipart/form-data"
        },
        //progress bar options
        onUploadProgress: progressEvent => {
          setUploadPercentage(
            parseInt(
              Math.round((progressEvent.loaded * 100) / progressEvent.total)
            )
          );

          // Clear percentage after 5 secs
          setTimeout(() => setUploadPercentage(0), 5000);
        }
      });

      const { filename, filePath } = res.data;

      setUploadedFile({ filename, filePath });

      setMessage("File Uploaded");
    } catch (err) {
      if (err.response.status === 500) {
        setMessage("there was a problem with the server");
      } else {
        setUploadPercentage(0);
        setMessage(err.response.data.msg);
        
      }
    }
  };

  return (
    <Fragment>
      
      {/* ternary op */}
      
      {message ? <Message msg={message} /> : null}
      <form className='col-md-4 offset-md-4' onSubmit={onSubmit}>
        <div className='custom-file mb-4'>
          <input
            type='file'
            className='custom-file-input'
            id='customFile'
            onChange={onChange}
          />
          <label className='custom-file-label' htmlFor='customFile'>
            {filename}
          </label>
        </div>
        
        {/* prop uploadPercentage */}
        <Progress percentage={uploadPercentage}/>
        <input
          type='submit'
          value='Upload'
          className='btn btn-primary btn-block mt-4'
        />
      </form>
      {/* ternary operator for uploaded */}
      {uploadedFile ? (
        <div className='row mt-5'>
          <div className='col-md-6 m-auto'>
            {/* access to the filename of the uploaded file */}
            <h3 className='text-center'>{uploadedFile.fileName}</h3>
            <img style={{ width: "100%" }} src={uploadedFile.filePath} alt='' />
          </div>
        </div>
      ) : null}
    </Fragment>
  );
};

export default FileUpload;
