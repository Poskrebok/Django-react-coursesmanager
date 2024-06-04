import React from 'react';
import YouTube from 'react-youtube';

const API_KEY = 'AIzaSyB5pr7rR0VPTUQ0DLvtRD5KErNI7VSXfl0';


const VideoPlayer = ({ videoId, onVideoEnd }) => {
    const opts = {
        playerVars: {
            autoplay: 1,
        },
    };

    const handleEnd = () => {
        onVideoEnd();
    };

    return (
        <YouTube
            videoId={videoId}
            opts={opts}
            apiKey = {API_KEY}
            onEnd={handleEnd}

        />
    );
};

export default VideoPlayer;