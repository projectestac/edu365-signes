import React, { useState, useEffect, useRef } from 'react';
import { fetchBinaryData } from '../utils/utils';
import ButtonGroup from 'react-bootstrap/ButtonGroup';
import Button from 'react-bootstrap/Button';
import Alert from 'react-bootstrap/Alert';
import { FaPlay as PlayIcon } from "react-icons/fa";
import ParaulaRecordem from './ParaulaRecordem';

const VIDEO_BASE = 'data/videos';
const SO_BASE = 'data/sons';
const IMG_BASE = 'data/imatges';
export const DICCIONARI = 'diccionari';
export const RECORDEM = 'recordem';

let currentVideoPath = null;
let currentMode = null;

function Paraula({ paraula: paraulaObj, mode }) {

  const { paraula, so, imatge, repeticio, videos, families } = paraulaObj;
  const [currentVideo, setCurrentVideo] = useState(0);
  const paraulaVisible = mode === DICCIONARI;
  const [imatgeVisible, setImatgeVisible] = useState(mode === DICCIONARI);
  const audioOn = mode === DICCIONARI;
  const videoRef = useRef(null);
  const audioRef = useRef(null);

  const loadVideoBlob = (videoIndex = currentVideo) => {
    if (videos && videoRef?.current) {
      const videoPath = `${VIDEO_BASE}/${videos[videoIndex]}`;
      if (videoPath !== currentVideoPath || mode !== currentMode) {
        currentVideoPath = videoPath;
        currentMode = mode;
        const videoObj = videoRef.current;
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
    }
  }

  useEffect(() => {
    setCurrentVideo(0);
    loadVideoBlob(0);
  }, [videos]);

  useEffect(loadVideoBlob, [currentVideo]);

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

  const changeCurrentVideo = (num) => {
    setCurrentVideo(num);
    replay();
  }

  return (
    <div className="paraula-area">
      {paraulaVisible &&
        <div className="paraula-text-box">
          <Alert variant="info" className="paraula-text">
            {paraula}
          </Alert>
          {(videos || so) &&
            <Button
              className="replay-button"
              variant="primary"
              color="primary"
              onClick={() => replay()}
            >
              <PlayIcon className="left-icon" />
              Torna a dir-ho
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
              toggle={true}
            >
              {videos.map((_v, n) =>
                <Button
                  key={n}
                  value={n}
                  variant={currentVideo === n ? 'primary' : 'outline-primary'}
                  onClick={ev => changeCurrentVideo(n)}
                  aria-label={`Mostrar el vídeo #${n + 1}`}
                >
                  {`Variant ${n + 1}`}
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