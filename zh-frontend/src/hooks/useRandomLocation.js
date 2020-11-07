import { useState } from 'react';
import axios from 'axios';

export const useRandomLocation = () => {
    const [error, setError] = useState(false);

    setError(false);
    
    async function fetchRandomLocation() {
        await axios({
        method: 'GET',
        url: "https://run.mocky.io/v3/7a34f7b1-42a5-4123-b804-f0368f52b02c",
        }).then(res => {
            let location = res.data
            console.log('B', location)
            return location
        }).catch(e => {
            setError(true)
        })
    }

    fetchRandomLocation();

    return { error }
}