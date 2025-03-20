import React, { useState, useEffect, useRef } from 'react';
import ButtonGroup from 'react-bootstrap/ButtonGroup';
import Button from 'react-bootstrap/Button';
import Alert from 'react-bootstrap/Alert';
import { FaPlay as PlayIcon } from "react-icons/fa";
import ParaulaRecordem from './ParaulaRecordem.js';

const VIDEO_BASE = 'data/videos';
const SO_BASE = 'data/sons';
const IMG_BASE = 'data/imatges';
export const DICCIONARI = 'diccionari';
export const RECORDEM = 'recordem';

function Paraula({ paraula: paraulaObj, mode }) {

  const { paraula, so, imatge, repeticio, videos, families } = paraulaObj;
  const [currentVideo, setCurrentVideo] = useState(0);
  const paraulaVisible = mode === DICCIONARI;
  const [imatgeVisible, setImatgeVisible] = useState(mode === DICCIONARI);
  const audioOn = mode === DICCIONARI;
  const videoRef = useRef(null);
  const audioRef = useRef(null);

  const loadVideo = (videoIndex = currentVideo) => {
    if (videos && videoRef?.current) {
      const videoObj = videoRef.current;
      const videoPath = `${VIDEO_BASE}/${videos[videoIndex]}`;

      // DIRECT LOADING OF THE VIDEO FILE
      videoObj.setAttribute('src', videoPath);
      window.setTimeout(() => videoObj.play(), 0);

      // LOAD VIDEO VIA BLOB
      // (Workaround for the old edu365.cat server, which did not declare the content type "video/mp4")
      /*
      if (videoPath !== currentVideoPath || mode !== currentMode) {
        currentVideoPath = videoPath;
        currentMode = mode;
        fetchBinaryData(videoPath)
          .then(url => {
            const discardableUrl = videoObj.getAttribute('src');
            videoObj.setAttribute('src', url);
            if (discardableUrl)
              URL.revokeObjectURL(discardableUrl);            
            window.setTimeout(() => videoObj.play(), 0);
          })
          .catch(err => console.log(err));
      }
    */
    }
  }

  useEffect(() => {
    setCurrentVideo(0);
    loadVideo(0);
  }, [videos]);

  useEffect(loadVideo, [currentVideo]);

  const replay = (audio = audioOn) => {
    if (videoRef?.current) {
      videoRef.current.currentTime = 0;
      videoRef.current.play()
    }
    if (audio && audioRef?.current) {
      audioRef.current.currentTime = 0;
      audioRef.current.play()
    }
  }

  const changeCurrentVideo = (num, audio = audioOn) => {
    setCurrentVideo(num);
    if (audio && audioRef?.current) {
      audioRef.current.currentTime = 0;
      audioRef.current.play()
    }
  }

  return (
    <div className="paraula-area">
      {paraulaVisible &&
        <div className="paraula-text-box">
          <Alert variant="info" className="paraula-text">
            {paraula}{repeticio ? ` (${repeticio})` : ''}
          </Alert>
          {(videos || so) &&
            <Button
              className="replay-button"
              variant="primary"
              color="primary"
              onClick={() => replay()}
            >
              <PlayIcon className="left-icon" />
              TORNA A DIR-HO
            </Button>
          }
        </div>
      }
      {videos &&
        <div className="paraula-video-box">
          <video
            className="paraula-video"
            autoPlay={true}
            ref={videoRef}
            controls={mode === RECORDEM}
          />
          {videos.length > 1 &&
            <ButtonGroup
              className="select-video"
              aria-label="Selecciona un vídeo"
              toggle="true"
            >
              {videos.map((_v, n) =>
                <Button
                  key={n}
                  value={n}
                  variant={currentVideo === n ? 'primary' : 'outline-primary'}
                  onClick={ev => changeCurrentVideo(n)}
                  aria-label={`Mostrar el vídeo #${n + 1}`}
                >
                  {`VARIANT ${n + 1}`}
                </Button>
              )}
            </ButtonGroup>
          }
        </div>
      }
      {imatge && imatgeVisible &&
        <div className="img-box">
          <img
            className="paraula-imatge"
            src={`${IMG_BASE}/${imatge}`}
            alt={paraula}
          />
        </div>
      }
      {so &&
        <audio
          id={so}
          className="paraula-audio"
          src={`${SO_BASE}/${so}`}
          autoPlay={audioOn}
          ref={audioRef}
        />
      }
      {mode === RECORDEM &&
        <ParaulaRecordem {...{ paraulaObj, imatgeVisible, setImatgeVisible, replay }} />
      }
    </div>
  );
}

export default Paraula;