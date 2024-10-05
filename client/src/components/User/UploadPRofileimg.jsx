// import { useState } from 'react'
// import './App.css'
// import axios from 'axios';

// function App() {
//   const [file , setFile] = useState();

//   const Upload = () =>{
//     const formdata = new FormData();
//     formdata.append('file',file);

//     axios.post('http://localhost:3001/upload',formdata)
//     .then(res => {console.log(res)})
//     .catch(err => console.log(err))
//   }
//   return (
//     <>
//         <input type='file' onChange={(e)=>setFile(e.target.files[0])}/>
//         <button onClick={()=>{Upload}}>Upload</button>
//     </>
//   )
// }

// export default App
import { useState, useEffect } from "react";
import axios from "axios";

function UploadProfileImg({ id }) {
  const [file, setFile] = useState();

  useEffect(() => {
    if (file) {
      console.log("Selected file:", file);
      const data = new FormData();
      data.append("file", file);
      console.log("FormData contents:", data);

      axios
        .post(`http://localhost:3001/uploadimg/${id}`, data, {
          headers: { "Content-Type": "multipart/form-data" },
        })
        .then((res) => {
          console.log("Response:", res);
        })
        .catch((err) => console.log("Error:", err));
    }
  }, [file, id]);

  // const upload = () => {
  //   const data = new FormData()
  //   data.append('file', file)
  //   console.log(file);
  //   console.log(data);

  //   axios.post(`http://localhost:3001/upload/${id}`,data,
  //     {
  //       headers:{"Content-Type": "multipart/form-data"}
  //     }
  //    )
  //   .then( res => {
  //     console.log(res);
  //   })
  //   .catch(er => console.log(er))
  // }
  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };
  return (
    <div>
      <input
        type="file"
        onChange={handleFileChange}
        className="border-none outline-none "
      />
      <input
        className="block w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400"
        type="file"
        onChange={handleFileChange}
        multiple
      />
      <button
        type="button"
        onClick={() => console.log("Upload Button clicked")}
      >
        Upload
      </button>
    </div>
  );
}

export default UploadProfileImg;
