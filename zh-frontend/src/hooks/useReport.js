import { useState, useEffect } from 'react';
import { useAuthValue } from '../context';
import axiosInstance from '../utils/axios';

export const useReport = () => {
    const [reports, setReports] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [isError, setIsError] = useState(false);

    const { token } = useAuthValue();

    const header = {
        headers: {'auth-token': token }
    };
    
    useEffect(() => {
        const fetchReports = async () => {
            setIsLoading(true);
            setIsError(false);

            await axiosInstance.get(`users/reports`, header)
            .then(response => {
                console.log("res", response.data)
                setReports(response.data);
             })
             .catch(e => {
                 console.log("err", e);
                 setIsError(true);
             })

             setIsLoading(false);
        };

        fetchReports();
    }, []);

    return { reports, isLoading, isError };
}