import React, { useState } from 'react';
import axiosInstance from '../../../../utils/axios';
import { FaExclamationTriangle, FaAward, FaDonate } from 'react-icons/fa';
import moment from 'moment';
import './style.css';

export const UserFeed = ({ description, report, reward, donation, location, createdAt }) => {

    let iconSize = 20
    let timeFromNow = moment(createdAt).fromNow()
    return (
        <li className="feed-list">
            {report &&  
                <div className="feed-item feed-report">
                    <span className="feed-icon">
                        <FaExclamationTriangle size={iconSize} /> </span>
                    <div className="feed-desc">
                        <span>{description}</span>
                        <span>{timeFromNow}</span>
                    </div>
                </div>
            }
            {reward &&  
                <div className="feed-item feed-reward"> 
                    <span className="feed-icon"><FaAward size={iconSize} /> </span>
                    <div className="feed-desc">
                        <span>{description}</span>
                        <span>{timeFromNow}</span>
                    </div>
                </div>
            }

            {donation &&  
                <div className="feed-item feed-donation">
                   <span className="feed-icon"><FaDonate size={iconSize} /> </span>
                   <div className="feed-desc">
                        <span>{description}</span>
                        <span>{timeFromNow}</span>
                    </div>
                </div>
            }
        </li>
    );
}