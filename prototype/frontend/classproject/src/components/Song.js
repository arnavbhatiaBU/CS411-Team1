import Sound from 'react-sound'
import metro from '.components/Metro.mp3'
import {useState} from "react";

function Song() {
    const PlaySound = (
        handleSongLoading,
        handleSongPlaying,
        handleSongFinishedPlaying
      );
      const [isPlaying, setIsPlaying] = useState(false);

    return (
        <div className="Song">
            <Sound 
                url = {metro}
                playStatus={
                    isPlaying ? Sound.status.PLAYING : Sound.status.STOPPED
                }
                playFromPosition={300}
                onLoading={handleSongLoading}
                onPlaying={handleSongPlaying}
                onFinishedPlaying={handleSongFinishedPlaying}
            >
            </Sound>
            <button 
                onClick={() => setIsPlaying(!isPlaying)}>{!isPlaying ? 'Play' : 'Stop'}
            </button>
        </div>
    );
};

export default Song;