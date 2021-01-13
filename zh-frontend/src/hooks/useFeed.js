import { useState, useEffect } from 'react';
import { useAuthValue } from '../context';
import axiosInstance from '../utils/axios';

export const useFeed = () => {
    const [feeds, setFeeds] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [isError, setIsError] = useState(false);

    const { token } = useAuthValue();

    const header = {
        headers: {'auth-token': token }
    };
    
    useEffect(() => {
        const fetchFeed = async () => {
            setIsLoading(true);
            setIsError(false);

            await axiosInstance.get('users/feeds', header)
            .then(response => {
                setFeeds((prevState) => [...prevState, ...response.data]);
             })
             .catch(e => {
                 console.log("err", e);
                 setIsError(true);
             })

             setIsLoading(false);
        };

        fetchFeed();
    }, []);


    return { feeds, isLoading, isError };
}