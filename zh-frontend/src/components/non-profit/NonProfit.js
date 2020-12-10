import React from 'react';
import { useAuthValue } from '../../context';
import axiosInstance from '../../utils/axios';

export const NonProfit = ({ id, name, donations }) => {

    const { token } = useAuthValue();

    const header = {
        headers: {'auth-token': token }
    };

    const donateToNonProfit = async () => {
        await axiosInstance.post('/users/donate', {
            nonProfitId: id,
            donations: 10
        }, header)
        .then(result => {
            console.log("res", result)
        })
        .catch(e => {
            console.log("err", e.response.data);
        })
    }

    return (
        <li className="non-profit-list-item">
            <div className="non-profit-image" />
            <div className="non-profit-name"> 
                <span>{name}</span>
            </div>
            <div className="non-profit-donations">
                <span>{donations}</span>
            </div>
            <button 
                className="donate-button"
                onClick={() => {donateToNonProfit()}}
                >
                    Donate
            </button>
        </li>
    );
}