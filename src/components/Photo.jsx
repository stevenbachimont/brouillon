import  { useRef, useState, useEffect, useCallback } from 'react';
import Webcam from "react-webcam";

export const Photo = () => {
    const webcamRef = useRef(null);
    const [capturedImage, setCapturedImage] = useState(null);
    const [latitude, setLatitude] = useState(0);
    const [longitude, setLongitude] = useState(0);
    const [timestamp, setTimestamp] = useState(null);

    const capture = useCallback(
        () => {
            const imageSrc = webcamRef.current.getScreenshot();
            setCapturedImage(imageSrc);
            setTimestamp(new Date());
        },
        [webcamRef]
    );

    useEffect(() => {
        const geo = navigator.geolocation;
        if (!geo) {
            console.log('Geolocation is not supported');
            return;
        }

        geo.getCurrentPosition((position) => {
            setLatitude(position.coords.latitude);
            setLongitude(position.coords.longitude);
        });
    }, []);

    return (
        <>
            <Webcam
                audio={false}
                ref={webcamRef}
                screenshotFormat="image/jpeg"
            />
            <button onClick={capture}>Prendre une photo</button>

            {capturedImage && (
                <>
                    <img src={capturedImage} alt="Captured" />
                    <p>Latitude: {latitude}</p>
                    <p>Longitude: {longitude}</p>
                    <p>Date et heure: {timestamp?.toLocaleString()}</p>
                </>
            )}
        </>
    );
};


