import { useState, useEffect } from 'react';
import { LatLngExpression } from 'leaflet';

const useCurrentPosition = (): LatLngExpression => {
    const [position, setPosition] = useState<LatLngExpression>([-3.7241674, -38.5924303]);

    useEffect(() => {
        navigator.geolocation.getCurrentPosition((position) => {
            const { latitude, longitude } = position.coords;
            setPosition([latitude, longitude]);
        });
    }, []);

    return position;
};

export default useCurrentPosition;
