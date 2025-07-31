import React, { useContext } from 'react';
import "./App.css";
import va from "./assets/Ai_logo.png";
import { CiMicrophoneOn } from "react-icons/ci";
import { DataContext } from './context/DataContext';
import speakimg from "./assets/speak.gif" 
import aigif from "./assets/aiVoice.gif"
function App() {
  let {recognition,speaking,setSpeaking,prompt,response,setprompt,setResponse}= useContext(DataContext);
 

  return (
    <div className="main">
      <img src={va} alt="" id="GenieVoice" />
      <span>I'm GenieVoice, Your Advanced Virtual Assistant</span>
      {!speaking? 
      <button onClick={()=>{
        setprompt("listening...")
        setSpeaking(true)
        setResponse(false)
        recognition.start();
      }}>Click here <CiMicrophoneOn /></button>
      :
      <div className='response'>
        {!response?
        <img src={speakimg} alt="" id="speak"  />
        :
        <img src={aigif} alt="" id="aigif"  />}
        <p>{prompt}</p>
      </div>
        

      }
      
    </div>
  );
}

export default App;
