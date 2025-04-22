/*!
 *  File    : components/Paraula.js
 *  Created : 01/04/2025
 *  By      : Francesc Busquets <francesc@gmail.com>
 *
 *  Mira què dic! - Diccionari multimèdia de la llengua de signes catalana
 *  https://mqdic.edigital.cat
 *
 *  @source https://github.com/projectestac/edu365-signes
 *
 *  @license EUPL-1.2
 *  @licstart
 *  (c) 2021 Educational Telematic Network of Catalonia (XTEC)
 *
 *  Licensed under the EUPL, Version 1.2 or -as soon they will be approved by
 *  the European Commission- subsequent versions of the EUPL (the "Licence");
 *  You may not use this work except in compliance with the Licence.
 *
 *  You may obtain a copy of the Licence at:
 *  https://joinup.ec.europa.eu/software/page/eupl
 *
 *  Unless required by applicable law or agreed to in writing, software
 *  distributed under the Licence is distributed on an "AS IS" basis, WITHOUT
 *  WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied. See the
 *  Licence for the specific language governing permissions and limitations
 *  under the Licence.
 *  @licend
 */

import React, { useState, useEffect, useRef } from 'react';
import ButtonGroup from 'react-bootstrap/ButtonGroup';
import Button from 'react-bootstrap/Button';
import Alert from 'react-bootstrap/Alert';
import { FaPlay as PlayIcon } from "react-icons/fa";
import ParaulaRecordem from './ParaulaRecordem.js';
import { fetchBinaryDataURL } from '../utils/utils.js';

export const DICCIONARI = 'diccionari';
export const RECORDEM = 'recordem';

function Paraula({ settings, paraula: paraulaObj, mode, videoURL, setVideoURL, audioURL, setAudioURL }) {

  const { mediaSrc, mediaBlobs } = settings;

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
      const videoPath = `${mediaSrc}/videos/${videos[videoIndex]}`;

      if (!mediaBlobs) {
        // DIRECT LOADING OF THE VIDEO FILE
        videoObj.setAttribute('src', videoPath);
        setVideoURL(videoPath);
      }
      else {
        // LOAD THE VIDEO FILE AS A BLOB
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
      const audioPath = `${mediaSrc}/sons/${so}`;

      if (!mediaBlobs) {
        // DIRECT LOADING OF THE AUDIO FILE
        audioObj.setAttribute('src', audioPath);
        setAudioURL(audioPath);
      }
      else {
        // LOAD THE AUDIO FILE AS A BLOB
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
            src={`${mediaSrc}/imatges/${imatge}`}
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