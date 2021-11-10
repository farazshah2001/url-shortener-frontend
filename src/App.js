import {useState} from 'react'
import './App.css';
import axios from 'axios'

function App() {
  const [url, seturl] = useState("");/** state variable for input */
  const [slug, setslug] = useState("");/**state variable for slug generated */
  const [redirecturl, setredirecturl] = useState("");/**state variable for redirect url got from the server*/
  const [message, setmessage] = useState("")/**state variable for error message  generated due to invalid parameter */

  const onurlchange = (e) => {/**controlled form */
    seturl(e.target.value);
  }
  /** submit button */
  const submit = async () => {
    /**using Axios for a post HTTP function to get a slug or redirect url */
    const urlResult =  await axios({
      url:`https://url-slug-node.herokuapp.com/url/check`,
      method:"post",
      data:{
          url:url,
      }
  });
    console.log(urlResult);

    if(urlResult.data.url){/**if server returns a url means the input was a slug, the website will be redirecteed to the other website */
      setredirecturl(urlResult.data.url);
      setslug("");
      setmessage("")
      window.location.assign(urlResult.data.url)
    }else if(urlResult.data.slug){/** a rendom text is generated and returnd for the link */
      setslug(urlResult.data.slug);
      setredirecturl("");
      setmessage("");
    }else if(urlResult.data.message){/**if server returns an error message */
      setmessage(urlResult.data.message);
      setslug("");
      setredirecturl("");
    }
  }
  return (
    <div className="h-screen flex justify-center items-center bg-gray-100">{/** outer container */}
      <div className="w-11/12 lg:w-1/2 bg-white shadow-xl self-center py-6 lg:py-12 px-6 lg:px-16 border-4 border-blue-500 rounded">{/**inner card */}
        <h1 className="text-4xl my-4 text-blue-600 font-semibold text-center uppercase">URL Shortener</h1>{/** header */}
        <div className="grid grid-cols-3 my-12">{/**form div : 1-2 grid */}
          <p className="text-gray-700 text-lg transform translate-y-1">Enter url : </p>
          <input className="col-span-2"  value={url} onChange={onurlchange} type="text" placeholder="https://www.yahoo.com"></input>
        </div>
        <p className={` text-red-600 text-lg text-center `}>{message}</p>{/**error message if any , fetched from backend on button click */}
        {/**the slug or redirect url generated with conditional styling */}
        <p className={`${redirecturl?"text-blue-800":""} text-blue-600 italic text-lg my-6 text-center`}>{redirecturl?`you are being redirected to '${redirecturl}'`:slug}</p>
        {/**centered submit button */}
        <div className=" flex justify-center  my-12"> 
            <button onClick={()=>{submit()}} className="w-24 h-12 text-lg rounded border-2 border-blue-500 text-blue-500 hover:bg-blue-500 hover:text-white">Submit</button>
        </div>
      </div>
    </div>
  );
}

export default App;
