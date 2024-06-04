import React from 'react';
import YouTube from 'react-youtube';

const VideoPlayer = ({ videoId, onVideoEnd }) => {
    const opts = {
        height: '390',
        width: '640',
        playerVars: {
            autoplay: 1,
            controls: 1, // show player controls
            modestbranding: 1, // prevents the YouTube logo from displaying
            rel: 0, // prevents showing related videos at the end
        },
    };

    const handleEnd = () => {
        onVideoEnd();
    };

    return (
        <YouTube
            videoId={videoId}
            opts={opts}
            onEnd={handleEnd}
        />
    );
};

export default VideoPlayer;