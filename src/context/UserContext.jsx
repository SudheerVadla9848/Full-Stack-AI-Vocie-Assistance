import React, { useState } from "react";
import { DataContext } from "./DataContext";
import run from "../gemini";

function UserProvider({ children }) {
  const [speaking, setSpeaking] = useState(false);
  const [prompt, setprompt] = useState("listening...");
  const [response, setResponse] = useState(false);

  function speak(text) {
    const text_speak = new SpeechSynthesisUtterance(text);
    text_speak.volume = 1;
    text_speak.rate = 1;
    text_speak.pitch = 1;
    text_speak.lang = "hi-GB";
    window.speechSynthesis.speak(text_speak);
  }

  async function aiResponse(prompt) {
    let text = await run(prompt);

    
    let newText = text.replace(/google/gi, "Sudheer Vadla");

    setprompt(newText);
    speak(newText);
    setResponse(true);

    setTimeout(() => {
      setSpeaking(false);
    }, 4000);
  }

  function takeCommand(command) {
    if (command.includes("open") && command.includes("google")) {
      window.open("https://www.google.com/", "_blank");
      speak("Opening Google");
      setprompt("Opening Google");
    } else if (command.includes("open") && command.includes("youtube")) {
      window.open("https://www.youtube.com/", "_blank");
      speak("Opening YouTube");
      setResponse(true);
      setprompt("Opening YouTube");
    } else if (command.includes("open") && command.includes("instagram")) {
      window.open("https://www.instagram.com/", "_blank");
      speak("Opening Instagram");
      setResponse(true);
      setprompt("Opening Instagram");
    } else if (command.includes("time")) {
      let time = new Date().toLocaleTimeString(undefined, {
        hour: "numeric",
        minute: "numeric",
      });
      speak(`The time is ${time}`);
      setResponse(true);
      setprompt(`The time is ${time}`);
      setTimeout(() => {
        setSpeaking(false);
      }, 5000);
    } else if (command.includes("date")) {
      let date = new Date().toLocaleDateString(undefined, {
        weekday: "long",
        year: "numeric",
        month: "long",
        day: "numeric",
      });
      speak(`Today's date is ${date}`);
      setResponse(true);
      setprompt(`Today's date is ${date}`);
      setTimeout(() => {
        setSpeaking(false);
      }, 5000);
    } else {
      aiResponse(command);
    }
  }

  const SpeechRecognition =
    window.SpeechRecognition || window.webkitSpeechRecognition;
  const recognition = new SpeechRecognition();

  recognition.onresult = (e) => {
    const currentIndex = e.resultIndex;
    const transcript = e.results[currentIndex][0].transcript;
    setprompt(transcript);
    takeCommand(transcript.toLowerCase());
  };

  const value = {
    recognition,
    speaking,
    setSpeaking,
    prompt,
    setprompt,
    response,
    setResponse,
  };

  return (
    <DataContext.Provider value={value}>
      {children}
    </DataContext.Provider>
  );
}

export default UserProvider;
