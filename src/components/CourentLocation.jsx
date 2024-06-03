import { useState, useEffect } from 'react'

export const CourentLocation = () => {

    const [latitude, setLatitude] = useState(0)
    const [longitude, setLongitude] = useState(0)

    useEffect(() => {
        const geo = navigator.geolocation
        if (!geo) {
            console.log('Geolocation is not supported')
            return
        }

        geo.getCurrentPosition((position) => {
            setLatitude(position.coords.latitude)
            setLongitude(position.coords.longitude)
        })
    }, [])

    return (
        <>
            <h1>Current Location</h1>
            <p>Latitude: {latitude}</p>
            <p>Longitude: {longitude}</p>
        </>
    )
}
