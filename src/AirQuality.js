import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './AirQuality.css'; // Custom CSS for colorization

const AirQuality = () => {
  const [aqiData, setAqiData] = useState(null);

  useEffect(() => {
    fetch('https://api.waqi.info/feed/here/?token=faa35555d0b7db6950e3f2135abe61b424b6b015')
      .then(response => response.json())
      .then(data => setAqiData(data));
  }, []);

  if (!aqiData) {
    return <div>Loading...</div>;
  }

  // Function to determine color based on AQI value
  const getColorClass = (aqiValue) => {
    if (aqiValue <= 50) {
      return 'good'; // Green color for good AQI
    } else if (aqiValue <= 100) {
      return 'moderate'; // Yellow color for moderate AQI
    } else if (aqiValue <= 150) {
      return 'unhealthy-sensitive'; // Orange color for unhealthy for sensitive groups AQI
    } else if (aqiValue <= 200) {
      return 'unhealthy'; // Red color for unhealthy AQI
    } else if (aqiValue <= 300) {
      return 'very-unhealthy'; // Purple color for very unhealthy AQI
    } else {
      return 'hazardous'; // Maroon color for hazardous AQI
    }
  };

  return (
    <div className="container mt-5">
      <h1 className="mb-4">Air Quality Data</h1>
      <div className="card">
        <div className={`card-body ${getColorClass(aqiData.data.aqi)}`}>
          <h5 className="card-title">City: {aqiData.data.city.name}</h5>
          <p className="card-text">Current AQI: {aqiData.data.aqi}</p>
          <p className="card-text">Dominant Pollutant: {aqiData.data.dominentpol}</p>
          <p className="card-text">Last Updated: {aqiData.data.time.s}</p>
        </div>
      </div>
      <div className="mt-4">
        <h5>Forecast</h5>
        <div className="row">
          <div className="col-md-6">
            <h6>O3 (Ozone)</h6>
            <ul className="list-group">
              {aqiData.data.forecast.daily.o3.map((entry, index) => (
                <li key={index} className={`list-group-item ${getColorClass(entry.avg)}`}>
                  Avg: {entry.avg}, Max: {entry.max}, Min: {entry.min}, Day: {entry.day}
                </li>
              ))}
            </ul>
          </div>
          <div className="col-md-6">
            <h6>PM10 (Particulate Matter 10)</h6>
            <ul className="list-group">
              {aqiData.data.forecast.daily.pm10.map((entry, index) => (
                <li key={index} className={`list-group-item ${getColorClass(entry.avg)}`}>
                  Avg: {entry.avg}, Max: {entry.max}, Min: {entry.min}, Day: {entry.day}
                </li>
              ))}
            </ul>
          </div>
          <div className="col-md-6 mt-4">
            <h6>PM2.5 (Particulate Matter 2.5)</h6>
            <ul className="list-group">
              {aqiData.data.forecast.daily.pm25.map((entry, index) => (
                <li key={index} className={`list-group-item ${getColorClass(entry.avg)}`}>
                  Avg: {entry.avg}, Max: {entry.max}, Min: {entry.min}, Day: {entry.day}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AirQuality;
