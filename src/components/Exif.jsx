import React, { useRef, useState, useEffect } from 'react';
import exifr from 'exifr';

const ExifComponent = () => {
    const fileInputRef = useRef(null);
    const [imgSrc, setImgSrc] = useState(null);
    const [exifData, setExifData] = useState({});
    const [gpsData, setGpsData] = useState({});

    const handleFileChange = async (event) => {
        const file = event.target.files[0];
        const reader = new FileReader();
        reader.onloadend = function() {
            setImgSrc(reader.result);
        }
        reader.readAsDataURL(file);

        const exif = await exifr.parse(file);
        setExifData(exif || {});

        const gps = await exifr.gps(file);
        setGpsData(gps || {});
    };

    useEffect(() => {
        if (fileInputRef.current) {
            fileInputRef.current.addEventListener('change', handleFileChange);
        }
        return () => {
            if (fileInputRef.current) {
                fileInputRef.current.removeEventListener('change', handleFileChange);
            }
        };
    }, []);

    return (
        <>
            <input type="file" ref={fileInputRef} />
            {imgSrc && (
                <>
                    <img src={imgSrc} alt="Uploaded" />
                    <pre>{JSON.stringify(exifData, null, 2)}</pre>
                    <pre>{JSON.stringify(gpsData, null, 2)}</pre>
                </>
            )}
        </>
    );
};

export default ExifComponent;
