import {useState} from 'react'
import './App.css';
import axios from 'axios'

function App() {
  const [url, seturl] = useState("");
  const [shorturl, setshorturl] = useState("");

  const onurlchange = (e) => {
    seturl(e.target.value);
  }
  const submit = async () => {
    const urlResult =  await axios({
      url:`http://localhost:/6000/url/check`,//correct url
      method:"post",
      data:{
          url:url,
      }
  });
    console.log(urlResult);
  }
  return (
    <div className="h-screen flex justify-center items-center bg-gray-100">
      <div className=" w-1/2 bg-white shadow-xl self-center py-12 px-16 border-4 border-blue-500 rounded">
        <h1 className="text-4xl my-4 text-blue-600 font-semibold text-center uppercase">URL Shortener</h1>
        <div className="grid grid-cols-3 my-12">
          <p className="text-gray-700 text-lg transform translate-y-1">Enter the url : </p>
          <input className="col-span-2"  value={url} onChange={onurlchange} type="text" placeholder="www.yahoo.com"></input>
        </div>
        <p className="text-blue-600 italic text-lg my-6 text-center">shortendeaskdjfl.com</p>
        <div className=" flex justify-center  my-12"> 
            <button onClick={()=>{submit()}} className="w-24 h-12 text-lg rounded border-2 border-blue-500 text-blue-500 hover:bg-blue-500 hover:text-white">Submit</button>
        </div>
      </div>
    </div>
  );
}

export default App;
