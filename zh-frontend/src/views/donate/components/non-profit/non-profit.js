import React from 'react';
import { useAuthValue } from '../../../../context';
import axiosInstance from '../../../../utils/axios';
import { Avatar, Button } from '@material-ui/core';
import { FaDonate } from 'react-icons/fa';
import { toast } from 'react-toastify';
import './style.css';


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
            console.log("res", result.data)
            toast.success("Thanks for the donation!", {
            });
        })
        .catch(e => {
            console.log("err", e.response.data);
            toast.error("Oops, not enough funds.", {
            });
        })
    }

    return (
        <li className="non-profit-list-item">
            <div className="non-profit-container">
                <Avatar>{name[0]}</Avatar>
                <div className="non-profit-details">
                    <span className="non-profit-name"><strong>{name}</strong></span>
                    <span className="non-profit-donations">${donations} raised!</span>
                </div>
            </div>
            <Button 
                variant="contained"
                aria-label="donate"
                size="small"
                color="secondary"
                onClick={() => {donateToNonProfit()}}
                startIcon={
                    <FaDonate
                        color="white" />
                    }
                >       
                Donate
            </Button>
        </li>
    );
}