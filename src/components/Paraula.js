import React, { useState, useEffect, useRef } from 'react';
import ButtonGroup from 'react-bootstrap/ButtonGroup';
import Button from 'react-bootstrap/Button';
import Alert from 'react-bootstrap/Alert';
import { FaPlay as PlayIcon } from "react-icons/fa";
import ParaulaRecordem from './ParaulaRecordem.js';
import { fetchBinaryDataURL } from '../utils/utils.js';

const VIDEO_BASE = 'data/videos';
const SO_BASE = 'data/sons';
const IMG_BASE = 'data/imatges';
export const DICCIONARI = 'diccionari';
export const RECORDEM = 'recordem';
const MEDIA_BLOBS = true;

function Paraula({ paraula: paraulaObj, mode, videoURL, setVideoURL, audioURL, setAudioURL }) {

  const { paraula, so, imatge, repeticio, videos, /*families*/ } = paraulaObj;
  const [currentVideo, setCurrentVideo] = useState(0);
  const paraulaVisible = mode === DICCIONARI;
  const [imatgeVisible, setImatgeVisible] = useState(mode === DICCIONARI);
  const [error, setError] = useState(null);
  const audioOn = mode === DICCIONARI;
  const videoRef = useRef(null);
  const audioRef = useRef(null);
  const catchFocusRef = useRef(null);

  const loadVideo = (videoIndex = currentVideo) => {
    if (videos && videoRef?.current) {
      const videoObj = videoRef.current;
      const videoPath = `${VIDEO_BASE}/${videos[videoIndex]}`;

      if (!MEDIA_BLOBS) {
        // DIRECT LOADING OF THE VIDEO FILE
        videoObj.setAttribute('src', videoPath);
        setVideoURL(videoPath);
        // window.setTimeout(() => videoObj.play(), 0);
      }
      else {
        // LOAD VIDEO VIA BLOB
        videoObj.setAttribute('src', '');
        if (videoURL)
          URL.revokeObjectURL(videoURL);
        fetchBinaryDataURL(videoPath)
          .then(url => {
            videoObj.setAttribute('src', url);
            setVideoURL(url);
            setError(null);
          })
          .catch(err => {
            setVideoURL(null);
            setError('ERROR: No s\'ha pogut carregar el so o el vídeo. Comproveu la connexió!');
            console.error(err);
          });
      }
    }
  }

  const loadAudio = () => {
    if (so && audioRef?.current) {
      const audioObj = audioRef.current;
      const audioPath = `${SO_BASE}/${so}`;

      if (!MEDIA_BLOBS) {
        // DIRECT LOADING OF THE AUDIO FILE
        audioObj.setAttribute('src', audioPath);
        setAudioURL(audioPath);
      }
      else {
        // LOAD AUDIO VIA BLOB
        audioObj.setAttribute('src', '');
        if (audioURL)
          URL.revokeObjectURL(audioURL);
        fetchBinaryDataURL(audioPath)
          .then(url => {
            audioObj.setAttribute('src', url);
            setAudioURL(url);
            setError(null);
          })
          .catch(err => {
            setAudioURL(null);
            setError('ERROR: No s\'ha pogut carregar el so o el vídeo. Comproveu la connexió!');
            console.error(err);
          });
      }
    }
  }

  useEffect(() => {
    setCurrentVideo(0);
  }, [videos]);

  useEffect(loadVideo, [currentVideo]);
  useEffect(() => {
    loadAudio();
    window.setTimeout(() => { catchFocusRef?.current?.focus(); }, 100);
  }, [so]);

  const replay = (audio = audioOn) => {
    if (videoRef?.current) {
      videoRef.current.currentTime = 0;
      videoRef.current.play()
    }
    if (audio && audioRef?.current?.getAttribute('src')) {
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
          {(videoURL || audioURL) &&
            <Button
              className="replay-button"
              variant="primary"
              color="primary"
              onClick={() => replay()}
              ref={catchFocusRef}
            >
              <PlayIcon className="left-icon" />
              TORNA A DIR-HO
            </Button>
          }
        </div>
      }
      {error &&
        <Alert
          className="paraula-error"
          variant="danger"
        >
          {error}
        </Alert>
      }
      {videos &&
        <div className="paraula-video-box">
          <video
            className="paraula-video"
            autoPlay={true}
            ref={videoRef}
            controls={mode === RECORDEM}
            crossOrigin="anonymous"
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
                  onClick={(_ev) => changeCurrentVideo(n)}
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
            onError={ev => { ev.target.style.display = 'none'; }}
          />
        </div>
      }
      {so &&
        <audio
          id={so}
          className="paraula-audio"
          autoPlay={audioOn}
          ref={audioRef}
          crossOrigin="anonymous"
        />
      }
      {mode === RECORDEM &&
        <ParaulaRecordem {...{ paraulaObj, imatgeVisible, setImatgeVisible, replay }} />
      }
    </div>
  );
}

export default Paraula;