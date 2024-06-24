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
import { useState } from "react"
import axios from 'axios'

function UploadProfileImg({id}) {
  const [file, setFile] = useState()

  const upload = () => {
    const data = new FormData()
    data.append('file', file)
    console.log(file);
    console.log(data);

    axios.post(`http://localhost:3001/upload/${id}`,data,
      {
        headers:{"Content-Type": "multipart/form-data"}
      }
     )
    .then( res => {
      console.log(res);
    })
    .catch(er => console.log(er))
  }
  
   return (
    <div>
      <input type="file" onChange={(e) => {setFile(e.target.files[0])}}/>
      <button type="button" onClick={upload}>Upload</button>
    </div>
  )
}

export default UploadProfileImg;