import React, {useState} from "react";
import S3 from "react-aws-s3";

function UploadDocuments() {
  const fileInput = React.useRef();
  const [uploadedFilesPath, setUploadedFilesPath] = useState([]);

  const config = {
    bucketName: process.env.REACT_APP_AWS_BUCKET_NAME,
    region: process.env.REACT_APP_AWS_REGION,
    accessKeyId: process.env.REACT_APP_AWS_ID,
    secretAccessKey: process.env.REACT_APP_AWS_KEY,
  };

  const handleClick = (event) => {
    console.log(event);
    event.preventDefault();
    let newArr = fileInput.current.files;
    for (let i = 0; i < newArr.length; i++) {
      handleUpload(newArr[i]);
    }
  };

  const handleUpload = (file) => {
    let newFileName = file.name.replace(/\..+$/, "");
    const ReactS3Client = new S3(config);
    ReactS3Client.uploadFile(file, newFileName).then((data) => {
      if (data.status === 204) {
        console.log("success");
        setUploadedFilesPath([...uploadedFilesPath, data.location]);
      } else {
        console.log("fail");
      }
    });
  };

  return (
    <>
      <form className="upload-steps" onSubmit={handleClick}>
        <label>
          Upload file:
          <input type="file" multiple ref={fileInput} />
        </label>
        <br />
        <button type="submit">Upload</button>
      </form>
    </>
  );
}

export default UploadDocuments;
