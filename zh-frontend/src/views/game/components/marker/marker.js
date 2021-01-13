import React from 'react';
import { FaExclamationTriangle } from 'react-icons/fa';
import './style.css';

export const ReportLocationMarker = ({ lat, lng, onHover }) => {

    return (
        <div className="report-location-marker">
            <FaExclamationTriangle 
                size={25} 
                color={"yellow"}
            />
        </div>
    )
}