import React, { useState, useCallback } from 'react';
import { GOOGLE_MAPS_API_KEY } from '../../utils/constants';
import { ReportLocationMarker, ReportModal, UserFeedList, SelectForest } from './components';
import { useReport } from '../../hooks';
import axiosInstance from '../../utils/axios';
import { useAuthValue, useForestIdValue } from '../../context';
import GoogleMapReact from 'google-map-react';
import './style.css';

export const GameView = () => {

    const { forestId, setForestId } = useForestIdValue();
    const { token } = useAuthValue();
    const { reports } = useReport();

    const [randomLocation, setRandomLocation] = useState({
        latitude: 54.26833037959728, 
        longitude: -5.958079990212486
    });
    const [isLoading, setIsLoading] = useState(false);

    const [modalIsOpen, setIsOpen] = useState(false);
    const [reportLocation, setReportLocation] = useState({lat: 1, lng: 1});

    const mapCenter = {
        lat: randomLocation.latitude,
        lng: randomLocation.longitude
    }

    const header = {
        headers: {'auth-token': token}
    };

    const fetchRandomLocation = async (forestId) => {
        setIsLoading(true);

        await axiosInstance.get(`forests/${forestId}/random-location`, header)
        .then(response => {
            console.log("res", response.data)
            setRandomLocation(response.data);
         })
         .catch(e => {
             console.log("err", e);
         })

        setIsLoading(false);
    };

    
    const onMapClick = useCallback((e) => {
        setReportLocation({lat: e.lat, lng: e.lng})
        setIsOpen(true)
    }, []);


    const markers = reports.map((report, index) => {
        return <ReportLocationMarker 
                key={index} 
                lat={report.location.latitude} 
                lng={report.location.longitude} />
    });

    return (
        <section className="game">
            <div className="game-map-container">
                <div className="forest-selection">
                    <SelectForest 
                        forestId={forestId}
                        setForestId={setForestId}
                        fetchRandomLocation={fetchRandomLocation}/>
                </div>
                <div className="map-container">
                  { !isLoading &&
                    <GoogleMapReact
                        bootstrapURLKeys={{ key: GOOGLE_MAPS_API_KEY }}
                        defaultCenter={ mapCenter }
                        defaultZoom={ 16 }
                        options={ map => ({ mapTypeId: map.MapTypeId.SATELLITE }) }
                        onClick={ onMapClick }
                    >
                        { 
                        modalIsOpen  && 
                        <ReportModal 
                            modalIsOpen
                            setIsOpen={setIsOpen}
                            latitude={reportLocation.lat}
                            longitude={reportLocation.lng}
                        />
                        }
                        {markers}
                    </GoogleMapReact>
                    }
                </div>
            </div>
            <div className="feed-container">
                <UserFeedList />
            </div>
        </section>
    );
}