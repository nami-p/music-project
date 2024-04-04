import React, { useEffect, useRef, useState } from 'react';
import '../design/song/AudioVisualizer.css';
import { useLocation } from 'react-router-dom';
import SongComments from '../Reviews/SongComments';

const AudioVisualizer = (props) => {

  const location = useLocation();
  const song = location.state?.song;
  const [firstplaying, setFirstPlaying] = useState(0);
  const canvasRef = useRef(null);
  const buttonRef = useRef(null);
  const timeoutsRef = useRef([]);
  const sourceRef = useRef(null);


  const audioVisualizerLogic = (audioData) => {
    const context = new (window.AudioContext || window.webkitAudioContext)();
    const source = context.createBufferSource();
    sourceRef.current = source;

    // Decode Base64 audio data directly
    context.decodeAudioData(
      base64ToArrayBuffer(audioData),
      (buffer) => {
        source.buffer = buffer;
        source.connect(context.destination);
        // Auto play
        source.start(0);
      },
      (error) => {
        console.error("Error decoding audio data:", error);
      }
    );

    const canvas = canvasRef.current;
    const muteButton = buttonRef.current;

    const mutePlay = () => {
      context.state === "running" ? context.suspend() : context.resume();
    };
    muteButton.onclick = () => mutePlay();

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    const ctx = canvas.getContext("2d");

    const analyser = context.createAnalyser();
    source.connect(analyser);
    analyser.connect(context.destination);
    analyser.fftSize = 256;
    const bufferLength = analyser.frequencyBinCount,
      dataArray = new Uint8Array(bufferLength),
      WIDTH = canvas.width,
      HEIGHT = canvas.height,
      barWidth = (WIDTH / bufferLength) * 2.5;
    let barHeight = null,
      x = null;

    timeoutsRef.current = []; // Clear previous timeouts
    const renderFrame = () => {
      ctx.fillStyle = "rgba(0,0,0,0)";
      requestAnimationFrame(renderFrame);
      x = 0;
      analyser.getByteFrequencyData(dataArray);
      ctx.clearRect(x, 0, barWidth + 1, HEIGHT);
      for (let i = 0; i < bufferLength; i++) {
        barHeight = dataArray[i];
        let r = barHeight + 22 * (i / bufferLength),
          g = 333 * (i / bufferLength),
          b = 47;
        ctx.fillStyle = "rgb(" + r + "," + g + "," + b + ")";
        ctx.fillRect(x, HEIGHT - barHeight, barWidth, barHeight);
        x += barWidth + 1;

        let timer = setTimeout(() => {
          ctx.clearRect(0, 0, WIDTH, HEIGHT);
        }, 50);
        timeoutsRef.current.push(timer);
      }
    };
    renderFrame();
  };

  useEffect(() => {

    return () => {
      // Clean up timeouts when component unmounts
      timeoutsRef.current.forEach((timer) => clearTimeout(timer));
      if (sourceRef.current) {
        sourceRef.current.stop();
        sourceRef.current.disconnect();
      }
    };
  }, []);

  useEffect(() => {
    const base64AudioData = song?.song;
    if (firstplaying === 1 && base64AudioData) {
      audioVisualizerLogic(base64AudioData);
    }
  }, [firstplaying, song]);

  return (
    <>
      <div className="App">
        <span className="hint">(Click page to start/stop)</span>
        <main className="main">
          <button
            className="contextButton"
            onClick={() => {
              if (firstplaying === 0) {
                setFirstPlaying(1);
              }
            }}
            ref={buttonRef}
          >
            <canvas ref={canvasRef} className="canvas"></canvas>
          </button>
        </main>
      </div>
      <SongComments songId={song?.songId}></SongComments>
    </>
  );
};

// Function to convert Base64 string to ArrayBuffer
function base64ToArrayBuffer(base64) {
  const base64WithoutPrefix = base64.split(",")[1]; // Remove data URI prefix
  const binaryString = window.atob(base64WithoutPrefix);
  const bytes = new Uint8Array(binaryString.length);
  for (let i = 0; i < binaryString.length; i++) {
    bytes[i] = binaryString.charCodeAt(i);
  }
  return bytes.buffer;
}

export default AudioVisualizer;
