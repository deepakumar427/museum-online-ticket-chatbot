import React from 'react';
// import BackgorundVideoOverlay from './BackgorundVideoOverlay';
const BackgroundVideo = () => {
  return (
    <div className="relative h-[60vh] min-h-[360px] w-full sm:h-[642px] lg:h-[642px] ">
      <video 
        autoPlay 
        muted 
        loop 
        className="absolute top-0 left-0 w-full h-full object-cover z-10"
      >
        <source src="/websiteVideo.mp4" type="video/mp4" />
        Your browser does not support the video tag.
      </video>
    </div>
  );
};

export default BackgroundVideo;
