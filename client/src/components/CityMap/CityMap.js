import './CityMap.css'
import { useEffect, useRef } from 'react';
import L from 'leaflet';

function CityMap({ lat, lng }) {
  const mapRef = useRef(null);

  useEffect(() => {
    const map = L.map(mapRef.current).setView([lat, lng], 15);

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png').addTo(map);
    L.marker([lat, lng]).addTo(map);

    return () => {
      map.remove();
    };
  }, [lat, lng]);

  return (
  <div ref={mapRef} className='city-map'></div>);
}

export default CityMap;