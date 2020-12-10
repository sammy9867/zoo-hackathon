import React, { useState, useCallback, useRef, useEffect } from 'react';
import { GOOGLE_MAPS_API_KEY } from '../../utils/constants';
import axios from 'axios';
import { GoogleMap, LoadScript, Marker, InfoWindow } from '@react-google-maps/api';
import { formatRelative } from "date-fns";
import './Game.css';

const containerStyle = {
    width: '100vw', 
    maxWidth: '100%',
    height: '100%'
};


const center = {
    lat:-3.2836539123767188,
    lng:-61.045672741448264,
}

export const Game = () => {
   

    const [markers, setMarkers] = useState([]);
    const [selected, setSelected] = useState(null);

    // async function fetchRandomLocation() {
    //     await axios({
    //     method: 'GET',
    //     url: "https://run.mocky.io/v3/7a34f7b1-42a5-4123-b804-f0368f52b02c",
    //     }).then(res => {
    //         let location = res.data;
    //         setCenter(location)
    //     }).catch(e => {

    //     })
    // }

    const mapRef = useRef();
    const onLoad = useCallback(function callback(map) {
        mapRef.current = map;
    }, []);

    const onMapClick = useCallback((e) => {
        setMarkers((current) => [
            ...current,
            {
              lat: e.latLng.lat(),
              lng: e.latLng.lng(),
              time: new Date(),
            },
        ]);

        axios({
            method: 'POST',
            url: '/report',
            data: {
                lat: e.latLng.lat(),
                lng: e.latLng.lng(),
                certainty: 50,
            }
          }).then((response) => {
            console.log(response);
          }, (error) => {
            console.log(error);
          });
    }, []);


    return (
        <section className="map">

        <div className="container">
           <LoadScript
            googleMapsApiKey={GOOGLE_MAPS_API_KEY}
            >
                {<GoogleMap
                    mapContainerStyle={containerStyle}
                    zoom={60}
                    center={center}
                    mapTypeId="satellite"
                    onLoad={onLoad}
                    onClick={onMapClick}
                >
                    { markers.map((marker) => (
                        <Marker
                            key={`${marker.lat}-${marker.lng}`}
                            onClick={() => {
                                setSelected(marker);
                            }}
                            position={{ lat: marker.lat, lng: marker.lng }}
                        />
                      ))
                    }

                    { selected ? (
                        <InfoWindow
                            position={{ lat: selected.lat, lng: selected.lng }}
                            onCloseClick={() => { setSelected(null); }}
                        >
                            <div>
                                <h2> Reported </h2>
                                <p>Spotted {formatRelative(selected.time, new Date())}</p>
                            </div>
                        </InfoWindow>
                    ) : null }
                </GoogleMap> }
            </LoadScript>
            </div>
        </section>
    );
}