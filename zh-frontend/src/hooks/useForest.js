import { useState, useEffect } from 'react';
import axiosInstance from '../utils/axios';

export const useForest = () => {
    const [forests, setForests] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [isError, setIsError] = useState(false);

    useEffect(() => {
        const fetchForests = async () => {
            setIsLoading(true);
            setIsError(false);

            await axiosInstance.get('/forests')
            .then(response => {
                console.log("res", response.data)
                setForests(response.data);
             })
             .catch(e => {
                 console.log("err", e);
                 setIsError(true);
             })

             setIsLoading(false);
        };

        fetchForests();
    }, []);

    return { forests, isLoading, isError };
}