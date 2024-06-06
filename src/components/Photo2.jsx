import  { useRef, useState, useEffect } from 'react';
import Webcam from "react-webcam";
import './Photo2.css';

export const Photo2 = () => {
    const webcamRef = useRef(null);
    const [capturedImages, setCapturedImages] = useState([]);
    const [latitude, setLatitude] = useState(0);
    const [longitude, setLongitude] = useState(0);

    const capture = () => {
        const imageSrc = webcamRef.current.getScreenshot();
        const newImage = {
            src: imageSrc,
            timestamp: new Date(),
            latitude: latitude,
            longitude: longitude
        };
        setCapturedImages([newImage, ...capturedImages].slice(0, 3));
    };

    useEffect(() => {
        const geo = navigator.geolocation;
        if (!geo) {
            console.log('Geolocation is not supported');
            return;
        }

        geo.getCurrentPosition((position) => {
            setLatitude(position.coords.latitude);
            setLongitude(position.coords.longitude);
        }, (error) => {
            console.log(error);
        });
    }, []);

    const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);
    const videoConstraints = {
        facingMode: isMobile ? "environment" : "user"
    };

    return (
        <>
            <card>
                <Webcam
                    className="webcam"
                    audio={false}
                    ref={webcamRef}
                    screenshotFormat="image/jpeg"
                    videoConstraints={videoConstraints}
                />
                <button onClick={capture}>Capture photo</button>

                {capturedImages.map((image, index) => (
                    <div className="recu" key={index}>
                        <img className="prise" src={image.src} alt="Captured" />
                        <div className="mapouter">
                        <p>Latitude: {image.latitude}</p>
                        <p>Longitude: {image.longitude}</p>
                        <p>{image.timestamp.toLocaleString()}</p>
                        </div>
                    </div>
                ))}

            </card>
        </>
    );
};
