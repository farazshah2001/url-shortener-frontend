import {useState} from 'react'
import './App.css';
import axios from 'axios'

function App() {
  const [url, seturl] = useState("");
  const [slug, setslug] = useState("");
  const [redirecturl, setredirecturl] = useState("");
  const [message, setmessage] = useState("")

  const onurlchange = (e) => {
    seturl(e.target.value);
  }
  const submit = async () => {
    const urlResult =  await axios({
      url:`https://url-slug-node.herokuapp.com/url/check`,
      method:"post",
      data:{
          url:url,
      }
  });
    console.log(urlResult);
    if(urlResult.data.url){
      setredirecturl(urlResult.data.url);
      setslug("");
      setmessage("")
      window.location.assign(urlResult.data.url)
    }else if(urlResult.data.slug){
      setslug(urlResult.data.slug);
      setredirecturl("");
      setmessage("");
    }else if(urlResult.data.message){
      setmessage(urlResult.data.message);
      setslug("");
      setredirecturl("");
    }
  }
  return (
    <div className="h-screen flex justify-center items-center bg-gray-100">
      <div className="w-10/12 lg:w-1/2 bg-white shadow-xl self-center py-12 px-16 border-4 border-blue-500 rounded">
        <h1 className="text-4xl my-4 text-blue-600 font-semibold text-center uppercase">URL Shortener</h1>
        <div className="grid grid-cols-3 my-12">
          <p className="text-gray-700 text-lg transform translate-y-1">Enter the url : </p>
          <input className="col-span-2"  value={url} onChange={onurlchange} type="text" placeholder="https://www.yahoo.com"></input>
        </div>
        <p className={` text-red-600 text-lg text-center `}>{message}</p>
        <p className={`${redirecturl?"text-blue-800":""} text-blue-600 italic text-lg my-6 text-center`}>{redirecturl?`you are being redirected to '${redirecturl}'`:slug}</p>
        <div className=" flex justify-center  my-12"> 
            <button onClick={()=>{submit()}} className="w-24 h-12 text-lg rounded border-2 border-blue-500 text-blue-500 hover:bg-blue-500 hover:text-white">Submit</button>
        </div>
      </div>
    </div>
  );
}

export default App;
