import React, { useState, useEffect } from 'react';
import { NonProfit } from './non-profit';
import { useAuthValue } from '../../../../context';
import axiosInstance from '../../../../utils/axios';
import './style.css';

export const NonProfitList = () => {

    const [nonProfits, setNonProfits] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [isError, setIsError] = useState(false);

    const { token } = useAuthValue();

    const header = {
        headers: {'auth-token': token }
    };

    useEffect(() => {
        const fetchNonProfits = async () => {
            setIsLoading(true);
            setIsError(false);

            await axiosInstance.get('/non-profits', header)
            .then(response => {
                console.log("res", response.data)
                setNonProfits(response.data);
             })
             .catch(e => {
                 console.log("err", e);
                 setIsError(true);
             })

             setIsLoading(false);
        };

        fetchNonProfits();
    }, []);
    
    return (
        <>
            {isLoading ? 
                ( <div>Loading ...</div> ) :
                ( <ul className="non-profit-ul">
                        {nonProfits.map((nonProfit) => {
                            return(
                                <NonProfit 
                                    key = {nonProfit._id}
                                    id = {nonProfit._id}
                                    name = {nonProfit.name}
                                    donations = {nonProfit.donations}
                                />
                            );
                        })}   
                    </ul> 
                )
            }
        </>
    );
}