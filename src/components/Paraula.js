import React, { useState, useEffect, useRef } from 'react';
import { fetchBinaryData } from '../utils/utils';
import ButtonGroup from 'react-bootstrap/ButtonGroup';
import Button from 'react-bootstrap/Button';

const VIDEO_BASE = 'data/videos';
const SO_BASE = 'data/sons';
const IMG_BASE = 'data/imatges';

let currentVideoPath = null;

function Paraula({ paraula: paraulaObj }) {

  const { paraula, so, imatge, repeticio, videos, families } = paraulaObj;
  const [currentVideo, setCurrentVideo] = useState(0);
  const videoRef = useRef(null);
  const audioRef = useRef(null);

  const loadVideoBlob = (videoIndex = currentVideo) => {
    if (videos && videoRef?.current) {
      const videoPath = `${VIDEO_BASE}/${videos[videoIndex]}`;
      if (videoPath !== currentVideoPath) {
        currentVideoPath = videoPath;
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

  const replay = () => {
    if (videoRef?.current) {
      videoRef.current.currentTime = 0;
      videoRef.current.play()
    }
    if (audioRef?.current) {
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
      <h5 className="paraula-text">{paraula}</h5>
      {videos &&
        <div className="paraula-video-box">
          <video
            className="paraula-video"
            autoPlay={true}
            ref={videoRef}
          />
          {videos.length > 1 &&
            <ButtonGroup aria-label="Selecciona un vídeo">
              {videos.map((_v, n) =>
                <Button
                  key={n}
                  value={n}
                  variant="primary"
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
      {imatge &&
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
          autoPlay={true}
          ref={audioRef}
        />
      }
      <div className="break" />
      {(videos || so) &&
        <Button
          variant="primary"
          color="primary"
          onClick={replay}
        >
          Torna a dir-ho
        </Button>
      }
    </div>
  );

}

export default Paraula;