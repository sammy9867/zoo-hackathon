import { useState, useEffect } from 'react';
import { useAuthValue } from '../context';
import axiosInstance from '../utils/axios';

export const useRandomLocation = (forestId) => {
    const [randomLocation, setRandomLocation] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [isError, setIsError] = useState(false);

    const { token } = useAuthValue();

    const header = {
        headers: {'auth-token': token }
    };

    useEffect(() => {
        const fetchRandomLocation = async () => {
            setIsLoading(true);
            setIsError(false);

            await axiosInstance.get(`forests/${forestId}/random-location`, header)
            .then(response => {
                console.log("res", response.data)
                setRandomLocation(response.data);
             })
             .catch(e => {
                 console.log("err", e);
                 setIsError(true);
             })

             setIsLoading(false);
        };

        fetchRandomLocation();
    }, []);

    return { randomLocation, isLoading, isError };
}