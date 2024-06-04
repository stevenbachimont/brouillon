import  { useRef } from 'react';
import Webcam from "react-webcam";

export const Photo2 = () => {
    const webcamRef = useRef(null);

    const capture = () => {
        const imageSrc = webcamRef.current.getScreenshot();
        console.log(imageSrc);
    };

    const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);
    const videoConstraints = {
        facingMode: isMobile ? "environment" : "user"
    };

    return (
        <>
            <Webcam
                audio={false}
                ref={webcamRef}
                screenshotFormat="image/jpeg"
                videoConstraints={videoConstraints}
            />
            <button onClick={capture}>Capture photo</button>
        </>
    );
};
