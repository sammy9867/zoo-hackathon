import { useState, useEffect } from 'react';
import axios from 'axios';

export const useFetch = (url, params) => {
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);

    useEffect(() => {
        const fetchData = async() => {
            setLoading(true);
            setError(false);
            await axios({
                method: 'GET',
                url: url,
                params: params,
             }).then(result => {
                 setData(result.data);
             }).catch(e => {
                 setError(true);
             })
             setLoading(false);
        };

        fetchData();
    }, []);

    return { data, loading, error };
}