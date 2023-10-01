import React from "react";
import { useRef, useState } from "react";
import SpeechRecognition, { useSpeechRecognition } from "react-speech-recognition";
import "./Instrucciones.css";

import microPhoneIcon from "./microphone.svg";
import { string } from "prop-types";

function Form() {
  // const [voiceMessage, setVoiceMessage] = useState("");
  const [nombre, setNombre] = useState("");
  const [correo, setCorreo] = useState("");
  const [fecha, setFecha] = useState("");
  const [telefono, setTelefono] = useState("");
  const [mensaje, setMensaje] = useState("");

  const commands = [
    {
      command: "nombre completo *",
      callback: (text) => {
        setNombre(text);
      }
    },
    {
      command: "correo electrónico *",
      callback: (text) => {
        console.log(text);
        // var t = string(text);
        text.replace("arroba", "@");
        text.replace("punto", ".");
        text.replace("guión bajo", "_");
        console.log(text);

        setCorreo(text);
      }
    },
    {
      command: "fecha de nacimiento *",
      callback: (text) => {
        setFecha(text);
      }
    },
    {
      command: "teléfono *",
      callback: (text) => {
        setTelefono(text);
      }
    },
    {
      command: "mensaje *",
      callback: (text) => {
        setMensaje(text);
      }
    },
    {
      command: "enviar",
      callback: () => {
        alert("Enviando formulario");
        // setNombre("");
        // setCorreo("");
        // setFecha("");
        // setTelefono("");
        // setMensaje("");
      }
    }
  ];

  const { transcript, resetTranscript } = useSpeechRecognition({ commands });
  const [isListening, setIsListening] = useState(false);
  const microphoneRef = useRef(null);

  if (!SpeechRecognition.browserSupportsSpeechRecognition()) {
    return (
      <div className="mircophone-container">
        Browser is not Support Speech Recognition.
      </div>
    );
  }

  const handleListing = () => {
    setIsListening(true);
    microphoneRef.current.classList.add("listening");
    SpeechRecognition.startListening({
      continuous: true,
      language: "es-PE",
    });
  }

  const stopHandle = () => {
    setIsListening(false);
    microphoneRef.current.classList.remove("listening");
    SpeechRecognition.stopListening();
  }

  const handleReset = () => {
    stopHandle();
    resetTranscript();
  }




  return (
    <div className="container">
      <div className="microphone-wrapper">
        <div
          className="microphone-icon-container"
          ref={microphoneRef}
          onClick={handleListing}
        >
          <img src={microPhoneIcon} className="microphone-icon" />
        </div>
        <div className="microphone-status">
          {isListening ? "Escuchando........." : "Click para empezar a escuchar"}
        </div>
        {isListening && (
          <button className="microphone-stop btn" onClick={stopHandle}>
            Stop
          </button>
        )}
      </div>
      {transcript && (
        <div className="microphone-result-container">
          <div className="microphone-result-text">{transcript}</div>
          <button className="microphone-reset btn" onClick={handleReset}>
            Reset
          </button>
        </div>
      )}
      <div className="form">
        {/* <h2>Formulario</h2> */}
        <form>
          <label htmlFor="nombre">Nombre completo</label>
          <input
            type="text"
            name="nombre"
            id="nombre"
            placeholder="Escribe tu nombre"
            value={nombre}
            onChange={(e) => setNombre(e.target.value)}
          />
          <br />
          <label htmlFor="email">Correo electrónico</label>
          <input
            type="email"
            name="email"
            id="email"
            value={correo}
            onChange={(e) => setCorreo(e.target.value)}
            placeholder="Escribe tu correo electrónico"
          />
          <br />

          <label htmlFor="date">Fecha de nacimiento</label>
          <input
            type="date"
            name="date"
            id="date"
            value={fecha}
            onChange={(e) => setFecha(e.target.value)}
          />
          <br />

          <label htmlFor="phone">Teléfono</label>
          <input
            type="tel"
            name="phone"
            id="phone"
            placeholder="Escribe tu teléfono"
            value={telefono}
            onChange={(e) => setTelefono(e.target.value)}
          />
          <br />

          <label htmlFor="message">Mensaje</label>
          <textarea
            name="message"
            id="message"
            cols="30"
            rows="10"
            placeholder="Escribe tu mensaje"
            value={mensaje}
            onChange={(e) => setMensaje(e.target.value)}
          ></textarea>
          <br />

          <input
            type="submit"
            value="Enviar"

          />
        </form>


      </div>
    </div>
  );
}


export default Form;