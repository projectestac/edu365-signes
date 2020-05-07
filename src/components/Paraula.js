import React, { useState, useEffect, useRef } from 'react';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import ToggleButtonGroup from '@material-ui/lab/ToggleButtonGroup';
import ToggleButton from '@material-ui/lab/ToggleButton';
import ReplayIcon from '@material-ui/icons/Replay';

const VIDEO_BASE = 'data/videos';
const SO_BASE = 'data/sons';
const IMG_BASE = 'data/imatges';


function Paraula({ paraula: paraulaObj }) {

  const { paraula, so, imatge, repeticio, videos, families } = paraulaObj;
  const [currentVideo, setCurrentVideo] = useState(0);
  useEffect(() => setCurrentVideo(0), [videos]);
  const videoRef = useRef(null);
  const audioRef = useRef(null);

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
      <div className="paraula-text">
        <Typography variant="h5">{paraula}</Typography>
      </div>
      {videos &&
        <div className="paraula-video-box">
          <video
            className="paraula-video"
            src={`${VIDEO_BASE}/${videos[currentVideo]}`}
            autoPlay={true}
            ref={videoRef}
          />
          {videos.length > 1 &&
            <ToggleButtonGroup
              value={currentVideo}
              exclusive
              onChange={(_ev, value) => changeCurrentVideo(value)}
              aria-label="Selecciona un vídeo"
            >
              {videos.map((_v, n) =>
                <ToggleButton
                  key={n}
                  value={n}
                  variant="contained"
                  color="primary"
                  aria-label={`Mostrar el vídeo #${n + 1}`}
                >
                  {`Variant ${n + 1}`}
                </ToggleButton>
              )}
            </ToggleButtonGroup>
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
          variant="contained"
          color="primary"
          startIcon={<ReplayIcon />}
          onClick={replay}
        >
          Torna a dir-ho
        </Button>
      }
    </div>
  );

}

export default Paraula;