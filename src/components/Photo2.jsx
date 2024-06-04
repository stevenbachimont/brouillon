import  { useRef } from 'react';
import Webcam from "react-webcam";

export const Photo2 = () => {
    const webcamRef = useRef(null);

    const capture = () => {
        const imageSrc = webcamRef.current.getScreenshot();
        console.log(imageSrc);
    };

    return (
        <>
            <Webcam audio={false} ref={webcamRef} screenshotFormat="image/jpeg" />
            <button onClick={capture}>Capture photo</button>
        </>
    );
};


