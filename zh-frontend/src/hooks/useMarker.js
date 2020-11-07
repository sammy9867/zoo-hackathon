import { useState, useEffect } from 'react';
import axios from 'axios';

  
export const useMarker = (location, certainty) => {
    const [markers, setMarkers] = useState([]);
    const [error, setError] = useState(false);

    useEffect(() => {
        setError(false);
    
        async function fetchMarkers() {
          await axios({
            method: 'GET',
            url: "https://run.mocky.io/v3/16743fd1-095c-473e-81f9-a4cc095fdd9e",
            params: { location: location, certainty: certainty },
          }).then(res => {
              setMarkers(m => ( 
                  [...m, ...res.data.results]
              ))
          }).catch(e => {
            setError(true)
          })
        }
        fetchMarkers();
      }, []);

      return { markers, error }
}