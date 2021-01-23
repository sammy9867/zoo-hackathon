import React from 'react';
import { NonProfitList } from './components';
import './style.css';

export const DonateView = () => {

    return (
        <div className="donate">
            <div className="donate-image-container"> 
                <img src={process.env.PUBLIC_URL + '/images/donate_forest.jpg'}  alt="forest"/>
            </div>
            <div className="donate-non-profit-container"> 
                <NonProfitList />
            </div>
        </div>
    );
}